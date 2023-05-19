const { SlashCommandBuilder } = require('discord.js');
const quote = require('../../APIS/open-ai-api');





module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote') // Provide a valid command name in lowercase with hyphens or underscores
		.setDescription('a random quote from am= random person')
	,
	async execute(interaction) {
		const answer = await quote.generateQoute()
		await interaction.reply(answer)
		
	},
};


