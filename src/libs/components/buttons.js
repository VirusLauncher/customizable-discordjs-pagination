const { getComponents } = require('../versions/versionManager');

const buttonIdList = {
    2: ['prevBtn', 'nextBtn'],
    3: ['prevBtn', 'stopBtn', 'nextBtn'],
    4: ['firstBtn', 'prevBtn', 'nextBtn', 'lastBtn'],
    5: ['firstBtn', 'prevBtn', 'stopBtn', 'nextBtn', 'lastBtn']
};

module.exports = (buttons) => {
    if (!Array.isArray(buttons) || buttons.length <= 1) return null;

    const buttonIds = buttonIdList[buttons.length];
    if (!buttonIds) return null;

    const { buttons: buttonComponents } = getComponents();
    
    const buttonList = buttons.map((btn, i) => {
        if (!btn.emoji && !btn.label) throw new Error(`Emoji or Label is required. Check button array position ${i}`);
        
        return buttonComponents.createButton(
            btn.style,
            buttonIds[i],
            btn.emoji,
            btn.label
        );
    });

    return buttonComponents.createActionRow(buttonList);
};
