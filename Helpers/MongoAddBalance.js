const Users = require('../models/Users');
const FindUser = require('./MongoFindUser');
const DatabaseInfo = require('../MongoInfo');

exports.addBalance = async function (id, amount) {
    try {
        await DatabaseInfo.mongoClient.connect();
        const db = DatabaseInfo.mongoClient.db(DatabaseInfo.dbName);

        const col = db.collection("UserBalance");
        
        await col.updateOne({ user_id: id },
            { $set: { balance: amount } });
        console.log(`[AddBalance]: Added ${amount} gold to ${id}'s balance`);
    }
    catch (err) {
        console.log(err.stack);
    }
}
//addBalance().catch(console.dir);