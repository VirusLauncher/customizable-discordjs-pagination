const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    createSelectMenu: (customId, options, placeholder) => {
        return new StringSelectMenuBuilder()
            .setCustomId(customId)
            .setOptions(options)
            .setPlaceholder(placeholder);
    },

    createActionRow: (components) => {
        return new ActionRowBuilder().addComponents(components);
    }
}; 
