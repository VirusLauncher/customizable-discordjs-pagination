/**
 * DiscordJS V14 Pagination
 * @param {Discord} - Pass the Discord package to be accessible in the function
 * @param {Message} - Message or Slash Interaction
 * @param {MessageEmbed[]} - Array of MessageEmbeds(Pages)
 * @param {[Object]} - Array of Objects containing Styles, Labels and/or Emojis for the buttons
 * @param {Number} - Timeout in Milliseconds
 * @param {Boolean} - Select Menu or not
 */

const V14Pagination = async (Discord, message, pages, buttons = [], { timeout = 120000, selectMenu = false, selectMenuPlaceholder = 'Select Page', ephemeral = false, resetTimer = true, disableEnd = true }) => {
    if (!pages) throw new Error('Pages are required.');
    if (selectMenu && pages.length > 25) throw new Error('Select menu is only available for upto 25 pages.');
    if (!selectMenu && (buttons.length <= 1 || buttons.length >= 6)) throw new Error(`There must be 2, 3, 4 or 5 buttons provided. You provided ${buttons.length}.`);

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
            if (buttons[i].style === Discord.ButtonStyle.Link) throw new Error(`Link styles cannot be used in this package.  Check button array position ${i}`);

            const perButton = new Discord.ButtonBuilder()
                .setStyle(buttons[i].style)
                .setCustomId(buttonId[i]);

            if (buttons[i].emoji) perButton.setEmoji(buttons[i].emoji);
            if (buttons[i].label) perButton.setLabel(buttons[i].label);

            buttonList.push(perButton);
        }
        buttonRow = new Discord.ActionRowBuilder().addComponents(buttonList);
    }

    // SelectMenu
    const pageOption = [];
    let pageMenu;
    let pageRow;
    if (selectMenu) {
        for (let i = 0; i < pages.length; i++) {
            pageOption.push({
                label: `Page ${i + 1}`,
                value: `${i}`,
            });
        }

        pageMenu = new Discord.SelectMenuBuilder()
            .setCustomId('pageMenu')
            .setOptions(pageOption)
            .setPlaceholder(selectMenuPlaceholder);

        pageRow = new Discord.ActionRowBuilder().addComponents(pageMenu);
    }

    // Options Handler
    let components = [];
    if (selectMenu && buttons.length === 0) components = [pageRow];
    else if (selectMenu && buttons.length !== 0) components = [pageRow, buttonRow];
    else if (!selectMenu && buttons.length !== 0) components = [buttonRow];

    // Pagination Handler
    function embed(page) {
        return pages[page].setFooter({
            text: `Page ${page + 1} / ${pages.length} • Requested by ${message.member.user.tag}`,
            iconURL: message.author ? message.author.displayAvatarURL({ dynamic: true }) : message.user.displayAvatarURL({ dynamic: true }),
        });
    }

    let page = 0;
    let msg;

    await (message.isReplied || message.deferred ? message.editReply({ embeds: [embed(page)], components: components, ephemeral: ephemeral }).then((m) => {
            msg = m;
        }) : message.reply({ embeds: [embed(page)], components: components, ephemeral: ephemeral }).then((m) => {
            msg = m;
        }));

    const collector = new Discord.InteractionCollector(message.client, {
        message: message.author ? msg : await message.fetchReply(),
        time: timeout,
    });

    async function editEmbed() {
        message.author ?
            await msg.edit({ embeds: [embed(page)], components: components, fetchReply: true }) :
            await message.editReply({ embeds: [embed(page)], components: components, allowedMentions: { repliedUser: false }, ephemeral: ephemeral });
    }

    collector.on('collect', async (interaction) => {
        if (interaction.member.user.id == message.member.id) {
            if (resetTimer) collector.resetTimer(timeout, timeout);
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
            await interaction.deferUpdate()
                .catch(err => {

                });
            await editEmbed();
        }
        else await interaction.reply({ content: 'This isn\'t your button.', ephemeral: true });
    });
    collector.on('end', async () => {
        let disabledComponents = [];
        if (disableEnd) {
            if (selectMenu && buttons.length === 0) {
                pageMenu.setDisabled(true);
                const disabledPageMenu = new Discord.ActionRowBuilder().addComponents(pageMenu);
                disabledComponents = [disabledPageMenu];
            }
            else if (selectMenu && buttons.length !== 0) {
                pageMenu.setDisabled(true);
                for (let i = 0; i < buttons.length; i++) {
                    buttonList[i].setDisabled(true);
                }
                const disabledPageMenu = new Discord.ActionRowBuilder().addComponents(pageMenu);
                const disabledButtonRow = new Discord.ActionRowBuilder().addComponents(buttonList);
                disabledComponents = [disabledPageMenu, disabledButtonRow];
            }
            else if (!selectMenu && buttons.length !== 0) {
                for (let i = 0; i < buttons.length; i++) {
                    buttonList[i].setDisabled(true);
                }
                const disabledButtonRow = new Discord.ActionRowBuilder().addComponents(buttonList);
                disabledComponents = [disabledButtonRow];
            };
        }
        message.author ?
            await msg.edit({ embeds: [pages[page]], components: disabledComponents }) :
            await message.editReply({ embeds: [pages[page]], components: disabledComponents, ephemeral: ephemeral });
    });
};

module.exports = V14Pagination;