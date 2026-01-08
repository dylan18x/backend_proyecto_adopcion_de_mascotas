
function buscarAlumno(alumnos, nombre) {
    if(!Array.isArray(alumnos))
        throw new TypeError('alumnos debe ser array');
    if(typeof nombre !== 'string' || !nombre.trim())
        throw new TypeError('nombre invalido'); 
    const founf = alumnos.find(a => a?.nombre === nombre.trim());
    return found ?? null;   
}

function leerProp(obj, prop) {
    if(!obj || typeof obj !== 'object')
        throw new TypeError('obj invalido');
    if(typeof prop !== 'string' || !prop)
        throw new TypeError('prop invalida');
    return onj[prop];
}

module.exports = {buscarAlumno, leerProp};
