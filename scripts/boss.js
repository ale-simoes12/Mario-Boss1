const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let boss;
let limiteDireta = 520;
let limiteEsquerda =  124;
let pontoMedio = 317;
let estado = 0;
let idMovimento = 0;
let  movimento = 0;
let mover = 0;
let larguraBoss =  20;
let alturaBoss = 40;
let direcaoAtaque = 0;
let ataque;
let colidiu = false;


export function iniciarBoss() {
    boss = {
        width: larguraBoss,
        height: alturaBoss,
        x: canvas.width/2 -30   +100,
        y: canvas.height/2 -90 ,
        caiu:false,
    };
}


export function ataqueBoss() {
    ataque = {
        width: 20,
        height: 20,
        x: boss.x,
        y: boss.y ,
        caiu:false,
    };
}

export function  moverBoss(){
    if(boss.x > pontoMedio){
       
        boss.x -= 0.1;
    }

    if(boss.x > pontoMedio){
        boss.x -= 0.1;
    }
}

export function desenharBoss(angulo) {
    ctx.fillStyle = "blue";
    moveBossy(angulo);
    ctx.fillRect(boss.x + movimento , boss.y , boss.width , boss.height);
}


let tempoInicioAtaque = 0; 

export function desenharAtaqueBoss(angulo , mario) {
    const agora = Date.now();
    
    if (tempoInicioAtaque === 0) {
        tempoInicioAtaque = agora;
        ataque.x = boss.x;
        ataque.y = boss.y; 
        gerarDirecaoAtaque(mario);
    }
    if (agora - tempoInicioAtaque >= 3000) {
        direcaoAtaque = 0;
        tempoInicioAtaque = 0;
        colidiu = false;
       
        return; 
    }


    if (colidiu) {
        return;
    }
    ataque.x += direcaoAtaque; 
    moveAtaqueY(angulo);       

    vericaColisaoAtaque(mario);
    ctx.fillStyle = "white";
    ctx.fillRect(ataque.x, ataque.y, ataque.width, ataque.height);
}


function gerarDirecaoAtaque(mario){
    if( mario.x > boss.x){
        direcaoAtaque = 2;
    }
    if( mario.x < boss.x){
        direcaoAtaque = -2;
    }

}


function vericaColisaoAtaque(mario) {
    // Certifique-se de usar as propriedades corretas (width/height em vez de largura/altura)
    console.log("mario", mario);
    console.log("ataque", ataque);
    const colisaoHorizontal = 
        ataque.x + ataque.width > mario.x && 
        ataque.x < mario.x + mario.width;
    
    const colisaoVertical = 
        ataque.y + ataque.height > mario.y && 
        ataque.y < mario.y + mario.height;

    if (colisaoHorizontal && colisaoVertical) {
        console.log("Colidiu!", {
            ataque: {x: ataque.x, y: ataque.y, w: ataque.width, h: ataque.height},
            mario: {x: mario.x, y: mario.y, w: mario.width, h: mario.height}
        });
        colidiu = true;
        return true; // Retorna true para indicar colisão
    }
    return false; // Retorna false se não houve colisão
}

function moveBossy(angulo){
    let alturaPlataforma = 100;
    const cx = canvas.width / 2;
    const cy = alturaPlataforma;
    const dx = boss.x + boss.width / 2 - cx;
    const dy = dx * Math.tan(angulo);
    boss.y = cy + dy - boss.height  +  365;
}


function moveAtaqueY(angulo){
    let alturaPlataforma = 100;
    const cx = canvas.width / 2;
    const cy = alturaPlataforma;
    const dx = ataque.x + ataque.width / 2 - cx;
    const dy = dx * Math.tan(angulo);
    ataque.y = cy + dy - ataque.height  +  350;
}





