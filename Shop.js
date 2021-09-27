const fs = require('fs');
const SubtractBalance = require('./Helpers/MongoSubtractBalance');

let weapons = [];
let artifacts = [];
let utilities = [];
let shopItems = [];

exports.SetupShop = function (...args) {

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

exports.ResetShop = function (client, channel) {
    shopItems = [];
    let wIndex = Math.floor(Math.random(weapons.length - 1));
    let aIndex = Math.floor(Math.random(artifacts.length - 1));
    let uIndex = Math.floor(Math.random(utilities.length - 1));
    shopItems.push(weapons[wIndex], artifacts[aIndex], utilities[uIndex]);
    console.log(shopItems);
    
    const shopChannel = client.channels.cache.get(channel);
    let shopString = `New items are in the shop:\n${shopItems[0].name}, ${shopItems[1].name}, ${shopItems[2].name}`;

    shopChannel.send(shopString);
}

exports.BuyShop = async function (id, num) {
    const cost = getCostFromRarity(shopItems[num].rarity);
    const newAmount = await SubtractBalance.subtractBalance(id, cost, false);
    if (newAmount < 0) { // too expensive
        console.log(`[Shop]: Tried to remove ${amount} gold from ${id}'s balance; not enough funds`);
    }
    else { // enough balance
        console.log(`[Shop]: Removed ${amount} gold to ${id}'s balance`);
    }
    
    
}

function getCostFromRarity(rarity) {
    switch (rarity) {
        case 'legendary':
            return 100;
        case 'rare':
            return 30;
        case 'common':
        default:
            return 10;
    }
}