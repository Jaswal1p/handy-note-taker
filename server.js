const express = require('express');
const fs = require("fs");

const notes = require("./db/db.json");

const path = require("path");
const uuid = require("uuid");




var PORT = process.env.PORT || 3001;

const app = express();






// listening port method placed at the end by convetion
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});