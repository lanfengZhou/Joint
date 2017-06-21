var dgram = require('dgram');

var clientSocket = dgram.createSocket('udp4');
var query= require('./lib/db/mysql');


clientSocket.on('message', function(msg, rinfo){
    var revice=Buffer.from(msg);
    var messages=JSON.parse(revice.toString());
    var rfidList=messages.rfidList;

    var listArr=rfidList.substr(1,rfidList.length-2).split(', ');
    console.log(listArr);
    var rightGoods='',
        lostGoods='';
    query('select number,alias from device where belong=\"'+messages.libName+'\"',function(err,vals,fileds){
        vals.forEach(function(item,index,arr){
            if(listArr.indexOf(item.number)===-1){
                lostGoods+=item.alias+';'
            }else{
                rightGoods+=item.alias+';'
            }
        });
        console.log(lostGoods+'||'+rightGoods);

    });
    //var reg=/(\d+\.\d+)+/gi;
    //var matches=reg.exec(messages);
    //var lat=matches[0];
    //matches=reg.exec(messages);
    //var lng=matches[0];
    //// console.log(messages);
    //// console.log(lat+','+lng);
    //
    //var lats=parseInt(lat/100)+(lat%parseFloat(100))/parseFloat(60);
    //var lngs=parseInt(lng/100)+(lng%parseFloat(100))/parseFloat(60);
    //var coordinate=lats+','+lngs;
    //// console.log(lats);
    //query('update gpsobj set lastValue="'+coordinate+'" where id=1',function(err,vals,fileds){
    //    if (err==null) {
    //
    //    }else{
    //        console.log(err);
    //    }
    //});
});

clientSocket.on('error', function(err){
    console.log('error, msg - %s, stack - %s\n', err.message, err.stack);
});

clientSocket.bind(7788);