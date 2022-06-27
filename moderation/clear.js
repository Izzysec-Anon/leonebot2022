const { CommandInteraction, MessageEmbed, } = require('discord.js');
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
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction){
        const { channel, options } = interaction;

        const Amount = options.getNumber('amaount');
        const Target = options.getMember('target');

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK");

        if(Amount > 100 || Amount <= 0) {
            Response.setDescription(`Importo non può superare 100 e non può essere inferiore 1.`)
            return interaction.reply({embeds: [Response]})
     }
        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription('🧹 Eliminato ${messages.size} da ${Target}.')
                interaction.reply({embeds: [Response]});
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription('🧹 Eliminato ${messages.size} da questo canale')
                interaction.reply({embeds: [Response]});

            })
        }
 
    }
}