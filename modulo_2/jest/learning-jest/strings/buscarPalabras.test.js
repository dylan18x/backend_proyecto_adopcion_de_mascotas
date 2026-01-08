const { buscarPalabra} = require('./ buscarPalabra');


describe('Buscarr palabras',()=>{
    test('Happy path: buscar palabra ',()=>{
        const response = buscarPalabra ('hola mundo jest ', 'Jest'

        )

        expect(response).toBE(true);
        const response2 =  buscarPalabra(
            'Hola mundo Jest', 'Jest'
        )    
        expect(response2).toBE(false);
       
    });

    test('Sad path: ERROR ',
        ()=>{
            expect(()=> buscarPalabra(null, 'jest'
            )).toThrow('frase invalida');
        expect(()=> buscarPalabra('',344))        
            .toThrow('frase invalida ');
    });
});