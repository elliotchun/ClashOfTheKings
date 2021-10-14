const fs = require('fs');
const SubtractBalance = require('./Helpers/MongoSubtractBalance');
const { MessageEmbed } = require('discord.js');

let weapons = [];
let artifacts = [];
let utilities = [];
let shopItems = [];

CreateEmbed = function () {
    const shopEmbed = new MessageEmbed().setColor('#0099ff')
        .setTitle('Clash of the Kings - Shop')
        .setTimestamp()
        .addFields(
            { name: `${shopItems[0]?.name}`, value: `${shopItems[0]?.description}`, inline: true },
            { name: `${shopItems[1]?.name}`, value: `${shopItems[1]?.description}`, inline: true },
            { name: `${shopItems[2]?.name}`, value: `${shopItems[2]?.description}`, inline: true },
            { name: '\u200B', value: '\u200B' }, // newline
    );
    return shopEmbed;
}

SetupShop = function (...args) {
    for (let i = 0; i < args.length; args++) {
        const set = args[i];
        const weaponItems = fs.readdirSync(`./Items/${set}/Weapons`).filter(file => file.endsWith('.js'));
        const artifactItems = fs.readdirSync(`./Items/${set}/Artifacts`).filter(file => file.endsWith('.js'));
        const utilityItems = fs.readdirSync(`./Items/${set}/Utilities`).filter(file => file.endsWith('.js'));
        for (const file of weaponItems) {
            const weapon = require(`./Items/${set}/Weapons/${file}`);
            if (weapon.rarity === 'Common') {
                weapons.push(weapon);
            }
        }
        for (const file of artifactItems) {
            const artifact = require(`./Items/${set}/Artifacts/${file}`);
            if (artifact.rarity === 'Common') {
                artifacts.push(artifact);
            }
        }
        for (const file of utilityItems) {
            const utility = require(`./Items/${set}/Utilities/${file}`);
            if (utility.rarity === 'Common') {
                utilities.push(utility);
            }
        }
    }
}

ResetShop = function (client, channel) {
    let wIndex = Math.floor(Math.random() * weapons.length);
    let aIndex = Math.floor(Math.random() * artifacts.length);
    let uIndex = Math.floor(Math.random() * utilities.length);
    shopItems = [];
    shopItems.push(weapons[wIndex], artifacts[aIndex], utilities[uIndex]);
    
    const shopChannel = client.channels.cache.get(channel);
    let shopString = `New items are in the shop:\n${shopItems[0].name}, ${shopItems[1].name}, ${shopItems[2].name}`;

    shopChannel.send(shopString);
}

BuyShop = async function (id, num) {
    try {
        const cost = getCostFromRarity(shopItems[num].rarity);
        const newAmount = await SubtractBalance.subtractBalance(id, cost);
        if (newAmount && newAmount < 0) { // too expensive
            console.log(`[Shop]: Tried to remove ${amount} gold from ${id}'s balance; not enough funds`);
            return false;
        }
        else { // enough balance
            console.log(`[Shop]: Removed ${amount} gold from ${id}'s balance; they now have ${newAmount}`);
            return shopItems[num];
        }
    }
    catch (err) {
        console.log(err);
    }
}

getWeapon = function () {
    return weapons;
}
getWeapon = function (index) {
    return weapons[index];
}

getUtility = function () {
    return utilities;
}
getUtility = function (index) {
    return utilities[index];
}

getArtifact = function () {
    return artifacts;
}
getArtifact = function (index) {
    return artifacts[index];
}

getShopItem = function () {
    return shopItems;
}
getShopItem = function (index) {
    return shopItems[index];
}

function getCostFromRarity(rarity) {
    switch (rarity) {
        case 'Legendary':
            return 100;
        case 'Rare':
            return 30;
        case 'Common':
        default:
            return 10;
    }
}

module.exports = {
    CreateEmbed,
    SetupShop,
    ResetShop,
    BuyShop,
    getWeapon,
    getUtility,
    getArtifact,
    getShopItem,
}