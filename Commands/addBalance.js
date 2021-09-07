const { SlashCommandBuilder } = require('@discordjs/builders');
const Users = require('../models/Users');
const AddBalance = require('../Helpers/MongoAddBalance');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addbalance')
        .setDescription('Adds gold to the balance of the selected user.')
        .addUserOption(option => option.setName('target').setDescription('The user to give gold to').setRequired(true))
        .addIntegerOption(option => option.setName('int').setDescription('The amount of gold to give').setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== '327496208920608788') {
            return interaction.reply({
                content: 'Insufficient permissions',
                ephemeral: true,
            });
        }
        const user = interaction.options.getUser('target');
        const amount = interaction.options.getInteger('int');
        const newAmount = await AddBalance.addBalance(user.id, amount);
        console.log(`[AddBalance]: Added ${amount} gold to ${user}'s balance`);
        return interaction.reply({
            content: `Added ${amount} to ${user}\'s balance.\nThey now have ${newAmount} gold`,
            ephemeral: true,
        });
    },
};
