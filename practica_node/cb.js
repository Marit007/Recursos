/*function f1(nombre, cb) {
    cb(nombre)
}

console.log("antes del cb");

setTimeout(() =>{f1("mario", (nombre) => {
    console.log(nombre);
});}, 5000)


console.log("despues del cb");*/

function sumar(a,b){
    return a+b;
};

module.exports={sumar:sumar};