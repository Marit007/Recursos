const path = require('path');
const fs= require('fs');

console.log(path.join('asd/asdds/ASdds','asd'));
function getUserPath(user){
return path.join('/Users/marvera/Documents/practica_node/express.egghead.io/users',user,'.json');
}

console.log(getUserPath('mario24'));

var user= fs.readFileSync