const { SlashCommandBuilder } = require('@discordjs/builders');
const Users = require('../models/Users');
const SubtractBalance = require('../Helpers/MongoSubtractBalance');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subtractbalance')
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
        const newBalance = await SubtractBalance.subtractBalance(user.id, amount, true);
        if (newBalance <= 0) {
            console.log(`[SubtractBalance]: ${user}'s balance was set to 0`);
        }
        else if (newBalance > 0) {
            console.log(`[SubtractBalance]: Subtracted ${amount} gold from ${user}'s balance`);
            return interaction.reply({
                content: `Removed ${amount} from ${user}\'s balance.\nThey now have ${newBalance} gold`,
                ephemeral: true,
            });
        }
    },
};
