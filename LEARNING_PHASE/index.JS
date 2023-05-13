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


client.login("MTEwNTkwMTA1NTA3MTQ5MDE2MQ.G_2IlL.yu0PSr39rP2czRpLsTzNu7oNZMJEYLXhQsQ2pU")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
  });

function Reactoit(msg){
    console.log(msg.content)

}


client.on('messageCreate',Reactoit)


