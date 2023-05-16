const { Client, GatewayIntentBits, Partials, Collection, ActivityType } = require('discord.js')
require("dotenv").config()


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


let warning_channel_id = "1107217775509909514";



client.login(process.env.tut_bot_token)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

});

function Reactoit(msg) {
  console.log(`the message content : ${msg.content}`)
  
  const author = msg.author;

  const mentionString = author.toString();
  console.log(`author of the message : ${author}`)
  const channel = client.channels.cache.get(warning_channel_id);
  
  if (msg.content.toUpperCase().includes("NIGGA")) {
    msg.delete()
    channel.send(`<${mentionString}> Please do not use bad language !`);
  

  }
  if (msg.mentions.has(client.user)) {
    // Reply to the ping
    msg.reply("????")
  }
  
}


client.on('messageCreate', Reactoit)



