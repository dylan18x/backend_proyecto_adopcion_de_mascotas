function mayoresEdad(arreglo){
    if(!Array.isArray(arreglo)) 
        throw new TypeError("arreglo inválido");
    let mayores=[];
    for (let i=0; i<arreglo.length; i++){
        if(arreglo[i]<0) 
            throw new TypeError("edad inválida");
        if(arreglo[i]>=18){
            mayores.push(arreglo[i]);
        }
    }
    return mayores;
}
module.exports={mayoresEdad}