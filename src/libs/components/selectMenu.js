const { ActionRowBuilder, MessageActionRow, MessageSelectMenu, SelectMenuBuilder, StringSelectMenuBuilder, version } = require('discord.js');

const compareVersion = require('../../helpers/compareVersion.js')

module.exports = (pages, selectMenu) => {
    if (!(selectMenu.enable)) return null;

    let tempTitle = null;
    let pageOption = [];
    let pageMenu;

    (compareVersion(version, '14.0.0') === -1) ? tempTitle = pages[0].title : tempTitle = pages[0].data.title;

    for (let i = 0; i < pages.length; i++) {
        if (!selectMenu.pageOnly && tempTitle !== (compareVersion(version, '14.0.0') === -1 ? pages[i].title : pages[i].data.title)) {
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
                label: `${(compareVersion(version, '14.0.0') === -1 ? pages[i].title : pages[i].data.title)}`,
                value: `${i}`,
            });
        }
    }

    if (compareVersion(version, '14.0.0') === -1) {
        pageMenu = new MessageSelectMenu()
            .setCustomId('pageMenu')
            .setOptions(pageOption)
            .setPlaceholder(selectMenu.placeholder);

        return new MessageActionRow().addComponents(pageMenu);
    }
    else if (compareVersion(version, '14.6.0') === 1) {
        pageMenu = new StringSelectMenuBuilder()
            .setCustomId('pageMenu')
            .setOptions(pageOption)
            .setPlaceholder(selectMenu.placeholder);
    }
    else {
        pageMenu = new SelectMenuBuilder()
            .setCustomId('pageMenu')
            .setOptions(pageOption)
            .setPlaceholder(selectMenu.placeholder);
    }

    return new ActionRowBuilder().addComponents(pageMenu);
}
