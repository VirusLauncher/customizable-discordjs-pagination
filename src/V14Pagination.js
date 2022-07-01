/**
 * @param message - Message or Interaction
 * @param {[]} pages - Array of Embeds(Pages)
 * @param {[{label:String,emoji:EmojiResolvable,style:ButtonStyle}]}buttons - Array of Buttons Objects
 * @param {{enable:Boolean,pageOnly:Boolean,placeholder:String}} selectMenu - SelectMenu Options
 * @param {{ephemeral:Boolean,timeout:Number,resetTimer:Boolean,disableEnd:Boolean,secondaryUserText:String}} options - Pagination Options
 **/

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionCollector, SelectMenuBuilder } = require('discord.js');

module.exports = async function (message, pages, buttons, paginationCollector, selectMenu) {
    // ButtonList
    const buttonList = [];
    let buttonId = [];
    let buttonRow;
    switch (buttons.length) {
        case 2:
            buttonId = ['prevBtn', 'nextBtn'];
            break;
        case 3:
            buttonId = ['prevBtn', 'stopBtn', 'nextBtn'];
            break;
        case 4:
            buttonId = ['firstBtn', 'prevBtn', 'nextBtn', 'lastBtn'];
            break;
        case 5:
            buttonId = ['firstBtn', 'prevBtn', 'stopBtn', 'nextBtn', 'lastBtn'];
            break;
    }

    if (buttons.length !== 0) {
        for (let i = 0; i < buttons.length; i++) {
            if (!buttons[i].emoji && !buttons[i].label) throw new Error(`Emoji or Label is required. Check button array position ${i}`);
            if (buttons[i].style === ButtonStyle.Link) throw new Error(`Link styles cannot be used in this package.  Check button array position ${i}`);

            const perButton = new ButtonBuilder()
                .setStyle(buttons[i].style)
                .setCustomId(buttonId[i]);

            if (buttons[i].emoji) perButton.setEmoji(buttons[i].emoji);
            if (buttons[i].label) perButton.setLabel(buttons[i].label);

            buttonList.push(perButton);
        }
        buttonRow = new ActionRowBuilder().addComponents(buttonList);
    }

    // SelectMenu
    let pageOption = [];
    const tempTitle = pages[0].data.title;
    let pageMenu;
    let pageRow;
    if (selectMenu.enable) {
        for (let i = 0; i < pages.length; i++) {
            if (!selectMenu.pageOnly && tempTitle !== pages[i].data.title) {
                pageOption = [];
                break;
            };
            pageOption.push({
                label: `Page ${i + 1}`,
                value: `${i}`,
            });
        }

        if (pageOption.length === 0) {
            for (let i = 0; i < pages.length; i++) {
                pageOption.push({
                    label: `${pages[i].data.title}`,
                    value: `${i}`,
                });
            }
        }

        pageMenu = new SelectMenuBuilder()
            .setCustomId('pageMenu')
            .setOptions(pageOption)
            .setPlaceholder(selectMenu.placeholder);

        pageRow = new ActionRowBuilder().addComponents(pageMenu);
    }

    // Options Handler
    let components = [];
    if (selectMenu.enable && buttons.length === 0) components = [pageRow];
    else if (selectMenu.enable && buttons.length !== 0) components = [pageRow, buttonRow];
    else if (!selectMenu.enable && buttons.length !== 0) components = [buttonRow];

    // Pagination Handler
    function embed(page) {
        return (selectMenu.enable && !selectMenu.pageOnly && pageOption[0].label !== 'Page 1' ?
            pages[page] :
            pages[page].setFooter({
                text: `Page ${page + 1} / ${pages.length} • Requested by ${message.member.user.tag}`,
                iconURL: message.author ? message.author.displayAvatarURL({ dynamic: true }) : message.user.displayAvatarURL({ dynamic: true }),
            })
        );
    }

    let page = 0;
    let msg;
    await (message.isReplied || message.deferred ?
        message.editReply({ embeds: [embed(page)], components: components, ephemeral: paginationCollector.ephemeral }).then((m) => { msg = m }) :
        message.reply({ embeds: [embed(page)], components: components, ephemeral: paginationCollector.ephemeral }).then((m) => { msg = m })).catch();

    const collector = new InteractionCollector(message.client, {
        message: message.author ? msg : await message.fetchReply(),
        time: paginationCollector.timeout,
    });

    async function editEmbed() {
        await message.author ?
            msg.edit({ embeds: [embed(page)], components: components, fetchReply: true }) :
            message.editReply({ embeds: [embed(page)], components: components, allowedMentions: { repliedUser: false }, ephemeral: paginationCollector.ephemeral });
    }

    collector.on('collect', async (interaction) => {
        if (interaction.member.user.id === message.member.id) {
            if (paginationCollector.resetTimer) collector.resetTimer(paginationCollector.timeout, paginationCollector.timeout);
            switch (interaction.customId) {
                case 'firstBtn':
                    page = 0;
                    break;
                case 'lastBtn':
                    page = pages.length - 1;
                    break;
                case 'prevBtn':
                    page !== 0 ? --page : page = pages.length - 1;
                    break;
                case 'nextBtn':
                    page < pages.length - 1 ? page++ : page = 0;
                    break;
                case 'stopBtn':
                    collector.stop();
                    break;
                case 'pageMenu':
                    page = Number(interaction.values[0]);
                    break;
            }
            await interaction.deferUpdate().catch(() => { });
            await editEmbed();
        }
        else await interaction.reply({ content: paginationCollector.secondaryUserText, ephemeral: true });
    });
    collector.on('end', async () => {
        let disabledComponents = [];
        if (paginationCollector.disableEnd) {
            if (selectMenu.enable && buttons.length === 0) {
                pageMenu.setDisabled(true);
                const disabledPageMenu = new ActionRowBuilder().addComponents(pageMenu);
                disabledComponents = [disabledPageMenu];
            }
            else if (selectMenu.enable && buttons.length !== 0) {
                pageMenu.setDisabled(true);
                for (let i = 0; i < buttons.length; i++) {
                    buttonList[i].setDisabled(true);
                }
                const disabledPageMenu = new ActionRowBuilder().addComponents(pageMenu);
                const disabledButtonRow = new ActionRowBuilder().addComponents(buttonList);
                disabledComponents = [disabledPageMenu, disabledButtonRow];
            }
            else if (!selectMenu.enable && buttons.length !== 0) {
                for (let i = 0; i < buttons.length; i++) {
                    buttonList[i].setDisabled(true);
                }
                const disabledButtonRow = new ActionRowBuilder().addComponents(buttonList);
                disabledComponents = [disabledButtonRow];
            };
        }
        await message.author ?
            msg.edit({ embeds: [pages[page]], components: disabledComponents }) :
            message.editReply({ embeds: [pages[page]], components: disabledComponents, ephemeral: paginationCollector.ephemeral });
    });
};