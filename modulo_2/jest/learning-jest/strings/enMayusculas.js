function enMayusculas(texto){
    if(!texto || !typeof persona == 'string'){
        throw new TypeError ("texto invalida");
    }
  
    return texto.toUpperCase();

}
module.exports={enMayusculas}