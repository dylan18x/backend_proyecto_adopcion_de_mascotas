
function edad(arreglo){
    if (!Array.isArray(arreglo) || arreglo.length === 0)
        throw new TypeError("arreglo invalido");
    
    for (let num of arreglo) {
        if (typeof num !== 'number' || !Number.isInteger(num) || num < 0) {
            throw new TypeError("elemento inválido en el arreglo");
        }
    }

    let mayor = [];
    for (let i = 0; i < arreglo.length; i++){
        if (arreglo[i] >= 18){
            mayor.push(arreglo[i]);
        }
    }
    return mayor;
}

module.exports = { edad };
