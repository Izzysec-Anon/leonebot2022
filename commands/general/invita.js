module.exports = {
    name: "invita",
    data: {
        name: "invita",
        description: "comando invita",
    },
    execute(interaction) {

        const invita = new Discord.MessageEmbed()
            .setTitle("COMANDO ESEGUITO /INVITA")
            .setColor("#ffff")
            .setAuthor("!Leone", "https://png.pngtree.com/png-vector/20191030/ourlarge/pngtree-lion-head-logo-png-image_1919936.jpg")
            .setDescription('Hai digitato il comando ./invita, troverai solo i link dei creatori del bot e del server per trovare altri server e siti sponsor digita il comando /sponsor')
            .setFooter("Copyright: !Leone#7063")
            .addField("LINK BOT: ", "https://discord.com/oauth2/authorize?client_id=965373612280389632&scope=bot&permissions=8", false)
            .addField('LINK DISCORD: ', 'https://discord.gg/MVpFU3xZzU', false)
            interaction.reply({ embeds: [invita] })
    }
}