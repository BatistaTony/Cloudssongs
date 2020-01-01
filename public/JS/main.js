

var x = 0




function play2(titulo,singer,song){

    if(titulo.length > 20){
        titulo = titulo.substr(0,20)+'...'
    }

    document.getElementById('title').innerText = titulo
    document.getElementById('artist').innerText = singer
    document.getElementById('player').src=song  
    document.getElementById('player').play() 
    document.getElementById('tocar').src='img/icons8_circled_pause_50px.png'
    x = 1
   
}





function play(){

    if(x == 0){
        document.getElementById('player').play()
        
        x = 1
        document.getElementById('tocar').src='img/icons8_circled_pause_50px.png'
    }
    else{
        x = 0
        document.getElementById('player').pause() 
        document.getElementById('tocar').src='img/icons8_play_button_circled_50px.png'
    }

}

var indice_song = 0

function next(caminho,som,titulo,artist){ 

    som = som.split(',')

    if(indice_song == som.length-1){
        indice_song = som.length-1
    }else{
        indice_song +=1
    }

    

    titulo = titulo.split(',')
    artist = artist.split(',')
    
    var musica = caminho+'/'+som[indice_song]
    document.getElementById('title').innerText = titulo[indice_song]
    document.getElementById('artist').innerText = artist[indice_song]
    document.getElementById('player').src=musica
    document.getElementById('player').play() 
    document.getElementById('tocar').src='img/icons8_circled_pause_50px.png'  
}

function prev(caminho,som,titulo,artist){

    som = som.split(',')

    titulo = titulo.split(',')
    artist = artist.split(',')   
    
    if(indice_song == 0){
        indice_song = 0
    }else{
        indice_song -=1
    }

    var musica = caminho+'/'+som[indice_song]
    document.getElementById('title').innerText = titulo[indice_song]
    document.getElementById('artist').innerText = artist[indice_song]
    document.getElementById('player').src=musica
    document.getElementById('player').play()
    document.getElementById('tocar').src='img/icons8_circled_pause_50px.png'   
}


var loop_n = 0

function loop(){

    if(loop_n == 0){
        document.getElementById('loop_1').src='img/icons8_repeat_one_filled_50px.png'
        document.getElementById('player').loop = true
        loop_n = 1 
    }else{
        document.getElementById('loop_1').src='img/icons8_repeat_filled_50px.png'
        document.getElementById('player').loop = false
        loop_n =0
    }

    
}
