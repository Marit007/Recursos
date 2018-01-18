module.exports = {
    entry: './main.js', //cual es la entrada de nuestra aplicacion
    output: {
      path: './', //donde colocará los archivos al terminar
      filename: 'index.js' //el nombre de nuestro bundle
    },
    devServer: { // opciones para el servidor de desarrollo
      inline: true, // para que se recargue automáticamente cuando cambie un archivo
      port: 3333 // puerto donde funcionará el servidor
    },
   };