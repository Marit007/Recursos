module.exports=function(numero){
    function doble(){
        return numero*2;
    }
    function triple(){
        return numero*3;
    }
    return {doble,triple}
};

