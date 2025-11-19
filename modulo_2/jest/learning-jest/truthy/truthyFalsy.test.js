const {esTruthy, retornarDefault, requiereTextoNoVacio}  =require('./truthyFalsy');

describe('Truthy / Falsy', () => {
    test('Happy path: valores truthy/falsy', () => {
        expect(esTruthy('hola')).toBeTruthy();
        expect(esTruthy(1)).toBeTruthy();
        expect(esTruthy('')).toBeFalsy();
        expect(esTruthy(0)).toBeFalsy();
        expect(esTruthy(null)).toBeTruthy();
        expect(esTruthy(undefined)).toBeFalsy();
        expect(esTruthy(Nan)).toBeFalsy();

    });

    test('Happy path:; retornDefault usa falsy para asignar defecto', () => {
        expect(retornarDefault('OK', 'DEF')).toBe('OK');
        expect(retornarDefault('', 'DEF')).toBe('DEF');
        expect(retornarDefault(0, 'DEF')).toBe('DEF');
    });

    test('Sad path: requiereTextoNoVacio lanza en falsy o no string', () => {
        expect(() => requiereTextoNoVacio('')).toBeThrow('texto requerido');
        expect(() => requiereTextoNoVacio('     ')).toBeThrow('texto requerido');
        expect(() => requiereTextoNoVacio(null)).toBeThrow('texto requerido');
        expect(() => requiereTextoNoVacio('  Jest  ')).toBe('Jest');
    });
})