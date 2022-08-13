const { InteractionCollector } = require('discord.js');
const { readdirSync } = require('fs');
const path = require('path');

module.exports = async (message, msg, components, footer, pages, paginationCollector) => {
    const collector = new InteractionCollector(message.client, {
        message: message.author ? msg : await message.fetchReply(),
        time: paginationCollector.timeout,
    });
    const collectorPath = path.join(__dirname, 'events');
    const collectorFiles = readdirSync(collectorPath).filter(file => file.endsWith('.js'));
    
    for (const file of collectorFiles) {
        const filePath = path.join(collectorPath, file);
        const event = require(filePath);
        collector.on(event.name, (...args) => event.execute({ message, msg, components, footer, pages, paginationCollector, collector }, ...args));
    }
}