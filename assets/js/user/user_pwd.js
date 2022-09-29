$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位且不能出现空格'],
        password:function(value){
            var pwd  = $('.layui-form-item [name=npwd]').val()
            if(pwd!== value){
                return '两次密码不一致'
            }
        }
    })
    
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        var oPwd = $('#opwd').val()
        var nPwd = $('#npwd').val()
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:{
                oldPwd:oPwd,
                newPwd:nPwd
            },
            success:function(res){
                // console.log(res)
                if(res.status!==0){
                    return layui.layer.msg(res.message)
                }
                return layui.layer.msg(res.message)
            }
        })
    })
})