const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    createButton: (style, customId, emoji, label) => {
        const button = new MessageButton()
            .setStyle(style)
            .setCustomId(customId);

        if (style.toLowerCase() === 'link') throw new Error('Link styles cannot be used in this package.');
        
        if (emoji) button.setEmoji(emoji);
        if (label) button.setLabel(label);

        return button;
    },

    createActionRow: (components) => {
        return new MessageActionRow().addComponents(components);
    }
}; 
