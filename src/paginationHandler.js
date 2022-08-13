const componentsHandler = require('./libs/components/handler');
const collectorHandler = require('./libs/collector/handler');

module.exports = async (data) => {
    const components = componentsHandler(data.buttons, data.pages, data.selectMenu);

    return await collectorHandler(data.command, components, data.footer, data.pages, data.paginationCollector);
}