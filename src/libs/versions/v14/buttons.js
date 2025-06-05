const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    createButton: (style, customId, emoji, label) => {
        const button = new ButtonBuilder()
            .setStyle(style)
            .setCustomId(customId);

        if (style === ButtonStyle.Link) throw new Error('Link styles cannot be used in this package.');
        
        if (emoji) button.setEmoji(emoji);
        if (label) button.setLabel(label);

        return button;
    },

    createActionRow: (components) => {
        return new ActionRowBuilder().addComponents(components);
    }
}; 
