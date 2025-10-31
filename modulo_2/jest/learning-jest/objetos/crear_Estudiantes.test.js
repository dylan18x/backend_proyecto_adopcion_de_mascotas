const { crearEstudiante } = require('./crearEstudiante');

describe('Crear Estudiante', ()=>{
    test('Happy path:', () => {
        expect(crearEstudiante(maria, 17)).toBe({
            nombre: "maria",
            edad: 17
        }); 
    });
    test('Sad path: nombre / edad inválidos', () => {
        expect(()=>crearEstudiante('', 20)).toThrow('nombre inválido'); 
        expect(()=>crearEstudiante('Ana',-1)).toThrow('edad inválida'); 
    }); 
});