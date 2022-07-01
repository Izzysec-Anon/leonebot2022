const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'ready',
    async execute(client) {


        console.log(client.guilds.cache.size)
        client.guilds.cache.forEach(guild => {
            client.commands.forEach(command => {
                guild.commands.create(command.data)
            })
        })


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
    client.user.setActivity('./help ', { type: 'WATCHING' });
    client.user.setStatus('online');



        console.log('🟢 | SISTEMA PRONTO || ONLINE')
        console.log('🤖 | BOT DEVELOPER || !Leone#7063');
        const oniChan = client.channels.cache.get(client.config.ticketChannel)


        function sendTicketMSG() {
            const embed = new MessageEmbed()
                .setColor('ff0000')
                .setAuthor('Ticket', client.user.avatarURL())
                .setDescription('Benvenuto in Assistenza Ticket\n\nCi sono quattro diversi tipi di ticket. Per aprire un ticket,\nclicca basta cliccare con il tasto destro\n\nticket di supporto\nTicket di supporto Per tutto ciò che riguarda il server\n• Acquistare\n• Assistenza\n• DEVELOPING\n• EDITING\n• HACKS\n\n• RIMBORSI\n• Dark-Discord\n• Supporto e domande\n• Domande e argomenti generali\n\nAbuso è punito con un coraggio/ban.')
                .setFooter(client.config.footerText, client.user.avatarURL())
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('open-ticket')
                    .setLabel('Crea Ticket')
                    .setEmoji('🎫')
                    .setStyle('PRIMARY'),
                );

            oniChan.send({
                embeds: [embed],
                components: [row]
            })
        }

        const toDelete = 10000;

        async function fetchMore(channel, limit) {
            if (!channel) {
                throw new Error(`Kanal created ${typeof channel}.`);
            }
            if (limit <= 100) {
                return channel.messages.fetch({
                    limit
                });
            }

            let collection = [];
            let lastId = null;
            let options = {};
            let remaining = limit;

            while (remaining > 0) {
                options.limit = remaining > 100 ? 100 : remaining;
                remaining = remaining > 100 ? remaining - 100 : 0;

                if (lastId) {
                    options.before = lastId;
                }

                let messages = await channel.messages.fetch(options);

                if (!messages.last()) {
                    break;
                }

                collection = collection.concat(messages);
                lastId = messages.last().id;
            }
            collection.remaining = remaining;

            return collection;
        }

        const list = await fetchMore(oniChan, toDelete);

        let i = 1;

        list.forEach(underList => {
            underList.forEach(msg => {
                i++;
                if (i < toDelete) {
                    setTimeout(function() {
                        msg.delete()
                    }, 1000 * i)
                }
            })
        })

        setTimeout(() => {
            sendTicketMSG()
        }, i);



    }


};