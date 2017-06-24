var express = require('express');
var router = express.Router();
var query= require('../lib/db/mysql');
var moment = require("moment");
var filterQuery=require("./alarmServices");

/**
 * gethisdata
 */
router.post('/query',function(req,res){
    var page=req.body.page,
        limit=req.body.rows,
        start=limit*(page-1),
        total,
        pages;
    var filters=req.body.filters;
    var sql=filterQuery(filters,start,limit);
    query('select * from alarmhis',function(err,vals,fileds){
        total=vals.length;
        pages=Math.ceil(total/limit);
        query(sql,function(err,vals,fileds){
            if(err){
                console.log(err);
                res.json({'success':true,'result':'failed'});

            }else{
                for (var i = 0; i < vals.length; i++) {
                    vals[i].insertTime=moment(vals[i].insertTime).format('YYYY-MM-DD HH:mm:ss');
                }
                res.json({'success':true,'total':total,'pages':pages,'hisdata':vals});
            }
        });
    });
});
/**
 * delete
 */
router.post('/delete',function(req,res){
    var id=req.body.id;
    query('delete from alarmhis where id='+id,function(err,vals,fileds){
        if(err){
            console.log(err);
            res.json({'success':true,'result':'failed'});
        }else{
            for (var i = 0; i < vals.length; i++) {
                vals[i].insertTime=moment(vals[i].insertTime).format('YYYY-MM-DD HH:mm:ss');
            }
            res.json({'success':true,'result':'ok'});
        }
    });
});
module.exports = router;