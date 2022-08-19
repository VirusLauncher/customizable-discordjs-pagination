const buttonsFn = require('./buttons');
const selectMenuFn = require('./selectMenu');

module.exports = (componentsData, pages) => {
    const buttons = buttonsFn(componentsData.buttons);
    const selectMenu = selectMenuFn(pages, componentsData.selectMenu);

    const unsortedComponents = [];
    if (selectMenu) unsortedComponents.push({ position: componentsData.selectMenu.position, component: selectMenu });
    if (buttons) unsortedComponents.push({ position: componentsData.buttonsPosition, component: buttons });
    if (componentsData?.customComponents.length > 0) componentsData.customComponents.forEach(component => unsortedComponents.push({ position: component.position, component: component.component }));

    if (unsortedComponents.length > 5) throw new Error('Maximum of 5 Rows are allowed.');

    unsortedComponents.sort((a, b) => {
        if (a.position === null) return 1;
        if (b.position === null) return -1;
        if (a.position === b.position) return 0;

        return a.position < b.position ? -1 : 1;
    });

    const components = [];
    unsortedComponents.forEach(component => components.push(component.component));
    
    return components;
}