const embed = require('./embed')
const collector = require('./collector');

let msg;

module.exports = async (message, components, footer, pages, paginationCollector, customComponentsFunction) => {
    await (message.isReplied || message.deferred ?
        message.editReply({ embeds: [embed(footer, paginationCollector.startingPage - 1, pages)], components: components, ephemeral: paginationCollector.ephemeral }).then((m) => { msg = m }) :
        message.reply({ embeds: [embed(footer, paginationCollector.startingPage - 1, pages)], components: components, ephemeral: paginationCollector.ephemeral }).then((m) => { msg = m })).catch();

    return collector(message, msg, components, footer, pages, paginationCollector, customComponentsFunction);
}
