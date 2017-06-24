var express = require('express');
var router = express.Router();
var query= require('../lib/db/mysql');
var captchapng=require('captchapng');
var session=require('express-session');
var moment = require("moment");
var filterQuery=require("./deviceServices");
/**
 * deviceQuery
 */
router.post('/query',function(req,res){
    var page=req.body.page,
        rows=req.body.rows,
        start=rows*(page-1),
        limit=rows,
        total,
        pages;
    var filters=req.body.alias;
    var sql=filterQuery(filters,start,limit);
    query('select * from device',function(err,vals,fileds){
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
                res.json({'success':true,'total':total,'pages':pages,'devices':vals});
            }
        });
    });
});
/**
 * add
 */
function format(num, len) {
    var l = num.length;
    if (num.length < len) {
        for (var i = 0; i < len - l; i++) {
            num = "0" + num;
        }
    }
    return num;
}
router.post('/add',function(req,res){
    var number=format(parseInt(req.body.number).toString(16).toUpperCase(),6),
        alias=req.body.alias,
        info=req.body.info,
        belong=req.body.belong;
    var date=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    query('insert into device(alias,number,belong,info,state,insertTime) values ('+'\"'+alias+'\",\"'+number+'\",\"'+
    belong+'\",\"'+info+'\",'+1+',\"'+date+'\")',function(err,vals,fileds){
        if(err){
            console.log(err);
            res.json({'success':true,'result':'failed'});
        }else{

            res.json({'success':true,'result':'ok'});
        }

    });
});
/**
 * delete
 */
router.post('/delete',function(req,res){
    var id=req.body.id;
    query('delete from device where id='+id,function(err,vals,fileds){
        if(err){
            console.log(err);
            res.json({'success':true,'result':'failed'});
        }else{
            res.json({'success':true,'result':'ok'});
        }
    });

});
/**
 * edit
 */
router.post('/edit',function(req,res){
    var id=req.body.id,
        alias=req.body.alias,
        belong=req.body.belong,
        info=req.body.info;
    query('update device set alias=\"'+alias+'\",'+'belong=\"'+belong+'\",'+'info=\"'+info+'\" where id='+id,function(err,vals,fileds){
        if(err){
            console.log(err);
            res.json({'success':true,'result':'failed'});
        }else{
            res.json({'success':true,result:'ok'});
        }
    })
});
/**
 * borrow
 */
router.post('/borrow',function(req,res){
    var id=req.body.id;
    var date=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    query('update device set state=0 where id='+id,function(err,vals,fileds){
        if(err){
            console.log(err);
            res.json({'success':true,'result':'failed'});
        }else{
            query('insert into hisdata(device_id,value,insertTime) values ('+id+',\"'+0+'\",\"'+date+'\")',function(err,vals,fileds){
                if(err){
                    console.log(err);
                }else{
                    res.json({'success':true,'result':'ok'});
                }
            });
        }
    });
});
/**
 * back
 */
router.post('/back',function(req,res){
    var id=req.body.id;
    var date=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    query('update device set state=1 where id='+id,function(err,vals,fileds){
        if(err){
            console.log(err);
            res.json({'success':true,'result':'failed'});
        }else{
            query('insert into hisdata(device_id,value,insertTime) values ('+id+',\"'+1+'\",\"'+date+'\")',function(err,vals,fileds){
                if(err){
                    console.log(err);
                }else{
                    res.json({'success':true,'result':'ok'});
                }
            });
        }
    });
});
/**
 * alarm
 */
router.get('/alarm',function(req,res,next){
   //query('select * from ')
    console.log(flag);
});
/**
 * checknum标签唯一性检查
 */
router.post('/checknum',function(req,res,next){
    var number=format(parseInt(req.body.number).toString(16).toUpperCase(),6);
    query('select number from device where number=\"'+number+'\"',function(err,vals,fileds){
        if(vals.length>0){
            res.json({'success':true,'result':'exist'});
        }else{
            res.json({'success':true,'result':'ok'});
        }
    });
});
module.exports = router;