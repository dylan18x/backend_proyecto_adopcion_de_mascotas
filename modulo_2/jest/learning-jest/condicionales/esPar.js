function esPar(numero) {
    if(!Number.isInteger(numero)) throw new Error('número debe ser entero');
    return numero % 2 === 0;
}
module.exports = { esPar };