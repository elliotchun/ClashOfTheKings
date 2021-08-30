const { MongoClient } = require("mongodb");

const url = "mongodb+srv://dbUser:B2tmKqGEe8EWTvw@cluster0.h2pkw.mongodb.net/dbUser?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "CotK";


module.exports = {
    url,
    mongoClient: client,
    dbName,
}