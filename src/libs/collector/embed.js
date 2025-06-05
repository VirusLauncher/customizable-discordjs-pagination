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
    if (!footer || !pages[page]) return null;

    switch(footer.option) {
        case 'user':
            return pages[page];
            
        case 'none':
            return pages[page].setFooter({ text: null, iconURL: null });
            
        case 'default': {
            const text = createPageText(
                footer.pagePosition, 
                page, 
                pages.length, 
                footer.extraText
            );
            return pages[page].setFooter({ text, iconURL: footer.iconURL });
        }
            
        default:
            throw new Error('Invalid footer option. Valid options are user, none, default');
    }
};
