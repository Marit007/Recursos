const redis = require('redis');
var client=redis.createClient();


var mensaje='satasa';


client.set('mensaje',"esto es un mensaje");
client.get('mensaje',function(err,data){
    console.log(data);
});

client.lpush('lista',"sasaras",function(err,reply){
    client.ltrim("lista",0,9);
    console.log(reply);
});
client.lpush('lista',"sasaras",function(err,reply){
    client.ltrim("lista",0,5);
    console.log(reply);
});

client.lrange("lista",0,-1,function(err,data){
    
     console.log(data);
});
// unique data
client.sadd("nombre","mario");
client.sadd("nombre","eduardo");

client.smembers('nombre',function(err,data){
    console.log(data);
});

client.srem('nombre',"mario");

client.smembers('nombre',function(err,data){
    console.log(data);
});



