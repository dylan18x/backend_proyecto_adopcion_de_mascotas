const { mayoresEdad } = require('./mayoresEdad');

describe('Mayores de Edad', ()=>{
    test('Happy path: [15,18,26,28] mayores de edad [18,26,28]'
        , () => {
        expect(mayoresEdad([15,18,26,28])).toEqual([18,26,28]); 
    });
    test('Happy path: [] mayores []', () => {
        expect(mayoresEdad([])).toEqual([]);
    });
    
    test('Sad path: edades invalidas', () => {
        expect(()=>mayoresEdad([18, -1])).toThrow('edad inválida'); 
        expect(()=>mayoresEdad('arreglo')).toThrow('arreglo inválido'); 
    }); 
});
