const express = require('express');
const fs = require("fs");

const notes = require("./db/db.json");

const path = require("path");
const uuid = require("uuid");

const {DH_CHECK_P_SAFE_PRIME } = require("constants");

// declared port at 3001
var PORT = process.env.PORT || 3001;

const app = express();

// Middleware will go here


// Here I am setting the routes for APIs

app.get("/api/notes", (req,res) => {
    // this route gets the saved note and joins it to db.jason
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.post("/api/notes", (req, res) => {
    // This is the post method to add a new note entered by user to db.json
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    // every new note will get unique id number to fecilitate add & delete actions
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringyfy(notes))
    res.json(notes);
});





// listening port method placed at the end by convetion
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});