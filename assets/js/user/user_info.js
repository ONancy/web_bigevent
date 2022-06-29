$(function () {
  initUserInfo();
  formVerity();
  $("#revise_form").on("submit", function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
       initUserInfo();
       window.parent. getUserInfo()
      },
    });
  });
  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });
});
function formVerity() {
  layui.form.verify({
    nickname: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\S·]+$").test(value)) {
        return "用户名不能有特殊字符";
      }
      if (value.length > 6) {
        return "昵称长度必须再1~6个字符之间！";
      }
      //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
      if (value === "xxx") {
        alert("用户名不能为敏感词");
        return true;
      }
    },
  });
}
function initUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      console.log(res);
      layui.form.val("formUserInfo", res.data);
    },
  });
}
