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

koalaRouter.put('/transferkoala/:id', (req, res) => {
    console.log("req.params is:", req.params);
  
    // getting the id from params
    let koalaId = req.params.id;
    // need to update boolean to true
    let updateTransfer = true;
    let queryParams = [updateTransfer, koalaId];
  
    // writing a query that updates, targets koalaId, updates isRead to true
    let queryText = `UPDATE "koali" SET "ready_to_transfer" = $1 WHERE "id" = $2;`
    console.log(`Success connecting to /updatekoala. koalaId = ${koalaId}, readStatus = ${updateTransfer}`)
  
    pool.query(queryText, queryParams)
      .then((response) => {
        res.sendStatus(200)
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500)
      })
  })


// DELETE

koalaRouter.delete('/deletekoala/:id', (req, res) => {

    // getting the id from params
    let koalaToDeleteId = req.params.id;
  
    // deleting koala with matching id
    let queryText = `DELETE FROM "koali" WHERE id=$1;`
  
    pool.query(queryText, [koalaToDeleteId]) // can do it this way if you want to keep your koalaToDeleteId variable outside of an array
      .then((result) => {
        console.log("koala deleted, id:", koalaToDeleteId);
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log("error making database query:", queryText);
        console.log("error message", error);
        res.sendStatus(500);
      })
  
  
  })

module.exports = koalaRouter;