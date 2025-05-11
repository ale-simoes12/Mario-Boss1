import { desenharQuadrado ,pegarAnguloCampo } from './campo2.js';
import { desenharMario, iniciarMario , moveMario ,fazMarioPular ,fazMarioCair , pegarPosicaoMario} from './mario.js';
import { desenharFundo ,limparMapa } from './mapa.js';
import { iniciarBoss , desenharBoss ,moverBoss , desenharAtaqueBoss , ataqueBoss} from './boss.js';


function loop (){

    limparMapa();
    desenharFundo();
    fazMarioPular();
    desenharQuadrado();
    moverBoss();
    desenharAtaqueBoss(pegarAnguloCampo() , pegarPosicaoMario());
    fazMarioCair(pegarAnguloCampo());
    desenharBoss(pegarAnguloCampo());
    desenharMario(pegarAnguloCampo());
    requestAnimationFrame(loop);
    
}
iniciarBoss();
ataqueBoss();
iniciarMario();
loop();

document.addEventListener("keydown", function (event) {
    // if (event.key == "ArrowDown") moveMario("y", 1);
    if (event.key == "ArrowUp") moveMario("y", -1);
    if (event.key == "ArrowRight") moveMario("x", 1);
    if (event.key == "ArrowLeft") moveMario("x", -1);
});




