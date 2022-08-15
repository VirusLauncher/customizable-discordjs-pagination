module.exports = {
	name: 'end',
	async execute({ message, msg, components, paginationCollector }) {
        if (paginationCollector.components === 'disappear') components = [];
        if (paginationCollector.components === 'disable') {
            for (let i = 0; i < components.length; i++) {
                components[i].components.forEach((component) => {
                    component.setDisabled(true);
                });
            }
        }
        await message.author ?
        msg.edit({ components: components }) :
        message.editReply({ components: components });
	},
};
