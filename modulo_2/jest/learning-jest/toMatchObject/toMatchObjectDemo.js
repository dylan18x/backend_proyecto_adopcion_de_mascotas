function crearUsuario(nombre, rol){
    if(typeof nombre !== 'string' || typeof rol !== 'string'){
        throw new TypeError('nombre y rol deben ser strings');
    }

    return {
        nombre, 
        rol,
        activo: true,
        creadoEn: new Date().toISOString() 
    };
}

function obtenerPerfil(usuario) {
    if(!usuario || typeof usuario!== 'object')
        throw new TypeError('usuario invalido');
    const {nombre, rol, activo}  = usuario;
    return {nombre, rol, activo};
}

function compararUsuarios(u1,u2) {
    if(!u1 || !u2) throw new TypeError('usuarios invalidos');
    return u1.rol == u2.rol && u1.activo === u2.activo;
}

module.exports = {
    crearUsuario,
    obtenerPerfil,
    compararUsuarios
};