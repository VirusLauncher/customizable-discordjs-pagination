const componentsHandler = require('./libs/components/handler');
const collectorHandler = require('./libs/collector/handler');

module.exports = async (data) => {
    const components = componentsHandler(data.components, data.pages);

    return await collectorHandler(data.command, components, data.footer, data.pages, data.paginationCollector, data.components.customComponentsFunction);
}
