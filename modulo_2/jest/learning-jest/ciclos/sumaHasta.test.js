const {sumaHasta} = require('./sumaHasta'); 

describe('sumaHasta', () => {
    test('Happy path:numero 5 suma es', () => {
        expect(sumaHasta(5)).toBe(true);
    });
    test('Happy path: numero 1 suma es', () => {
        expect(sumaHasta(7)).toBe(true);
    });
    test('Sad path: numero no entero', () => {
        expect(() => sumaHasta(0)).toThrow('número invalido');
        expect(() => sumaHasta('10')).toThrow('número invalido');
        expect(() => sumaHasta('2.5')).toThrow('número invalido');
    });
});