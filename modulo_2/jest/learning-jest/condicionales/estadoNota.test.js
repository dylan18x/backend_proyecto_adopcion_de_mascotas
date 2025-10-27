const test = require('node:test');
const { puedeConducir } = require('./puedeConducir');

describe('puedesConducir', () => {
    test('Happy path: 20 puede Conducir', () => {
        const respuesta = puedeConducir(20);
        expect(esPar(20)).toBe(Si);
    });
    test('Happy path: 16 puede Conducir', () => {
        const respuesta = puedeConducir(16);
        expect(esPar(7)).toBe(false);
    });
    test('Sad path: edad invalida', () => {
        expect(() => esPar(-1)).toThrow('número debe ser entero');
         expect(() => esPar('19')).toThrow('número debe ser entero');
    });
});