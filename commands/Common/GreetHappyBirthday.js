const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wishhappybirthday')
		.setDescription('Select a member to wish them')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to wish')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('message')
				.setDescription('set additional message to say to the person'))
		
		.setDMPermission(false),
		async execute(interaction) {
			const target = interaction.options.getUser('target');
			const message = interaction.options.getString('message') ?? 'No reason provided';
	
			await interaction.reply(` wishing you a happy birthday ${target.toString()} , ${message}`);
			
		},
};