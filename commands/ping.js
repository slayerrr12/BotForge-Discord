const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them.')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to ban')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for banning'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
		async execute(interaction) {
			const target = interaction.options.getUser('target');
			const reason = interaction.options.getString('reason') ?? 'No reason provided';
	
			await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
			await interaction.guild.members.ban(target);
		},
};


