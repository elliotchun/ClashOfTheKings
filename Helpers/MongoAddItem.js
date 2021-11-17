const UserItems = require('../models/UserItems');
const FindUser = require('./MongoFindUser');
const DatabaseInfo = require('../MongoInfo');

exports.addItem = async function (id, item, amount = 1) {
    try {
        await DatabaseInfo.mongoClient.connect();
        const db = DatabaseInfo.mongoClient.db(DatabaseInfo.dbName);
        const col = db.collection('UserInventory');
        //const col = db.collection('UserInventory');
        //const dbUser = await FindUser.findUser(id, 'UserItems');
        for (let i = 0; i < amount; i++) {
            col.updateOne({ id: id }, { $push: { items: item } });
        }
    }
    catch (err) {
        console.log(err.stack);
    }
    finally {
        await DatabaseInfo.mongoClient.close();
    }
}