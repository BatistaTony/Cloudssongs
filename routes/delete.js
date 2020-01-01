const express = require('express')
const fs = require('fs')

var router  = express.Router()

router.get('/',(req,res)=>{
    
    var dir = 'public/'+req.query.repos+'/'+req.query.song
    var repos = req.query.repos
    var nome = req.query.user
    var phone = req.query.phone

    fs.unlink(dir,(err,result)=>{
        if(err){
            console.log(err)
            res.send("Erro ao apagar a musica")
        }else{
            console.log('Uma musica foi apagada')
            res.redirect(`index_?repos=public/${repos}&user=${nome}&phone=${phone}`)
        }
    })
})


module.exports = router