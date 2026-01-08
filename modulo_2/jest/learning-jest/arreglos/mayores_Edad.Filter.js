function mayoresEdadFilter(arreglo){
    if(!Array.isArray(arreglo)) 
        throw new TypeError("arreglo inválido");
    return arreglo.filter(n=>n>=18);
}
module.exports={mayoresEdadFilter}