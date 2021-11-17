
exports.searchStringInArray = function (str, strArray) {
    if (strArray) {
        for (var j = 0; j < strArray.length; j++) {
            if (strArray[j].find(str)) return j;
        }
    }
    return -1;
}

exports.itemTypeToShopID = function (itemType) {
    switch (itemType.toLowerCase()) {
        case 'weapon':
            return 1;
        case 'utility':
            return 2;
        case 'artifact':
            return 3;
    }
}