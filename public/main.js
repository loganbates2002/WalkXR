function liberate_rate() {
    fetch("/liberate_rate").then(response => response.json()).then(data => document.getElementById("liberate_clicks").innerHTML = data['clicks']);
  
    //console.log("checking client count", response);
  };


function harmony_rate() {
    fetch("/harmony_rate").then(response => response.json()).then(data => document.getElementById("harmony_clicks").innerHTML = data['clicks']);
  
    //console.log("checking client count", response);
  };

function grief_rate() {
    fetch("/grief_rate").then(response => response.json()).then(data => document.getElementById("grief_clicks").innerHTML = data['clicks']);
  
    //console.log("checking client count", response);
  };

function resolve_rate() {
    fetch("/resolve_rate").then(response => response.json()).then(data => document.getElementById("resolve_clicks").innerHTML = data['clicks']);
  
    //console.log("checking client count", response);
  };


function submit() {
    fetch("/submit").then(response => console.log(response));
};