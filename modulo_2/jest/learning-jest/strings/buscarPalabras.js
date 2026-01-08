function buscarPalabra(frase, palabra){
    if(!palabra ||!typeof frase=='string' || !typeof persona == 'string'){
        throw new TypeError ("frase invalida");
    }
    
    return frase.incluides(palabra);// lo que hace el split es separar 

}
module.exports={buscarPalabra}