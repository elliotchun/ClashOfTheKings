const UserItems = require('../models/UserItems');
const FindUser = require('./MongoFindUser');
const DatabaseInfo = require('../MongoInfo');

exports.addItem = async function (id, item, amount = 1) {
    try {
        await DatabaseInfo.mongoClient.connect();
        const db = DatabaseInfo.mongoClient.db(DatabaseInfo.dbName);

        const col = db.collection('UserInventory');
        //const dbUser = await FindUser.findUser(id, 'UserItems');
        //const itemCount = dbUser.items;
        let aUserItem = UserItems;
        aUserItem.user_id = id;
        aUserItem.item_id = item;
        aUserItem.amount = amount;

        await col.insertOne(aUserItem);
    }
    catch (err) {
        console.log(err.stack);
    }
    finally {
        await DatabaseInfo.mongoClient.close();
    }
}