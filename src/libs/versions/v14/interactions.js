const { MessageFlags } = require('discord.js');

module.exports = {
    replyToInteraction: async (interaction, content, isEphemeral = false) => {
        const options = {
            content,
            flags: isEphemeral ? MessageFlags.Ephemeral : undefined
        };
        return await interaction.reply(options);
    },

    editReply: async (interaction, options) => {
        return await interaction.editReply({
            ...options,
            allowedMentions: { repliedUser: false }
        });
    },

    deferUpdate: async (interaction) => {
        try {
            return await interaction.deferUpdate();
        } catch (error) {
            console.error('Failed to defer interaction update:', error);
        }
    }
}; 
