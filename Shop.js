const weapons = [];
const artifacts = [];
const utilities = [];
var shopItems = [];

exports.DoShop = function () {
    setInterval(function () {
        let currentTime = new Date();
        if (currentTime.getMinutes() % 60 === 0) {
            console.log('Shop Reset!');
            ResetShop();
        }
        console.log('tick');
    }, 60000);
}

ResetShop = function () {
    let wIndex = Math.random(weapons.length);
    let aIndex = Math.random(artifacts.length);
    let uIndex = Math.random(utilities.length);
    shopItems.push(weapons[wIndex], weapons[aIndex, weapons[uIndex]]);
    shopItems.splice[0, 3];
}