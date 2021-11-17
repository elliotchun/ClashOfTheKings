const Users = require('../models/Users');
const FindUser = require('./MongoFindUser');
const DatabaseInfo = require('../MongoInfo');

exports.addBalance = async function (id, amount) {
    try {
        //await DatabaseInfo.mongoClient.connect();
        const db = await DatabaseInfo.mongoClient.db(DatabaseInfo.dbName);

        const col = db.collection('UserInventory');
        const dbUser = await FindUser.findUser(id);
        await col.updateOne({ user_id: id },
            { $inc: { balance: amount } });
        let newbal = await dbUser.balance;
        return newbal;
    }
    catch (err) {
        console.log(err.stack);
    }
}
