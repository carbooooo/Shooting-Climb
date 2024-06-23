
//  variabili globali per gestire il canvas le y e x dello sfondo e la velocita progressiva di caduta del player
const c = document.getElementById('canvas')
const ctx = c.getContext('2d')
const Obstacles = ["img/Asteroid-A-10-01.png","img/Asteroid-A-10-14.png","img/Asteroid-A-10-30.png","img/Asteroid-A-10-46.png","img/satellite.png","img/satellite2.png","img/station.png","img/ship_dart.png","img/ship_dart_zom.png","img/ship_dart_pirate.png"]
let xbg = 0
let ybg = 0
let fallingSpeed = 0
let WeaponPos = 0


// Load dello sfondo
const bg = new Image()
bg.src="img/bg.png"
bg.onload = function() {
    ctx.drawImage(bg, xbg, ybg);
};


// Funzione per randomizzare dei valori
function randint(min,max){
    let num = Math.random()
    num = (num*(max-min))+min
    return Math.trunc(num) // converto a int
}

// Classe per la generazione dei colpi che il player deve raccogliere
class Bullet{
    constructor(x=150,y=50,src="img/recharge.png"){
        this.x = x
        this.y = y
        this.img = new Image()
        this.img.src = src
    }
    generate(){
        this.x = randint(100,700)
        this.y = randint(0,20)
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,20,20)
    }
}


// classe per la generazione degli ostacoli
class ObstacleElement{
    constructor(x,y,speed,src){
        this.x = x
        this.y = y
        this.img = new Image()
        this.img.src = src
        this.w = this.img.width
        this.h = this.img.height
        this.speed = speed
    }
    update(){
        this.y+=this.speed
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y)
    }

}

// Classe giocatore principale
class Player{
    constructor(x, y, width, height, lives, shots,score, src,gunSrc) {
        this.x = x
        this.y = y

        this.altezza = 7000
        this.fallingSpeed = 0

        this.w = width
        this.h = height

        this.shots = shots
        this.score = score

        this.img = new Image()
        this.img.src = src

        this.gun = new Image()
        this.gun.src = gunSrc

        this.CanShot = true

        // controllo fondamentale per la fisica degli ostacoli/munizioni
        this.shotted = false

        // direzione spari
        c.addEventListener('click', e =>{
            if(this.CanShot){
                let canvasRect = c.getBoundingClientRect();
                let mouseX = e.clientX - canvasRect.left;
                let  mouseY = e.clientY - canvasRect.top;

                let k = 0
                let reducer = 0

                this.shots-=1;
                this.score+=100;

                if((mouseX) > this.x){
                    // spinta a sinistra

                    if((mouseY)<this.y){
                        // spinta verso il basso

                        if(mouseX>=this.x-30 && mouseX<=this.x+30){
                            this.altezza-=this.y/2
                            this.fallingSpeed=0
                            setInterval(()=>{if(k<50){ybg-=10;k+=0.5}else{clearInterval(this)}},2)
                        }
                        else if(mouseY>=this.y-50 && mouseY<=this.y+50){
                            //this.altezza-=this.y
                            this.fallingSpeed=0
                            setInterval(()=>{if(k<50){this.x-=2.5;ybg+=6;k+=0.5}else{clearInterval(this)}},2)
                        }
                        else{
                            this.altezza-=this.y/2
                            this.fallingSpeed=0
                            setInterval(()=>{if(k<50){this.x-=1;ybg-=10;k+=0.5}else{clearInterval(this)}},2)
                        }


                    }else{
                        this.shotted = true
                        // spinta verso l'alto

                        if(mouseX>=this.x-30 && mouseX<=this.x+30){
                            this.altezza+=this.y*2
                            this.fallingSpeed=0
                            setInterval(()=>{if(k<50){ybg+=12;k+=0.5}else{clearInterval(this)}},2)
                        }
                        else if(mouseY>=this.y-50 && mouseY<=this.y+50){
                            //this.altezza-=this.y
                            this.fallingSpeed=0
                            setInterval(()=>{if(k<50){this.x-=2.5;ybg+=6;k+=0.5}else{clearInterval(this)}},2)
                        }
                        else{
                            this.altezza+=this.y*2
                            this.fallingSpeed=0
                            setInterval(()=>{if(k<50){this.x-=1;ybg+=12;k+=0.5}else{clearInterval(this)}},2)
                        }

                    }
                }else{
                    // spinta a destra

                    if((mouseY)<this.y){
                        // spinta verso il basso


                        if(mouseX>=this.x-30 && mouseX<=this.x+30){
                            this.altezza-=this.y/2
                            this.fallingSpeed=0
                            setInterval(()=>{if(k<50){ybg-=15;k+=0.5}else{clearInterval(this)}},2)
                        }
                        else if(mouseY>=this.y-50 && mouseY<=this.y+50){
                            //this.altezza-=this.y
                            this.fallingSpeed=0
                            setInterval(()=>{if(k<50){this.x+=2.5;ybg+=6;k+=0.5}else{clearInterval(this)}},2)
                        }
                        else{
                            this.altezza-=this.y/2
                            this.fallingSpeed=0
                            setInterval(()=>{if(k<50){this.x+=1.5;ybg-=15;k+=0.5}else{clearInterval(this)}},2)
                        }


                    }else{
                        this.shotted = true
                        // spinta verso l'alto

                        if(mouseX>=this.x-30 && mouseX<=this.x+30){
                            this.altezza+=this.y*2
                            this.fallingSpeed=0
                            setInterval(()=>{if(k<50){ybg+=12;k+=0.5}else{clearInterval(this)}},2)
                        }
                        else if(mouseY>=this.y-50 && mouseY<=this.y+50){
                            //this.altezza-=this.y
                            this.fallingSpeed=0
                            setInterval(()=>{if(k<50){this.x+=2.5;ybg+=6;k+=0.5}else{clearInterval(this)}},2)
                        }
                        else{
                            this.altezza+=this.y*2
                            this.fallingSpeed=0
                            setInterval(()=>{if(k<50){this.x+=1.5;ybg+=12;k+=0.5}else{clearInterval(this)}},4)
                        }
                        
                    }
                }

            }
        })

        c.addEventListener('mousemove', e =>{
            let canvasRect = c.getBoundingClientRect();
            let mouseX = e.clientX - canvasRect.left;
            let  mouseY = e.clientY - canvasRect.top;

            if((mouseX) > this.x){
                // spinta a sinistra
                if((mouseY)<this.y){
                    // spinta verso il basso
                    if(mouseX>=this.x-30 && mouseX<=this.x+30){WeaponPos=6}
                    else if(mouseY>=this.y-50 && mouseY<=this.y+50){WeaponPos=1}
                    else{WeaponPos=7}
                }else{
                    // spinta verso l'alto
                    if(mouseX>=this.x-30 && mouseX<=this.x+30){WeaponPos=2}
                    else if(mouseY>=this.y-50 && mouseY<=this.y+50){WeaponPos=1}
                    else{WeaponPos=8}
                }
            }else{
                // spinta a destra
                if((mouseY)<this.y){
                    // spinta verso il basso
                    if(mouseX>=this.x-30 && mouseX<=this.x+30){WeaponPos=6}
                    else if(mouseY>=this.y-50 && mouseY<=this.y+50){WeaponPos=4}
                    else{WeaponPos=5}
                }else{
                    // spinta verso l'alto
                    if(mouseX>=this.x-30 && mouseX<=this.x+30){WeaponPos=2}
                    else if(mouseY>=this.y-50 && mouseY<=this.y+50){WeaponPos=4}
                    else{WeaponPos=3}
                }
            }

        })

    }

