const Users = require('../models/Users');
const FindUser = require('./MongoFindUser');
const { db } = require('../index');

exports.addBalance = async function (id, amount) {
    try {
        // set collection to users
        const col = db.collection("UserBalance");
        
        const p = await col.updateOne({ user_id: id },
            { $set: { balance: amount } });
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);

    }
    catch (err) {
        console.log(err.stack);
    }
}
//addBalance().catch(console.dir);