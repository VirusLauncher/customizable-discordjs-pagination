const buttonsFn = require('./buttons');
const selectMenuFn = require('./selectMenu');

module.exports = (buttonsData, pages, selectMenuData) => {
    const buttons = buttonsFn(buttonsData);
    const selectMenu = selectMenuFn(pages, selectMenuData);

    let components = [];
    if (selectMenu && !buttons) components = [selectMenu];
    else if (selectMenu && buttons) components = [selectMenu, buttons];
    else if (!selectMenu && buttons) components = [buttons];

    return components;
}