$(function() {
    //这个是注册的逻辑
    var $form = $('#form');
    $form.find('.btn').on('click',function() {
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
              username: $form.find('[name=username]').val(),
              password: $form.find('[name=password]').val(),
            },
            dataType: 'json',
            success: function(result) {
               console.log(result)
            }
        })
    })
//这里是登录的逻辑
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


})