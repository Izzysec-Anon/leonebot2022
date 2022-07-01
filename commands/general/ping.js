module.exports = {
    name: "ping",
    data: {
        name: "ping",
        description: "ping bot"
    },
    execute(interaction) {
        var embed = new Discord.MessageEmbed()
            .addField("Pong", `\`\`\`js\n ${client.ws.ping}ms \`\`\``)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        interaction.reply({ embeds: [embed] })
    }
}