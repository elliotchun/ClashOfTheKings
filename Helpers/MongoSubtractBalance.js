const Users = require('../models/Users');
const FindUser = require('./MongoFindUser');
const DatabaseInfo = require('../MongoInfo');

exports.subtractBalance = async function (id, amount, force) {
    try {
        await DatabaseInfo.mongoClient.connect();
        const db = DatabaseInfo.mongoClient.db(DatabaseInfo.dbName);

        const col = db.collection("UserBalance");
        const dbUser = await FindUser.findUser(user.id);
        const balance = dbUser.balance;
        const newAmount = balance - amount;
        if (newAmount < 0) {
            if (!force) {
                return -1;
            }
            else if (force) {
                await col.updateOne({ user_id: id },
                    { $set: { balance: 0 } });
                return 0;
            }
        }
        else {
            await col.updateOne({ user_id: id },
                { $set: { balance: newAmount } });
            return newAmount;
        }
    }
    catch (err) {
        console.log(err.stack);
    }
    finally {
        await DatabaseInfo.mongoClient.close();
    }
}
//addBalance().catch(console.dir);