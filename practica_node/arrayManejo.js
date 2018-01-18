let array = [1, 2, 3, 4,]; 

console.log(array.filter((e) => {
    return e > 2;
}));

console.log(array.map((e)=>{
    return e*2;
}));

console.log(array.find((e)=>{
    return e=2;
}));

console.log(array.reduce((e,e2)=>{
    return e+e2;
}));
