const fs = require('fs');

let weapons = [];
let artifacts = [];
let utilities = [];
let shopItems = [];

exports.DoShop = function (...args) {

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
        console.log(weapons);
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
    setInterval(function () {
        let currentTime = new Date();
        if (currentTime.getMinutes() % 1 === 0) {
            console.log('Shop Reset!');
            ResetShop();
        }
    }, 60000);
}

ResetShop = function () {
    let wIndex = Math.random(weapons.length);
    let aIndex = Math.random(artifacts.length);
    let uIndex = Math.random(utilities.length);
    shopItems.push(weapons[wIndex], weapons[aIndex, weapons[uIndex]]);
    shopItems.splice[0, 3];
}