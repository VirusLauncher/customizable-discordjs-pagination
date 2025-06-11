const buttonsFn = require('./buttons');
const selectMenuFn = require('./selectMenu');

module.exports = ({ buttons: buttonData, selectMenu: selectMenuData, customComponents = [] } = {}, pages) => {
    const components = [];
    
    const selectMenu = selectMenuData?.enable && selectMenuFn(pages, selectMenuData);
    if (selectMenu) components.push(selectMenu);
    
    const buttons = buttonData?.length && buttonsFn(buttonData);
    if (buttons) components.push(buttons);
    
    if (customComponents.length > 0) components.push(...customComponents);
    
    if (components.length > 5) throw new Error('Maximum of 5 components allowed.');
    
    return components;
}
