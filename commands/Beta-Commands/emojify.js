// created an emoji map for every alphabet in english language
const emojiMap = new Map([
    ['hello', '👋'],
    ['world', '🌍'],
    ['awesome', '😎'],
    ['chat', '💬'],
    // Add more word-emoji mappings as needed
  ]);
  


  function emojifying(message) {
    const words = message.split(' ');
    const emojifiedWords = words.map((word) => {
      const emoji = emojiMap.get(word.toLowerCase()) || word;
      return emoji;
    });
    const emojifiedMessage = emojifiedWords.join(' ');
    return emojifiedMessage;
  }
  




const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojify')
        .setDescription('Transforms text into a string of emojis for playful conversations')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('type the message that is to be emojified')
                .setRequired(true))
    ,
    async execute(interaction) {

        const message = interaction.options.getString('message');
        const emojified_message = emojifying(message)

        await interaction.reply(`${emojified_message}`);


    },
};






