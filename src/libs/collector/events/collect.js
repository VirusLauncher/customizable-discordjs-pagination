const embed = require('../embed');
const { getComponents } = require('../../versions/versionManager');

class PaginationState {
    constructor(startingPage, pages) {
        this.page = Math.max(0, Math.min(startingPage - 1, pages.length - 1));
        this.pages = pages;
    }

    setPage(number) {
        if (!number || typeof number !== 'number') throw new Error('A valid page number is required.');
        this.page = Math.max(0, Math.min(number - 1, this.pages.length - 1));
    }

    setPages(pages) {
        if (!pages || !Array.isArray(pages)) throw new Error('Valid pages array is required.');
        this.pages = pages;
        this.page = Math.max(0, Math.min(this.page, pages.length - 1));
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

const handleCustomInteraction = async (state, context, interaction) => {
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

const updateEmbed = async (state, context) => {
    try {
        const { message, msg, components, footer } = context;
        const embedContent = embed(footer, state.page, state.pages);
        
        if (!embedContent) throw new Error('Failed to generate embed content');
        
        const options = { 
            embeds: [embedContent], 
            components,
            ...(message.author ? { fetchReply: true } : { allowedMentions: { repliedUser: false } })
        };

        await (message.author ? msg.edit(options) : message.editReply(options));
    } catch (error) {
        console.error('Failed to update embed:', error);
        throw error;
    }
};

module.exports = {
	name: 'collect',
	async execute(context, interaction) {
        try {
            const { message, paginationCollector, collector, pages } = context;
            const { interactions } = getComponents();
            
            await interactions.deferUpdate(interaction);

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

            // Create a new state instance for this specific pagination
            const state = new PaginationState(paginationCollector.startingPage, pages);

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
                    state.setPage(Number(interaction.values[0]) + 1); // +1 because values are 0-based
                    break;
                default:
                    await handleCustomInteraction(state, context, interaction);
                    break;
            }

            await updateEmbed(state, context);
        } catch (error) {
            console.error('Pagination interaction error:', error);
            try {
                await interaction.followUp({
                    content: 'An error occurred while updating the pagination. Please try again.',
                    ephemeral: true
                });
            } catch (followUpError) {
                console.error('Failed to send error message:', followUpError);
            }
        }
	},
};
