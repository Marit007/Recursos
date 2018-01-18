const express = require('express');

var app=express()
app.listen(8000);

app.get("/",(req,res) => {
    res.sendFile("/Users/marvera/Documents/practica_node/express/index.html");
});