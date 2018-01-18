let foo = (x) => {    // Reserva de memoria para una función (Object)
    result = x * 2;     // Variable 'result' no declarada

    return result;
};

foo(2);

console.log(global.result); // la variable result al no especificar su scope queda como global.
                            // no sera recolectado por el GC. representando una fuga de memoria.
/*
En caso de que sea intencionada una vez utilizado esa variable deberia anlarse.
*/ 

global.result=null;

console.log(global.result);

/**
 Cb

 let chartData = getChartData(),
    chartDataContainer = document.getElementById( 'chartDataContainer' );
 
setInterval( () => {
    let liveChart = chartDataContainer.querySelector( '.liveCharts' );
 
    printData( charData, liveChart );
}, 1000 );


Aquí el problema potencial reside en que las variables fuera del intervalo (chartData y 
    chartDataContainer), deberían anularse una vez que ya no sean necesarias. De lo contrario, 
aunque estas se eliminen, permanecerán en memoria mientras sean requeridas por el cuerpo del intervalo

chartDataContainer pude quedar absoluto al elimir el elemonr dom que representa.
ontinúa manteniendo su referencia al tiempo que es requerida por setInterval

Observadores de un elemento DOM puede quedar al eliminar se ese elemento JQuery se da cuenta que hay
observadores huerfanos y los elimina. Si no hay que hacerlo uno xd.
 */
