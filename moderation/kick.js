module.exports = {
  name: 'kick',
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
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({
      content: 'non hai il permesso per questo comando! (`KICK_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'non puoi kickare questo membro',
      ephemeral: true
    });

    if (!user.kickable) return interaction.reply({
      content: 'Non posso kickare questo membro.',
      ephemeral: true
    });

    if (interaction.options.getString('raison')) {
      user.kick(interaction.options.getString('raison'))
      interaction.reply({
        content: `**${user.user.tag}** è stato preso a calci!`
      });
    } else {
      user.kick()
      interaction.reply({
        content: `**${user.user.tag}** è stato preso a calci!`
      });
    };
  },
};