const embed = require('../embed');

let page = 0;

module.exports = {
	name: 'collect',
	async execute({ message, msg, components, footer, pages, paginationCollector, collector }, interaction) {
        if (interaction.member.user.id === message.member.id || paginationCollector.secondaryUserInteraction) {
            if (paginationCollector.resetTimer) collector.resetTimer(paginationCollector.timeout, paginationCollector.timeout);
            switch (interaction.customId) {
                case 'firstBtn':
                    page = 0;
                    break;
                case 'lastBtn':
                    page = pages.length - 1;
                    break;
                case 'prevBtn':
                    page !== 0 ? page = --page : page = pages.length - 1;
                    break;
                case 'nextBtn':
                    page < pages.length - 1 ? page++ : page = 0;
                    break;
                case 'stopBtn':
                    collector.stop();
                    break;
                case 'pageMenu':
                    page = Number(interaction.values[0]);
                    break;
            }
            await interaction.deferUpdate().catch(() => { });
			await message.author ?
			msg.edit({ embeds: [embed(footer, page, pages)], components: components, fetchReply: true }) :
			message.editReply({ embeds: [embed(footer, page, pages)], components: components, allowedMentions: { repliedUser: false } });
        }
        else {
            if (!paginationCollector.secondaryUserInteraction) await interaction.reply({ content: paginationCollector.secondaryUserText, ephemeral: true });
        }
	},
};
