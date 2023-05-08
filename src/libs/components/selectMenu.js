const { ActionRowBuilder, MessageActionRow, MessageSelectMenu, SelectMenuBuilder, StringSelectMenuBuilder, version } = require('discord.js');

module.exports = (pages, selectMenu) => {
    if (!(selectMenu.enable)) return null;

    let tempTitle = null;
    (compareVersion(version, '14.0.0') === -1) ? tempTitle = pages[0].title : tempTitle = pages[0].data.title;
    let pageOption = [];
    let pageMenu;

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

function compareVersion(v1, v2) {
    if (typeof v1 !== 'string') return false;
    if (typeof v2 !== 'string') return false;
    v1 = v1.split('.');
    v2 = v2.split('.');
    const k = Math.min(v1.length, v2.length);
    for (let i = 0; i < k; ++i) {
        v1[i] = parseInt(v1[i], 10);
        v2[i] = parseInt(v2[i], 10);
        if (v1[i] > v2[i]) return 1;
        if (v1[i] < v2[i]) return -1;
    }
    return v1.length == v2.length ? 0 : (v1.length < v2.length ? -1 : 1);
}