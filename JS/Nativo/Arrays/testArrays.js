var numeros =[ 1,2,3,4,5];
var claveValor =[]

claveValor["nombre"] = "mario";
claveValor["apellido"] = "vera";
// numeros.forEach((e)=>{
//     console.log(e);
// })

// console.log(numeros.indexOf(numeros.find(e => e === 4))) index 3
// console.log(numeros.includes(numeros.find(e => e === 4))) true
numeros.every(e)
console.log(numeros.map(e => e+1))
console.log(numeros.join("/"))
console.log(numeros.pop());
console.log(numeros);
console.log(numeros.shift());
console.log(numeros);
console.log(numeros.unshift(10));
console.log(numeros);
console.log(Object.keys(claveValor));

let objeto = {
    nombre:"mario",
    apellido : "vera"
}