    draw(){
        // roll dello sfondo a seconda di dov'è il palyer
        if(ybg<0){ybg=c.height}
        else if(ybg>c.height){ybg=0}

        // caduta del player
        if(xbg>0){xbg=0}
        this.fallingSpeed +=0.10
        ybg-=this.fallingSpeed
        this.altezza-=Math.trunc(this.fallingSpeed)

        // reset del gioco, il giocatore ha raggiunto altezza sotto 0, la partita è terminata
        if(this.altezza<0){
            main.run=false
            let txt = document.getElementById("HeightDiv")
            let background = document.getElementById("body")

            txt.textContent = "Height: 0"
            background.style.backgroundColor = 'darkred';

            txt = document.getElementById("title")
            txt.textContent = "Game Over"

            txt = document.getElementById("subtitle")
            txt.textContent = "You got too down (heigth = 0)"

            // reset della partita (viene refreshata la pagina)
            txt = document.getElementById("ObsDiv")
            txt.textContent = "Restart"

            txt.addEventListener('click',e=>{
                location.reload();
            })

        }

        // disegno lo sfondo
        ctx.drawImage(bg, xbg, ybg-c.height);
        ctx.drawImage(bg, xbg, ybg);

        // disegno il player
        ctx.drawImage(this.img,this.x,this.y,this.w,this.h)

        // direzione fucile
        switch(WeaponPos){
            case 1:
                this.gun.src = "img/gun.png"
                ctx.drawImage(this.gun,(this.x+50),(this.y-this.h/7),70,70)
                break
            case 2:
                this.gun.src = "img/gunDown.png"
                ctx.drawImage(this.gun,(this.x-15),this.y+50,70,70)
                break
            case 3:
                this.gun.src = "img/gunDownLeft.png"
                ctx.drawImage(this.gun,(this.x-70),(this.y+50),50,50)
                break
            case 4:
                this.gun.src = "img/gunLeft.png"
                ctx.drawImage(this.gun,(this.x-80),(this.y-this.h/7),70,70)
                break
            case 5:
                this.gun.src = "img/gunUpLeft.png"
                ctx.drawImage(this.gun,(this.x-70),(this.y-50),50,50)
                break
            case 6:
                this.gun.src = "img/gunUp.png"
                ctx.drawImage(this.gun,(this.x-15),(this.y-70),70,70)
                break
            case 7:
                this.gun.src = "img/gunUpRight.png"
                ctx.drawImage(this.gun,(this.x+50),(this.y-50),50,50)
                break
            case 8:
                this.gun.src = "img/gunDownRight.png"
                ctx.drawImage(this.gun,(this.x+50),(this.y+50),50,50)
                break
            default:
                break
        }

    }
    update(){
        if(this.x>c.width){
            this.x =-50
        }
        if(this.x<-50){
            this.x = c.width
        }
    }

