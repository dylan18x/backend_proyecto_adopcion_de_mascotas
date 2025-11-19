
const{ Persona, crearPersona, esFecha } = require('./instancias');

describe('InstanceOf', () => {
    test('Happy: crearPersona retorna instancia de Persona', () => {
        const p = crearPersona('Ana', 22);
        expect(p).toBeInstanceOf(Persona);
        expect(p).not.toBeInstanceOf(Date);
    });

    test('Happy: esFecha detecta instancias Date invalidas', () => {
        expect(esFecha(new Date())).toBe(true);
        expect(esFecha(new Date('invalid'))).toBe(false);
    }),

    test('Sad: crearPersona con datos invalidos', () => {
        expect(() => crearPersona('', 10)).toThrow('nombre invalido');
        expect(() => crearPersona('Luis', -1)).toThrow('edad invalida');
        expect(esFecha('2025-01-01')).toBe(false);
    })
})
