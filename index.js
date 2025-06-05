const { version } = require('discord.js');
const paginationHandler = require('./src/paginationHandler');

module.exports = class Pagination {
    constructor() {
        this.config = {
            command: null,
            pages: null,
            collector: {
                components: 'disable',
                ephemeral: false,
                resetTimer: true,
                startingPage: 1,
                secondaryUserInteraction: false,
                secondaryUserText: 'This isn\'t your interaction.',
                timeout: 120000
            },
            component: {
                buttons: [],
                selectMenu: {
                    enable: false,
                    pageOnly: false,
                    placeholder: 'Select Page'
                },
                customComponents: [],
                customComponentsFunction: () => null,
                footer: {
                    option: 'default',
                    pagePosition: 'left',
                    extraText: null,
                    iconURL: null
                }
            }
        };
    }

    /**
     * @param {} command - Message or Interaction
     * @example Message Commands - setCommand(message);
     * @example Interaction Commands - setCommand(interaction);
     **/

    setCommand(command) {
        if (!command) throw new Error('Message or Interaction is required.');
        this.config.command = command;
        const user = command.member.user;
        this.config.component.footer.extraText = `Requested by ${user.username}`;
        this.config.component.footer.iconURL = command.author ? 
            command.author.displayAvatarURL({ dynamic: true }) : 
            user.displayAvatarURL({ dynamic: true });
        return this;
    }

    /**
     * @param {[{row:ActionRowBuilder,position:Number}]} customComponents - Custom Components Options
     * @example setCustomComponents([ new ActionRowBuilder().addComponents(component), ...]);
     **/

    setCustomComponents(components = []) {
        this.config.component.customComponents = components;
        return this;
    }
    
    /**
     * @param {fn} customComponents - Custom Components Function
     * @example setCustomComponentsFunction(fn);
     **/
    
    setCustomComponentsFunction(fn = () => null) {
        this.config.component.customComponentsFunction = fn;
        return this;
    }

    /**
     * @param {[Embeds]} pages - Array of Embeds
     * @example v13 - [new MessageEmbed().setTitle('Page 1'), new MessageEmbed().setTitle('Page 2')]
     * @example v14 - [new EmbedBuilder().setTitle('Page 1'), new EmbedBuilder().setTitle('Page 2')]
     */

    setPages(pages) {
        if (!pages) throw new Error('Pages are required.');
        this.config.pages = pages;
        return this;
    }

    /**
     * @param {[{label:String,emoji:EmojiResolvable,style:ButtonStyle}]} buttons - Array of Buttons Objects
     * @example v13 - [{ label: '1', emoji: '⬅', style: 'SUCCESS', customId: 'prevBtn' }, { label: '2', emoji: '➡', style: 'SUCCESS', customId: 'nextBtn' }]
     * @example v14 - [{ label: '1', emoji: '⬅', style: ButtonStyle.Success, customId: 'prevBtn' }, { label: '2', emoji: '➡', style: ButtonStyle.Success, customId: 'nextBtn' }]
     */

    setButtons(buttons = []) {
        this.config.component.buttons = buttons;
        return this;
    }

    /**
     * @param {{option:String,pagePosition:String,extraText:String,enableIconUrl:Boolean,iconURL:String}} footer - Footer Options
     * @example setFooter({ option:'default', pagePosition:'left', extraText:'String', enableIconUrl:true, iconURL:'https://somelink.png' });
     **/

    setFooter({ option = 'default', pagePosition = 'left', extraText, enableIconUrl = true, iconURL } = {}) {
        const user = this.config.command.member.user;
        this.config.component.footer = {
            option: option?.toLowerCase(),
            pagePosition: pagePosition?.toLowerCase(),
            extraText: extraText || `Requested by ${user.username}`,
            iconURL: enableIconUrl ? (iconURL || (this.config.command.author ? 
                this.config.command.author.displayAvatarURL({ dynamic: true }) : 
                user.displayAvatarURL({ dynamic: true }))) : null
        };
        return this;
    }

    /**
        * @param {{disableEnd:Boolean,ephemeral:Boolean,resetTimer:Boolean,secondaryUserInteraction:Boolean,secondaryUserText:String,timeout:Number}} PaginationCollector - Pagination Options
        * @example
        * setPaginationCollector({ ephemeral: true, timeout: 120000, resetTimer: true, disableEnd: true, secondaryUserText: 'This isn\'t your interaction.' });
     */

    setPaginationCollector({ 
        components = 'disable',
        ephemeral = false,
        resetTimer = true,
        startingPage = 1,
        secondaryUserInteraction = false,
        secondaryUserText = 'This isn\'t your interaction.',
        timeout = 120000
    } = {}) {
        this.config.collector = {
            components: components?.toLowerCase(),
            ephemeral,
            resetTimer,
            startingPage,
            secondaryUserInteraction,
            secondaryUserText,
            timeout
        };
        return this;
    }

    /**
     * @param {{enable:Boolean,pageOnly:Boolean,placeholder:String}} selectMenu - SelectMenu Options
     * @example
     * setSelectMenu({ enable:true, pageOnly:true, placeholder:'Select Page' });
     **/

    setSelectMenu({ enable = false, pageOnly = false, placeholder = 'Select Page' } = {}) {
        this.config.component.selectMenu = { enable, pageOnly, placeholder };
        return this;
    }

    async send() {
        return await paginationHandler(this.config);
    }
};
