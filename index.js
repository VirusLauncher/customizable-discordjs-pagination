const { version } = require('discord.js');
const paginationHandler = require('./src/paginationHandler');

module.exports = class Pagination {
    constructor() {
        this.command = null;
        this.pages = null;
        this.paginationCollector = {
            components: 'disable',
            ephemeral: false,
            resetTimer: true,
            secondaryUserInteraction: false,
            secondaryUserText: 'This isn\'t your interaction.',
            timeout: 120000,
        };
        this.footer = {
            option: 'default',
            pagePosition: 'left',
            extraText: null,
            iconURL: null,
        };
        this.components = {
            buttons: [],
            buttonsPosition: 1,
            selectMenu: {
                enable: false,
                pageOnly: false,
                placeholder: 'Select Page',
                position: 0,
            },
            customComponents: [],
            customComponentsFunction: function(){ return null; },
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
        this.footer.extraText = `Requested by ${this.command.member.user.tag}`;
        this.footer.iconURL = this.command.author ? this.command.author.displayAvatarURL({ dynamic: true }) : this.command.user.displayAvatarURL({ dynamic: true });
        return this;
    };

    /**
     * @param {[Embeds]} pages - Array of Embeds
     * @example v13 - [new MessageEmbed().setTitle('Page 1'), new MessageEmbed().setTitle('Page 2')]
     * @example v14 - [new EmbedBuilder().setTitle('Page 1'), new EmbedBuilder().setTitle('Page 2')]
     */

    setPages(pages) {
        if (!pages) throw new Error('Pages are required.');
        this.pages = pages;
        return this;
    };

    /**
     * @param {[{label:String,emoji:EmojiResolvable,style:ButtonStyle}]} buttons - Array of Buttons Objects
     * @example v13 - [{ label: '1', emoji: '1️⃣', style: 'SUCCESS' }, { label: '2', emoji: '2️⃣', style: 'SUCCESS' }]
     * @example v14 - [{ label: '1', emoji: '1️⃣', style: ButtonStyle.Success }, { label: '2', emoji: '2️⃣', style: ButtonStyle.Success }]
     */

    setButtons({ buttons, position }) {
        this.components.buttons = buttons || [];
        this.components.buttonsPosition = position || 1;
        if (this.components.buttonsPosition > 4 && this.components.buttonsPosition < 0) throw new Error('Position must be between 0 and 4.');
        return this;
    };

    /**
     * @param {{option:String,pagePosition:String,extraText:String,enableIconUrl:Boolean,iconURL:String}} footer - Footer Options
     * @example setFooter({ option:'default', pagePosition:'left', extraText:'String', enableIconUrl:true, iconURL:'https://somelink.png' });
     **/

    setFooter({ option, pagePosition, extraText, enableIconUrl, iconURL }) {
        if (option?.toLowerCase() !== 'default' || option?.toLowerCase() !== 'none' || option?.toLowerCase() !== 'user') this.footer.option = 'default';
        this.footer = {
            option: option?.toLowerCase() || 'default',
            pagePosition: pagePosition?.toLowerCase() || 'left',
            extraText: extraText || `Requested by ${this.command.member.user.tag}`,
            iconURL: iconURL || this.command.author ? this.command.author.displayAvatarURL({ dynamic: true }) : this.command.user.displayAvatarURL({ dynamic: true }),
        };
        if (enableIconUrl === false) this.footer.iconURL = null;
        return this;
    };

    /**
        * @param {{disableEnd:Boolean,ephemeral:Boolean,resetTimer:Boolean,secondaryUserInteraction:Boolean,secondaryUserText:String,timeout:Number}} PaginationCollector - Pagination Options
        * @example
        * setPaginationCollector({ ephemeral: true, timeout: 120000, resetTimer: true, disableEnd: true, secondaryUserText: 'This isn\'t your interaction.' });
     */

    setPaginationCollector({ components, ephemeral, resetTimer, secondaryUserInteraction, secondaryUserText, timeout }) {
        if (components?.toLowerCase() !== 'disable' || components?.toLowerCase() !== 'disappear') this.paginationCollector.components = 'disable';
        this.paginationCollector = {
            components: components?.toLowerCase() || 'disable',
            ephemeral: ephemeral || false,
            resetTimer: resetTimer || true,
            secondaryUserInteraction: secondaryUserInteraction || false,
            secondaryUserText: secondaryUserText || 'This isn\'t your interaction.',
            timeout: timeout || 120000,
        };
        return this;
    };

    /**
     * @param {{enable:Boolean,pageOnly:Boolean,placeholder:String}} selectMenu - SelectMenu Options
     * @example
     * setSelectMenu({ enable:true, pageOnly:true, placeholder:'Select Page' });
     **/

    setSelectMenu({ enable, pageOnly, placeholder, position }) {
        this.components.selectMenu = {
            enable: enable || false,
            pageOnly: pageOnly || false,
            placeholder: placeholder || 'Select Page',
            position: position || 0,
        };
        if (this.components.selectMenu.position > 4 && this.components.selectMenu.position < 0) throw new Error('Position must be between 0 and 4.');
        return this;
    };

    /**
     * @param {[{row:ActionRowBuilder,position:Number}]} customComponents - Custom Components Options
     * @example setCustomComponents({[{ row: new ActionRowBuilder().addComponents(component), position: 1 }, ...]});
     **/

    setCustomComponents({ row }) {
        row.forEach(element => {
            if (element?.position > 4 && element?.position < 0) throw new Error('Position must be between 0 and 4.');
            if (!(element?.position)) element.position = null;
        });
        this.components.customComponents = row || [];
        return this;
    }

    /**
     * @param {fn} customComponents - Custom Components Function
     * @example setCustomComponentsFunction(fn);
     **/

    setCustomComponentsFunction(fn) {
        this.components.customComponentsFunction = fn || function(){ return null; };
        return this;
    }

    async send() {
        if (version < '13.0.0') throw new Error('Discord.js version 12 and below is not supported.');
        if (!this.command) throw new Error('Message or Interaction is required.');
        if (!this.pages) throw new Error('Pages are required.');
        if (this.components.selectMenu.enable && this.pages.length > 25) throw new Error('Select menu is only available for upto 25 pages.');
        if (!this.components.selectMenu.enable && (this.components.buttons.length <= 1 || this.components.buttons.length >= 6)) throw new Error(`There must be 2, 3, 4 or 5 buttons provided. You provided ${this.buttons.length} buttons.`);
        return await paginationHandler(this);
    };
};