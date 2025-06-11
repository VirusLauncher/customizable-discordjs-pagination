const { getComponents } = require('../versions/versionManager');

const createPageOptions = (pages, pageOnly, getTitle) => {
    const firstPageTitle = getTitle(pages[0]);

    if (pageOnly || pages.every(page => getTitle(page) === firstPageTitle)) {
        return pages.map((_, index) => ({
            label: `Page ${index + 1}`,
            value: String(index)
        }));
    }

    return pages.map((page, index) => ({
        label: getTitle(page),
        value: String(index)
    }));
};

module.exports = (pages, selectMenu) => {
    if (!selectMenu?.enable || !Array.isArray(pages) || pages.length === 0) return null;
    
    const { selectMenu: menuComponents } = getComponents();
    const getTitle = page => page.data?.title || page.title;
    
    const options = createPageOptions(pages, selectMenu.pageOnly, getTitle);
    const menu = menuComponents.createSelectMenu('pageMenu', options, selectMenu.placeholder);
    
    return menuComponents.createActionRow(menu);
};
