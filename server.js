const express = require('express')

const app = express();
const port = 3000;

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


app.get('/harmony_rate', (req, res) => {
  harmony_clicks++;
  console.log("request to increment", harmony_clicks)
  res.send({'clicks':harmony_clicks});
});

app.get('/grief_rate', (req, res) => {
  grief_clicks++;
  console.log("request to increment", grief_clicks)
  res.send({'clicks':grief_clicks});
});

app.get('/resolve_rate', (req, res) => {
  resolve_clicks++;
  console.log("request to increment", resolve_clicks)
  res.send({'clicks':resolve_clicks});
});

app.get('/liberate_rate', (req, res) => {
  liberate_clicks++;
  console.log("request to increment", liberate_clicks)
  res.send({'clicks':liberate_clicks});
});


app.get('/submit', (req, res) => {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO ratings (liberate, grief, harmony, resolve) VALUES (?,?,?,?)";
    var myquery = mysql.format(sql,[liberate_clicks,grief_clicks,harmony_clicks,resolve_clicks])
    con.query(myquery, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
    
  });



app.listen(port, () => {
    console.log(`walkxr listening on port ${port}!`)
  });