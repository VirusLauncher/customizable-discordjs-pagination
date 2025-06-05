const { InteractionCollector } = require('discord.js');
const { readdirSync } = require('fs');
const path = require('path');

const loadCollectorEvents = (collectorPath) => {
    return readdirSync(collectorPath)
        .filter(file => file.endsWith('.js'))
        .map(file => ({
            event: require(path.join(collectorPath, file)),
            name: file.replace('.js', '')
        }));
};

module.exports = async (message, msg, components, footer, pages, paginationCollector, customComponentsFunction) => {
    const collector = new InteractionCollector(message.client, {
        message: message.author ? msg : await message.fetchReply(),
        idle: paginationCollector.timeout,
        dispose: true
    });

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

    events.forEach(({ event, name }) => {
        collector.on(event.name, (...args) => 
            event.execute(eventContext, ...args)
        );
    });

    return collector;
};
