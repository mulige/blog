var express = require('express');
var router = express.Router();
//在这里引入我们的user模型类进行数据库的操作
var User = require('../models/user.js');
//统一返回数据的格式，以便于我们进行数据的操作
var responseData;

router.use(function(req, res, next) {
    responseData = {
        code: '',
        message: ''
    }
    next();
})

/*
* 用户注册的路由，我们获取前端传输过来的数据的话需要中间件的处理
* 进行数据的验证，也就是现在进行验证的逻辑
* */
router.post('/user/register',function(req,res,next) {
    //在经过我们引入中间件进行处理之后我们可以通过req下的body对象获取到前端传递过来的数据
    //下面近行代码的逻辑的处理
    var username = req.body.username;
    var password = req.body.password;
    if(username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return
    }
    if(password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return
    }
    //进行数据库的查询，查询当前注册的用户是不是已经存在，不存在的话我们将会进行数据库的操作，存在的话返回提示，用户名已存在
    //当我们将user引入进来的时候实际上是一个构造函数这个函数中存在一些方法，我们可以通过这些方法对数据库进性行操作
    User.findOne({
        username: username,

    }).then(function(userInfo) {
        // console.log(userInfo)
        //在这个位置进行用户名的验证查看在数据库中是否存在当前的用户
        if(userInfo) {
            responseData.message = '用户已存，请重新输入';
            responseData.code = 3;
            res.json(responseData);
            return
        }
        //在这里进行 User类的实例，然后将我们需要保存的数据传递进去
        var user = new User({
            username : username,
            password : password
        });
        //进行数据的保存，将我们传递过来的数据保存到我们的数据库之中
        return user.save();
        //接下来会执行.then 的方法
        }).then(function (newUserInfo) {
        // console.log(newUserInfo);
        responseData.code = 0;
        responseData.message = '注册成功';
        res.json(responseData);
        return
    })

});
/*
* 这个是用户进行登录的时候的接口
*
* */
router.post('/user/login',function(req,res,next) {
    // console.log(req.body,123)
    var username = req.body.username;
    var password = req.body.password;
    if(username=='') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return
    }
    if(password=='') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    User.findOne({
        username: username,
        password: password
    }).then(function(userInfo) {
        // console.log(userInfo);
        if(!userInfo) {
            responseData.code = 2;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }else {
            //这里是登陆成功时的逻辑，我们应该返回的不仅仅是信息和code值，一起返回的应该还有当前用户的用户名
            responseData.code = 0;
            responseData.message = '登录成功';
            responseData.userInfo = {
                username : userInfo.username,
                isAdmin: userInfo.isAdmin
            }
            // req.cookies.set('userInfo',JSON.stringify({username : userInfo.username, isAdmin: userInfo.isAdmin}))
            res.json(responseData);
            return
        }
    })

})
module.exports = router;