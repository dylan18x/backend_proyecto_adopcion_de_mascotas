function maximo(arreglo){
    if(!Array.isArray(arreglo) || arreglo.length==0) 
        throw new TypeError("arreglo inválido");
    return Math.max(...arreglo);
}
module.exports={maximo}