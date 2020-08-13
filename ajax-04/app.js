const express = require('express')
const path = require('path')
const app = express();

app.use(express.static(path.join(__dirname,'public')))
app.get('/base',(req,res)=>{
    res.send('ok')
})
app.post('/base',(req,res)=>{
    res.send('post')
})
app.get('/user',(req,res)=>{
    res.send(req.query)
})
app.post('/user',(req,res)=>{
    res.send(req.body)
})
app.get('/jsonp',(req,res)=>{
    const cb = req.query.cb;
    const data =cb+ '({name:"gao"})'
    res.send(data)
    // res.jsonp({
    //     name:'gyx',
    //     age:20
    // })
})
app.listen(3000);