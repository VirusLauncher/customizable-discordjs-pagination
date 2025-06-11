const { version } = require('discord.js');

/**
 * Compares two version strings (e.g., '14.0.0' vs '13.0.0')
 * @param {string} v1 First version string
 * @param {string} v2 Second version string
 * @returns {number} 1 if v1 > v2, -1 if v1 < v2, 0 if equal, or throws error if invalid
 */
function compareVersion(v1, v2) {
    if (typeof v1 !== 'string' || typeof v2 !== 'string') throw new Error('Version arguments must be strings');
    
    if (v1 === v2) return 0;

    const v1Parts = v1.split('.').map(part => {
        const num = parseInt(part, 10);
        if (isNaN(num)) throw new Error(`Invalid version number: ${v1}`);
        return num;
    });

    const v2Parts = v2.split('.').map(part => {
        const num = parseInt(part, 10);
        if (isNaN(num)) throw new Error(`Invalid version number: ${v2}`);
        return num;
    });

    const length = Math.min(v1Parts.length, v2Parts.length);
    
    for (let i = 0; i < length; i++) {
        if (v1Parts[i] > v2Parts[i]) return 1;
        if (v1Parts[i] < v2Parts[i]) return -1;
    }

    return v1Parts.length === v2Parts.length ? 0 : 
           v1Parts.length < v2Parts.length ? -1 : 1;
}


const v13 = {
    buttons: require('./v13/buttons'),
    selectMenu: require('./v13/selectMenu'),
    interactions: require('./v13/interactions')
};

const v14 = {
    buttons: require('./v14/buttons'),
    selectMenu: require('./v14/selectMenu'),
    interactions: require('./v14/interactions')
};

const getVersionImplementation = () => {
    const isV14Plus = compareVersion(version, '14.0.0') >= 0;
    return isV14Plus ? v14 : v13;
};

module.exports = {
    getComponents: () => {
        const impl = getVersionImplementation();
        return {
            buttons: impl.buttons,
            selectMenu: impl.selectMenu,
            interactions: impl.interactions
        };
    }
}; 
