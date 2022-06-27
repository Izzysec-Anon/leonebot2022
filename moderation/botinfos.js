module.exports = {
  name: 'bot',
  description: 'bot info',
  async execute(interaction, client) {
    const embed = new client.discord.MessageEmbed()
      .setColor('ff9600')
      .setAuthor('informazioni del bot', client.user.avatarURL())
      .setDescription('informazioni del bot.\n\nBot Developer !Leone#7063')
      .setFooter(client.config.footerText, client.user.avatarURL())
      .setTimestamp();

    await interaction.reply({
      embeds: [embed]
    });
  },
};