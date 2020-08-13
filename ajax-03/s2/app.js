const express = require('express');
const path = require('path');
var session = require('express-session');
const formidable = require('formidable');
const app = express();
app.use(express.static(path.join(__dirname,'public')));
//拦截所有请求
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    //允许使用那些请求访问
	res.header('Access-Control-Allow-Methods','get,post');
	// res.header('Access-Control-Allow-Credentials', true);
    next()
})


app.get('/test',(req,res)=>{
    const result = 'fn({name:"zs"})';
    res.send(result)
})

app.get('/better',(req,res)=>{
    res.jsonp({name:"tw",age:"many"})
    // const fnName = req.query.callback;
    // const result = fnName+'({name:"gyx"})';
    // res.send(result)
})

app.get('/cross',(req,res)=>{
    //允许谁访问
    res.header('Access-Control-Allow-Origin','*')
    //允许使用那些请求访问
    res.header('Access-Control-Allow-Methods','get,post')
    res.send('okkkgyx')
})

app.post('/login', (req, res) => {
	// 创建表单解析对象
	var form = formidable.IncomingForm();
	// 解析表单
	form.parse(req, (err, fields, file) => {
		// 接收客户端传递过来的用户名和密码
		const { username, password } = fields;
		// 用户名密码比对
		if (username == 'itheima' && password == '123456') {
			// 设置session
			req.session.isLogin = true;
			res.send({message: '登录成功'});
		} else {
			res.send({message: '登录失败, 用户名或密码错误'});
		}
	})
});

app.get('/checkLogin', (req, res) => {
	// 判断用户是否处于登录状态
	if (req.session.isLogin) {
		res.send({message: '处于登录状态'})
	} else {
		res.send({message: '处于未登录状态'})
	}
});

app.listen(3001,function(){
    console.log('http://localhost:3001');
})