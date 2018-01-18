const express=require('express'),
    request=require('request');

app = express();
app.listen(8080);

app.get('/',(req,res) => {
  request('http://www.google.com/').pipe(res);    
});
