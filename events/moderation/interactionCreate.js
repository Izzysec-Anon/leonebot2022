let hastebin = require('hastebin');
const { MessageEmbed,MessageActionRow,MessageButton,MessageSelectMenu } = require('discord.js');
module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isButton()) return;
    if (interaction.customId == "open-ticket") {
      if (interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)) {
        return interaction.reply({
          content: 'hai già un Ticket creato!',
          ephemeral: true
        });
      };

      interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
        parent: client.config.parentOpened,
        topic: interaction.user.id,
        permissionOverwrites: [{
            id: interaction.user.id,
            allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
            deny: ['SEND_MESSAGES'],
          },
          {
            id: client.config.roleSupport,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
        ],
        type: 'text',
      }).then(async c => {
        interaction.reply({
          content: `Il Ticket è stato creato! <#${c.id}>`,
          ephemeral: true
        });

        const embed = new MessageEmbed()
          .setColor('ff9600')
          .setAuthor('Motivo', ' ')
          .setDescription('scegli un motivo per cui apri un ticket')
          .setFooter('Sistema di ticket', ' ')
          .setTimestamp();

        const row = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
            .setCustomId('category')
            .setPlaceholder('scegli un motivo per cui apri un ticket')
            .addOptions([{
                label: 'Acquistare',
                value: 'Acquistare',
                emoji: { name: '💵' }
              },
              {
                label: 'Assistenza',
                value: 'Assistenza',
                emoji: { name: '❓' }
              },
              {
                label: 'Reportare',
                value: 'Reportare',
                emoji: { name: '😡' }
              },
              {
                label: 'Rimborsi',
                value: 'Rimborsi',
                emoji: { name: '💵' }
              },
              {
                label: 'Developer',
                value: 'Developer',
                emoji: { name: '🤖' }
              },
            ]),
          );

        msg = await c.send({
          content: `<@!${interaction.user.id}>`,
          embeds: [embed],
          components: [row]
        });

        const collector = msg.createMessageComponentCollector({
          componentType: 'SELECT_MENU',
          time: 20000
        });

        collector.on('collect', i => {
          if (i.user.id === interaction.user.id) {
            if (msg.deletable) {
              let channels = interaction.guild.channels.cache.find(x=> x.name == `ticket-${interaction.user.username}`)
              channels.permissionOverwrites.edit(interaction.member, { SEND_MESSAGES: true })
              msg.delete().then(async () => {
                const embed = new MessageEmbed()
                  .setColor('ff9600')
                  .setAuthor('Ticket', ' ')
                  .setDescription(`<@!${interaction.user.id}> ha creato un **Ticket** con il motivo・ ${i.values[0]}`)
                  .setFooter('Sistema Ticket ', ' ')
                  .setTimestamp();

                const row = new MessageActionRow()
                  .addComponents(
                    new MessageButton()
                    .setCustomId('close-ticket')
                    .setLabel('chiudi ticket')
                    .setEmoji('899745362137477181')
                    .setStyle('DANGER'),
                  );

                const opened = await c.send({
                  content: `<@&${client.config.roleSupport}>`,
                  embeds: [embed],
                  components: [row]
                });

                opened.pin().then(() => {
                  opened.channel.bulkDelete(1);
                });
              });
            };
            if (i.values[0] == 'Acquistare') {
              c.edit({
                parent: client.config.parentApply
              });
            };
            if (i.values[0] == 'Assistenza') {
              c.edit({
                parent: client.config.parentSupport
              });
            };
            if (i.values[0] == 'Reportare') {
              c.edit({
                parent: client.config.parentComplaint
              });
            };
            if (i.values[0] == 'Rimborsi') {
              c.edit({
                parent: client.config.parentHosting
              });
            };
            if (i.values[0] == 'Developer') {
              c.edit({
                parent: client.config.parentPartnership
              });
            };
          };
        });

        collector.on('end', collected => {
          if (collected.size < 1) {
            c.send(`Non c'era motivo, il ticket sarà chiuso.`).then(() => {
              setTimeout(() => {
                if (c.deletable) {
                  c.delete();
                };
              }, 5000);
            });
          };
        });
      });
    };

    if (interaction.customId == "close-ticket") {
      const guild = client.guilds.cache.get(interaction.guildId);
      const chan = guild.channels.cache.get(interaction.channelId);

      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('confirm-close')
          .setLabel('chiudere il Ticket')
          .setStyle('DANGER'),
          new MessageButton()
          .setCustomId('no')
          .setLabel('annulla')
          .setStyle('SECONDARY'),
        );

      const verif = await interaction.reply({
        content: 'Sei sicuro di voler chiudere il ticket?',
        components: [row]
      });

      const collector = interaction.channel.createMessageComponentCollector({
        componentType: 'BUTTON',
        time: 10000
      });

      collector.on('collect', i => {
        if (i.customId == 'confirm-close') {
          interaction.editReply({
            content: `Il ticket è stato chiuso da <@!${interaction.user.id}>`,
            components: []
          });

          chan.edit({
              name: `closed-${chan.name}`,
              permissionOverwrites: [
                {
                  id: client.users.cache.get(chan.topic),
                  deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: client.config.roleSupport,
                  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ['VIEW_CHANNEL'],
                },
              ],
            })
            .then(async () => {
              const embed = new MessageEmbed()
                .setColor('ff9600')
                .setAuthor('Ticket', ' ')
                .setDescription('```Ticket salvato```')
                .setFooter('Sistema Ticket ', ' ')
                .setTimestamp();

              const row = new MessageActionRow()
                .addComponents(
                  new MessageButton()
                  .setCustomId('delete-ticket')
                  .setLabel('Ticket eliminato')
                  .setEmoji('🗑️')
                  .setStyle('DANGER'),
                );

              chan.send({
                embeds: [embed],
                components: [row]
              });
            });

          collector.stop();
        };
        if (i.customId == 'no') {
          interaction.editReply({
            content: 'Chiudi il ticket annullato!',
            components: []
          });
          collector.stop();
        };
      });

      collector.on('end', (i) => {
        if (i.size < 1) {
          interaction.editReply({
            content: 'Chiusura del ticket annullata!',
            components: []
          });
        };
      });
    };

    if (interaction.customId == "delete-ticket") {
      const guild = client.guilds.cache.get(interaction.guildId);
      const chan = guild.channels.cache.get(interaction.channelId);

      interaction.reply({
        content: 'salvataggio del ticket...'
      });

      chan.messages.fetch().then(async (messages) => {
        let a = messages.filter(m => m.author.bot !== true).map(m =>
          `${new Date(m.createdTimestamp).toLocaleString('de-DE')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
        ).reverse().join('\n');
        if (a.length < 1) a = "Non era scritto nel ticket"
        hastebin.createPaste(a, {
            contentType: 'text/plain',
            server: 'https://hastebin.com'
          }, {})
          .then(function (urlToPaste) {
            const embed = new MessageEmbed()
              .setAuthor('Logs Ticket', ' ')
              .setDescription(`📰 Ticket-Logs \`${chan.id}\` creato da <@!${chan.topic}> ed eliminato da <@!${interaction.user.id}>\n\nLogs: [**Clicca qui per vedere i logs**] (${urlToPaste})`)
              .setColor('2f3136')
              .setTimestamp();

            const embed2 = new MessageEmbed()
              .setAuthor('Ticket Logs', ' ')
              .setDescription(`📰 Logs del tuo ticket \`${chan.id}\`: [**Clicca qui per vedere i logs**](${urlToPaste})`)
              .setColor('2f3136')
              .setTimestamp();

            client.channels.cache.get(client.config.logsTicket).send({
              embeds: [embed]
            });
            client.users.cache.get(chan.topic).send({
              embeds: [embed2]
            }).catch(() => {console.log('Non posso inviarlo in DM')});
            chan.send('Elimina canale.');

            setTimeout(() => {
              chan.delete();
            }, 5000);
          });
      });
    };
  },
};
