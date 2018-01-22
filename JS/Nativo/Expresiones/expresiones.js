

let array = [];

array["uno"] = "sarasaUno";
array["cuarto"] = "sarasaCuarto";

function getCountry (country){

     // && condicion para que el ultimo valor sea setado
   const locate = country.local || (country.provincia  && country.remoto );

   return locate;
}
// console.log(getCountry({remoto:"argentina" , provincia:"Bs As" , local:"uru"}))


// tradado de string 

let string = "es-PT";

let locate = "sarasa";

let salida = locate && string.split("-")[0] ;

console.log(salida)