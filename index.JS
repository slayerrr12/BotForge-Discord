//importing neccesary libraries
const { Client, GatewayIntentBits, Partials, Collection, ActivityType, Constants } = require('discord.js')
const path = require("path")
const fs = require("fs")
require("dotenv").config()


const { interaction } = Constants;


console.log(process.env.TUT_BOT_TOKEN)
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
})

//loading all the commands in the client.commands collection 
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}



//this is the id of the warning channel in my personal guild
let warning_channel_id = "1107217775509909514";



client.login(process.env.tut_bot_token)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

});
//message event handler function
function Reactoit(msg) {
  console.log(`the message content : ${msg.content}`)

  const author = msg.author;

  const mentionString = author.toString();
  console.log(`author of the message : ${author}`)
  const channel = client.channels.cache.get(warning_channel_id);
  // if the message content contains nigga then the message is deleted and the user is 
  //warned in the warning channel about thier offence
  if (msg.content.toUpperCase().includes("NIGGA")) {
    msg.delete()
    channel.send(`<${mentionString}> please dont use rascist language !`);


  }
  if (msg.mentions.has(client.user)) {
    // Reply to the ping
    msg.reply("?")
  }
  

}

//message event handler
client.on('messageCreate', Reactoit)

// slash command handler
client.on('interactionCreate', async (interaction) => {
  try {
    // If the interaction is not a chat input (slash command), return
    if (!interaction.isCommand()) return;

    // Get the command object from the commands collection
    const command = client.commands.get(interaction.commandName);

    // If the command is not found, log an error and return
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    // Execute the command's logic
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    try {
      // If the interaction is already replied to or deferred, follow up with an error message
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        // If the interaction hasn't been replied to or deferred yet, reply with an error message
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    } catch (followUpError) {
      console.error('Failed to send an error message:', followUpError);
    }
  }
});




