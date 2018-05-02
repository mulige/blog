//注册的话需要使用我们的数据库，在这里我们将要使用的是一个mongoose的模块
var mongoose = require('mongoose');
//创建用户的表结构

module.exports = new mongoose.Schema({
    //用户名
    username: String,
    //密码
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})
