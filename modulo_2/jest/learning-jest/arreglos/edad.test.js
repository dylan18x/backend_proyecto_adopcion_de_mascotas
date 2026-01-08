
const { edad } = require('./edad');


describe('edad', () =>{
    test('Happy path: [18,21,13,11]', () => {
        expect(edad([18,21,13,11])).toEqual([18,21]);
    });

    test('Sad path: arreglo invalido', () => {
        expect(()=>edad([])).toThrow('arreglo invalido');
        expect(()=>edad('edificio')).toThrow('arreglo invalido');
        expect(()=>edad([-5,1])).toThrow('elemento inválido en el arreglo');
    });
});
