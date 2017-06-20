function filterQuery(filters,start,limit){
    var sql='select h.*,d.alias,d.number,d.belong from hisdata as h left join device as d on h.device_id=d.id ';
    if(filters!=null&&filters!=''){
        sql+=' where alias=\"'+filters+'\"';
    }
    sql+=' limit '+start+','+limit;
    return sql;
}

module.exports=filterQuery;