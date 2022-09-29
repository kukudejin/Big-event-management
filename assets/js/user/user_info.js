$(function(){
initUserInfo()

    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value){
            if(value.length>6){
                return '昵称的长度必须再1-6个字符之间'
            }
        }
    })
    //初始化用户的基本信息
function initUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0){
                return  layui.layer.msg('获取用户信息失败！')
            }
            //调用form.val() 快速为表单赋值
            form.val('formUserInfo',res.data)
        }
    })
}
$('#btnResset').on('click',function(e){
    //阻止表单默认重置
    e.preventDefault()
    initUserInfo()
})


//监听表单的提交
$('.layui-form').on('submit',function(e){
    //阻止表单的默认提交行为
    e.preventDefault()
    //发起ajax数据请求
    $.ajax({
        method:'POST',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg('更新用户数据失败！')
            }
            layui.layer.msg('更新用户数据成功！')
            getUserInfo()
        }
    })
})
function getUserInfo(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      //headers 就是请求头配置对象
      Headers:{
        Authorization:localStorage.getItem('token')||''
      },
      success:function(res){
        if(res.status !== 0){
          return layui.layer.msg('获取用户信息失败')
        }
        console.log(res.data)
        renderAvatar(res.data)
      },
      complete: function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！'){
          localStorage.removeItem('token')
          location.href = './login.html'
        }
      }
    })
  }
})
function renderAvatar(user){
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    if(user.user_pic !== null){
      //渲染图片头像
      $('.layui-nav-img').attr('src',user.user_pic).show()
      $('.text-avatar').hide()
    }else{
      //渲染文本头像
      $('.layui-nav-img').hide()
      var first = name[0].toUpperCase()
      console.log(first)
      $('.text-avatar').html(first).show()
    }
  }
