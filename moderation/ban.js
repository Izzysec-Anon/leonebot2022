module.exports = {
  name: 'ban',
  description: 'banna un utente',
  permission: 'MANAGE_MESSAGES',
  options: [
      {
          name: 'user',
          description: 'banna un utente',
          type: 'USER',
          required: true
      },
      {
          name: 'ban',
          description: 'banna un utente',
          type: 'USER',
          required: false
      }
  ],
  async execute(interaction, client) {
    const user = interaction.options.getMember('target');
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
      content: 'non hai il permesso per questo comando! (`BAN_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'Non puoi bannare questo membro',
      ephemeral: true
    });

    if (!user.bannable) return interaction.reply({
      content: 'Non puoi bannare questo membro.',
      ephemeral: true
    });

    if (interaction.options.getString('Motivo')) {
      user.ban({
        reason: interaction.options.getString('Motivo'),
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** Bannato!`
      });
    } else {
      user.ban({
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** Bannato!`
      });
    };
  },
};