$(function() {
    //这个是注册的逻辑
    var $form = $('#form');
    $form.find('.btn').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: $form.find('[name=username]').val(),
                password: $form.find('[name=password]').val(),
            },
            dataType: 'json',
            success: function (result) {
                alert('注册成功，点击确定跳转到登录页面')
                window.location.href = 'http://localhost:3081'
            }
        })
    })
    $('#haveFont').find('.iconfont.icon-yanjing-bi').on('mouseover',function() {
        $('#password').attr('type','text');
        $('.iconfont.icon-yanjing-bi').css('display','none');
        $('.iconfont.icon-yanjing-zheng').css('display','block');
    });
    $('#haveFont').find('.iconfont.icon-yanjing-zheng').on('mouseout',function() {
        $('#password').attr('type','password');
        $('.iconfont.icon-yanjing-bi').css('display','block');
        $('.iconfont.icon-yanjing-zheng').css('display','none');
    })
})