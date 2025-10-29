const { mayoresEdadFilter } = require('./mayoresEdadFilter');

describe('Mayores de Edad con Filter', ()=>{
    test('Happy path: [15,18,26,28] mayores de edad [18,26,28]'
        , () => {
        expect(mayoresEdadFilter([15,18,26,28])).toEqual([18,26,28]); 
    });
    test('Happy path: [] mayores []', () => {
        expect(mayoresEdadFilter([])).toEqual([]);
    });
    
    test('Sad path: edades invalidas', () => {
        expect(()=>mayoresEdadFilter('arreglo')).toThrow('arreglo inválido'); 
    }); 
});
