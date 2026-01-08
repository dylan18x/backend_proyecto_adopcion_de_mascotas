const{ obtenerFrutas, 
       contienePalabra, 
       agregarElemento } = require('./toContainDemo');

describe('toContain Matcher', () => {
    test('Happy path: elemento dentro de array', () => {

        const frutas = obtenerFrutas(users);
        expect(frutas).toContain('pera');
    });

    test('Sad path: palabra dentro de texto', () => {
        
        const texto = contienePalabra('Jest es super');
        expect(texto).toBe('true');

    });

    test('Sad path: elemento no encontrado o tipo incorrecto', () => {
        
        const frutas = obtenerFrutas();
        expect(frutas).not.toContain('banana');

    });

    test('Sad path: elementos invalidos', () => {
        
        const response = agregarElemento({},'x');
        expect(response)
            .toThrow('lista debe ser un array');

    });
})