const { version } = require('discord.js');
const V13Pagination = require('./src/V13Pagination');
const V14Pagination = require('./src/V14Pagination');

module.exports = class PaginationBuilder {
    constructor(message) {
        this.message = message;
        this.pages = null;
        this.buttons = [];
        this.paginationCollector = {
            disableEnd: true, 
            ephemeral: false,
            resetTimer: true,
            secondaryUserText: 'This isn\'t your interaction.',
            timeout: 120000,
        };
        this.selectMenu = {
            enable: false,
            pageOnly: false,
            placeholder: 'Select Page',
        };
    }

    setPages(pages) {
        if (!pages) throw new Error('Pages are required.');
        this.pages = pages;
        return this;
    }

    setButtons(buttons) {
        this.buttons = buttons || [];
        return this;
    }

    setPaginationCollector({ disableEnd, ephemeral, resetTimer, secondaryUserText, timeout }) {
        this.paginationCollector = {
            disableEnd: disableEnd || true, 
            ephemeral: ephemeral || false,
            resetTimer: resetTimer || true,
            secondaryUserText: secondaryUserText || 'This isn\'t your interaction.',
            timeout: timeout || 120000,
        };
        return this;
    }
    setSelectMenu({ enable, pageOnly, placeholder }) {
        this.selectMenu = {
            enable: enable || false,
            pageOnly: pageOnly || false,
            placeholder: placeholder || 'Select Page',
        };
        return this;
    }
    execute() {
        if (!this.pages) throw new Error('Pages are required.');
        if (this.selectMenu.enable && this.pages.length > 25) throw new Error('Select menu is only available for upto 25 pages.');
        if (!this.selectMenu.enable && (this.buttons.length <= 1 || this.buttons.length >= 6)) throw new Error(`There must be 2, 3, 4 or 5 buttons provided. You provided ${this.buttons.length} buttons.`);
    
        if (version < '14.0.0') V13Pagination(this.message, this.pages, this.buttons, this.paginationCollector, this.selectMenu);
        else if (version >= '14.0.0') V14Pagination(this.message, this.pages, this.buttons, this.paginationCollector, this.selectMenu);
        else if (version < '13.0.0') throw new Error('Discord.js version is not supported.');
    }
}
