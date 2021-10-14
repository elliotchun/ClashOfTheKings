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
                .setDescription('Buy an item from the shop.')
                .addStringOption(option => option.setName('item').setDescription('The name of the item to buy (Case Sensitive).')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('gui')
                .setDescription('Display the shop GUI.')),
    async execute(interaction) {
        const userid = interaction.user.id;
        if (interaction.options.getSubcommand() === 'buy') {
            const itemid = interaction.options.getString('item');
            const itemindex = Helpers.searchStringInArray(itemid, Shop.shopItems);
            const item = Shop.BuyShop(userid, itemindex);
            if (item) {
                console.log(`[Buy]: Successful purchase of ${itemid}`);
                AddItem.addItem(userid, item);
                return interaction.reply({
                    content: `Successful purchase! You now own ${itemid}`,
                    ephemeral: true,
                });
            }
            else {
                console.log(`[Buy]: Purchase of ${itemid} unsuccessful`);
                return interaction.reply({
                    content: `Insufficient gold; purchase of ${itemid} unsuccessful.`,
                    ephemeral: true,
                });
            }
        }
        if (interaction.options.getSubcommand() === 'gui') {
            return interaction.reply({
                embeds: [ Shop.CreateEmbed() ],
                //ephemeral: true,
            });
        }
        return interaction.reply({
            content: `Current shop items:\n -${Shop.getShopItem[0]}\n -${Shop.getShopItem[1]}\n -${Shop.getShopItem[2]}`,
            //ephemeral: true,
        });
    },
};
