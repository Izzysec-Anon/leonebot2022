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


        console.log("๐ข | BOT ONLINE! ", client.guilds.size);
        // โโโโโโโโโโโโโโโ[Opzioni Bot]โโโโโโโโโโโโโโโ
        client.user.setActivity('./help ', { type: 'WATCHING' });
        client.user.setStatus('online');



        console.log('๐ข | SISTEMA PRONTO || ONLINE')
        console.log('๐ค | BOT DEVELOPER || !Leone#7063');
        const oniChan = client.channels.cache.get(client.config.ticketChannel)


        function sendTicketMSG() {
            const embed = new MessageEmbed()
                .setColor('ff0000')
                .setAuthor('Ticket', client.user.avatarURL())
                .setDescription('Benvenuto in Assistenza Ticket\n\nCi sono quattro diversi tipi di ticket. Per aprire un ticket,\nclicca basta cliccare con il tasto destro\n\nticket di supporto\nTicket di supporto Per tutto ciรฒ che riguarda il server\nโข Acquistare\nโข Assistenza\nโข DEVELOPING\nโข EDITING\nโข HACKS\n\nโข RIMBORSI\nโข Dark-Discord\nโข Supporto e domande\nโข Domande e argomenti generali\n\nAbuso รจ punito con un coraggio/ban.')
                .setFooter(client.config.footerText, client.user.avatarURL())
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('open-ticket')
                    .setLabel('Crea Ticket')
                    .setEmoji('๐ซ')
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