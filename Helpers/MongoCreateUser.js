const { MongoClient } = require("mongodb");
const Users = require('../models/Users');

const url = "mongodb+srv://dbUser:B2tmKqGEe8EWTvw@cluster0.h2pkw.mongodb.net/dbUser?retryWrites=true&w=majority";

const client = new MongoClient(url);

const dbName = "CotK";


exports.createUser = async function (id) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // set collection to users
        const col = db.collection("UserBalance");

        // Construct a document                                                                                                                                                              
        let userDocument = Users;
        userDocument.user_id = id;
        userDocument.balance = 0;

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(userDocument);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);


    } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}