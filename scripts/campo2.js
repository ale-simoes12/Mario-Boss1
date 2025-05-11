const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let angle = 0;  
const maxAngle = (Math.PI / 180) * 8;
const minAngle = -(Math.PI / 180) * 8;

const anguloCentral = 0.01  ;

const cx = canvas.width / 2;
const cy = canvas.height / 2;
let esperandoTroca = false;
let esperandoTrocazero = false;

let estado = 0;
let estado_proximo = 1;
const imgCampo = new Image();
imgCampo.src = 'Images/campo.png';


const rectX = -220;      // Posição X do retângulo (relativo ao centro do canvas)
const rectY = 140;       // Posição Y do retângulo (relativo ao centro do canvas)
const rectWidth = 450;   // Largura do retângulo
const rectHeight = 100;  // Altura do retângulo

// Centro do retângulo (onde a rotação deve acontecer)
const rectCenterX = rectX + rectWidth / 2;  // X do centro do retângulo
const rectCenterY = rectY + rectHeight / 2; // Y do centro do retângulo
const aumetarImagem = 80;
const  deslocarXimagem = 35;
export function desenharQuadrado() {
  // ctx.save(); 
  // ctx.translate(cx, cy); 
  // ctx.rotate(angle); 
  // ctx.fillStyle = 'blue';
  // ctx.fillRect(-220, +140, 450, 100);
  
    ctx.save();

  // 1. Move o ponto de rotação para o CENTRO DO RETÂNGULO (não do canvas)
  ctx.translate(cx + rectCenterX, cy + rectCenterY);

  // 2. Rotaciona em torno do centro do retângulo
  ctx.rotate(angle);

  // 3. Desenha o retângulo com coordenadas relativas ao SEU PRÓPRIO CENTRO
  ctx.fillStyle = 'blue';
  ctx.fillRect(-rectWidth / 2,-rectHeight / 2, rectWidth,rectHeight);

  
  

    if (imgCampo.complete) {
    ctx.drawImage(imgCampo, -rectWidth / 2  - deslocarXimagem,-rectHeight / 2 ,  rectWidth + aumetarImagem ,rectHeight);
    ctx.restore(); 
  } 

  else {
    imgCampo.onload = () => {
      ctx.drawImage(imgCampo, -rectWidth / 2  - deslocarXimagem,-rectHeight / 2, rectWidth + aumetarImagem ,rectHeight);
      ctx.restore(); 
    };
  }

   ctx.restore(); 
 
  // if (imgCampo.complete) {
  //   ctx.drawImage(imgCampo, -253, +140, 530, 100);
  //   ctx.restore(); 
  // } 

  // else {
  //   imgCampo.onload = () => {
  //     ctx.drawImage(imgCampo, -253, +140, 530, 100);
  //     ctx.restore(); 
  //   };
  // }



if (angle.toFixed(1) == anguloCentral.toFixed(1)  &&  !esperandoTroca  && estado == 0 ) {
    estado = 0;
    esperandoTroca = true;
    setTimeout(() => {
    esperandoTroca = false;
    estado = estado_proximo;
    console.log(estado)
    estado  = 1; 
    }, 4000);
      
}
 
  if (angle.toFixed(2) == maxAngle.toFixed(2)  &&  !esperandoTroca) {
    esperandoTroca = true;
    console.log("caiu");
    setTimeout(() => {
        estado  = 2;
        esperandoTroca = false;
      }, 4000);
  }
  
  if (angle.toFixed(2) == minAngle.toFixed(2)  &&  !esperandoTroca) {
    esperandoTroca = true;
    setTimeout(() => {
        estado = 1;
        esperandoTroca = false;
      }, 4000);
  }

  if (estado == 0  ) {
    angle += 0;

  }

  if (estado == 1  &&  angle <= maxAngle ) {
    angle += 0.005;

  }

  if(estado == 2 && angle >= minAngle  ){
    angle -= 0.005;

  }


  
}

export function pegarAnguloCampo(){
    return angle;
}