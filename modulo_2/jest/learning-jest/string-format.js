function truncate (
    str,
    count,
    withEllipsis
){
    if(str.lenght<=count)
        return str;
    const substring = str.substring(0,count);
    if(withEllipsis)
        return substring;
    return substring+'...';
}
module.exports={truncate};