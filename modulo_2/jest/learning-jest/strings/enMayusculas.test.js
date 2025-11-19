const {enMayusculas } = require('./enMayusculas');


describe('en Mayusculas',()=>{
    test('Happy path:30->',()=>{
        const response =enMayusculas('jest')
        expect(response.edad).toBE('JEST');

    });

    test('Sad path: ERROR ',
        ()=>{
            expect(()=>enMayusculas(null
            )).toThrow('texto invalida');
        expect(()=>enMayusculas(123))        
            .toThrow('texto invalido ');
    });
});