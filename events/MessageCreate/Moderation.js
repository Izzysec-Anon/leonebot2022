const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'messageCreate',
    async execute(message) {
            if (message.channel.type == "DM") {return}
        
            if (message.member.roles.cache.has("949611788192841728") || message.member.roles.cache.has("945277758395809842")) return
        
            var parolacce = ["negro", "lesbians", "lesblica", "lesbo", "lesblico", "nigga", "frocio", "gay", "finocchio", "trans", "bisex"]
            var trovata = false;
            var testo = message.content;
        
            parolacce.forEach(parola => {
                if (message.content.toLowerCase().includes(parola.toLowerCase())) {
                    trovata = true;
                    testo = testo.replace(eval(`/${parola}/g`), "###");
                }
            })

            if (trovata) {
                message.delete();
                var embed = new Discord.MessageEmbed()
                    .setTitle("Hai detto una parolaccia")
                    .setDescription("Hai scritto un messaggio con parole bloccate\rIl tuo messaggio: " + testo)
        
                message.channel.send({ embeds: [embed] })
            }
        



    }


};