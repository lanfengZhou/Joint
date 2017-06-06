$(function(){
    selectAll();
    init();
    deleteData();
    $('.my-table>tbody').on('click','.btn-delete',function(d){
       var state=$(this).parent().siblings().eq(0).children().prop("checked") ;
        console.log($(this).parent().siblings().eq(0).children().val());
        if(state){
            var id=$(this).parent().siblings().eq(0).children().val();
            deleteData(id)
            $(this).parent().parent().remove();
        }else{
            return;
        }
    })

    //删除所有
    $('.delete-all').click(function(){
        deleteAll();
    })
    //添加操作
    $('.btn-addInfo').click(function(){

        $('.my-modals').show();
        $('.my-modals').click(function(e){
            if(e.target==this){
                $(this).hide();
            }
        });
    })
})

//单选复选框
function selectAll(){
    //全选
    $("#CheckedAll").click(function(){
        //所有checkbox跟着全选的checkbox走。
        $('[name=items]:checkbox').prop("checked", this.checked );
    });
    $('.my-table>tbody').on('click','[name=items]:checkbox',function(){
        var $tmp=$('[name=items]:checkbox');
        console.log($tmp.length);
        //用filter方法筛选出选中的复选框。并直接给CheckedAll赋值。
        $('#CheckedAll').prop('checked',$tmp.length==$tmp.filter(':checked').length);
    })

}

function init(){
    var msg='';
    $.ajax({
        type:'POST',
        url:'/booklist/allbook',
        data:{pageNum:1},
        success:function(d){
            $.each(d.msg,function(key,item){
                console.log(item);
                msg+=`<tr>
            <td><input type="checkbox" name="items" value="${key}"/></td>
            <td>${item.author}</td>
            <td>${item.author}</td>
            <td>${item.address}</td>
            <td>${item.type_name}</td>
            <td>${item.type_name}</td>
            <td>${item.type_name}</td>
            <td>
                <button  type="button" class="btn btn-danger btn-sm btn-delete" >
                    <span class="glyphicon glyphicon-trash" aria-hidden="true" ></span>删除
                </button>
                <button  type="button" class="btn btn-success btn-sm btn-edit">
                    <span class="glyphicon glyphicon-pencil" aria-hidden="true" ></span>编辑
                </button>
            </td>
        </tr>`
            })
            $('.my-table>tbody').html(msg);
        }
    })
}

function deleteData(id){
    var id=id||"";
    if(id){
       $.ajax({
           type:'POST',
           url:'/booklist/delet',
           data:{id:id},
           success:function(d){
                console.log(d);
           }
       })
    }
}

//删除所有
function deleteAll(){
    var selectAll=$('.selAll').prop("checked");
    if(selectAll){
        var items=$('[name=items]:checkbox');
        $.each(items,function(key,item){
            var id=$(this).val();
            deleteData(id);
        })
    }
    $('.my-table tbody>tr').remove();
}










