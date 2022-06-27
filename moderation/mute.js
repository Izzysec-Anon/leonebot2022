module.exports = {
  name: 'mute',
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

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
      content: 'non hai il permesso per usare questo comando! (`MUTE_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'non puoi disattivare audio di questo membro',
      ephemeral: true
    });

    if (!user.bannable) return interaction.reply({
      content: 'non riesco a disattivare audio di questo membro.',
      ephemeral: true
    });

    if (interaction.options.getString('raison')) {
      user.mute({
        reason: interaction.options.getString('raison'),
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** è stato disattivato!`
      });
    } else {
      user.mute({
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** è stato disattivato!`
      });
    };
  },
};