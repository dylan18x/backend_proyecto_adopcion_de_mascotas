const { validarEmail } = require('./validarEmail');

describe('Verificar Email', () => {
  test('Happy path: que devuelva false con formato inválido', () => {
    const response = validarEmail('fran.n.d'); // sin @
    expect(response).toBe(false);
  });

  test('Happy path: que devuelva true con formato válido', () => {
    const response = validarEmail('fran.n.d@mail.com'); // con @ y TLD
    expect(response).toBe(true);
  });

  test('Sad path: tipo inválido lanza TypeError', () => {
    expect(() => validarEmail(3455))
      .toThrow('email debe ser string');
  });
});
