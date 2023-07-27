const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool.js');

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM "koali";`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log("error getting koalo", error);
            res.sendStatus(500);
        })
})

// POST
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body;
    console.log('adding koala', newKoala);

    let queryText = `INSERT INTO "koali" ("name", "age", "gender", "ready_to_transfer", "notes")
    VALUES ($1, $2, $3, $4, $5);`;

    pool.query(queryText, [newKoala.name, newKoala.age, newKoala.gender, newKoala.readyForTransfer, newKoala.notes])
        .then(result => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log("error in adding new koala", error);
            res.sendStatus(500);
        })
});

// PUT


// DELETE

module.exports = koalaRouter;