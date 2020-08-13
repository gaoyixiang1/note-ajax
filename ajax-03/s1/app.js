const express = require('express');
const path = require('path');
//向其他服务器请求数据
const request = require('request')
const app = express();
app.use(express.static(path.join(__dirname,'public')));

app.get('/server',(req,res)=>{
    request('http://localhost:3001/cross',(err,response,body)=>{
      res.send(body)
        
    })
   
})
app.listen(3000,function(){
    console.log('http://localhost:3000');
})