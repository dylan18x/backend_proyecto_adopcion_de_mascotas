function obtenerFrutas(){
    return ['manzana', 'pera', 'uva', 'mango'];
}

function contienePalabra(texto, palabra){
    if(typeof text !== 'string' || typeof palabra !== 'string')
        throw new TypeError('Ambos argumentos deben ser strings')

    return text.toLowerCase()
        .includes(palabra.toLowerCase);
}

function agregarElemento(lista, elemento){
    if(!Array.isArray(lista))
        throw new TypeError('Lista debe ser array');
    if(!elemento)
        throw new TypeError('Lista no puede ser vacio');
    lista.push(elemento);
    return lista;

}

module.exports = {obtenerFrutas, contienePalabra, agregarElemento};