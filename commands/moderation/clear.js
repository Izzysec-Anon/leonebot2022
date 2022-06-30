const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Elimina i messaggi specificando la quantita.',
    permissions: 'MANAGE_MESSAGES',
    option: [
        {
            name: 'amount',
            description: 'Seleziona la quantita dei messaggi da eliminare.',
            type: 'NUMBER',
            required: true
        },
        {
            name: 'target',
            description: 'Seleziona il target dei messaggi da eliminare.',
            type: 'USER',
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber('amount');
        const Target = options.getMember('target');

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')

        if(Target) {
            let i = 0;
            const filtred = [];
            (await Message).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtred, true).then(messages => {
                Response.setDescription('🧹 Eliminati ${messages.size} da ${Target}.');
                interaction.reply({embeds: [Response]});
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription('🧹 Eliminati ${messages.size} da questo canale');
                interaction.reply({embeds: [Response]});
            })
        }
    }
}