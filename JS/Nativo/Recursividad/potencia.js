

const potencia = (exponente, base) => {
    
    if (exponente == 1) {
        return base;
    }
    else {
        return base * potencia(exponente - 1, base);
    }
}


const factorial = (numero) =>{
   if(numero === 0 || numero === 1){
        return 1;
   }
   else{
    return numero * factorial (numero-1);
   }
}
console.log(potencia(5,2));

console.log(factorial(7));