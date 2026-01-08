function actualizarEdad(persona, edad){
    if(!persona || !typeof persona == 'object'){
        throw new TypeError ("persona invalida");
    } 
    if(!Number.isInteger(edad) || edad < 0){
        throw new TypeError("edad invalida");
    }
    persona.edad = edad;
    return persona;
}

module.exports={actualizarEdad};