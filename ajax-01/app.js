const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();

//静态资源访问服务功能
app.use(express.static(path.join(__dirname,'public')))
//创建路由
// app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.get('/first',(req,res)=>{
    res.send('hello ajax');
})
app.get('/responseData',(req,res)=>{
    res.send({"name":"zs","age":20})
})
app.get('/get',(req,res)=>{
    res.send(req.query);
})
app.post('/post',(req,res)=>{
    res.send(req.body)
    })
    app.post('/json',(req,res)=>{
        res.send(req.body)
        })
    app.get('/error',(req,res)=>{
        res.status(400).send('not ok')
    })
app.listen(8000,function(){
    console.log('http://localhost:8000')
})