const { MessageFlags } = require('discord.js');

module.exports = {
    replyToInteraction: async (interaction, content, isEphemeral = false) => {
        return await interaction.reply({
            content,
            flags: isEphemeral ? MessageFlags.Ephemeral : 0
        });
    },

    editReply: async (interaction, options) => {
        return await interaction.editReply({
            ...options,
            allowedMentions: { repliedUser: false }
        });
    },

    deferUpdate: async (interaction) => {
        return await interaction.deferUpdate();
    }
}; 
