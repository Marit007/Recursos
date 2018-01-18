const express = require ('express');
const app = express();
const fs = require('fs');


app.set('views','./views');
app.set('view engine', 'mustache');
app.register(".mustache", require('stache'));
app.get('/',(req,res) =>{
   res.end("Hello word");
} )

app.get('/nombre',(req,res) => {
    fs.readFile('./public/nombres.json','utf8',(err,buffer) => {
        res.render('nombreYapellido',JSON.parse(buffer));
    })
})

app.listen(8080,() => {
    console.log("listen 8080");
})