const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let larguraMario =  20;
let alturaMario = 40;
let mario;
let esperandoTroca = false;
let pulo = 0;
let cair = 0;
let limiteDireta = 520
let limiteEsquerda =  124;
let cairaparafora = 0;

export function iniciarMario() {
    mario = {
        width: larguraMario,
        height: alturaMario,
        x: canvas.width/2,
        y: canvas.height/2 -90,
        pulo:false,
        caiu:false
    };
}

export function desenharMario(angulo) {
    // ctx.save(); 
    // ctx.translate(mario.x + mario.width / 2, mario.y + mario.height / 2);
    // ctx.rotate(angulo);
    // ctx.fillStyle = "red";
    // //mario.y = -mario.height / 2 + raio * Math.sin(angulo) - mario.height / 2;
    // ctx.fillRect(-mario.width / 2, -mario.height / 2  , mario.width, mario.height);
    // ctx.restore();
    ctx.fillStyle = "red";
    moveMarioy(angulo);
    ctx.fillRect(mario.x , mario.y +165 - pulo - cair +cairaparafora , mario.width , mario.height);
}


export function moveMario(cordenada, direcao) {
    if (cordenada == "x") {
        let novaX = mario.x + larguraMario / 1.5 * direcao;
        mario.x = novaX;
    }

    if(cordenada == "y"){
        if( pulo == 0){
        mario.pular =  true;
    }
     
    }
}

export function fazMarioPular(){
    if(mario.caiu){
        return;
    }
    if(mario.pular == true ){
    pulo  += 3;
    console.log("jajajaj")
    esperandoTroca = true;
    }
    if(mario.pular == false  && pulo > 0 ){
        pulo -=3;
    }
    if(mario.pular == true  && esperandoTroca == true ){
    setTimeout(() => {
        mario.pular = false;
        esperandoTroca = false;
      }, 1000);    
    }
}


function moveMarioy(angulo) {
    let alturaPlataforma = 100;
    const cx = canvas.width / 2;
    const cy = alturaPlataforma;
    const dx = mario.x + mario.width / 2 - cx;
    const dy = dx * Math.tan(angulo);
    mario.y = cy + dy - mario.height;
}




export function fazMarioCair(){
  console.log(mario.x);
  if(pulo){
    return;
  }
  if(mario.x > limiteDireta  || mario.caiu == true ){
  cairaparafora += 3;
  mario.caiu = true;
  }
  if(mario.x < limiteEsquerda || mario.caiu == true){
    cairaparafora += 4; 
    mario.caiu = true;  
  }


}












