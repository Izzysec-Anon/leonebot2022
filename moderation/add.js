module.exports = {
  name: 'clear',
  description: 'elimina i messaggi',
  permission: 'MANAGE_MESSAGES',
  options: [
      {
          name: 'amount',
          description: 'Seleziona la quantita dei messaggi da eliminare del canale',
          type: 'NUMBER',
          required: true
      },
      {
          name: 'target',
          description: 'Seleziona i messaggi da eliminare',
          type: 'USER',
          required: false
      }
  ],
  async execute(interaction, client) {
    const chan = client.channels.cache.get(interaction.channelId);
    const user = interaction.options.getUser('target');

    if (chan.name.includes('ticket')) {
      chan.edit({
        permissionOverwrites: [{
          id: user,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
          {
            id: client.config.roleSupport,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
      ],
      }).then(async () => {
        interaction.reply({
          content: `<@${user.id}> è stato aggiunto!`
        });
      });
    } else {
      interaction.reply({
        content: 'non hai il biglietto!',
        ephemeral: true
      });
    };
  },
};
