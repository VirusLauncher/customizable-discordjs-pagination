const embed = require('../embed');
const { getComponents } = require('../../versions/versionManager');

class PaginationState {
    constructor() {
        this.page = 0;
        this.pages = null;
        this.isInitialized = false;
    }

    setPage(number) {
        if (!number || typeof number !== 'number') throw new Error('A valid page number is required.');
        
        this.page = number - 1;
    }

    setPages(pages) {
        if (!pages || !Array.isArray(pages)) throw new Error('Valid pages array is required.');
        
        this.pages = pages;
    }

    initialize(startingPage, pages) {
        if (!this.isInitialized) {
            this.page = startingPage - 1;
            this.setPages(pages);
            this.isInitialized = true;
        }
    }

    navigate(action, totalPages) {
        switch (action) {
            case 'first':
                this.page = 0;
                break;
            case 'last':
                this.page = totalPages - 1;
                break;
            case 'prev':
                this.page = this.page !== 0 ? this.page - 1 : totalPages - 1;
                break;
            case 'next':
                this.page = this.page < totalPages - 1 ? this.page + 1 : 0;
                break;
        }
    }
}

const state = new PaginationState();

const handleCustomInteraction = async (context, interaction) => {
    const { message, msg, collector, customComponentsFunction } = context;
    await customComponentsFunction({ 
        message, 
        msg, 
        pages: state.pages, 
        collector, 
        setPage: state.setPage.bind(state), 
        setPages: state.setPages.bind(state) 
    }, interaction);
};

const updateEmbed = async (context) => {
    const { message, msg, components, footer } = context;
    const options = { 
        embeds: [embed(footer, state.page, state.pages)], 
        components,
        ...(message.author ? { fetchReply: true } : { allowedMentions: { repliedUser: false } })
    };

    await (message.author ? msg.edit(options) : message.editReply(options));
};

module.exports = {
	name: 'collect',
	async execute(context, interaction) {
        const { message, paginationCollector, collector, pages } = context;
        const { interactions } = getComponents();
        
        const isAuthorized = interaction.member.user.id === message.member.id || paginationCollector.secondaryUserInteraction;

        if (!isAuthorized) {
            if (!paginationCollector.secondaryUserInteraction) {
                await interactions.replyToInteraction(
                    interaction,
                    paginationCollector.secondaryUserText,
                    true
                );
            }
            return;
        }

        if (paginationCollector.resetTimer) collector.resetTimer(paginationCollector.timeout, paginationCollector.timeout);

        state.initialize(paginationCollector.startingPage, pages);

        switch (interaction.customId) {
            case 'firstBtn':
                state.navigate('first');
                break;
            case 'lastBtn':
                state.navigate('last', state.pages.length);
                break;
            case 'prevBtn':
                state.navigate('prev', state.pages.length);
                break;
            case 'nextBtn':
                state.navigate('next', state.pages.length);
                break;
            case 'stopBtn':
                collector.stop();
                break;
            case 'pageMenu':
                state.page = Number(interaction.values[0]);
                break;
            default:
                await handleCustomInteraction(context, interaction);
                break;
        }

        await interactions.deferUpdate(interaction);
        await updateEmbed(context);
	},
};
