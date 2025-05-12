const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let angle = 0;  
const maxAngle = (Math.PI / 180) * 8;
const minAngle = -(Math.PI / 180) * 8;
const anguloCentral = 0.01  ;
const cx = canvas.width / 2;
const cy = canvas.height / 2;
let esperandoTroca = false;
let estado = 0;
let estado_proximo = 1;
const imgCampo = new Image();
imgCampo.src = 'Images/campo.png';

const rectX = -220;     
const rectY = 140;       
const rectWidth = 450;   
const rectHeight = 100;  
const rectCenterX = rectX + rectWidth / 2;  
const rectCenterY = rectY + rectHeight / 2; 
const aumetarImagem = 80;
const  deslocarXimagem = 35;


export function desenharQuadrado() {
  ctx.save();
  ctx.translate(cx + rectCenterX, cy + rectCenterY);
  ctx.rotate(angle);
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