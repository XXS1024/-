$(function () {
  // 点击去注册链接
  $("#link_reg").on("click", function () {
    $('.login-box').hide();
    $('.reg-box').show();
  })

  // 点击去登录的链接
  $("#link_login").on("click", function () {
    $('.login-box').show();
    $('.reg-box').hide();
  })


  // 定义校验规则

  // 从layui中获取 form 对象
  var form = layui.form;

  // 从form.verify()函数中自定义校验规则
  form.verify({
    // 自定义一个pwd的校验规则
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则return一个提示的消息即可
      var pwd = $(".reg-box [name=password]").val();
      if (pwd != value) {
        return "两次密码输入不一致"
      }

    }
  })

  // 导入layui 提示组件
  var layer = layui.layer;

  // 监听注册表单的提交行为
  $('#reg-form').on('submit', function (e) {
    // 1. 组织默认提交行为
    e.preventDefault();
    var data = {
      username: $('#reg-form [name=username]').val(),
      password: $('#reg-form [name=password]').val()
    };
    // 2. 发起Ajax的POST请求
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return console.log(res.message);
      }
      layer.msg('注册成功，请登录')

      // 自动调用点击事件
      $('#link_login').click();
    })
  })

  // 监听登录表单的提交行为
  $('#form-login').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return console.log(res.message);
        }
        layer.msg('登录成功');
        // console.log(res.token);
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token);
        // 跳转到后台主页
        localStorage.href = './index.html';
      }
    })
  })

})