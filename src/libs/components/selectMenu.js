const { ActionRowBuilder, MessageActionRow, MessageSelectMenu, SelectMenuBuilder, version } = require('discord.js');

module.exports = (pages, selectMenu) => {
    if (!(selectMenu.enable)) return null;

    let tempTitle = null;
    (version < '14.0.0') ? tempTitle = pages[0].title : tempTitle = pages[0].data.title;
    let pageOption = [];
    let pageMenu;

    for (let i = 0; i < pages.length; i++) {
        if (!selectMenu.pageOnly && tempTitle !== (version < '14.0.0' ? pages[i].title : pages[i].data.title)) {
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
                label: `${(version < '14.0.0' ? pages[i].title : pages[i].data.title)}`,
                value: `${i}`,
            });
        }
    }

    if (version < '14.0.0') {
        pageMenu = new MessageSelectMenu()
            .setCustomId('pageMenu')
            .setOptions(pageOption)
            .setPlaceholder(selectMenu.placeholder);

        return new MessageActionRow().addComponents(pageMenu);
    }

    pageMenu = new SelectMenuBuilder()
        .setCustomId('pageMenu')
        .setOptions(pageOption)
        .setPlaceholder(selectMenu.placeholder);

    return new ActionRowBuilder().addComponents(pageMenu);
}