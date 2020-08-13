const express = require('express');
const path = require('path');
const mysql = require('mysql')
const app = express();

const connection = mysql.createConnection({
    host  : 'localhost',
    user  : 'root',
    password : '123456',
    database : 'Login',
    charSet: 'UTF-8',
    port:'3306'
})

connection.connect(function(err){
    if(err) throw err;
    console.log('success');
})

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','regin.html'))
})

app.get('/regin',(req,res)=>{
    const uname = req.query.name;
    const upwd = req.query.pwd;
    const user = [uname,upwd];
    const addStr = `insert into login (uname,pwd) values (?,?)`;
    connection.query(addStr,user,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows ===1){
            console.log('注册成功');
            res.sendFile(path.join(__dirname,'public','login.html'))
        }
    })
})


app.get('/login',(req,res)=>{
    const uname = req.query.name;
    const upwd = req.query.pwd;
    const selectStr = `select uname,pwd from login where uname = '${uname}' and pwd = '${upwd}'`;
    connection.query(selectStr,(err,result)=>{
        if(err) throw err;
        const data = JSON.parse(JSON.stringify(result));
        if(data.length){
            res.sendFile(path.join(__dirname,'public','success.html'))
        }
        res.sendFile(path.join(__dirname,'public','login.html'))
    })
})

app.listen(9000,function(){
    console.log('http://localhost:9000');
})