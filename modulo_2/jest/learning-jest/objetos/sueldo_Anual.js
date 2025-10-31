function sueldoAnual(empleado){
    if (!empleado || typeof empleado!='object'){
        throw new TypeError("empleado inválido");
    }
    const {sueldoMensual}=empleado;
    if(!sueldoMensual 
        || typeof sueldoMensual!='number' 
        || sueldoMensual<0

    ){
        throw new   TypeError ("sueldo mensual inválido")
    }
    return sueldoMensual*12;
}
module.exports ={sueldoAnual}