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
let direcaoGlobal = 1;

export function resetaMario(){
  mario;
  esperandoTroca = false;
  pulo = 0;
  cair = 0;
  limiteDireta = 517;
  limiteEsquerda = 117;
  cairaparafora = 0;
  direcaoGlobal = 1;
}

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

export function pegarPosicaoMario() {
  return mario;
}

export function desenharMario(angulo) {
  let ajusteYmario =  365;
  const imgMario = new Image();
  let urlImage =  'Images/Mario' + direcaoGlobal + '.png' 
  imgMario.src =  urlImage;
  moveMarioy(angulo); 
  mario.y += ajusteYmario - pulo - cair + cairaparafora; 
  ctx.fillStyle = "red";
  ctx.fillRect(mario.x,mario.y,mario.width,mario.height);
  ctx.drawImage(imgMario,mario.x,mario.y,mario.width,mario.height);
}

function moverMarioNoEixoX(direcao) {
  let novaX;
  if (pulo > 0) {
    novaX = mario.x + 4 * direcao;
  } 
  else {
    novaX = mario.x + 9 * direcao;
  }
  mario.x = novaX;
}

function iniciarPuloSePossivel() {
  if (pulo === 0) {
    mario.pular = true;
  }
}
export function moveMario(cordenada, direcao) {
  direcaoGlobal = direcao;
  if (cordenada === "x") {
    moverMarioNoEixoX(direcao);
  }
  if (cordenada === "y") {
    iniciarPuloSePossivel();
  }
}

function subirMario() {
  if (pulo === 120) {
    mario.pular = false;
  }
  pulo += 3;
  esperandoTroca = true;
}

function descerMario() {
  if (pulo === 0) return;
  pulo -= 3;
}

export function fazMarioPular() {
  if (mario.caiu) {
    return;
  }

  if (mario.pular === true) {
    subirMario();
  }

  if (mario.pular === false && pulo > 0) {
    descerMario();
  }
}

function moveMarioy(angulo) {
  const alturaChao = 100;
  const centroCanvasX = canvas.width / 2; 
  const posicaoCentroMarioX = mario.x + mario.width / 2; 
  const deslocamentoX = posicaoCentroMarioX - centroCanvasX; 
  const deslocamentoY = deslocamentoX * Math.tan(angulo);   
  mario.y = alturaChao + deslocamentoY - mario.height;
}

export function fazMarioCair(angulo) {
  if (pulo) {
    return;
  }
  alerarLimites(angulo);
  if (mario.x > limiteDireta || mario.caiu == true) {
    cairaparafora += 3;
    mario.caiu = true;
  }
  if (mario.x < limiteEsquerda || mario.caiu == true) {
    cairaparafora += 4;
    mario.caiu = true;
  }
}

function alerarLimites(angulo){
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
}

export function verificaMarioLava(){
  let yLava =  canvas.width-50;
  if (mario.y + mario.height/2  >  yLava ){
      document.getElementById('popupDerrota').style.display = 'flex';
      return true;
  }
  return false;
}





