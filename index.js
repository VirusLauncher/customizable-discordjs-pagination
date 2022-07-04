const { version } = require('discord.js');
const V13Pagination = require('./src/V13Pagination');
const V14Pagination = require('./src/V14Pagination');

module.exports = class Pagination {
    constructor() {
        this.command = null;
        this.pages = null;
        this.buttons = [];
        this.paginationCollector = {
            disableEnd: true,
            ephemeral: false,
            resetTimer: true,
            secondaryUserInteraction: false,
            secondaryUserText: 'This isn\'t your interaction.',
            timeout: 120000,
        };
        this.selectMenu = {
            enable: false,
            pageOnly: false,
            placeholder: 'Select Page',
        };
    }

    /**
     * @param {} command - Message or Interaction
     * @example Message Commands - setCommand(message);
     * @example Interaction Commands - setCommand(interaction);
     **/

    setCommand(command) {
        if (!command) throw new Error('Message or Interaction is required.');
        this.command = command;
        return this;
    }

    /**
     * @param {[Embeds]} pages - Array of Embeds
     * @example v13 - [new MessageEmbed().setTitle('Page 1'), new MessageEmbed().setTitle('Page 2')]
     * @example v14 - [new EmbedBuilder().setTitle('Page 1'), new EmbedBuilder().setTitle('Page 2')]
     */

    setPages(pages) {
        if (!pages) throw new Error('Pages are required.');
        this.pages = pages;
        return this;
    }

    /**
     * @param {[{label:String,emoji:EmojiResolvable,style:ButtonStyle}]} buttons - Array of Buttons Objects
     * @example v13 - [{label: '1', emoji: '1️⃣', style: 'SUCCESS'},
     * @example v14 - [{label: '1', emoji: '1️⃣', style: ButtonStyle.SUCCESS},
     */

    setButtons(buttons) {
        this.buttons = buttons || [];
        return this;
    }

    /**
        * @param {{disableEnd:Boolean,ephemeral:Boolean,resetTimer:Boolean,secondaryUserInteraction:Boolean,secondaryUserText:String,timeout:Number}} options - Pagination Options
        * @example
        * setPaginationCollector({ ephemeral: true, timeout: 120000, resetTimer: true, disableEnd: true, secondaryUserText: 'This isn\'t your interaction.'});
     */

    setPaginationCollector({ disableEnd, ephemeral, resetTimer, secondaryUserInteraction, secondaryUserText, timeout }) {
        this.paginationCollector = {
            disableEnd: disableEnd || true,
            ephemeral: ephemeral || false,
            resetTimer: resetTimer || true,
            secondaryUserInteraction: secondaryUserInteraction || false,
            secondaryUserText: secondaryUserText || 'This isn\'t your interaction.',
            timeout: timeout || 120000,
        };
        return this;
    }

    /**
     * @param {{enable:Boolean,pageOnly:Boolean,placeholder:String}} selectMenu - SelectMenu Options
     * @example
     * setSelectMenu({enable:true,pageOnly:true,placeholder:'Select Page'});
     **/

    setSelectMenu({ enable, pageOnly, placeholder }) {
        this.selectMenu = {
            enable: enable || false,
            pageOnly: pageOnly || false,
            placeholder: placeholder || 'Select Page',
        };
        return this;
    }
    send() {
        if (!this.command) throw new Error('Message or Interaction is required.');
        if (!this.pages) throw new Error('Pages are required.');
        if (this.selectMenu.enable && this.pages.length > 25) throw new Error('Select menu is only available for upto 25 pages.');
        if (!this.selectMenu.enable && (this.buttons.length <= 1 || this.buttons.length >= 6)) throw new Error(`There must be 2, 3, 4 or 5 buttons provided. You provided ${this.buttons.length} buttons.`);
        if (version < '14.0.0') return V13Pagination(this.command, this.pages, this.buttons, this.paginationCollector, this.selectMenu);
        else if (version >= '14.0.0') return V14Pagination(this.command, this.pages, this.buttons, this.paginationCollector, this.selectMenu);
        else if (version < '13.0.0') throw new Error('Discord.js version is not supported.');
    }
}