    collides(on){
        return !(this.x + this.w < on.x || this.x>on.x + on.w || this.y+this.h<on.y || this.y>on.y+on.h)
    }
}

class Main{
    constructor(){
        this.p = new Player(c.width/2-40,c.height/2+20,35,55,0,30,0,"img/character.png","img/gun.png")
        this.b = new Bullet()
        this.ob  = []
        this.run = false
        this.Nobs = randint(1,8)
        this.Slowest = undefined

        for(let i=0;i<this.Nobs;i++){

            let x = randint(100,700)
            let y = randint(-200,-10)
            let type = randint(0,Obstacles.length)
            let speed = randint(1,5)
            this.ob[i] = new ObstacleElement(x,y,speed,Obstacles[type])
            if(i===0){
                this.Slowest = this.ob[i]
            }
            else{
                if(this.Slowest.speed>this.ob[i].speed){
                    this.Slowest = this.ob[i]
                }
            }
        }
    }
    draw(){
        this.p.draw()
        this.b.draw()
        for(let i=0;i<this.ob.length;i++){
            this.ob[i].draw()
        }
    }
    update(){

        // creating obstacles

        this.Slowest.update()

        for(let i=0;i<this.ob.length;i++){
            this.ob[i].update()
            if(this.p.collides(this.ob[i])){
                this.run=false
                let txt = undefined

                let background = document.getElementById("body")

                background.style.backgroundColor = 'darkred';

                txt = document.getElementById("title")
                txt.textContent = "Game Over"

                txt = document.getElementById("subtitle")
                txt.textContent = "Watch your head!! (you hit an obstacle)"

                txt = document.getElementById("ObsDiv")
                txt.textContent = "Restart"

                txt.addEventListener('click',e=>{
                    location.reload();
                })


            }
        }
        if(this.Slowest.y>500){
            this.ob = []
            this.Nobs = randint(1,10)
            for(let i=0;i<this.Nobs;i++){
                let x = randint(50,700)
                let y = randint(-200,-10)
                let type = randint(0,Obstacles.length)
                let speed = randint(1,5)
                let indx = 0
                this.ob[i] = new ObstacleElement(x,y,speed,Obstacles[type])

                if(i===0){
                    this.Slowest = this.ob[i]
                }
                else{
                    if(this.Slowest.speed>this.ob[i].speed){
                        this.Slowest = this.ob[i]
                        indx=i
                    }
                }
                this.ob[indx].y-=100
            }
        }


        // gestione fisica proiettile
        if(this.b.y>500){
            this.b.generate()
        }
        else if(this.b.y<0 && this.p.shotted){
            this.b.generate()
        }
        else{
            if(this.p.shotted){

                let i = 0

                for(let k=0;k<this.Nobs;k++){
                    let g = 0

                    while(g<100){
                        this.ob[k].y+=0.10
                        g+=1
                    }
                }
                setInterval(()=>{if(i<60){this.b.y+=1.25;i+=0.5}else{clearInterval(this)}},2)

                this.p.shotted=false
            }
            else{
                this.b.y-=(this.p.fallingSpeed)/3
            }
        }

        this.p.update()


        // hitbox player con le munizioni
        if( (((this.b.x>=Math.trunc(this.p.x)) && (this.b.x<=(Math.trunc(this.p.x)+40))) && ((this.b.y>=Math.trunc(this.p.y))&&(this.b.y<=(Math.trunc(this.p.y)+60))))){
            this.b.generate()
            this.p.shots += randint(4,7)
        }

        // score
        let score = document.getElementById("ScoreDiv")
        score.textContent = "Score: "+this.p.score

        // altezza
        let altezza = document.getElementById("HeightDiv")
        altezza.textContent = "Height: "+this.p.altezza

        // colpi
        let text = document.getElementById("ShotsDiv")
        text.textContent = "Shots: "+this.p.shots

        text = document.getElementById("ObsDiv")
        text.textContent = "Obstacles: "+this.Nobs

        if(this.p.shots<=0){
            this.p.CanShot = false
        }
        else{
            this.p.CanShot = true
        }
    }

}

const main = new Main()
main.run = true
function draw(){
    if(main.run){
        ctx.clearRect(0, 0, c.width, c.height);
        //ctx.drawImage(bg, 0, 0)
        main.update()
        main.draw()
    }
    requestAnimationFrame(draw)
}
draw()

// cursore
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.pageY - scrollY + 'px';
    cursor.style.left = e.pageX + 'px';
});
