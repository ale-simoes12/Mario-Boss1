const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


export function desenharFundo(){
    ctx.fillStyle = "black";

    ctx.fillRect(10, 10, canvas.width , canvas.height );
   
}

export function limparMapa(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}