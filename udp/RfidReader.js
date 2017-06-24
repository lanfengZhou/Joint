var dgram = require('dgram');

var clientSocket = dgram.createSocket('udp4');
var query= require('../lib/db/mysql');
var moment = require("moment");
clientSocket.on('message', function(msg, rinfo){
    //process.send(1);
    var recive=Buffer.from(msg);
    var readnum=recive.slice(6,8).toString('hex');
    //console.log("读卡器ID："+readnum);
    var count=parseInt(recive.slice(10,11).toString('hex'),16);
    //console.log("读取的RFID标签总数："+count);
    var cardsArr=recive.slice(11,recive.length-1);
    for(var i=0;i<count;i++){
        var precard=cardsArr.slice(7*i,7*(i+1));
        var activate=parseInt(precard.slice(3,4).toString('hex'),16).toString(2);
        var isactivate=activate.substr(0,1)==1?true:false;
        if(!!isactivate){
            var tagid=precard.slice(0,3).toString('hex').toUpperCase();
            query('select number from device where number=\"'+tagid+'\"',function(err,vals,fileds){
                if(vals.length>0){
                    ////开启蜂鸣器
                    var activateId=precard.slice(4,6).toString('hex');
                    console.log("读卡器"+activateId+'检测到'+vals[0].number);
                    var date=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                    query('insert into alarmhis(activateId,tagid,insertTime) values (\"'+activateId+'\",\"'+tagid+'\",\"'+date+'\")',
                        function(err,vals,fileds){
                            if(err){
                                console.log(err);
                            }
                        });
                }else{
                    //关闭蜂鸣器
                }
            });
        }
    }

});

clientSocket.on('error', function(err){
    console.log('error, msg - %s, stack - %s\n', err.message, err.stack);
});

clientSocket.bind(32500);