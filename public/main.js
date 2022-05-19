function liberate_rate() {
    fetch("/liberate_rate").then(response => response.json()).then(data => document.getElementById("clicks").innerHTML = data['clicks']);
  
    //console.log("checking client count", response);
  };


function harmony_rate() {
    fetch("/harmony_rate").then(response => response.json()).then(data => document.getElementById("clicks").innerHTML = data['clicks']);
  
    //console.log("checking client count", response);
  };

function cleanse_rate() {
    fetch("/cleanse_rate").then(response => response.json()).then(data => document.getElementById("clicks").innerHTML = data['clicks']);
  
    //console.log("checking client count", response);
  };

function resolve_rate() {
    fetch("/resolve_rate").then(response => response.json()).then(data => document.getElementById("clicks").innerHTML = data['clicks']);
  
    //console.log("checking client count", response);
  };


  