var moment = require("moment");
function filterQuery(filters,start,limit){
    var sql='select * from alarmhis ';
    if(filters!=null&&filters!=''){
        var filter=JSON.parse(filters);
        sql+=' where ';
        if(filter.tagid){
            sql+='tagid  like \"%'+filter.alias+'%\"';
        }
        if(filter.startTime&&filter.endTime){
            if(filter.startTime==filter.endTime){
                sql+=' and insertTime between \"'+filter.startTime+' 00:00:00\" and \"'+filter.endTime+' 23:59:59\"';
            }else{
                sql+=' and insertTime between \"'+filter.startTime+'\" and \"'+filter.endTime+' 23:59:59\"';
            }
        }
    }
    sql+=' limit '+start+','+limit;
    return sql;
}

module.exports=filterQuery;