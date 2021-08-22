const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const Shop = require('./Shop');
const { MongoClient } = require("mongodb");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

const mongoDB = async function () {
    const url = "mongodb+srv://dbUser:B2tmKqGEe8EWTvw@cluster0.h2pkw.mongodb.net/dbUser?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(url);
    const dbName = "CotK";
    await mongoClient.connect();
    console.log("Connected to MongoDB");
    return mongoClient.db(dbName);
}
const db = mongoDB();

const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}
client.once('ready', () => {
    try {
        Shop.DoShop();
        console.log('Bot online and ready!');
    }
    catch (err) {
        console.log(err.stack);
    }
    
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

module.exports = {
    db
}