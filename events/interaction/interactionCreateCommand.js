module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        const command = client.commands.get(interaction.commandName);
        if (!command) return;
    
    
    
    
    
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: 'Si è verificato un errore durante una esecuzione di questo comando!',
                ephemeral: true
            });
        };


    },
};