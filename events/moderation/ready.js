const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'ready',
    async execute(client) {



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