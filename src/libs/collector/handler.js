const embed = require('./embed')
const collector = require('./collector');

module.exports = async (message, components, footer, pages, paginationCollector, customComponentsFunction) => {
    try {
        const initialEmbed = embed(footer, paginationCollector.startingPage - 1, pages);
        const options = { 
            embeds: [initialEmbed], 
            components, 
            ephemeral: paginationCollector.ephemeral,
        };

        const msg = await (message.isReplied || message.deferred
            ? message.editReply(options)
            : message.reply(options));

        return await collector(
            message, 
            msg, 
            components, 
            footer, 
            pages, 
            paginationCollector, 
            customComponentsFunction
        );
    } catch (error) {
        console.error('Pagination error:', error);
        throw new Error('Failed to initialize pagination');
    }
}
