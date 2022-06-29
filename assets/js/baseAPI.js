$.ajaxPrefilter(function (option) {
  option.url = "http://www.liulongbin.top:3007" + option.url;
  if (option.url.indexOf("/my/") !== -1) {
    option.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
  option.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      localStorage.removeItem("token");
      location.href =
        "http://127.0.0.1:5500/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5%E5%89%8D%E5%90%8E%E7%AB%AF%E4%BA%A4%E4%BA%92/%E5%A4%A7%E4%BA%8B%E4%BB%B6%E9%A1%B9%E7%9B%AE/login.html";
    }
  };
});
