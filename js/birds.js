const birds = new Sprite({
    position: {
        x: 750,
        y: 160 //160
    },

    imageSrc: 'https://thesamueldopke.github.io/Samurai-Fighters/img/birds.png',
    framesMax: 12,
    scale: 2,
    spriteHeight: 2,
    velocity: {
        x: 0,
        y: 0
    },
    height: 192 / 4,
    width: 144 / 3,
    framesHold: 15
})

var random

var movingBirdTop = false
var movingBirdLeft = false
var movingBirdRight = false

var laps = 0
var birdLaps
var intervalTimerTopBottom
var timerintervalMoveBirdTopBottom

var randomY

var birdUp = 1

var velX

var velY

var leftright

var updown

var randomDistanceX

let stopRandom = randomTimer()

var birdsMovingTop = false

function randomDistancePositionX(){
    randomDistanceX = Math.floor(Math.random()*400) + 100
}

function randomTimerTopBottom(){
    intervalTimerTopBottom = Math.floor(Math.random()*900) + 100
}

function timerMoveBirdTopBottom(){
    timerintervalMoveBirdTopBottom = Math.floor(Math.random()*2000) + 1000
}

function randomBirdLaps(){
    birdLaps = Math.floor(Math.random()*2) + 1
}

function randomTimer(){
    random = Math.floor(Math.random()*12) + 3
    random *= 1000
}

function randomDirection(){
    leftright = Math.floor(Math.random()*2)+1
    

}
function randomDirectionUpDown(){
    updown = Math.floor(Math.random()*2)+1
}

function randomDistanceY(){
    randomY = Math.floor(Math.random()*30) + 10
}

function randomVelocity(){
    velX = 6 //Math.floor(Math.random()*3) + 3
    velY = Math.floor(Math.random()*2) + 1
    
    
}


var intervalMoveBird = null

var intervalMoveBirdSides = null

var intervalMoveBirdTopBottom = null


function moveBird(){
    randomVelocity()



        
        if(birds.position.y + birds.velocity.y >= 50){

            if (!intervalMoveBird) { // Só cria um novo intervalo se não houver um ativo
                intervalMoveBird = setInterval(() => {
                    moveBird(); // Chama a função novamente dentro do setInterval
                }, 100);
            }
        
            
            birds.velocity.y = -1.5
            console.log('Execution?')
            movingBirdTop = true
            birdUp++
            
        }else{
            birds.velocity.y = 0
            if (intervalMoveBird) { // Se o intervalo existir, para ele
                clearInterval(intervalMoveBird);
                intervalMoveBird = null;
                console.log('Nada to tipo?');
            }
            setTimeout(() => {
                
                    intervalMoveBirdSides = setInterval(moveBirdSides, 100)
                    
                

                //birds.position.y = 200
            }, 600)
            mbsexe1 = 0
            laps = 0
            
        }


        
    }

var mbsexe1 = 0
function moveBirdSides(){
    
    if(mbsexe1 < 1){
        timerMoveBirdTopBottom()
        randomDistancePositionX()
        randomTimerTopBottom()
        randomDirectionUpDown()
        randomDirection()
        randomBirdLaps()
        randomVelocity()
        mbsexe1++
    }
    console.log(updown)
    
   
    
    if(mbsexe1 < 2){

    if(leftright == 1){
 
            movingBirdTop = false
            movingBirdRight = false
            movingBirdLeft = true
            birds.velocity.x = -3
      
        
        
    }else if(leftright == 2){
        
            movingBirdTop = false
            movingBirdRight = true
            movingBirdLeft = false
            birds.velocity.x = 3
         
    }
    mbsexe1++
    }
    if(birds.position.x == 750 && birds.velocity.x == 0 && birds.position.y == 160 && birds.velocity.y == 0){
        movingBirdRight = false
        movingBirdLeft = false
        birds.framesCurrent = 0
        clearInterval(intervalMoveBirdSides)
        intervalMoveBirdSides = null
        setTimeout(() =>{
            moveBird()
        }, random)
    }
    console.log('Posições: ' + birds.position.x, birds.position.y)
    console.log('Velocidades: ' + birds.velocity.x, birds.velocity.y)

    if(birds.position.x + birds.velocity.x <= -60){
        birds.position.x = 1300
        laps++
    }

    if(birds.position.x + birds.velocity.x >= 1400){
        birds.position.x = -60
        laps++
    }

    console.log('Velocidade X: ' + birds.velocity.x)
    if(laps >= birdLaps){
        var velPos = 0
        var dirVelPos = 0
        var dirVelNeg = 0
        var velNeg = 0
        clearInterval(intervalMoveBirdTopBottom)
        intervalMoveBirdTopBottom = null

        if(birds.velocity.x > 0 && birds.velocity.x + birds.position.x >= 750){
            birds.velocity.x = 0
            birds.position.x = 750
        }

        if(birds.velocity.x < 0 && birds.velocity.x + birds.position.x <=750){
            birds.velocity.x = 0
            birds.position.x = 750
        }


        //Positive Direction
        if(birds.velocity.y + birds.position.y < 160 && birds.velocity.x > 0 && birds.position.x >= randomDistanceX){
            birds.velocity.y = 2
           
            if(birds.position.y + birds.velocity.y >= 160){
                birds.position.y = 160
                birds.velocity.y = 0
            }
        }else if(birds.position.y + birds.velocity.y >= 160 && birds.position.x >= randomDistanceX && birds.velocity.y > 0){
            birds.velocity.y = 0
            birds.position.y = 160

    }

    if(birds.velocity.y + birds.position.y > 160 && birds.velocity.x > 0 && birds.position.x >= randomDistanceX){
        birds.velocity.y = -2
        if(birds.position.y + birds.velocity.y <= 160){
            birds.position.y = 160
            birds.velocity.y = 0
        }
        
    }else if(birds.position.y + birds.velocity.y <= 160 && birds.position.x >= randomDistanceX && birds.velocity.y <= -1){
        birds.velocity.y = 0
        birds.position.y = 160

}



    //Negative Direction
    if(birds.velocity.y + birds.position.y < 160 && birds.velocity.x < 0 && birds.position.x <= 950){

            birds.velocity.y = 2
        

    }else if(birds.position.y + birds.velocity.y >= 160 && birds.position.x <= 950 && birds.velocity.y > 0){
        birds.velocity.y = 0
        birds.position.y = 160

}

if(birds.velocity.y + birds.position.y > 160 && birds.velocity.x < 0 && birds.position.x <= 950){

        birds.velocity.y = -2

}else if(birds.position.y + birds.velocity.y <= 160 && birds.position.x <= 950 && birds.velocity.y <= -1){
    birds.velocity.y = 0
    birds.position.y = 160

}






    }else {
        if (!intervalMoveBirdTopBottom) {
            intervalMoveBirdTopBottom = setInterval(moveBirdTopBottom, timerintervalMoveBirdTopBottom); // Cria o intervalo apenas se não existir um timerintervalMoveBirdTopBottom
        }
        
    }
    console.log(timerintervalMoveBirdTopBottom)
}
    


function moveBirdTopBottom(){
    randomDirectionUpDown()
    console.log('EXECUTANDO BIRD TOP BOTTOM')
   
    if(updown == 1){
        if(birds.velocity.y + birds.position.y >= 16){
            birds.velocity.y = -1
        }
            
        
        
    }else if(updown == 2){
        birds.velocity.y = 1
    }

    setTimeout(() =>{
            birds.velocity.y = 0
            
    }, intervalTimerTopBottom)
}







