module.exports = {
    replyToInteraction: async (interaction, content, isEphemeral = false) => {
        return await interaction.reply({
            content,
            ephemeral: isEphemeral
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
