const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let boss;
let limiteDireta = 520;
let limiteEsquerda =  124;
let pontoMedio = 317;
let  movimento = 0;
let larguraBoss =  20;
let alturaBoss = 40;
let direcaoAtaque = 0;
let ataque;
let colidiu = false;
let movendoBoss = false;
let cairaparafora = 0;
let vidas = 3;
let tempoInicioDoJogo = Date.now(); 
let delayInicialAtaque = 3000; 
let tempoInicioAtaque = 0;

export function iniciarBoss() {
    boss = {
        width: larguraBoss,
        height: alturaBoss,
        x: canvas.width/2 -30 +100,
        y: canvas.height/2 -90 ,
        caiu:false,
    };
}

export function ataqueBoss() {
    
    ataque = {
        width: 20,
        height: 20,
        x: boss.x,
        y: boss.y,
        caiu:false,
    };
}

function podeMoverBoss() {
    console.log("podeMover", movendoBoss);
    return movendoBoss;
}

setInterval(() => {
    movendoBoss = !movendoBoss;
  
}, 4000);

export function moverBoss() {
        if (boss.caiu) return;
        if (boss.x > pontoMedio && podeMoverBoss()) {
            boss.x -= 0.2;
        } 
        
        else if (boss.x < pontoMedio  && podeMoverBoss()) {
            boss.x += 0.2;
        }
    
}
export function desenharBoss(angulo , mario) {
    let deslocamentoY  = 365;
    ctx.fillStyle = "blue";
    // moveBossy(angulo);
    moverYangulo(boss,angulo, deslocamentoY) ;  
    enpurraBoss(mario);
    boss.y+= cairaparafora;
    ctx.fillRect(boss.x + movimento , boss.y , boss.width , boss.height);
}


export function desenharAtaqueBoss(angulo , mario ) {
    const agora = Date.now();
    let deslocamentoY  = 350;
    if(boss.caiu) return;

    if (agora - tempoInicioDoJogo < delayInicialAtaque) return;

    if (tempoInicioAtaque === 0) {
        tempoInicioAtaque = agora;
        ataque.x = boss.x;
        ataque.y = boss.y; 
        gerarDirecaoAtaque(mario);
    }
    if (agora - tempoInicioAtaque >= 4000) {
        direcaoAtaque = 0;
        tempoInicioAtaque = 0;
        colidiu = false;
        return; 
    }

    if (colidiu) {
        return;
    }
    ataque.x += direcaoAtaque; 
    // moveAtaqueY(angulo); 

    moverYangulo(ataque,angulo, deslocamentoY)      
    vericaColisaoAtaque(mario);
    ctx.fillStyle = "white";
    ctx.fillRect(ataque.x, ataque.y, ataque.width, ataque.height);
}


function gerarDirecaoAtaque(mario){
    if(boss.caiu) return;
    if( mario.x > boss.x){
        direcaoAtaque = 4;
    }
    if( mario.x < boss.x){
        direcaoAtaque = -4;
    }
}


export function pegarBoss(){
    return boss;
}


function empurraBossSuavemente(distancia) {
    const passos = 10; 
    let passoAtual = 0;
    const deslocamentoPorPasso = distancia / passos;

    function animarEmpurrao() {
        if (passoAtual < passos) {
            boss.x += deslocamentoPorPasso;
            passoAtual++;
            requestAnimationFrame(animarEmpurrao);
        }
    }

    animarEmpurrao();
}




let tempoUltimoAcertoCabeca = 0;
function enpurraBoss(mario) {
    const colisaoHorizontal = 
        boss.x + boss.width > mario.x && 
        boss.x < mario.x + mario.width;

    const colisaoVertical = 
        boss.y + boss.height > mario.y && 
        boss.y < mario.y + mario.height;

    if (colisaoHorizontal && colisaoVertical) {
        const alturaCabeca = boss.height * 0.25;
        const cabecaBossY = boss.y;

        const acertouCabeca =
            mario.y + mario.height >= cabecaBossY && 
            mario.y + mario.height <= cabecaBossY + alturaCabeca && 
            mario.pular == false;

        const agora = Date.now();
        const tempoDesdeUltimoAcerto = agora - tempoUltimoAcertoCabeca;

        if (acertouCabeca) {
            const direcao = mario.x < boss.x ? 1 : -1;
            empurraBossSuavemente(15 * direcao);
            tempoUltimoAcertoCabeca = agora; // salva o tempo do acerto
        } else if (tempoDesdeUltimoAcerto > 2000) {
            perderVida();
        }
    }
}


