// prefix 
const prefix = "./"



// ———————————————[Module-exports Bot]———————————————
const fs = require('fs');
const {
  Client,
  Collection,
  Intents
} = require('discord.js');
const config = require('./config.json');
const {
  REST
} = require('@discordjs/rest');
const {
  Routes
} = require('discord-api-types/v9');
const {
  clientId
} = require('./config.json');

const t = require('./token.json');

const slashcommands = [];
const slashcommandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of slashcommandFiles) {
  const command = require(`./commands/${file}`);
  slashcommands.push(command.data.toJSON());
}

client.login(process.env.TOKEN)

const rest = new REST({
   version: '9'
}).setToken(t.token);

rest.put(Routes.applicationCommands(clientId), {
    body: slashcommands
  })
  .then(() => console.log('🤖 || Grazie per avermi risvegliato! || !Leone#7063.'))
  .catch(console.error);

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});

const Discord = require('discord.js');
client.discord = Discord;
client.config = config;

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
};

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
};

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;


  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  
  
  
  
  
  try {
    await command.execute(interaction, client, config);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: 'Si è verificato un errore durante una esecuzione di questo comando!',
      ephemeral: true
    });
  };
});

client.login(require('./token.json').token);



// ———————————————[Login Bot = token.json]———————————————

client.on("ready", () => {
  console.log("🟢 | BOT ONLINE! ");
  console.log("🔴 | NON TROVO IL DATABASE ");
  console.log("🟢 | NON TROVO IL COMANDO HELP ");
  console.log("🔴 | NON TROVO IL SISTEMA DI KICK E BAN ");
  console.log("🔴 | NON TROVO IL SISTEMA DI FILTRO LINGUAGGIO ");
  console.log("🟢 | NON TROVO IL LINK DEL BOT ");
  console.log("🟢 | NON TROVO IL SISTEMA TIKCET ");
  console.log("🟢 | NON TROVO UN MODULE-EXPORTS ");
  console.log("🟢 | NON TROVO UN COPYRIGHT DI UN CREATORE DEL BOT ");
  console.log("🟢 | NON TROVO UN SERVER");
  console.log("🔴 | NON TROVO IL SISTEMA CLEAR");
  console.log("🟢 | TOKEN CONESSO || BOT ---> !LeoneBOT#7773");
  console.log('🔐 | TOKEN DECRIPTATO || Conttata !Leone#7063 per visualizzare il Token')

// ———————————————[Opzioni Bot]———————————————
      client.user.setActivity ('./help ', { type: 'WATCHING' });
      client.user.setStatus('online');
});







// ———————————————[STAFF Bot]———————————————
client.on("messageCreate", message => {
  if (message.content == "./help") {
      const help = new Discord.MessageEmbed()
      .setTitle("Help") 
      .setColor("#08e3c4") 
      .setAuthor("!Leone", "https://png.pngtree.com/png-vector/20191030/ourlarge/pngtree-lion-head-logo-png-image_1919936.jpg") 
      .setFooter("Copyright: !Leone#7063, Creator: !LeoneBOT#7773")
      .addField("./help", "mostra i comandi del bot", false)
      .addField("./clear ", " elimina i messaggi", false)
      .addField ("./invita", "invita questo bot nel tuo server", false)
      .setTimestamp() 
  message.channel.send({embeds: [help]})
}
});





// ———————————————[comandi Bot]———————————————

client.on('messageCreate', message => {
  if (message.content == './invita') {
      const invita = new Discord.MessageEmbed()
      .setTitle("COMANDO ESEGUITO ./INVITA")
      .setColor("#ffff") 
      .setAuthor("!Leone", "https://png.pngtree.com/png-vector/20191030/ourlarge/pngtree-lion-head-logo-png-image_1919936.jpg") 
      .setDescription('Hai digitato il comando ./invita, troverai solo i link dei creatori del bot e del server per trovare altri server e siti sponsor digita il comando ./sponsor') 
      .setFooter("Copyright: !Leone#7063")
      .addField("LINK BOT: ", "https://discord.com/oauth2/authorize?client_id=965373612280389632&scope=bot&permissions=8", false)
      .addField('LINK DISCORD: ', 'https://discord.gg/MVpFU3xZzU', false )
      message.channel.send({embeds: [invita]})
} 
}); 






// ———————————————[YouTube Bot]———————————————

const ytch = require("yt-channel-info") //npm i yt-channel-info

setInterval(() => {
    ytch.getChannelVideos("UC6eaw4UMokfH1mOdKPQgGNA", "newest").then(async response => {
        var idVideo = response.items[0]?.videoId
        if (!idVideo) return

        client.channels.cache.get("945277827719237703").messages.fetch()
            .then(messages => {
                var giaMandato = false;
                messages.forEach(msg => {
                    if (msg.content.includes(idVideo)) giaMandato = true;
                });

                if (!giaMandato) {
                    client.channels.cache.get("945277827719237703").send(`-- NUOVO VIDEO --
Ciao, è appena uscito un video su **${response.items[0].author}**
Andate a vedere "${response.items[0].title}"
https://www.youtu.be/${idVideo}`) 
                }
            })
    })
}, 1000 * 30)


setInterval(() => {
    ytch.getChannelVideos("UC6eaw4UMokfH1mOdKPQgGNA", "newest").then(async response => {
        var idVideo = response.items[0]?.videoId
        if (!idVideo) return

        client.channels.cache.get("990908253825290260").messages.fetch()
            .then(messages => {
                var giaMandato = false;
                messages.forEach(msg => {
                    if (msg.embeds[0]?.url?.endsWith(idVideo)) giaMandato = true;
                });

                if (!giaMandato) {
                    var embed = new Discord.MessageEmbed()
                        .setTitle("Nuovo video")
                        .setURL(`https://youtu.be/${idVideo}`) 
                        .setThumbnail(response.items[0].videoThumbnails[3].url)
                        .setDescription(`Ciao, è appena uscito un video su **${response.items[0].author}**
Andate a vedere "${response.items[0].title}\"
[Ecco il video](https://youtu.be/${idVideo})`)

                    client.channels.cache.get('990908253825290260').send({ embeds: [embed] });
                }
            })
    })
}, 1000 * 30)





// ———————————————[Staff Bot]———————————————
//sottosistema di parole vietate ⛔
client.on("messageCreate", message => {
  if (message.channel.type == "DM") return

  if (message.member.roles.cache.has("945277769615564800") || message.member.roles.cache.has("947606973069803541")) return

  var parolacce = ["negro", "lesbians", "lesblica", "lesbo", "lesblico", "nigga", "frocio", "gay", "finocchio", "trans", "bisex"]
  var trovata = false;
  var testo = message.content;

  parolacce.forEach(parola => {
      if (message.content.toLowerCase().includes(parola.toLowerCase())) {
          trovata = true;
          testo = testo.replace(eval(`/${parola}/g`), "###");
      }
  })

  if (trovata) {
      message.delete();
      var embed = new Discord.MessageEmbed()
          .setTitle("Hai detto una parolaccia")
          .setDescription("Hai scritto un messaggio con parole bloccate\rIl tuo messaggio: " + testo)

      message.channel.send({ embeds: [embed] })
  }
}); 

