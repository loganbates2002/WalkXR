const express = require('express')
const bcrypt = require("bcrypt")
const app = express();
const port = 3000;
const path = require('path');
const session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


var mysql = require("mysql")
var con = mysql.createConnection({
   connectionLimit: 100,
   host: "127.0.0.1",       //This is your localhost IP
   user: "verse",         // "newuser" created in Step 1(e)
   password: "S3ctumS3mpr@",  // password for the new user
   database: "walkxrDB",      // Database name
   port: "3306"             // port name, "3306" by default
})

var harmony_clicks = 0;
var grief_clicks = 0;
var resolve_clicks = 0;
var liberate_clicks = 0; 

app.use(express.static('public'));

/*
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
}); */

app.get('/home', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/createUser", async (req,res) => {
  const user = req.body.username
  const hashedPwd = await bcrypt.hash(req.body.password,10);

  console.log(user);
  console.log(hashedPwd);

  var sql_searchUser = "SELECT * FROM users WHERE username = ?";
  var query_searchUser = mysql.format(sql_searchUser,[user]);
  
  var sql_insertUser = "INSERT INTO users VALUES (0,?,?)";
  var query_insertUser = mysql.format(sql_insertUser,[user,hashedPwd]);
  
  await con.query(query_searchUser, async (err, result) => {
    if (err) throw (err);
    console.log("------> Search results");
    console.log(result.length);

    if (result.length != 0){
      console.log("-----> user already exists");
      res.sendStatus(409);
    }
    else {
      await con.query(query_insertUser, (err,result) => {
        if (err) throw (err);
        console.log("-----> Created new user");
        console.log(result.insertId);
        req.session.username = user;
        res.redirect("/home");
      });
    }
  });
});

app.post("/authenticate", async (req,res) => {
  const user = req.body.username
  const password = req.body.password;

  var sql_searchUser = "SELECT * FROM users WHERE username = ?";
  var query_searchUser = mysql.format(sql_searchUser,[user]);

  await con.query(query_searchUser, async (err, result) => {
    if (err) throw (err);
    console.log("------> Search results");
    console.log(result.length);

    if (result.length == 0){
      console.log("-----> user does not exist");
      res.sendStatus(404);
    }
    else {
      const hashedPwd = result[0].password

      if (await bcrypt.compare(password, hashedPwd)){
        console.log("----> login successful");
        req.session.username = user;
        res.redirect("/home");
      }
      else{
        console.log("----> password incorrect");
        res.send("Password incorrect!");
      }
    }
  });
});


app.get('/harmony_rate', (req, res) => {
  harmony_clicks++;
  console.log("request to increment", harmony_clicks);
  res.send({'clicks':harmony_clicks});
});

app.get('/grief_rate', (req, res) => {
  grief_clicks++;
  console.log("request to increment", grief_clicks);
  res.send({'clicks':grief_clicks});
});

app.get('/resolve_rate', (req, res) => {
  resolve_clicks++;
  console.log("request to increment", resolve_clicks);
  res.send({'clicks':resolve_clicks});
});

app.get('/liberate_rate', (req, res) => {
  liberate_clicks++;
  console.log("request to increment", liberate_clicks);
  res.send({'clicks':liberate_clicks});
});


app.get('/submit', (req, res) => {
  var sql_searchUser = "SELECT * FROM users WHERE username = ?";
  var query_searchUser = mysql.format(sql_searchUser,[req.session.username]);
  con.query(query_searchUser, function (err, result) {
    if (err) throw err;
    console.log(result[0].userID);

    var sql_ratings = "INSERT INTO ratings (liberate, grief, harmony, resolve,fk_userID) VALUES (?,?,?,?,?)";
    var ratings_query = mysql.format(sql_ratings,[liberate_clicks,grief_clicks,harmony_clicks,resolve_clicks,result[0].userID]);
    con.query(ratings_query, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });    
});



app.listen(port, () => {
    console.log(`walkxr listening on port ${port}!`)
  });