/**
 * Created by Administrator on 2017/5/12.
 */
var app=angular.module('library',['ng','ngRoute','ngAnimate']);
app.config(function($routeProvider){
    $routeProvider.when('/login',{
        templateUrl:'html/login.html',
        controller:'loginCtrl'
    }).when('/register',{
        templateUrl:'html/register.html',
        controller:'registerCtrl'
    }).when('/index',{
        templateUrl:'index.html',
        controller:'parentController'
    }).when('/eqmanage',{
        templateUrl:'html/eqManage.html'
    }).when('/history',{
        templateUrl:'html/history.html'
    }) .when('/userinfo',{
        templateUrl:'html/userInfo.html'
    }).otherwise('/');
})
app.controller('parentController',['$scope',function($scope){
    $(function(){
        var i=0;
        var ht=$('.my-round').css('height');
        if(ht>'700px'){
            $('#tabs').css('top','650px');
        }

        $('.banner-img').css('height',ht);
        $('.ig').eq(0).show().siblings().hide();
        showTime();
        $('.tab').hover(function(){
            i=$(this).index();
            console.log(i);
            show();
            clearInterval(timer);
        },function(){
            showTime();
        })

        function showTime(){
            timer=setInterval(function(){
                i++;
                if(i==5){
                    i=0;
                }
                $('.ig').eq(i).show().siblings().hide();
                $('.tab').eq(i).addClass('bg').siblings('.bg').removeClass('bg');

            },3000)
        }
        function show(){
            $('.ig').eq(i).fadeIn(300).siblings().fadeOut(300);
            $('.tab').eq(i).addClass("bg").siblings().removeClass('bg');
        }
    })

}])
app.controller('registerCtrl',['$scope',function($scope){
    $('.my-register').click(function(e){
        $('.my-round').fadeOut();
    })
    $('.loginBtn').click(function(e){
        //检查用户不存在的时候
        if(sessionStorage.length===0){
            $('.my-round').fadeIn();
        }
    })
}])
app.controller('loginCtrl',['$scope','$http','$location',function($scope,$http,$location){
    $scope.submit=function(){

        $http({method:'POST',url:'/login/lg',data:{uname:$scope.uname,pwd:$scope.pwd}})
            .then(function(data){
                if(data.data.length!=0){
                    $('.prompt').html('登录').css('color','#333');
                    sessionStorage.name=$scope.uname;
                    sessionStorage.pwd=$scope.pwd;
                    $('.loginBtn').html('欢迎回来'+sessionStorage.name+' <span class="glyphicon glyphicon-off"></span>');
                    $('.login_bg').hide();
                    menuList();
                    history.go(-1);
                }else{
                    $('.prompt').html('该用户名不存在').css('color','red');
                }
            })
    }
    $('.login_bg').click(function(e){
        if(e.target==this){
            $(this).hide();
            //if(sessionStorage.length===0){
            //    $('.my-round').fadeToggle();
            //}
            history.go(-1);
        }
    });

    $('.user-register').click(function(e){
        $('.my-round').fadeToggle();
        console.log("111");
    })
    $('.close').click(function(){
        $('.login_bg').hide();
        history.go(-1);
    });
}])








