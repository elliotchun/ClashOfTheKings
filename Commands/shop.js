const { SlashCommandBuilder } = require('@discordjs/builders');
const Users = require('../models/Users');
const AddBalance = require('../Helpers/MongoAddBalance');
const AddItem = require('../Helpers/MongoAddItem');
const Shop = require('../Shop');
const Helpers = require('../Helpers/JSHelpers');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Allows you to interact with the shop.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('buy')
                .setDescription('Buy an item from the shop.')
                .addStringOption(option => option.setName('item').setDescription('The type of item to purchase from the shop. (Weapon/Utility/Artifact)')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('gui')
                .setDescription('Display the shop GUI.')),
    async execute(interaction) {
        const userid = interaction.user.id;
        if (interaction.options.getSubcommand() === 'buy') {
            const itemid = interaction.options.getString('item');
            console.log(Shop.getShopItem());
            const itemindex = Helpers.searchStringInArray(itemid, Shop.shopItems);
            if (itemindex < 0) {
                return interaction.reply({
                    content: `Invalid item; purchase of ${itemid} unsuccessful`,
                    ephemeral: true,
                })
            }
            const item = Shop.BuyShop(userid, itemindex);
            if (item) {
                console.log(`[Buy]: Successful purchase of ${itemid}`);
                AddItem.addItem(userid, item);
                return interaction.reply({
                    content: `Successful purchase! You now own ${itemid}`,
                    //ephemeral: true,
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
