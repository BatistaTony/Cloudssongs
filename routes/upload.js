const express = require('express')
const multer = require('multer')
 
const router  = express.Router()
 



router.get('/',(req,res, next)=>{

    var nome =  req.query.user
    var phone = req.query.phone
    var repos = req.query.repos


    res.render('upload',{
        user:nome,
        phone: phone,
        repos:repos

    })  

    next()
})

var mypromise = new Promise((resolve,reject)=>{
    router.get('/',(req,res,next)=>{
        resolve(req.query.repos)
        next()
    })
})

var indx_p = new Promise((resolve,reject)=>{
    router.get('/',(req,res)=>{

        var nome =  req.query.user
        var phone = req.query.phone
        var repos = req.query.repos

        resolve('index_?repos='+repos+'&user='+nome+'&phone='+phone)                      

    })
})



var storage = multer.diskStorage({

    destination:(req,file,callback)=>{
        mypromise.then(res=>{
            callback(null,res)   
        }) 
        
    },
    filename:(req,file,callback)=>{ 
        callback(null, file.fieldname+Date.now()+'.mp3')
    }  
})

var upload = multer({storage : storage}).single('song')

router.post('/upload',(req,res)=>{

   
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            indx_p.then(data=>{
                res.redirect(data)
                data = 0
            })
        }
    })
})


module.exports = router