$(function () {
  // $.ajax({
  //     type:'GET',
  //     url:'/my/userinfo',
  //     success:function(res){
  //         if(res.status!==0){
  //             return layui.layer.msg(res.message)
  //         }
  //         console.log(res);
  //     }
  // })
  layui.form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd:function(value){
        if (value === $('[name="oldPwd"]').val()) {
            return "新旧密码不能一致"
        }
    },
    rePwd:function(value){
        if (value !== $('[name="newPwd"]').val()) {
            return "两次密码输入不一致"
        }

    }
  });
  $('.layui-form').on('submit',function(e){
e.preventDefault();
$.ajax({
    type:'POST',
    url:'/my/updatepwd',
    data:$(this).serialize(),
    success:function(res){
        if(res.status!==0){
            return layui.layer.msg(res.message)
        }
        layui.layer.msg('密码修改成功')
        $('.layui-form')[0].reset()
    }
})
  })
});
