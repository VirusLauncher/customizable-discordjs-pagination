module.exports = function (footer, page, pages) {
    if (!footer.enable) return pages[page];
    let text = '';
    switch ((footer.pagePosition).toLowerCase()) {
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
    return pages[page].setFooter({
        text: text,
        iconURL: footer.iconURL,
    });
}