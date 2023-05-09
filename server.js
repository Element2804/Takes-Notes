//express dependency
const express = require("express");
const fs = require("fs");
// adds unique id to notes
const { v4: uuidv4 } = require("uuid");

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

// get route for html
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html'); 
  });

//get route for api
app.get('/api/notes', (req, res) => {

    fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
        if (err) throw err; 
        const notes = JSON.parse(data); 

        res.json(notes);
      console.log(notes);
      });

});
// api post route
app.post('/api/notes', (req, res) => {
  const newNote = req.body; 
  newNote.id = uuidv4(); 
  fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
    if (err) throw err; 
    const notes = JSON.parse(data); 
    // adds new note to db file
    notes.push(newNote); 
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), (err) => {
      if (err) throw err; 
      res.json(newNote); 
    });
  });
});;


// wildcard route returning home
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//initializes Port
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});