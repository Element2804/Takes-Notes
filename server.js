//express dependency
const express = require("express");
const fs = require("fs");
// adds unique id to notes
const uuid = require('uuid');

//asigns variable to use express through
const app = express();

//middleware for parsing JSON
app.use(express.json());

// defines the port
const PORT = process.env.PORT || 3000;

//middleware parsing requests from URL
app.use(express.urlencoded({ extended: true }));

//middleware that allows access to files in the public folder
app.use(express.static("public"));


app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html'); 
  });

app.get('/api/notes', (req, res) => {

    fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
        if (err) throw err; 
        const notes = JSON.parse(data); 

        res.json(notes);
      console.log(notes);
      });

});

// wildcard route returning home
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//initializes Port
app.listen(PORT, () => {
    console.log(PORT);
});