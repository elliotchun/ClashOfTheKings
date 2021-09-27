const { SlashCommandBuilder } = require('@discordjs/builders');
const Users = require('../models/Users');
const Shop = require('../Shop');
const Helpers = require('../Helpers/JSHelpers');
const AddItem = require('../Helpers/MongoAddItem');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('Purchase an item from the shop')
        .addStringOption(option => option.setName('string').setDescription('The item to purchase').setRequired(true)),
    
    async execute(interaction) {
        const userid = interaction.user.id;
        const itemid = interaction.options.getString('string');
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
    },
};
