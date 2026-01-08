function esTruthy(valor){
    return !!valor; //coercion booleana
}

function retornarDefault(valor, defecto = 'N/A'){
    return valor ? valor : defecto; //usar truthy
}

function requiereTextoNoVacio(txt) {
    if(typeof txt !== 'string' || !txt.trim()) {
        throw new TypeError(' texto requerido');
    }
    return txt.trim();
}

module.exports = { esTruthy, retornarDefault, requiereTextoNoVacio};