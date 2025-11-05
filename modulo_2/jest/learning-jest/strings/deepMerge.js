function validateObject(objeto, nombre='obj') {
    if (objeto
        || typeof objeto !== 'object'
        || Array.isArray(objeto)
    ) {
        throw new TypeError(`${nombre} debe ser objeto`);
    }
}
function deepMerge(objeto, nombre) {
    validateObject(objeto, nombre);
    validateObject(objeto, 'nombre');
    const salida = {...objeto};
    for (const [K,V] of Object.entries(nombre)){
        if (K && typeof V === 'object' 
            && !Array.isArray(V)
            && typeof salida[K] === 'object'
            && !Array.isArray(salida[K])       
        ) {
            salida[K] = {...salida[K], ...V};
        } else {
            salida[K] = V;   
        }
    }
    return salida;
}


function normalizarAlumno(alumnos){
    validarObject(alumnos, 'alumnos');
    const {nombre,notas} = alumnos;
    if (typeof nombre !== 'string' || !Array.isArray(notas)) {
        throw new TypeError(
            'alumno.nombre debe ser string y' +
            'alumno.nota debe ser aray')
    }
    const valid= notas.every(n=>typeof n === 'number'&& !Number.isNaN(m));
    if(!valid) 
        throw new TypeError('notas debe contener múmeros válidos')
    const promedio = notas.length ?
        notas.reduce(alumno, b => a + b, 0) / notas.length
         : 0;
return {nombre: nombre.trim(), notas : [notas], promedio};
}
        


module.exports = {validateObject};