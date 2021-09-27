const { SlashCommandBuilder } = require('@discordjs/builders');
const FindUser = require('../Helpers/MongoFindUser');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Get the gold balance of the selected user.')
        .addUserOption(option => option.setName('target').setDescription('The user\'s balance to return')),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const dbUser = await FindUser.findUser(interaction.user.id);
        let balance = await dbUser.balance;
        if (user) {
            const targettedUser = await FindUser.findUser(user.id);
            balance = targettedUser.balance;
            return interaction.reply(`${user.username}'s balance: ${balance}`)
        }
        return interaction.reply(`Your balance: ${balance} gold`);
    },
};
