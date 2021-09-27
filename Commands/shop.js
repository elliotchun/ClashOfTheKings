const { SlashCommandBuilder } = require('@discordjs/builders');
const Users = require('../models/Users');
const AddBalance = require('../Helpers/MongoAddBalance');
const Shop = require('../Shop');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Allows you to interact with the shop.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('buy')
                .setDescription('Buy an item from the shop')
                .addStringOption(option => option.setName('item').setDescription('The name of the item to buy.'))),
    async execute(interaction) {
        const user = interaction.user.id;
        if (interaction.options.getSubcommand() === 'item') {
            const shopItem = interaction.options.getInteger('item');
            
        }
        return interaction.reply({
            content: `Added ${amount} to ${user}\'s balance.\nThey now have ${newAmount} gold`,
            ephemeral: true,
        });
    },
};
