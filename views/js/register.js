/**
 * Created by Administrator on 2017/5/15.
 */
//用户注册
$(function(){
    console.log($('.code-key'));

    $('.code-key').prop('src','/user/getCheckCode');
        $('.code-key').click(function(){
                var now=new Date();
                $(this).prop('src','/user/getCheckCode'+'?'+now.getTime());
        })

    var uphone,upwd1,upwd2,nickname,vcode,account;
    $('#uphone').blur(phoneCheck);
    $('#upwd1').blur(upwd1Check);
    $('#upwd2').blur(upwd2Check);
    $('#uname').blur(nameCheck);
    $('#account').blur(accountCheck);
    $('#check-code').blur(checkCode);
    $('#register').click(function(){
        var rphone=phoneCheck();
        var rupwd1=upwd1Check();
        var rupwd2=upwd2Check();
        var uname=nameCheck();
        var account=accountCheck();

        if(rphone&&rupwd1&&rupwd2&account){
            nickname= $.trim($('#uname').val());
            console.log(vcode);
            $.ajax({
                type:'post',
                url:'/user/register',
                data:{name:nickname,phone:uphone,password:upwd1,account:8,vcode:vcode},
                success:function(d){
                    if(d.reason==="ok"){
                        //sessionStorage.id=d.msg.insertId;
                        //sessionStorage.phone= d.phone;
                        //sessionStorage.name= d.name;
                        //history.go(-1);
                    }
                }
            })
        }
    })
    //验证手机号函数
    function phoneCheck(){
        //1.空2.格式3.存在
        uphone= $.trim($('#uphone').val());
        var regPhone=/^1[3578]\d{9}$/;
        if(!uphone){//为空
            $('#uphone').siblings('span').hide();
            $('#uphone').siblings('i').show().text('手机号不能为空');
            return false;
        }
        else{
            $('#uphone').siblings('span').show();
            $('#uphone').siblings('i').hide();
            return true;
        }
    }
    //密码验证
    function upwd1Check(){
        upwd1=$.trim($('#upwd1').val());
        console.log(upwd1.length);
        var upwd1Size=upwd1.length;
        if(!upwd1Size){
            $('#upwd1').siblings('span').hide();
            $('#upwd1').siblings('i').show().text('密码不能为空');
            return false;
        }else if(upwd1Size<6||upwd1Size>12){
            $('#upwd1').siblings('span').hide();
            $('#upwd1').siblings('i').show().text('密码应该在6~12为之间');
            return false;
        }else{
            $('#upwd1').siblings('span').show();
            $('#upwd1').siblings('i').hide();
            return true;
        }
    }

    //密码验证
    function upwd2Check(){
        upwd2=$.trim($('#upwd2').val());
        if(upwd1Check()){//如果密码1通过了格式验证
            if(upwd1!=upwd2){
                $('#upwd2').siblings('span').hide();
                $('#upwd2').siblings('i').show().text('两次密码不一致');
                return false;
            }else{
                $('#upwd2').siblings('span').show();
                $('#upwd2').siblings('i').hide();
                return true;
            }
        }
    }

    function accountCheck(){
        account=$('#account').val();
        //console.log(accountExits(account));
        if(!account.length){
            $('#account').siblings('span').hide();
            $('#account').siblings('i').show().text('帐户不能为空');
            return false;
        }else if(!accountExits(account)){
            $('#account').siblings('span').hide();
            $('#account').siblings('i').show().text('帐户已存在');
            return false;
        }else if(accountExits(account)){
            $('#account').siblings('span').show();
            $('#account').siblings('i').hide();
            return true;
        }
    }
//帐户请求
    function accountExits(account){
        var back;
            $.ajax({
                type:'POST',
                url:'/user/checkAccount',
                data:{account:account},
                async:false,
                success:function(data){
                    if(data.reason==='ok'){
                        back=true;
                    }else{
                        back=false;
                    }
                }
            });
        return back;
    }
    //验证用户名
    function nameCheck(){
        uname=$.trim($('#uname').val());
        if(!uname.length){
            $('#uname').siblings('span').hide();
            $('#uname').siblings('i').show().text('用户名不能为空');
        }else{
            $('#uname').siblings('span').show();
            $('#uname').siblings('i').hide();
            return true;
        }
    }

    function checkCode(){
        vcode=$.trim($('#check-code').val());
        var codeSize=vcode.length;
        if(!codeSize){
            $('#check-code').siblings('span').hide();
            $('#check-code').siblings('i').show().text('验证码不能为空');
            return false;
        }else{
            $('#check-code').siblings('span').show();
            $('#check-code').siblings('i').hide();
            return true;
        }
    }

})