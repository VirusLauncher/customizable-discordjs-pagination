const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRow, MessageButton, version } = require('discord.js');

module.exports = (buttons) => {
    if (buttons.length <= 1) return null;
    
    const buttonList = [];
    let buttonId = [];
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

    for (let i = 0; i < buttons.length; i++) {
        if (!buttons[i].emoji && !buttons[i].label) throw new Error(`Emoji or Label is required. Check button array position ${i}`);

        let perButton = null;
        if (version < '14.0.0') {
            if (buttons[i].style === 'LINK') throw new Error(`Link styles cannot be used in this package.  Check button array position ${i}`);

            perButton = new MessageButton()
                .setStyle(buttons[i].style)
                .setCustomId(buttonId[i]);
        }
        else if (version >= '14.0.0') {
            if (buttons[i].style === ButtonStyle.Link) throw new Error(`Link styles cannot be used in this package.  Check button array position ${i}`);

            perButton = new ButtonBuilder()
            .setStyle(buttons[i].style)
            .setCustomId(buttonId[i])
        }

        if (buttons[i].emoji) perButton.setEmoji(buttons[i].emoji);
        if (buttons[i].label) perButton.setLabel(buttons[i].label);

        buttonList.push(perButton);
    }
    if (version < '14.0.0') return new MessageActionRow().addComponents(buttonList);
    return new ActionRowBuilder().addComponents(buttonList);
}