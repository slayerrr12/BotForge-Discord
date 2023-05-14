const { Client, GatewayIntentBits, Partials, Collection, ActivityType } = require('discord.js')



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

console.log(client)
let warning_channel_id = "1107217775509909514";



client.login("MTEwNTkwMTA1NTA3MTQ5MDE2MQ.G_2IlL.yu0PSr39rP2czRpLsTzNu7oNZMJEYLXhQsQ2pU")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

});

function Reactoit(msg) {
  const author = msg.author;
  const mentionString = author.toString();
  const channel = client.channels.cache.get(warning_channel_id);
  console.log(msg.content)
  if (msg.content.includes("nigga")) {
    msg.delete()
    channel.send(`<${mentionString}> Please do not use bad language !`);


  }
  
}


client.on('messageCreate', Reactoit)


