var express = require('express');
var router = express.Router();
var query= require('../lib/db/mysql');
var captchapng=require('captchapng');
var session=require('express-session');
var moment = require("moment");
var filterQuery=require("./hisdataServices");

/**
 * hisdataQuery
 */
router.post('/getHisdata',function(req,res){
    var page=req.body.page,
        rows=req.body.rows,
        start=rows*(page-1),
        limit=rows*page,
        total,
        pages;
    var filters=req.body.alias;
    var sql=filterQuery(filters,start,limit);
    query('select * from hisdata',function(err,vals,fileds){
        total=vals.length;
        pages=Math.ceil(total/rows);
        query(sql,function(err,vals,fileds){
            if(err){
                console.log(err);
                res.json({'success':true,'result':'failed'});

            }else{
                for (var i = 0; i < vals.length; i++) {
                    vals[i].insertTime=moment(vals[i].insertTime).format('YYYY-MM-DD HH:mm:ss');
                }
                res.json({'success':true,'total':total,'pages':pages,'data':vals});
            }
        });
    });
});

/**
 * delete
 */
router.post('/delete',function(req,res){
    var id=req.body.id;
    query('delete from hisdata where id='+id,function(err,vals,fileds){
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