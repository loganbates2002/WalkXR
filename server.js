const express = require('express')
const sqlite = require('sqlite3').verbose()

const app = express();
const port = 3000;

let db = new sqlite.Database('./walkxr.db')

app.use(express.static('public'));

app.get('/', (req, res) => {
    
  });



app.listen(port, () => {
    console.log(`walkxr listening on port ${port}!`)
  });