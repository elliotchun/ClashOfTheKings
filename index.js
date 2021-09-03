const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token, shopChannel } = require('./config.json');
const Shop = require('./Shop');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    Shop.SetupShop('Base');
    
    setInterval(function () {
        let currentTime = new Date();
        if (currentTime.getMinutes() % 1 === 0) {
            console.log('Shop Reset!');
            Shop.ResetShop(client, shopChannel);
        }
    }, 60000);

    console.log('Bot online and ready!');
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    if (!client.commands.has(commandName)) return;
    try {
        await client.commands.get(commandName).execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(token);
