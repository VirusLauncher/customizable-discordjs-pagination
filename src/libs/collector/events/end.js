const handleComponents = (components, action) => {
	if (action === 'disappear') return [];
	
	if (action === 'disable') {
		return components.map(row => {
			row.components.forEach(component => component.setDisabled(true));
			return row;
		});
	}
	
	return components;
};

module.exports = {
	name: 'end',
	async execute({ message, msg, components, paginationCollector }) {
		const updatedComponents = handleComponents(
			components, 
			paginationCollector.components
		);
		
		const options = { components: updatedComponents };
		await (message.author ? msg.edit(options) : message.editReply(options));
	},
};
