function filterQuery(filters,start,limit){
    var sql='select * from user ';
    if(filters!=null&&filters!=''){
        sql+=' where account=\"'+filters+'\"';
    }
    sql+=' limit '+start+','+limit;
    return sql;
}

module.exports=filterQuery;