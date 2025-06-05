const { version } = require('discord.js');
const componentsHandler = require('./libs/components/handler');
const collectorHandler = require('./libs/collector/handler');

const validateData = (data) => {
    // Version check
    if (version < '13.0.0') throw new Error('Discord.js version 12 and below is not supported.');

    const {command, pages, component: { selectMenu, buttons }} = data;

    // Required data validation
    if (!data) throw new Error('Pagination data is required');
    if (!command) throw new Error('Message or Interaction is required');
    if (!pages || !Array.isArray(data.pages)) throw new Error('Valid pages array is required');

    // Component-specific validation
    if (selectMenu?.enable && data.pages.length > 25) throw new Error('Select menu is only available for up to 25 pages.');
    if (!selectMenu?.enable && (!buttons?.length || buttons.length < 2 || buttons.length > 5)) throw new Error(`There must be at least 2 and no more than 5 buttons provided. You provided ${buttons?.length || 0} buttons.`);
    
};

module.exports = async (data) => {
    try {
        validateData(data);
        
        const components = await componentsHandler(data.components, data.pages);
        
        return await collectorHandler(
            data.command, 
            components, 
            data.footer, 
            data.pages, 
            data.paginationCollector, 
            data.components.customComponentsFunction
        );
    } catch (error) {
        console.error('Pagination error:', error);
        throw new Error(`Failed to initialize pagination: ${error.message}`);
    }
};
