$(function () {
  getUserInfo();
  $('#tuichu').on('click',function(){
    layui.layer.confirm('确定退出吗？', {icon: 3, title:'提示'}, function(index){
        localStorage.removeItem('token')
        location.href='http://127.0.0.1:5500/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5%E5%89%8D%E5%90%8E%E7%AB%AF%E4%BA%A4%E4%BA%92/%E5%A4%A7%E4%BA%8B%E4%BB%B6%E9%A1%B9%E7%9B%AE/login.html'
        layer.close(index);
      });
  })
});
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      rederAvatar(res.data);
    }
  });
}
function rederAvatar(user) {
  var data = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;&nbsp;" + data);
  if (user.user_pic) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    var first = data[0].toUpperCase();
    $(".text-avatar").html(first);
  }
}
