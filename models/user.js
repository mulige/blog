/*
* 作用是对我们创建的用户的表进行操作
*
* */
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');
module.exports = mongoose.model('User',usersSchema);