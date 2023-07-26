const embed = require('./embed')
const collector = require('./collector');

module.exports = async (message, components, footer, pages, paginationCollector, customComponentsFunction) => {
    let msg;
    await (message.isReplied || message.deferred ?
        message.editReply({ embeds: [embed(footer, paginationCollector.startingPage - 1, pages)], components: components, ephemeral: paginationCollector.ephemeral }).then((m) => { msg = m }) :
        message.reply({ embeds: [embed(footer, paginationCollector.startingPage - 1, pages)], components: components, ephemeral: paginationCollector.ephemeral }).then((m) => { msg = m })).catch();

    return await collector(message, msg, components, footer, pages, paginationCollector, customComponentsFunction);
}
