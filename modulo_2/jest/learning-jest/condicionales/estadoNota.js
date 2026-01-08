function estadoNota(nota) {
    if(typeof nota !== 'number'
        ||Number.isNaN(nota)
        ||nota > 10
        ||nota < 0
    ) {
        throw new TypeError("nota invalida");
    }
    if (nota>=7) return 'Aprobado';
    if (nota>=4) return 'Supletorio';
    return 'Reprobado';
} 
module.exports={estadoNota}