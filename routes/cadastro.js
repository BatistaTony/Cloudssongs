const express = require('express')
const fs = require('fs')
const Mongodb = require('mongodb').MongoClient


const url = 'mongodb://localhost'
 
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('cadastro')
})






Mongodb.connect(url,(err,db)=>{

    if(err){
        console.error(err)
    }else{

        var database  = db.db('mozart')

        router.post('/register',(req,res)=>{

            var nome  = req.body.user
            var phone = req.body.phone
            var repo = nome+'_songs'+phone

            if(nome == '' || phone == ''){
                res.send('Campo vazio, verifique e preecnhe correctamente')
                res.status(404)
            }

            if(nome.length < 3){
                res.send('O nome deve ter no minimo mais de 3 caracteres')
                res.status(404)
            }

            if(phone.length != 9){ 
                res.send('Phone deve ter nove (9) numeros') 
            }

            //ve se o usuario esta registado na base de dados
            database.collection('user').find({nome:`${nome}`, phone:`${phone}`}).toArray((err,result)=>{
                if(err){
                    console.log(err)
                }else{

                    // se estiver faz login e entra no seu repositorio
                    try {
                                         
                        res.redirect('index_?repos=public/songs/'+result[0].repositorio+'&user='+nome+'&phone='+phone)
                        database = db.db('mozart') 

                    }catch(e){
                        //se nn estiver cadastrado faz o cadastro e criar repositorio
                        fs.mkdir('public/songs/'+repo, (err,result)=>{
                            if(err){
                                console.log(err.code)
                            }else{
 
                                database.collection('user').insertOne({nome: nome, phone: phone, repositorio: repo}).then(res=>{
                                    console.log(res.result)
                                    
                                    
                                    database = db.db('mozart') 

                                })
                                
                                res.redirect('index_?repos=public/songs/'+repo+'&user='+nome+'&phone='+phone)
                            }
                        })
                        
                    }

                }
            })

            

        })
    }
})



module.exports = router