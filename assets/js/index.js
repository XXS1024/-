$(function () {
    getUserInfo();




    // 退出功能

    var layer = layui.layer;
    $(".btnLogout").on("click", function () {
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 1. 清空本地存储的token
            localStorage.removeItem('token');

            // 2. 重新跳转到登录页面
            location.href = './login.html'
            // 关闭confirm 询问框
            layer.close(index);
        });
    })

})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data);
        },

       
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1. 获取用户名称
    var name = user.nickname || user.username;
    // 2.设置欢迎文本
    $("#welcome").html('欢迎 &nbsp; &nbsp;' + name);

    // 3. 按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 3.2 渲染文字头像
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}