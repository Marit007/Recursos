
/*
Cuando se requirie sin ruta lo busca por defeco en la carpta
node_modules , local ,sino , un nivel, arriba y asi sucesivamente.

package.json

dependencies{
    sarasa:"~1.0.0"
}

~ Significa versiones entre >=1 < 2.0.0

"~1.8" >=1.8.0 <1.9.0
*/ 

let modulo = require('./modulo');


let modulo2=require('./modulo2')(2);

console.log(modulo2.doble())
console.log(modulo2.triple())

let modulo3=require('./modulo3');

require('./modulo');




