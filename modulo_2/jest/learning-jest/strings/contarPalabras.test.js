function crearEstudiante(nombre, edad){
    if(!typeof nombre=='string' || !nombre.trim()){
        throw new TypeError("nombre inválido");
    }   
    if(!Number.isInteger(edad) || edad<0){
        throw new TypeError("edad inválida");
    }
    return {nombre: nombre.trim(), edad};
}
module.exports={crearEstudiante}