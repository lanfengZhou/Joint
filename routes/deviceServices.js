function filterQuery(filters,start,limit){
    var sql='select * from device ';
    if(filters!=null&&filters!=''){
        sql+=' where alias=\"'+filters+'\"';
    }
    sql+=' limit '+start+','+limit;
    return sql;
}

module.exports=filterQuery;