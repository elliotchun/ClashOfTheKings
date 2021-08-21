const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here
const clientId = '877415906488250387';
const guildId = '867750591689392158';

for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token.token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();