const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let larguraMario = 20;
let alturaMario = 40;
let mario;
let esperandoTroca = false;
let pulo = 0;
let cair = 0;
let limiteDireta = 517;
let limiteEsquerda = 117;
let cairaparafora = 0;
let pontoMedio = 317;

export function iniciarMario() {
  mario = {
    width: larguraMario,
    height: alturaMario,
    x: canvas.width / 2,
    y: canvas.height / 2 - 90,
    pulo: false,
    caiu: false,
  };
}

// export function desenharMario(angulo) {
//   // ctx.save();
//   // ctx.translate(mario.x + mario.width / 2, mario.y + mario.height / 2);
//   // ctx.rotate(angulo);
//   // ctx.fillStyle = "red";
//   // //mario.y = -mario.height / 2 + raio * Math.sin(angulo) - mario.height / 2;
//   // ctx.fillRect(-mario.width / 2, -mario.height / 2  , mario.width, mario.height);
//   // ctx.restore();
//   ctx.fillStyle = "red";
//   moveMarioy(angulo);
//   ctx.fillRect(
//     mario.x,
//     mario.y + 365 - pulo - cair + cairaparafora,
//     mario.width,
//     mario.height
//   );
// }


export function desenharMario(angulo) {
    // Atualiza a posição Y REAL do objeto mario primeiro
    moveMarioy(angulo); // Isso deve calcular a posição base
    mario.y += 365 - pulo - cair + cairaparafora; // Aplica os ajustes de movimento
    
    // Agora desenha com as coordenadas reais
    ctx.fillStyle = "red";
    ctx.fillRect(
        mario.x,
        mario.y,  // Usa mario.y diretamente (já com todos os ajustes)
        mario.width,
        mario.height
    );
    
    // IMPORTANTE: Remove os ajustes após o desenho para não acumular
    // mario.y -= 365 - pulo - cair + cairaparafora;
}

export function moveMario(cordenada, direcao) {
  if (cordenada == "x") {
    if(pulo > 0){
    let novaX = mario.x + 4 * direcao;
    mario.x = novaX;    
      
    }
    else{
    let novaX = mario.x + 9 * direcao;
    // let novaX = mario.x + (larguraMario / 1.5) * direcao;
    mario.x = novaX;
    }

}

  if (cordenada == "y") {
    if (pulo == 0) {
      mario.pular = true;
    }
  }
}

export function fazMarioPular() {
  if (mario.caiu) {
    return;
  }
  if (mario.pular == true) {
    pulo += 2;
    esperandoTroca = true;
  }
  if (mario.pular == false && pulo > 0) {
    pulo -= 2;
   
  }
  if (mario.pular == true && esperandoTroca == true) {
    setTimeout(() => {
      mario.pular = false;
      esperandoTroca = false;
    }, 1000);
  }
}


export function pegarPosicaoMario() {
  return mario;
}






// let pulando = false;
// let alturaMaxima = 100;
// let velocidadePulo = 3;

// export function fazMarioPular() {
//   if (mario.caiu || pulando || pulo > 0) {
//     return;
//   }

//   pulando = true;
//   mario.pular = true;


//   let subir = setInterval(() => {
//     if (pulo >= alturaMaxima) {
//       clearInterval(subir);
//       let descer = setInterval(() => {
//         if (pulo <= 0) {
//           clearInterval(descer);
//           pulo = 0;
//           mario.pular = false;
//           pulando = false;
//         } else {
//           pulo -= velocidadePulo;
//         }
//       }, 16); 
//     } else {
//       pulo += velocidadePulo;
//     }
//   }, 16);
// }

function moveMarioy(angulo) {
  let alturaPlataforma = 100;
  const cx = canvas.width / 2;
  const cy = alturaPlataforma;
  const dx = mario.x + mario.width / 2 - cx;
  const dy = dx * Math.tan(angulo);
  mario.y = cy + dy - mario.height;
}



export function fazMarioCair(angulo) {



  if (pulo) {
    return;
  }

  // console.log("mario.x", mario.x);
  //   console.log("limite0", limiteDireta);
  // // console.log("esq", limiteEsquerda);
  // console.log("ang", angulo);
  if (angulo < -0.13) {
    limiteDireta = 533;

  }
  else if (angulo > 0.13) {
    limiteDireta = 551;
     limiteEsquerda = 92;
   
  }
  else{
    limiteDireta = 551;
    limiteEsquerda = 92;
  }

  if (mario.x > limiteDireta || mario.caiu == true) {
    cairaparafora += 3;
    mario.caiu = true;
  }
  if (mario.x < limiteEsquerda || mario.caiu == true) {
    cairaparafora += 4;
    mario.caiu = true;
  }
}
