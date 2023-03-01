var form = layui.form

$(function () {
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })
    initUSerInfo();


    // 表单重置效果
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        initUSerInfo();
    })


    // 发起请求更新用户信息的信息
    $('.layui-form').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发起ajax数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('更新用户信息成功');

                // 调用父页面的方法,重新渲染用户头像和用户的信息
                window.parent.getUserInfo();
            }
        })
    })
})

// 获取用户的基本信息
function initUSerInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败');
            }
            console.log(res);
            form.val('formUserInfo', res.data);

        }
    })
}