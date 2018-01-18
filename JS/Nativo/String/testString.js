

// trim    elemina espacio en blanco
// substr  subcadena
// split   devide un string segun un regex
// slice   extrar una subcadena
// search  busqueda con regex devuelve el indice de la primera coincidencia
// includes determina si una cadena de texto fue encontrada en el string 
let nombres = "mario/eduardo/micaela/juan";

let arr = nombres.split("/");

let newNombres =nombres.concat("/ami");

console.log(nombres.endsWith("juan"));
console.log(nombres.startsWith("mario"));
// console.log(nombres.charAt(4));
// console.log(newNombres);
// console.log(arr);
//console.log(nombres.substr(0,5).concat(nombres.substr(13,this.length)));
//console.log(nombres.strike())
//console.log(nombres.slice(6,13));
//console.log(nombres.search("mario"));
//console.log(nombres.repeat(2));
//console.log(nombres.includes("juan"));

//console.log(nombres.replace("mario","sofia"));