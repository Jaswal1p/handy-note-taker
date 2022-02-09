const express = require('express');
const fs = require("fs");

const path = require("path");
const { v4: uuidv4} = require('uuid')



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


app.get("/", function (req, res) {
    // This method is to call home page.
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    // This method is to call the notes in a separate file
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    // this rote gets the saved note and joins it to db.jason
    // res.sendFile(path.join(__dirname, "/db/db.json"))
    fs.readFile("db/db.json", 'utf-8', function(err, data) {
        if (err) throw err;
        res.json(JSON.parse(data))
    })
});

app.post("/api/notes", (req, res) => {
    // This is the post method to add a new note entered by user to db.json
    // const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    // const newNotes = req.body;
    // // every new note will get unique id number to fecilitate add & delete actions
    // newNotes.id = uuidv4();
    // notes.push(newNotes);
    // fs.writeFileSync("./db/db.json", json.stringyfy(notes));
    // res.json(notes);
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    fs.readFile("db/db.json", 'utf-8', function(err, data) {
        if (err) throw err;
        const noteData = JSON.parse(data)
        noteData.push(newNote)
        fs.writeFileSync("./db/db.json", JSON.stringify(noteData), function(err) {
            if (err) throw err;
            console.log("new note saved!");
        });
        res.sendFile(path.join(__dirname, "/public/notes.html"));
    })
});

app.delete("/api/notes/:id", (req, res) => {
    // This method is created to delet notes. Hopefully it works &
    var clicked = req.params.id
    fs.readFile("db/db.json", 'utf-8', function(err, data) {
        if (err) throw err;
        const noteData = JSON.parse(data)
        const newData = noteData.filter(note => note.id !== clicked)
        fs.writeFileSync("./db/db.json", JSON.stringify(newData), function(err) {
            if (err) throw err;
            console.log("note deleted!");
        });
        res.sendFile(path.join(__dirname, "/public/notes.html"));
    })
})




// listening port method placed at the end by convetion
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});