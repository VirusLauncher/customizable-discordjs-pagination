const createPageText = (pagePosition, currentPage, totalPages, extraText) => {
    const pageInfo = `Page ${currentPage + 1} / ${totalPages}`;
    
    switch (pagePosition) {
        case 'left':
            return extraText ? `${pageInfo} • ${extraText}` : pageInfo;
        case 'right':
            return extraText ? `${extraText} • ${pageInfo}` : pageInfo;
        case 'none':
            return extraText || '';
        default:
            throw new Error('Invalid page footer position. Valid positions are left, right, none');
    }
};

module.exports = function(footer, page, pages) {
    if (!pages || !Array.isArray(pages) || pages.length === 0) throw new Error('Valid pages array is required');
    if (page < 0 || page >= pages.length) throw new Error(`Invalid page number. Must be between 0 and ${pages.length - 1}`);
    
    const currentEmbed = pages[page];

    if (!currentEmbed) throw new Error(`No embed found for page ${page}`);
    if (!footer) return currentEmbed;

    switch(footer.option) {
        case 'user':
            return currentEmbed;
        case 'none':
            return currentEmbed.setFooter({ text: null, iconURL: null });
        case 'default': {
            const text = createPageText(
                footer.pagePosition || 'left', 
                page, 
                pages.length, 
                footer.extraText
            );
            return currentEmbed.setFooter({ text, iconURL: footer.iconURL });
        }
        default:
            return currentEmbed;
    }
};
