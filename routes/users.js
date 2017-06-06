var express = require('express');
var router = express.Router();
var query= require('../lib/db/mysql');
var captchapng=require('captchapng');
var session=require('express-session');
var moment = require("moment");
var filterQuery=require('./usersServices');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
    //console.log()
});
/**
 * 注册
 */
router.post('/register',function(req,res){
    var name=req.body.name,
      phone=req.body.phone,
      account=req.body.account,
      password=req.body.password,
      vcode=req.body.vcode;
    var date=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    if(req.cookies.vcode==vcode){
        query('insert into user(name,phone,account,password,power,state,insertTime) values (\"'+name+'\",\"'+phone+'\",\"'+account+'\",\"'
        +password+'\",'+0+','+0+',\"'+date+'\")',function(err,vals,fileds){
            if(err){
                console.log(err);
            }else{
                res.json({'success':true,'result':'ok','reason':'ok'});
            }
        });
    }else{
        res.json({'success':true,'result':'failed','reason':'wrongCode'});
    }
    //res.json({'success':true});
});
/**
 * 获取验证码
 */
router.get('/getCheckCode',function(req,res){
    var number=parseInt(Math.random()*9000+1000);
    var p = new captchapng(80,30,number); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    var timer=new Date().getTime()+300*1000;
    var expires=new Date(timer).toGMTString();
    res.writeHead(200, {
      'Content-Type': 'image/png',
        'Set-cookie': 'vcode='+number+'; path="/user"; expires='+expires+'; '
    });

    res.end(imgbase64);
});
/**
 * 帐户名唯一性检查
 *
 */
router.post('/checkAccount',function(req,res){
  var account=req.body.account;
  query('select * from user where account='+account,function(err,vals,fileds){
    if(err){
      console.log(err);
    }else{
      console.log(vals.length);
      if(vals.length!==0){
        res.json({'success':true,'result':'failed','reason':'exist'});
      }else{
        res.json({'success':true,'result':'ok','reason':'ok'});
      }
    }
  });
});
/**
 * 用户登录
 */
router.get('/login',function(req,res){
    var account=req.body.account;
    var password=req.body.password;
    query('select * from user where account='+account+' and password='
    +password,function(err,vals,fileds){
        if(err){
            console.log(err);
        }else{
            if(vals.length!==0){
                res.json({'success':true,'result':'failed'});
            }else{
                res.cookie('userid',vals[0].id,{path:'/user',maxAge:1000*60*30,httpOnly:true});
                res.json({'success':true,'result':'ok'});
            }
        }
    });
});
/**
 * 获取用户信息
 */
router.get('/getUserInfo',function(req,res){
    var id=req.cookie.userid;
    //if(id) {
        query('select * from user where id=' + id, function (err, vals, fileds) {
            if (err) {
                console.log(err);
                res.json({'success':true,'result':'failed'});
            } else {
                res.json({'success': true, 'result': vals});
            }
        });
    //}
});
/**
 * 修改用户信息
 */
router.post('/edit',function(req,res){
    var id=req.body.id,
        name=req.body.name,
        phone=req.body.phone;
    query('update user set name=\"'+name+'\",\"'+phone+'\" where id='+id,function(err,vals,fileds){
        if(err){
            console.log(err);
            res.json({'success':true,'result':'failed'});
        }else{
            res.json({'success':true,result:'ok'});
        }
    })
});
/**
 * 修改用户密码
 */
router.post('/editPwd',function(req,res){
    var id=req.cookie.id,
        newPwd=req.body.newPwd,
        oldPwd=req.body.oldPwd;
    query('update user set password=\"'+newPwd+'\" where id='+id+' and password=\"'+oldPwd+'\"',function(err,vals,fileds){
       if(err){
           console.log(err);
           res.json({'success':true,'result':'failed','reason':'wrongPwd'});
       }else{
           res.json({'success':true,'result':'ok','reason':'ok'});
       }
    });

});
/**
 *注销用户
 */
router.get('/logOut',function(req,res){
    res.clearCookie('userid', { path: '/user' });
    res.redirect('../');

});
/**
 * 获取用户列表
 */
router.post('/query',function(req,res){
    var page=req.body.page,
        rows=req.body.rows,
        start=rows*(page-1),
        limit=rows*page,
        total,
        pages;
    var filters=req.body.account;
    //var sql=filterQuery()
    query('select * from user',function(err,vals,fileds){
        total=vals.length;
        pages=Math.ceil(total/rows);
        query(sql,function(err,vals,fileds){
            if(err){
                console.log(err);
                res.json({'success':true,'result':'failed'});

            }else{
                for (var i = 0; i < vals.length; i++) {
                    vals[i].insertTime=moment(vals[i].insertTime).format('YYYY-MM-DD HH:mm:ss');
                    // vals[i].updateTime=moment(vals[i].updateTime).format('YYYY-MM-DD HH:mm:ss');
                }
                res.json({'success':true,'total':total,'pages':pages,'users':vals});
            }
        });
    });
});
/**
 * 删除用户
 */
router.post('/delete',function(req,res){
    var id=req.body.id;
    query('delete from user where id='+id,function(err,vals,fileds){
        if(err){
            console.log(err);
            res.json({'success':true,'result':'failed'});
        }else{
            res.json({'success':true,'result':'ok'});
        }
    });

});
module.exports = router;
