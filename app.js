/*
* 应用程序的启动文件
* */
//加载express模块
var express = require('express');
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser，用来处理post提交过来的数据(这个的功能是用来开发后端的数据接口)，引入过后我们会在下面的地方进行这个中间件的使用
var bodyParser = require('body-parser');
//加载coolie模块，来保存我们的登录的状态
var Cookies = require('cookies');
//引入目录下的user
var User = require('./models/user');
//创建app应用=>NodeJs http.createServer();
var app = express();
//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应__dirname+'/public'下的文件，也就是说在我们的html文件中例如加载css的时候路径需要添加一个/public的前缀，而这些css文件就需要放置在我们根目录下的public目录下
app.use('/public',express.static(__dirname+'/public'));
//使用我们的bodyParser中间件中的一个方法来处理前端传递过来的数据
app.use(bodyParser.urlencoded({extended: true}));

// 进行cookie的设置
// 只要用户访问我们的网站那么就会经过这个中间件的处理
// app.use(function(req, res, next) {
//     req.cookies = new Cookies(req, res);
//     req.userInfo = {};
//     if(req.cookies.get('userInfo')) {
//         try {
//             req.userInfo = JSON.parse(req.cookies.get('userInfo'));
//             //获取当前登录用户的类型--是不是管理员用户
//             User.findOne({username: req.userInfo.username}).then(function(userInfo) {
//                 req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
//                 next();
//             })
//         }catch (e) {
//             // console.log(e);
//             next();
//         }
//     }
//
//     // console.log(req.cookie.get('userInfo'))
//     next()
// })



//定义当前引用使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数：表示用于处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是存放的路径
app.set('views','./views');
//注册所使用的模板引擎，第一个参数必须是view engine,第二个参数是和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine','html');
//在开发的过程中。需要取消模板缓存
swig.setDefaults({cache: false});
// app.get('/',function(req,res,next) {
//     // res.send('<h1>欢迎光临我的博客</h1>')
//     //这里我们不会使用send方法而是使用res的另外的方法
//     //读取views目录下的指定的文件，解析并返回给客户端，第一个参数：表示模板的文件，相对于views目录 views/index.html
//     //第二个参数： 传递给模板使用的数据
//     res.render('index')
//
// })
/*
* 根据不同的功能划分模块
* */
app.use('/admin',require('./router/admin'));
app.use('/api',require('./router/api'));
app.use('/',require('./router/main'));
app.use('/register',require('./router/main'))
//监听HTTP请求

//链接数据库,接下来的操作我们会安装MongoDB并进入到安装的目录下，打开文件的配置，并且运行MongoDB的服务端的程序，需要开启的命令是：mongod --dbpath=(指向的应该是我们当前的数据存储的路径，在这个项目中我们存储的位置是，我们的项目的db目录)
//mongod.exe --dbpath=D:\myblog\db --port=27018 这个就是我们在MongoDB的目录下打开cmd命令的代码
//mongod.exe是我们需要运行的文件
//--dapath=D:\myblog\db 是我们存放数据的目录
//--port=27018 是我们的端口，默认的端口是27017
mongoose.connect('mongodb://localhost:27018/mynewBlog',function(err) {
    //上面链接的mongodb的地址后面接的是存储在当前的mongodb库的存放位置，也就是我们进行数据的增删改查的位置
    if(err) {
        console.log('数据库连接失败');
    }else {
        console.log('数据库连接成功');
        app.listen(3081,function() {
            console.log('jianting')
        });
    }
});
