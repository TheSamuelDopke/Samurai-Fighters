class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}, spriteHeight, velocity, height = 150, width = 50, framesHold}){
        this.position = position
        this.height = height
        this.width = width
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 30
        this.offset = offset
        this.spriteHeight = spriteHeight
        this.velocity = velocity
        this.framesHold = framesHold
    }

    draw(){
        if(this.spriteHeight == 1 || this.health > -1000){
            ctx.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x - this.offset.x, 
                this.position.y - this.offset.y, 
                (this.image.width / this.framesMax) * this.scale, 
                this.image.height * this.scale) 
        }

        if(this.spriteHeight == 2){
            
                ctx.drawImage(
                    this.image,
                    (this.framesCurrent % 3) * (this.image.width / 3), // Coluna atual (índice horizontal)
                    Math.floor(this.framesCurrent / 3) * (this.image.height / 4), // Linha atual (índice vertical)
                    this.image.width / 3, // Largura de cada sprite
                    this.image.height / 4, // Altura de cada sprite
                    this.position.x - this.offset.x, // Posição X no canvas
                    this.position.y - this.offset.y, // Posição Y no canvas
                    (this.image.width / 3) * this.scale, // Largura ajustada ao canvas
                    (this.image.height / 4) * this.scale // Altura ajustada ao canvas
                );

                this.position.y += this.velocity.y
                this.position.x += this.velocity.x

                if(this.position.y + this.velocity.y <= 15){
                    this.velocity.y = 0
                }else if(this.position.y + this.velocity.y >= 280){
                    this.velocity.y = 0
                }


            
        }

}



    animateFrames(){
        
            if(this.spriteHeight == 1 || this.health > -1000){
                    this.framesElapsed++

                if(this.framesElapsed % this.framesHold === 0){
                if(this.framesCurrent < this.framesMax - 1){
                    this.framesCurrent++
                }else{
                    this.framesCurrent = 0
                }
            
            }
            }

        
  
        if(this.spriteHeight == 2 ){
            this.framesElapsed++
  


                if(this.framesElapsed % this.framesHold === 0){

                        if(movingBirdLeft == true){
                            if(this.framesCurrent !== 3 && this.framesCurrent !== 4 && this.framesCurrent !== 5){
                                this.framesCurrent = 3
                            }
                            if(this.framesCurrent < 5){
                                this.framesCurrent++
                            }else{
                                this.framesCurrent = 3
                            }
                        }else if(movingBirdRight == true){
                            if(this.framesCurrent !== 6 && this.framesCurrent !== 7 && this.framesCurrent !== 8){
                                this.framesCurrent = 6
                            }
                            if(this.framesCurrent < 8){
                                this.framesCurrent++
                            }else{
                                this.framesCurrent = 6
                            }
                        }
                        if(movingBirdTop == true){
                            if(this.framesCurrent < 2){
                                this.framesCurrent++
                            }else{
                                this.framesCurrent = 0
                            }
                        }





                }
            
        }

    }

    
    update(){
        this.draw()
        this.animateFrames()
  
        }
}

//Put the Sprite methods in the Fighter class
//We need to determinate what we want overwrite and what we want to keep directly of the Sprite class
//We passed the imageSrc, scale and framesMax from the Sprite class to this class here
class Fighter extends Sprite{
    constructor({
        position, 
        velocity, 
        color = 'red', 
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = {x: 0, y: 0},
        sprites,
        framesHold,
        attackBox = {offset: {}, width: undefined, height: undefined},
        spriteHeight
    }){

        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.spriteHeight = spriteHeight
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        },
        this.color = color
        this.isAttacking = false
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = framesHold
        this.sprites = sprites
        this.dead = false
        this.jumping = 0

        //Have to be a const
        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        this.attackCooldown = 600
        this.canAttack = true
        
    }

    
  

    update(){
        this.draw()
        if(!this.dead){
            this.animateFrames()
            this.canvaslimit()
        }
        if(this.health <= 0){
            this.switchSprite('death')
            determineWinner({player, enemy, timerId})
        }

   
        


        //Draw attackbox
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        
        // ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        // ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width,this.attackBox.height)


        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 94){
            this.velocity.y = 0
            this.position.y = 338
        }else{
            this.velocity.y += gravity
        }
        
    }

    restart(){
        this.image = this.sprites.idle.image
        this.framesMax = this.sprites.idle.framesMax
        this.framesCurrent = 0
    }

    attack(){
        if(this.canAttack){
            this.switchSprite('attack1')
            this.isAttacking = true
            this.canAttack = false

            setTimeout (() =>{
                this.canAttack = true
            }, this.attackCooldown)
        }



    }

    takeHit(){
        console.log(damage)

        this.health -= damage
        
        if(this.health <= 0){
            this.switchSprite('death')
            
        }else{
            this.switchSprite('takeHit')
            this.velocity.y = -15
            
            
        }
    }

    canvaslimit(){
        if(this.position.x + this.velocity.x <= 0 + 10 || this.position.x + this.velocity.x >= canvas.width - 35){
            this.velocity.x = 0
        }
        
    }



    switchSprite(sprite){
        if(this.image === this.sprites.death.image){
            if(this.framesCurrent == this.sprites.death.framesMax - 1){
                this.dead = true
            }
            return}
        //overriding all other animations with the attack animation
        if(
            this.image === this.sprites.attack1.image && 
            this.framesCurrent < this.sprites.attack1.framesMax - 1) {return}

        //override when fighter gets hit
        if(this.image === this.sprites.takeHit.image && 
            this.framesCurrent < this.sprites.takeHit.framesMax -1) {return}
        
            
        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image && this.image !== this.sprites.death.image){
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                
                break

            case 'run':
                if(this.image !== this.sprites.run.image && this.image !== this.sprites.death.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                
                break


            case 'jump':
                if(this.image !== this.sprites.jump.image && this.image !== this.sprites.death.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }

                break


            case 'fall':
                if(this.image !== this.sprites.fall.image && this.image !== this.sprites.death.image){
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                
                break

            case 'attack1':
                if(this.image !== this.sprites.attack1.image && this.image !== this.sprites.death.image){
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                }
                    
                break 
                
                
            case 'takeHit':
                if(this.image !== this.sprites.takeHit.image && this.image !== this.sprites.death.image){
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                    }
                        
                break 

            case 'death':
                if(this.image !== this.sprites.death.image ){
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }

        }
    }

    }
