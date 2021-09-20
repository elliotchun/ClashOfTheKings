
exports.searchStringInArray = function (str, strArray) {
    for (var j = 0; j < strArray.length; j++) {
        if (strArray[j].find(str)) return j;
    }
    return -1;
}