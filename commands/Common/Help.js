const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get a list of commands"),

  async execute(interaction) {
    const commands = interaction.client.commands;

    const commandList = commands
      .map((command, index) => {
        const name = command.data.name;
        const description = command.data.description;
        const options =
          command.data.options?.map((option) => option.name).join(", ") ||
          "None";

        return `**/${name}** - ${description}\nOptions: ${options}\n`;
      })
      .join("\n");

    const helpMessage = `\n\n${commandList}`;

    const embed = {
      color: 0x00ff00,
      title: "Echo Command Guide",
      description: helpMessage,
    };

    await interaction.reply({ embeds: [embed] });
  },
};
