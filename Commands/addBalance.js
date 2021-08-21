const { SlashCommandBuilder } = require('@discordjs/builders');
const Users = require('../models/Users');
const AddBalance = require('../MongoAddBalance');
const FindUser = require('../MongoFindUser');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addbalance')
        .setDescription('Adds gold to the balance of the selected user.')
        .addUserOption(option => option.setName('target').setDescription('The user to give gold to').setRequired(true))
        .addIntegerOption(option => option.setName('int').setDescription('The amount of gold to give').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const amount = interaction.options.getInteger('int');
        const dbUser = await FindUser.findUser(interaction.user.id);
        const balance = dbUser.balance;
        const newAmount = amount + balance;
        await AddBalance.addBalance(user.id, balance + amount);
        
        return interaction.reply(`Added ${amount} to ${user}\'s balance.\nThey now have ${newAmount} gold`);
    },
};
