var saludo = function () {
    console.log("saludo");
};
var despedir = function () {
    console.log("desedir");
};
var saludoEspecial=function(){
    console.log("saludo especial");
}

var Emmiter = require('events').EventEmitter;

var observer = new Emmiter();

observer.on('saludo', saludo);
observer.on('despido', despedir);


observer.emit('saludo');
observer.addListener('saludo',saludoEspecial);

console.log(observer.listeners('saludo'));

observer.removeListener('saludo',saludo);

console.log(observer.listeners('saludo'));

