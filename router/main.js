var express = require('express');
var router = express.Router();
router.get('/',function(req,res,next) {
    // console.log(req.userInfo);
    res.render('main/login')
});
router.get('/register',function(req,res,next) {
    res.render('main/register')
});
module.exports = router;