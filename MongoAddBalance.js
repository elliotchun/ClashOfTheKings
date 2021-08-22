const { MongoClient } = require("mongodb");
const Users = require('./models/Users');
const FindUser = require('./MongoFindUser');

const url = "mongodb+srv://dbUser:B2tmKqGEe8EWTvw@cluster0.h2pkw.mongodb.net/dbUser?retryWrites=true&w=majority";

const client = new MongoClient(url);

const dbName = "CotK";


exports.addBalance = async function (id, amount) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // set collection to users
        const col = db.collection("UserBalance");
        
        const User = FindUser.findUser(id);
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
    finally {
        await client.close();
    }
}
//addBalance().catch(console.dir);