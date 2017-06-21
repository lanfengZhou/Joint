var moment = require("moment");
function filterQuery(filters,start,limit){
    var sql='select h.*,d.alias,d.number,d.belong from hisdata as h left join device as d on h.device_id=d.id ';
    if(filters!=null&&filters!=''){
        var filter=JSON.parse(filters);
        sql+=' where ';
        if(filter.alias){
            sql+='alias  like \"%'+filter.alias+'%\"';
        }
        if(filter.startTime&&filter.endTime){
            if(filter.startTime==filter.endTime){
                sql+=' and h.insertTime between \"'+filter.startTime+' 00:00:00\" and \"'+filter.endTime+' 23:59:59\"';
            }else{
                sql+=' and h.insertTime between \"'+filter.startTime+'\" and \"'+filter.endTime+' 23:59:59\"';
            }
        }
    }
    sql+=' limit '+start+','+limit;
    return sql;
}

module.exports=filterQuery;