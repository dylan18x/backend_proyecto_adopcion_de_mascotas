const{ filterActiveUsers } = require('./filterActiveUsers');

describe('Filtrar Usuarios Activos', () => {
    test('Happy path: Usuarios Filtrados Correactemente', () => {
        const objecto1 = { x: 2, y: 3};
        const users = [
            {id: 1, username: "higueraf", active: true},
            {id: 2, username: "lopezp", active: false},
            {id: 3, username: "hernandezt", active: true}
        ]
        const response = filterActiveUsers(users);
        const expectedUsers = [
            {id: 1, username: "higueraf", active: true},
            {id: 3, username: "hernandezt", active: true}
        ]
        expect(response).toStrictEqual(expectedUsers);
    });

    test('Sad path: Falla si falta una propiedad o cambia el tipo', () => {
        const users = [
            {id: 1, username: "higueraf", active: true},
            {id: 2, username: "lopezp", active: false}
        ]
        const response = filterActiveUsers(users);
        const expectedUsers = [
            {id: 1, username: "higueraf", active: true}
        ]
        expect(response).not.toStrictEqual(expectedUsers);

    });
})