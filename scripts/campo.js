const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let angle = 0;  
const maxAngle = (Math.PI / 180) * 20;
const minAngle = -(Math.PI / 180) * 20;

console.log("max" , maxAngle);
console.log("min" , minAngle);  

const anguloCentral = 0.01  ;

const cx = canvas.width / 2;
const cy = canvas.height / 2;
let esperandoTroca = false;
let esperandoTrocazero = false;

let estado = 0;
let estado_proximo = 1;
// console.log("max" , maxAngle);
// console.log("min" , minAngle);
export function desenharQuadrado() {
// console.log("central" , anguloCentral.toFixed(1));
// console.log("angulo" ,  angle.toFixed(1));

//   console.log(estado);

  
  ctx.save();
  ctx.translate(cx, cy); 
  ctx.rotate(angle.toFixed(2) );     
  ctx.fillStyle = 'blue';
  ctx.fillRect(-200, -50, 400, 100);
  ctx.restore();

  
    // console.log(esperandoTroca);

// if (angle.toFixed(1) == anguloCentral.toFixed(1)  &&  !esperandoTroca) {
//     estado = 0;
//     esperandoTroca = true;
//     setTimeout(() => {
//         estado = estado_proximo;
//         console.log(estado)
       
//         esperandoTroca = false;
//       }, 3000);
//   }


if (angle.toFixed(1) == anguloCentral.toFixed(1)  &&  !esperandoTroca  && estado == 0 ) {
    estado = 0;
    esperandoTroca = true;
    setTimeout(() => {
    estado = estado_proximo;
    console.log(estado)
    estado  = 1; 
    }, 3000);
      
 } 


  if (angle.toFixed(2) == maxAngle.toFixed(2)  &&  !esperandoTroca) {
    esperandoTroca = true;
   
    setTimeout(() => {
        estado_proximo = 2;
        estado = estado_proximo;
        esperandoTroca = false;
      }, 2000);
  }
  if (angle.toFixed(2) == minAngle.toFixed(2)  &&  !esperandoTroca) {
    esperandoTroca = true;
    setTimeout(() => {
        estado = 1;
        estado_proximo = 1;
        esperandoTroca = false;
      }, 3000);
  }

  if (estado == 0  ) {
    angle += 0;

  }


  if (estado == 1  &&  angle <= maxAngle ) {
    angle += 0.01;

  }

  if(estado == 2 && angle >= minAngle  ){
    angle -= 0.01;

  }
  
}



export function pegarAnguloCampo(){
    return angle;
}