// function enpurraBoss(mario) {
//     const colisaoHorizontal = 
//         boss.x + boss.width > mario.x && 
//         boss.x < mario.x + mario.width;

//     const colisaoVertical = 
//         boss.y + boss.height > mario.y && 
//         boss.y < mario.y + mario.height;

//     if (colisaoHorizontal && colisaoVertical) {
//         const alturaCabeca = boss.height * 0.25;
//         const cabecaBossY = boss.y;

//         if (mario.y + mario.height >= cabecaBossY && 
//             mario.y + mario.height <= cabecaBossY + alturaCabeca  &&  mario.pular == false) {
//             const direcao = mario.x < boss.x ? 1 : -1;
//             empurraBossSuavemente(15 * direcao);
//         }

//         else{
//             perderVida();
//         }
//     }
// }


export function vericaColisaoAtaque(mario) {
    const colisaoHorizontal = 
        ataque.x + ataque.width > mario.x && 
        ataque.x < mario.x + mario.width;
    
    const colisaoVertical = 
        ataque.y + ataque.height > mario.y && 
        ataque.y < mario.y + mario.height;

    if (colisaoHorizontal && colisaoVertical) {
        colidiu = true;
        perderVida();
    }
    return colidiu;
}

// function moveBossy(angulo){
//     let alturaPlataforma = 100;
//     const cx = canvas.width / 2;
//     const cy = alturaPlataforma;
//     const dx = boss.x + boss.width / 2 - cx;
//     const dy = dx * Math.tan(angulo);
//     boss.y = cy + dy - boss.height  +  365;
// }

// function moveAtaqueY(angulo){
//     let alturaPlataforma = 100;
//     const cx = canvas.width / 2;
//     const cy = alturaPlataforma;
//     const dx = ataque.x + ataque.width / 2 - cx;
//     const dy = dx * Math.tan(angulo);
//     ataque.y = cy + dy - ataque.height  +  350;
// }


function moverYangulo(objeto,angulo , deslocamento){
    let alturaPlataforma = 100;
    const cx = canvas.width / 2;
    const cy = alturaPlataforma;
    const dx = objeto.x + objeto.width / 2 - cx;
    const dy = dx * Math.tan(angulo);
    objeto.y = cy + dy - objeto.height  +  deslocamento;

}

export function fazBossCair(angulo) {
//   if (angulo < -0.13) {
//     limiteDireta = 533;
//   }
//   else if (angulo > 0.13) {
//     limiteDireta = 551;
//      limiteEsquerda = 92;
//   }
//   else{
//     limiteDireta = 551;
//     limiteEsquerda = 92;
//   }

  gerarLimites(angulo);   
  if (boss.x > limiteDireta) {
    cairaparafora += 3;
    boss.caiu = true;
  }
  if (boss.x < limiteEsquerda ) {
    cairaparafora += 4;
    boss.caiu = true;
  }
}


function gerarLimites(angulo) {
let anguloLimite = 0.13;   
 if (angulo < -anguloLimite) {
    limiteDireta = 533;
  }
  else if (angulo > anguloLimite) {
    limiteDireta = 551;
     limiteEsquerda = 92;
  }
  else{
    limiteDireta = 551;
    limiteEsquerda = 92;
  }
}

export function desenhaVidaMario() {
  let posicaoX = 0;
  let   posicaoY = 0;
  let posicaoYCoracao = 50;
  let largura = canvas.width;
  let altura = 70;
  ctx.fillStyle = "gray";
  ctx.fillRect(posicaoX, posicaoY, largura, altura);
  ctx.font = "35px Arial";
  ctx.fillStyle = "red";
  const coracao = "❤️";
  const padding = 30;
  const espacamento = 50;

  for (let i = 0; i < vidas; i++) {
      ctx.fillText(coracao, 0 + espacamento * (i + 1) - padding, posicaoYCoracao);
  }
}



export function pegarVidas(){
  return vidas;
}
let ultimoDano = 0;
const tempoInvulnerabilidade = 1000;
export function perderVida() {
  const agora = Date.now();
  
  if (agora - ultimoDano < tempoInvulnerabilidade) {
    return; 
  }

  vidas -= 1;
  ultimoDano = agora;
}


