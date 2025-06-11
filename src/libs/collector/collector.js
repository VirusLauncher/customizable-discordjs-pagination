const { InteractionCollector } = require('discord.js');
const { readdirSync } = require('fs');
const path = require('path');

const activeCollectors = new Map();

const loadCollectorEvents = (collectorPath) => {
    return readdirSync(collectorPath)
        .filter(file => file.endsWith('.js'))
        .map(file => ({
            event: require(path.join(collectorPath, file)),
            name: file.replace('.js', '')
        }));
};

const cleanupOldCollector = async (messageId) => {
    const oldCollector = activeCollectors.get(messageId);
    if (oldCollector) {
        try {
            oldCollector.stop('NEW_PAGINATION');
        } catch (error) {
            console.error('Error stopping old collector:', error);
        }
        activeCollectors.delete(messageId);
    }
};

module.exports = async (message, msg, components, footer, pages, paginationCollector, customComponentsFunction) => {
    const messageId = message.author ? msg.id : (await message.fetchReply()).id;
    
    await cleanupOldCollector(messageId);

    const collector = new InteractionCollector(message.client, {
        message: message.author ? msg : await message.fetchReply(),
        idle: paginationCollector.timeout,
        dispose: true
    });

    activeCollectors.set(messageId, collector);

    const eventContext = {
        message,
        msg,
        components,
        footer,
        pages,
        paginationCollector,
        collector,
        customComponentsFunction
    };

    const collectorPath = path.join(__dirname, 'events');
    const events = loadCollectorEvents(collectorPath);

    collector.once('end', () => {
        activeCollectors.delete(messageId);
    });

    events.forEach(({ event }) => {
        collector.on(event.name, (...args) => 
            event.execute(eventContext, ...args)
        );
    });

    return collector;
};
