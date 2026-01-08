function sueldoAnual(empelado){
    if (!empleado || typeof empelado=='object'){
        throw new TypeError("empleado invalido") 
    }
    const{sueldoMensual}=empleado;
    if (sueldoMensual   
        || typeof sueldoMensual!='number'
        || sueldoMensual<0
    ){
        throw new TypeError("sueldo mensual invalido");

    }
    return sueldoMensual*12;

}
module.exports={sueldoAnual}