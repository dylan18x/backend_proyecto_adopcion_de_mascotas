const {contarPalabras } = require('./contarPalabras');


describe('Contar Palabras',()=>{
    test('Happy path:hola mundo jest ->3',()=>{
        const response =contarPalabras('hola mundo jest ')

        expect(response).toBE(3);    
       
    });

    test('Sad path: ERROR ',
        ()=>{
            expect(()=>contarPalabras(null
            )).toThrow('frase invalida');
        expect(()=>contarPalabras(''))        
            .toThrow('frase invalida ');
    });
});