const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let angle = 0;  
const maxAngle = (Math.PI / 180) * 20;
const minAngle = -(Math.PI / 180) * 20;

const anguloCentral = 0.01  ;

const cx = canvas.width / 2;
const cy = canvas.height / 2;
let esperandoTroca = false;
let esperandoTrocazero = false;

let estado = 0;
let estado_proximo = 1;

export function desenharQuadrado() {
// console.log("central" , maxAngle.toFixed(2));
// console.log("angulo" ,  angle.toFixed(2));

//  console.log(estado);
//  console.log(esperandoTroca);

  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(cx, cy); 
  ctx.rotate(angle.toFixed(2) );     
  ctx.fillStyle = 'blue';
  ctx.fillRect(-200, -50, 400, 100);
  ctx.restore();



if (angle.toFixed(1) == anguloCentral.toFixed(1)  &&  !esperandoTroca  && estado == 0 ) {
    estado = 0;
    esperandoTroca = true;
    setTimeout(() => {
    esperandoTroca = false;
    estado = estado_proximo;
    console.log(estado)
    estado  = 1; 
    }, 3000);
      
}
 
  if (angle.toFixed(2) == maxAngle.toFixed(2)  &&  !esperandoTroca) {
    esperandoTroca = true;
    console.log("caiu");
    setTimeout(() => {
        estado  = 2;
        esperandoTroca = false;
      }, 2000);
  }
  
  if (angle.toFixed(2) == minAngle.toFixed(2)  &&  !esperandoTroca) {
    esperandoTroca = true;
    setTimeout(() => {
        estado = 1;
        esperandoTroca = false;
      }, 3000);
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