const express = require('express');
const app = express();
const {connectToDb, getDb} = require('./db');
const { ObjectId } = require('mongodb');




// connect to db
connectToDb((err) => {
    if (!err){
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        })
        db = getDb();
    }
})



//routes
app.get('/chats', (req, res) => {

    const chats = []

    db.collection('chats')
        .find() 
        .forEach(chat => chats.push(chat))
        .then(() => {
            res.status(200).json({chats})
        })
        .catch((err) => {
            res.status(500).json({error: err})
        })
});


app.get('/chats/:id', (req, res) => {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
        db.collection('chats')
            .findOne({ _id: new ObjectId(id) })
            .then(doc => {
                if (!doc) {
                    return res.status(404).json({ error: "Chat not found" });
                }
                res.status(200).json(doc);
            })
            .catch(err => {
                res.status(500).json({ error: "Database error" });
            });
    } else {
        res.status(400).json({ error: "Invalid ID" });
    }
});





