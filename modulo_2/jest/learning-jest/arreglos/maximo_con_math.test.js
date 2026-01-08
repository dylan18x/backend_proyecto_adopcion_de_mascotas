const { maximo } = require('./maximo_con_math');

describe('Maximo con funcion Math', ()=>{
    test('Happy path: [4,9,2,10] mayor 10', () => {
        expect(maximo([4,9,2,10])).toBe(10); 
    });
    test('Happy path: [-5,-1] mayor -1', () => {
        expect(maximo([-5,-1])).toBe(-1);
    });
    
    test('Sad path: arreglo inválido', () => {
        expect(()=>maximo([])).toThrow('arreglo inválido'); 
        expect(()=>maximo('edificio')).toThrow('arreglo inválido'); 
    }); 
});
