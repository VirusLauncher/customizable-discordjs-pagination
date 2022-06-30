"use strict"
module.exports = class Parameters {
    constructor({ paginationCollector, selectMenu }) {
        this.paginationCollector = {
            disableEnd: paginationCollector?.disableEnd || true, 
            ephemeral: paginationCollector?.ephemeral || false,
            resetTimer: paginationCollector?.resetTimer || true,
            secondaryUserText: paginationCollector?.secondaryUserText || 'This isn\'t your interaction.',
            timeout: paginationCollector?.timeout || 120000,
        };
        this.selectMenu = {
            enable: selectMenu?.enable || false,
            pageOnly: selectMenu?.pageOnly || false,
            placeholder: selectMenu?.placeholder || 'Select Page',
        };
    }
}