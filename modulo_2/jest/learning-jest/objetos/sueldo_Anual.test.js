const { sueldoAnual } = require('./sueldoAnual');

describe('Crear Estudiante', () => {
    test('Happy path: 500->6000', () => {
        expect(sueldoAnual({
            nombre: 'Juan',
            sueldoMensual: 500
        })).toBe(6000);
    });

    test('Sad path: nombre/sueldo inválidos', () => {
        expect(() => sueldoAnual({
            sueldoMensual: -1
        })).toThrow('sueldo mensual inválido');

        expect(() => sueldoAnual(null))
            .toThrow('empleado inválido');
    });
});