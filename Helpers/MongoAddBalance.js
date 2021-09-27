const Users = require('../models/Users');
const FindUser = require('./MongoFindUser');
const DatabaseInfo = require('../MongoInfo');

exports.addBalance = async function (id, amount) {
    try {
        //await DatabaseInfo.mongoClient.connect();
        const db = await DatabaseInfo.mongoClient.db(DatabaseInfo.dbName);

        const col = db.collection("UserBalance");
        const dbUser = await FindUser.findUser(id);
        const balance = dbUser.balance;
        const newAmount = amount + balance;

        await col.updateOne({ user_id: id },
            { $set: { balance: newAmount } });
        return newAmount;
    }
    catch (err) {
        console.log(err.stack);
    }
}
//addBalance().catch(console.dir);