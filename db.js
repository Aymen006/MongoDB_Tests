const {MongoClient} = require('mongodb')

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/chats_database')
        .then((client) => {
            dbConnection = client.db();
            console.log("Database connected");
            return cb();
        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        })
    },

    getDb: () => dbConnection
}
