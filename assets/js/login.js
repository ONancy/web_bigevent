$(function () {
  $("#to_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#to_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  var form = layui.form;
  // 导入layer 调用layer.msg()来设置提示消息
  var layer = layui.layer;
  form.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5·]+$").test(value)) {
        return "用户名不能有特殊字符";
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'";
      }
      if (/^\d+\d+\d$/.test(value)) {
        return "用户名不能全为数字";
      }
      if (/^\s/.test(value)) {
        return "用户名不能出现空格";
      }

      //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
      if (value === "xxx") {
        alert("用户名不能为敏感词");
        return true;
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repass: function (value) {
      if (value !== $(".reg-box [name=password]").val()) {
        return "两次输入的密码不同";
      }
    },
  });

  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    };
    $.post("/api/reguser", data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功，请登录!");
      $("#to_login").click();
    });
  });
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.post("/api/login", data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("登录成功");
      // 将登录成功得到的token字符串，保存到localStorage种
      localStorage.setItem("token", res.token);
      location.href='http://127.0.0.1:5500/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5%E5%89%8D%E5%90%8E%E7%AB%AF%E4%BA%A4%E4%BA%92/%E5%A4%A7%E4%BA%8B%E4%BB%B6%E9%A1%B9%E7%9B%AE/index.html'
    });
  });
});
