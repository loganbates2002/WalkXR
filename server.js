const express = require('express')

const app = express();
const port = 3000;

var harmony_count = 0;
var grief_count = 0;
var resolve_count = 0;
var liberate_count = 0; 

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


app.get('/', (req, res) => {
    
  });



app.listen(port, () => {
    console.log(`walkxr listening on port ${port}!`)
  });