global.Discord = require('discord.js')
global.fs = require("fs");
const { Client, Intents } = require('discord.js');
const { MessageAttachment } = require("discord.js");
global.client = new Discord.Client({
    intents: 32767,
    partials: ['USER', 'REACTION', 'MESSAGE']
});
try {
    require("dotenv").config()
} catch {}

client.config = require("./config.json")



client.login(process.env.TOKEN)

client.commands = new Discord.Collection();
global.commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`);
    for (const file of commandsFiles) {
        if (file.endsWith(".js")) {
            const command = require(`./commands/${folder}/${file}`);
            client.commands.set(command.name, command);
        } else {
            const commandsFiles2 = fs.readdirSync(`./commands/${folder}/${file}`)
            for (const file2 of commandsFiles2) {
                const command = require(`./commands/${folder}/${file}/${file2}`);
                client.commands.set(command.name, command);
            }
        }
    }
}
//events
const eventsFolders = fs.readdirSync('./events');
for (const folder of eventsFolders) {
    const eventsFiles = fs.readdirSync(`./events/${folder}`)
    for (const file of eventsFiles) {
        if (file.endsWith(".js")) {
            const event = require(`./events/${folder}/${file}`);
            client.on(event.name, (...args) => {

                event.execute(...args)

            });
        } else {
            const eventsFiles2 = fs.readdirSync(`./events/${folder}/${file}`)
            for (const file2 of eventsFiles2) {
                const event = require(`./events/${folder}/${file}/${file2}`);
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}



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





