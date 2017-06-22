var dgram = require('dgram');
var iconv = require("iconv-lite");
var query= require('./../lib/db/mysql');


var clientSocket = dgram.createSocket('udp4');
clientSocket.on('message', function(msg, rinfo){
    var revice=Buffer.from(msg);
    var messages=JSON.parse(revice.toString());
    var rfidList=messages.rfidList;
    console.log(rfidList);
    var listArr=rfidList.substr(1,rfidList.length-2).split(', ');
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
        var str='{\"what\":\"7782\",\"rightGoods\":\"'+rightGoods+'\",\"lostGoods\":\"'+lostGoods+'\"}';
        var rawStr=iconv.encode(str,'gbk');
        clientSocket.send(rawStr,rinfo.port, rinfo.address, function(err,bytes) {
            if(err){
                clientSocket.close();
            }else{
                console.log('成功返回查询结果!!!');
            }
        });
    });
});
clientSocket.on('error', function(err){
    console.log('error, msg - %s, stack - %s\n', err.message, err.stack);
});

clientSocket.bind(7788);