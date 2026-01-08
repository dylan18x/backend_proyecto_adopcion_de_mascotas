function promedio(arreglo){
    if(!Array.isArray(arreglo) || arreglo.length==0) 
        throw new TypeError("arreglo inválido");
    let suma=0;
    let indice=0;
    while (indice<arreglo.length){
        suma+=arreglo[indice];
        indice++
    }
    return suma/arreglo.length;
}
module.exports={promedio}