module.exports = function (footer, page, pages) {
    let text = '';
    let iconUrl = '';

    switch(footer.option) {
        case 'user':
            return pages[page];
        case 'none':
            text = null;
            iconUrl = null;
            break;
        case 'default':
            iconUrl = footer.iconURL;
            switch (footer.pagePosition) {
                case 'left':
                    footer.extraText ? text = `Page ${page + 1} / ${pages.length} • ${footer.extraText}` : text = `Page ${page + 1} / ${pages.length}`;
                    break;
                case 'right':
                    footer.extraText ? text = `${footer.extraText} • Page ${page + 1} / ${pages.length}` : text = `Page ${page + 1} / ${pages.length}`;
                    break;
                case 'none':
                    footer.extraText ? text = `${footer.extraText}` : text = '';
                    break;
                default:
                    throw new Error('Invalid page footer position. Valid positions are left, right, none');
            }
            break;
    }
    return pages[page].setFooter({ text: text, iconURL: iconUrl });
}
