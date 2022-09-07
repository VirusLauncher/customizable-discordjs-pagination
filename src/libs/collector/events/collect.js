const embed = require('../embed');

let page = 0;
let embedPages = null;
let isDefaultPageSet = false;

function setPage(number) {
    if (!number) throw new Error('A Page number is required.');
    if (number.type !== 'number') throw new Error('The parameter must be a number.');
    page = number - 1;
}

function setPages(pages) {
    if (!pages) throw new Error('Pages are required.');
    embedPages = pages;
}

module.exports = {
	name: 'collect',
	async execute({ message, msg, components, footer, pages, paginationCollector, collector, customComponentsFunction }, interaction) {
        if (isDefaultPageSet === false) {
            setPages(pages);
            isDefaultPageSet = true;
        }
        if (interaction.member.user.id === message.member.id || paginationCollector.secondaryUserInteraction) {
            if (paginationCollector.resetTimer) collector.resetTimer(paginationCollector.timeout, paginationCollector.timeout);
            switch (interaction.customId) {
                case 'firstBtn':
                    page = 0;
                    break;
                case 'lastBtn':
                    page = embedPages.length - 1;
                    break;
                case 'prevBtn':
                    page !== 0 ? page = --page : page = embedPages.length - 1;
                    break;
                case 'nextBtn':
                    page < embedPages.length - 1 ? page++ : page = 0;
                    break;
                case 'stopBtn':
                    collector.stop();
                    break;
                case 'pageMenu':
                    page = Number(interaction.values[0]);
                    break;
                default:
                    await customComponentsFunction({ message, msg, embedPages, collector, setPage, setPages }, interaction)
                    break;
            }
            await interaction.deferUpdate().catch(() => { });
			await message.author ?
			msg.edit({ embeds: [embed(footer, page, embedPages)], components: components, fetchReply: true }) :
			message.editReply({ embeds: [embed(footer, page, embedPages)], components: components, allowedMentions: { repliedUser: false } });
        }
        else {
            if (!paginationCollector.secondaryUserInteraction) await interaction.reply({ content: paginationCollector.secondaryUserText, ephemeral: true });
        }
	},
};
