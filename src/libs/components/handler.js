const buttonsFn = require('./buttons');
const selectMenuFn = require('./selectMenu');

module.exports = (componentsData, pages) => {
    const buttons = buttonsFn(componentsData.buttons);
    const selectMenu = selectMenuFn(pages, componentsData.selectMenu);

    let components = [];
    if (selectMenu && !buttons) components = [selectMenu];
    else if (selectMenu && buttons) components = [selectMenu, buttons];
    else if (!selectMenu && buttons) components = [buttons];

    if (componentsData.customComponents.length > 0) {
        componentsData.customComponents.forEach(customComponent => {
            components.push(customComponent);
        });
    }
    if (components.length > 5) throw new Error('There shouldn\'t have more than 5 components.')

    return components;
}
