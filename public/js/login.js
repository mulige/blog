$(function() {
    var $login = $('#login');
    $login.find('.login_btn').on('click',function() {
        console.log($login.find('[name=login_username]').val())
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $login.find('[name=login_username]').val(),
                password: $login.find('[name=login_password]').val(),
            },
            dataType: 'json',
            success: function(result) {
                console.log(result);
                //这里我们成功登录获取到后端返回的数据，我们会根据这个数据进行操作
                if(result.code==0) {
                    alert('登录成功')
                }
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