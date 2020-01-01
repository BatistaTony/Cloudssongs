const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')

var app = express()

app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

var cadastro = require('./routes/cadastro')
var index = require('./routes/index')
var upload = require('./routes/upload')
var delete_song = require('./routes/delete')

app.use('/index_',index)
app.use('/',cadastro)
app.use('/upload', upload)
app.post('/upload', upload)
app.use('/delete', delete_song)

app.use((req,res)=>{
    res.status(404)
    res.send('404 page Not found')
})
 
app.listen(3000) 