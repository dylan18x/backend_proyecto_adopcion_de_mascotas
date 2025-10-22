function truncate(
    str,
    count,
    withElipsis
){
    if(str.length <= count)
        return str;
    const substring = str.substring(0, count);
    if(withElipsis)
        return substring + '...';
}
module.exports={truncate}