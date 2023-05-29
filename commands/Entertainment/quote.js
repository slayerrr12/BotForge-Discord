const { SlashCommandBuilder } = require('discord.js');
const { generateQoute } = require('../../3rd Party APIS/open-ai-api'); // Update the import statement

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote') // Provide a valid command name in lowercase with hyphens or underscores
		.setDescription('a random quote from a random person')
	,
	async execute(interaction) {
		const answer = await generateQoute(); // Update the function call
		await interaction.reply(answer);
	},
};


