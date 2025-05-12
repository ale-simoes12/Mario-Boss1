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
let tempoInicioDoJogo;
// let tempoInicioDoJogo = Date.now(); 
let delayInicialAtaque = 3000; 
let tempoInicioAtaque = 0;
let ultimoDano = 0;
let tempoUltimoAcertoCabeca = 0;
let cairAtaque = 0;




export function  resetaBoss(){
    delayInicialAtaque = 3000; 
    tempoInicioAtaque = 0;
    ultimoDano = 0;
    tempoUltimoAcertoCabeca = 0;
    boss;
    limiteDireta = 520;
    limiteEsquerda =  124;
    pontoMedio = 317;
    movimento = 0;
    larguraBoss =  20;
    alturaBoss = 40;
    direcaoAtaque = 0;
    ataque;
    colidiu = false;
    movendoBoss = false;
    cairaparafora = 0;
    vidas = 3;
    cairAtaque = 0;
}

export function  gerarTemoInicialAtaque(){
    tempoInicioDoJogo = Date.now(); 
}

export function iniciarBoss() {
    boss = {
        width: larguraBoss,
        height: alturaBoss,
        x: canvas.width/2 -30 +100,
        y: canvas.height/2 -90 ,
        empurrado:false,
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
    boss.y += cairaparafora;
    let direcaoImagem =  -1;
    if(boss.x > mario.x){
        direcaoImagem = -1;
    }
    if(boss.x < mario.x){
        direcaoImagem = 1;

    }

   const imgKoopa = new Image();
   let urlImage =  'Images/igkoopa' + direcaoImagem + '.png'; 
   if(boss.empurrado == true){
    urlImage =  'Images/cascoKoopa.png';      
   } 
    imgKoopa.src =  urlImage;
    ctx.fillRect(boss.x + movimento , boss.y , boss.width , boss.height);
    ctx.drawImage(imgKoopa,  boss.x + movimento , boss.y , boss.width , boss.height);
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
        cairAtaque = 0;
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
    // ataque.y += cairAtaque;
    // moveAtaqueY(angulo); 

    moverYangulo(ataque,angulo, deslocamentoY)      
    vericaColisaoAtaque(mario);
    ctx.fillStyle = "white";
    const imgAtaque = new Image();
    let urlImage =  'Images/imgAtaque.png' 
    imgAtaque.src =  urlImage;
    //ctx.fillRect(ataque.x, ataque.y, ataque.width, ataque.height);
    ctx.drawImage(imgAtaque , ataque.x, ataque.y +=  cairAtaque, ataque.width, ataque.height);
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
            boss.empurrado = true;
            passoAtual++;
            requestAnimationFrame(animarEmpurrao);
        }
        else{
            boss.empurrado = false;
        }
    }

    animarEmpurrao();
}




// let tempoUltimoAcertoCabeca = 0;
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
        } else if (tempoDesdeUltimoAcerto > 200) {
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
    cairaparafora += 6;
    boss.caiu = true;
  }
  if (boss.x < limiteEsquerda ) {
    cairaparafora += 6;
    boss.caiu = true;
  }
}





export function fazAtaqueCair(angulo){
  gerarLimites(angulo);   
  if (ataque.x > limiteDireta) {
    cairAtaque += 4;
    
  }
  if (ataque.x < limiteEsquerda ) {
    cairAtaque += 4;
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


const tempoInvulnerabilidade = 1000;
export function perderVida() {
  const agora = Date.now();
  
  if (agora - ultimoDano < tempoInvulnerabilidade) {
    return; 
  }

  vidas -= 1;
  ultimoDano = agora;
}


export function verificaBossMatouMario(){
    if(vidas <= 0){
        document.getElementById('popupDerrota').style.display = 'flex';
        return true;
    }
    return false;

}


export function verificaBossLava(tempo, nome){
  let yLava =  canvas.width-50;
  if (boss.y + boss.height/2  >  yLava ){
    document.getElementById('popupVitoria').style.display = 'flex';
    console.log("fem com" + vidas  +  "em "+ tempo + "nome: "  + nome);
    inserirJogador(nome,vidas,tempo);
    return true;
  }
  return false;
}


function inserirJogador(nome, vidas, tempo) {
    fetch('http://192.168.208.46:5050/dados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, vidas, tempo })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Resposta do servidor:', data);
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error);
    });
  }
  





