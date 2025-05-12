const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


export function desenharFundo(){
    ctx.fillStyle = "black";

    ctx.fillRect(0, 0, canvas.width , canvas.height );
   
}


// const imgLava = new Image();
// imgLava.src = 'Images/lava.png';
// let xLava = 0;
// let yLava = 515;
// export function desenhaLava(){
//    if (imgLava.complete) {
//     ctx.drawImage(imgLava, xLava, yLava, canvas.width , canvas.height/4 );
//     ctx.restore(); 
//   } 

//   else {
//     imgLava.onload = () => {
//         ctx.drawImage(imgLava, 0, 0, canvas.width , canvas.height/4 );
//         ctx.restore(); 
//     };
//   }
// }


export function desenhaLava() {
  let lavaAltura = canvas.height / 4;
  let yLava = canvas.height -50;
  let gradienteLava = ctx.createLinearGradient(0, yLava, 0, canvas.height);
  
  gradienteLava.addColorStop(0, '#ff9900');  
  gradienteLava.addColorStop(0.5, '#ff3300'); // Vermelho intenso
  gradienteLava.addColorStop(1, '#660000');  // Vermelho escuro

  ctx.fillStyle = gradienteLava;
  ctx.fillRect(0, yLava, canvas.width, lavaAltura);
  for (let i = 0; i < 1; i++) {
    let x = Math.random() * canvas.width;
    let y = yLava + Math.random() * lavaAltura;
    let raio = 5 + Math.random() * 10;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
    ctx.arc(x, y, raio, 0, Math.PI * 2);
    ctx.fill();
  }
}


export function desenharTempoMapa(tempo) {
  let xTempo = 420;
  let yTempo = 50;

  
  ctx.font = '25px "PressStart2P"';      // Define o estilo da fonte
  ctx.fillStyle = 'white';      // Define a cor do texto
  ctx.fillText(tempo, xTempo, yTempo);  // Desenha o texto na posição desejada
}



export function limparMapa(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}



