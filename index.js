const { version } = require('discord.js');

if (version < '14.0.0') {
    module.exports = require('./src/V13Pagination');
}
else if (version >= '14.0.0') {
    module.exports = require('./src/V14Pagination');
}
else if (version < '13.0.0') {
    throw new Error('Discord.js version is not supported.');
}