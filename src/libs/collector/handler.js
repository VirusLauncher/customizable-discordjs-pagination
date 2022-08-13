const embed = require('./embed')
const collector = require('./collector');

module.exports = async (message, components, footer, pages, paginationCollector) => {
    let msg;
    await (message.isReplied || message.deferred ?
        message.editReply({ embeds: [embed(footer, 0, pages)], components: components, ephemeral: paginationCollector.ephemeral }).then((m) => { msg = m }) :
        message.reply({ embeds: [embed(footer, 0, pages)], components: components, ephemeral: paginationCollector.ephemeral }).then((m) => { msg = m })).catch();

    return await collector(message, msg, components, footer, pages, paginationCollector);
}