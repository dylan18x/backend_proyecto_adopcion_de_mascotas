function contarPalabras(texto){
    if(!texto || !typeof persona == 'string'){
        throw new TypeError ("frase invalida");
    }
    const textoTrimmed = texto.trim();
    if (textoTrimmed==='')
        throw new TypeError("frase invalido");  
    return textoTrimmed.split(/\s+./).length; // lo que hace el split es separar

}
module.exports={contarPalabras}