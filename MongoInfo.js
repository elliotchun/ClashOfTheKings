const { MongoClient } = require("mongodb");

const url = "mongodb+srv://dbUser:B2tmKqGEe8EWTvw@cluster0.h2pkw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "CotK";

const init = async function () {
    await client.connect();
    const db = await client.db(dbName);
    // set collection to users
    const col = db.collection("UserInformation");
}

module.exports = {
    url,
    mongoClient: client,
    dbName,
    init
}
