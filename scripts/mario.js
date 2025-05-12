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
let puloboss = 0;
let direcaoGlobal = 1;





export function resetaMario(){
  mario;
  esperandoTroca = false;
  pulo = 0;
  cair = 0;
  limiteDireta = 517;
  limiteEsquerda = 117;
  cairaparafora = 0;
  puloboss = 0;
  direcaoGlobal = 1;
}


export function iniciarMario() {
  mario = {
    width: larguraMario,
    height: alturaMario,
    x: canvas.width / 2,
    y: canvas.height / 2 - 90,
    pularboss: false,
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
  const imgMario = new Image();
  let urlImage =  'Images/Mario' + direcaoGlobal + '.png' 
  // imgMario.src = 'Images/marioMarioDireita.png';
  imgMario.src =  urlImage;
  
    moveMarioy(angulo); 
    mario.y += 365 - pulo - cair + cairaparafora  - puloboss; 
    
  
    ctx.fillStyle = "red";
    ctx.fillRect(mario.x,mario.y,mario.width,mario.height);

  
    ctx.drawImage(imgMario,mario.x,mario.y,mario.width,mario.height);
     

}

export function moveMario(cordenada, direcao) {
  direcaoGlobal  = direcao;
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
    if(pulo == 120){
      mario.pular = false 
    } 
    pulo += 3;
    esperandoTroca = true;
  }
  if (mario.pular == false && pulo > 0) {
    if(pulo == 0)return;
    pulo -= 3;
   
  }
  // if (mario.pular == true && esperandoTroca == true) {
  //   setTimeout(() => {
  //     mario.pular = false;
  //     esperandoTroca = false;
  //   }, 1000);
  // }
}

export function pegarPosicaoMario() {
  return mario;
}

function moveMarioy(angulo) {
  let alturaPlataforma = 100;
  const cx = canvas.width / 2;
  const cy = alturaPlataforma;
  const dx = mario.x + mario.width / 2 - cx;
  const dy = dx * Math.tan(angulo);
  mario.y = cy + dy - mario.height;
}

export function fazMarioCair(angulo) {
  // console.log(puloboss);


  if (pulo) {
    return;
  }
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




export function verificaMarioLava(){
  let yLava =  canvas.width-50;
  if (mario.y + mario.height/2  >  yLava ){
   document.getElementById('popupDerrota').style.display = 'flex';
   return true;
  }
  return false;
}





