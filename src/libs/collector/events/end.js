const handleComponents = (components, action) => {
	if (!components || !Array.isArray(components)) return [];
	
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
		try {
			const updatedComponents = handleComponents(
				components, 
				paginationCollector.components
			);
			
			const options = { components: updatedComponents };
			
			if (message.author) {
				if (!msg.deleted) await msg.edit(options);
			} else {
				try {
					await message.editReply(options);
				} catch (error) {
					if (error.code !== 10062) throw error;
				}
			}
		} catch (error) {
			console.error('Error in pagination end event:', error);
		}
	},
};
