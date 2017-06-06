/**
 * Created by Administrator on 2017/5/13.
 */

var menus=[
    {
        title   : '用户信息管理',
        id      : 'userManage',
        children: [{
            title : '用户信息',
            href:'#/userinfo'

        }]
    },{
        title   : '设备信息管理',
        children: [{
            title : '设备详细信息',
            href:'#/eqmanage'
        }]
    },
    {
        title   : '设备借还管理',
        children: [{
            title:'设备借用历史记录',
            href:'#/history'
        },
            {title:'报警记录'}]
    },
];
//手风琴效果
function accordion(){
    $('#accordion').on('click','li div',function(){
        $(this).next().slideToggle(300).parent().siblings().children('ul').slideUp(400);
        $(this).parent().toggleClass('open').siblings().removeClass('open');
    })
}
function menuList(){
    var html='';
    $('.book-list').hide();
    if(sessionStorage.name) {
        $('.book-list').show();
        $('.my-round').hide();
        $('.loginBtn').html('欢迎回来' + sessionStorage.name + ' <span class="glyphicon glyphicon-off"></span>');
        for (var key in menus) {
            html += `<li>
					<div class="link"><i class="fa fa-paint-brush"></i>${menus[key].title}<i class="fa fa-chevron-down"></i></div>
					`;
            html += `<ul class="submenu">`;
            for (var i = 0; i < menus[key].children.length; i++) {
                html += `<li><a href='${(menus[key].children)[i].href}'>${(menus[key].children)[i].title}</a></li>`
            }
            html += `</ul></li>`;
        }
    }else{
        $('.my-round').show();
    }

    $('#accordion').html(html);
    $('#accordion').children().not(':first-child').children('ul').slideToggle();
}

$('.back').click(function(){
    backtrack();
})

function backtrack(){
    location.href="http://127.0.0.1:3010";
    delete sessionStorage.name;
}
localStorage.user='cao';
localStorage.pwd='123456';
menuList();
accordion();