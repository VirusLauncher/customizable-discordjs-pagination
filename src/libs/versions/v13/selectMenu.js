const { MessageSelectMenu, MessageActionRow } = require('discord.js');

module.exports = {
    createSelectMenu: (customId, options, placeholder) => {
        return new MessageSelectMenu()
            .setCustomId(customId)
            .setOptions(options)
            .setPlaceholder(placeholder);
    },

    createActionRow: (components) => {
        return new MessageActionRow().addComponents(components);
    }
};
