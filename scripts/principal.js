import { desenharQuadrado ,pegarAnguloCampo } from './campo2.js';
import { desenharMario, iniciarMario , moveMario ,fazMarioPular ,fazMarioCair } from './mario.js';
import { desenharFundo ,limparMapa } from './mapa.js';


function loop (){

    limparMapa();
    desenharFundo();
    fazMarioPular();
    desenharQuadrado();
    fazMarioCair();
    desenharMario(pegarAnguloCampo());
    requestAnimationFrame(loop);
    
}

iniciarMario();
loop();

document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowDown") moveMario("y", 1);
    if (event.key == "ArrowUp") moveMario("y", -1);
    if (event.key == "ArrowRight") moveMario("x", 1);
    if (event.key == "ArrowLeft") moveMario("x", -1);
});




