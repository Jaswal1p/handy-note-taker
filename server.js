const express = require('express');
const fs = require("fs");

const notes = require("./db/db.json");

const path = require("path");
const uuid = require("uuid");



const app = express();

// declared port at 3001
var PORT = process.env.PORT || 3001;



// Middleware methods inspired for express.js lessons

    // Parse incoming string or array data
    app.use(express.urlencoded({ extended: true}));

    // parse incoming JSON data
    app.use(express.json());

    // parse incoming static data existing in public folder
    app.use(express.static("public"));


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
    fs.writeFileSync("./db/db.json", json.stringyfy(notes));

    res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
    // This method is created to delet notes. Hopefully it works &
    // I can get extra credit !!!! This one I had to serach on stackoverflow 
    // & I finally decided to write it this way.
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    // Magic happens at line 43 where filter function is used to delete/remove a note !!
    const deletNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", json.stringify(deletNote));

    res.json(deletNote);
})

app.get("/", function (req, res) {
    // This method is to call home page.
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    // This method is to call the notes in a separate file: notes.html
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});



// listening port method placed at the end by convetion
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});