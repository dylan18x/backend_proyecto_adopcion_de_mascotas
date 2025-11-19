const{ sumObjects } = require('./sumObjects');

describe('Suma de Objetos', () => {
    test('Happy path: Suma de Objetos Correctamente', () => {
        const objecto1 = { x: 2, y: 3};
        const objecto2 = { x: 1, y: 4};

        const response = sumObjects(objecto1, objecto2);
        expect(response).toStrictEqual({x: 3, y: 7});
    });

    test('Sad path: Falla si falta una propiedad o cambia el tipo', () => {
        const objecto1 = { x: 2, y: 3};
        const objecto2 = { x: 1, y: 4, z: 0};
        const response = sumObjects(objecto1, objecto2);
        expect(response).not.toStrictEqual({x: 3, y: 7, z: 0});

    });
})