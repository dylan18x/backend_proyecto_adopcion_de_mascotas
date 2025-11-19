
class Persona {
    constructor (nombre, edad) {
        if( typeof nombre !== 'string' || !nombre.trim())
            throw new TypeError('nombre invalido');
        if(!Number.isInteger(edad) || edad < 0 )
            throw new TypeError('edad invalida');
        this.nombre = nombre.trim();
        this.edad = edad;
    }
}

function crearPersona(nombre, edad) {
    return new Persona(nombre, edad);
}

function esFecha(valor){
    return valor instanceof Date && !isNaN(valor.valueOf());
}

module.exports = {Persona, crearPersona, esFecha};
