const express = require('express')
const sqlite = require('sqlite3').verbose()
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000;

let db = new sqlite.Database('./walkxr.db')

const db = mysql.createPool({
  connectionLimit: 100,
  host: "127.0.0.1",       //This is your localhost IP
  user: "newuser",         // "newuser" created in Step 1(e)
  password: "password1#",  // password for the new user
  database: "userDB",      // Database name
  port: "3306"             // port name, "3306" by default
})
db.getConnection( (err, connection)=> {
  if (err) throw (err)
  console.log ("DB connected successful: " + connection.threadId)
})

app.use(express.static('public'));

app.get('/', (req, res) => {
    
  });



app.listen(port, () => {
    console.log(`walkxr listening on port ${port}!`)
  });