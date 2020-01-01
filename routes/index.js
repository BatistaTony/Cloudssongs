const express  = require('express')
const fs =  require('fs')
const nodeId3 = require('node-id3')


var router = express.Router()


router.get('/',(req,res)=>{

    var nome =  req.query.user
    var phone = req.query.phone
    var repos = req.query.repos

    //console.log(repos)

 
    fs.readdir(req.query.repos,(err,song)=>{
        if(err){
            console.error(err)
            res.send('Something is wrong')
        }else{
            
            if(song.length == 0){
                
                res.redirect('upload?repos='+repos+'&user='+nome+'&phone='+phone)

            }

            var artist = []
            var title = []
            var album = []  
            var musicas = song
            var caminho = []
            var musica_c = []
  
            
            for(var x in song){ 
                              
                nodeId3.read(req.query.repos+'/'+song[x],(err,song)=>{
                    if(err){ 
                        console.error(err.code)
                    }else{       
                        
                        try {

                            title.push(song.title)                
                            artist.push(song.artist) 
                            album.push(song.album)
                            caminho.push(req.query.repos)

                            //console.log(caminho+'/'+musicas[x])
                            // console.log(musicas)
                            //console.log(musicas[x])
                            
                            

                            musica_c.push(caminho)

                            //console.log(caminho[x].replace('public/',''))
                            
                            if(title.length == musicas.length){

                                

                                res.render('index',{
                                    user: nome, 
                                    phone: phone,
                                    repos: repos,
                                    songs: title,
                                    artist: artist,
                                    album: album,
                                    caminho:caminho[x++].replace('public/',''),
                                    musicas:musicas,
                                     
                                })  
                                
                            }                   

                        }catch(err){
                            console.log(err.code)
                        }
                        
                    }
                })
                
            } 

            
        }
    }) 
}) 


module.exports = router