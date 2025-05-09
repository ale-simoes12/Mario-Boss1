const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let boss;
let limiteDireta = 520;
let limiteEsquerda =  124;
let centro =  317;
let estado = 0;
let idMovimento = 0;
let  movimento = 0;
let mover = 0;
let larguraBoss =  20;
let alturaBoss = 40;

export function iniciarBoss() {
    boss = {
        width: larguraBoss,
        height: alturaBoss,
        x: canvas.width/2 -30,
        y: canvas.height/2 -90,
        caiu:false,
    };
}


export function gerarEstadoBoss(){
      if(estado == 0){
         mover = 1;
         estado =1;
      }
      if(estado==1){
        movimento = -1;
        mover =2;
      }
      if(estado ==2){
        mover = 1;
        estado = 0;
      }

}

function gerarIntervaloMovimento() {
    intevaloMovimentoBoss =  setInterval(() => gerarEstadoBoss(idMovimento), 5000);
}


gerarIntervaloMovimento();

export function  moverBoss(){
    movimento+= mover;
}

export function desenharMario(angulo) {
    ctx.fillStyle = "blue";
    moveBossy(angulo);
    ctx.fillRect(boss.x + movimento , boss.y +165  , boss.width , boss.height);
}

function moveBossy(angulo){
    let alturaPlataforma = 100;
    const cx = canvas.width / 2;
    const cy = alturaPlataforma;
    const dx = boss.x + boss.width / 2 - cx;
    const dy = dx * Math.tan(angulo);
    boss.y = cy + dy - boss.height;
}





