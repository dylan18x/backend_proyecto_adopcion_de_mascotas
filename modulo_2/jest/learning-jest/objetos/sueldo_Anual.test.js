const{sueldoAnual}=require('./sueldoAnual');

describe('sueldoAnual',()=>{
    test('Happy path: 500->6000',()=>{
        expect(sueldoAnual(
            {
                nombre:'Juan',
                sueldoMensual:500,}
            )
        ).toBe(6000);
    });
    test('Sad path: nombre / sueldo invalido ',()=>{
        expect(()=>sueldoAnual({
            sueldoAnual:-1 
        })).toThrow('sueldo mensual invalido');
        expect(()=>sueldoAnual(null))
        .toThrow('empleado invalido ');
    });
});