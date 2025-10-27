function contarPares(arreglo){
    if(!Array.isArray(arreglo)
        ) {
            throw new TypeError("arreglo invalido");
        }
    let contador=0;
    for(let item of arreglo){
        if(x%2===0) contador ++;
    }
    return contador;
}
module.exports={contarPares}