import { desenharQuadrado ,pegarAnguloCampo,resetaCampo } from './campo2.js';
import { desenharMario, iniciarMario , moveMario ,fazMarioPular ,fazMarioCair , pegarPosicaoMario ,verificaMarioLava , resetaMario } from './mario.js';
import { desenharFundo ,limparMapa,desenhaLava ,desenharTempoMapa} from './mapa.js';
import { iniciarBoss , desenharBoss ,moverBoss , desenharAtaqueBoss , ataqueBoss,fazBossCair , desenhaVidaMario ,pegarBoss, verificaBossLava ,gerarTemoInicialAtaque , resetaBoss , fazAtaqueCair , verificaBossMatouMario} from './boss.js';
import { contarTempo ,  pegarTempo , resetaTempo} from './timer.js';

let loopId = null;
let comecar = false;

// function loop (){

//     if(verificaBossLava() ||  verificaMarioLava() ){
//         return;
//     }

//     limparMapa();
//     desenharFundo();
//     fazMarioPular();
//     // MarioPularBoss(-1);
//     desenharQuadrado();
//     moverBoss();
//     desenharAtaqueBoss(pegarAnguloCampo(), pegarPosicaoMario() );
//     fazMarioCair(pegarAnguloCampo());
//     fazBossCair(pegarAnguloCampo());
    
//     desenharBoss(pegarAnguloCampo(), pegarPosicaoMario());
//     desenharMario(pegarAnguloCampo());
//     desenhaVidaMario();
//     verificaBossLava();
//     verificaMarioLava();
//     desenharTempoMapa(pegarTempo());
//     // verificaMarioPularBoss(pegarBoss());
//     desenhaLava();
//     requestAnimationFrame(loop);
    
// }

function loop() {
    if(verificaBossLava(pegarTempo() ,  salvarNome()) ||  verificaMarioLava() || verificaBossMatouMario() || comecar == false ){
        return;
    }

  
    limparMapa();
    desenharFundo();
    fazMarioPular();
    desenharQuadrado();
    moverBoss();
    desenharAtaqueBoss(pegarAnguloCampo(), pegarPosicaoMario());
    fazAtaqueCair(pegarAnguloCampo());
    fazMarioCair(pegarAnguloCampo());
    fazBossCair(pegarAnguloCampo());
    desenharBoss(pegarAnguloCampo(), pegarPosicaoMario());
    desenharMario(pegarAnguloCampo());
    desenhaVidaMario();
    desenharTempoMapa(pegarTempo());
    desenhaLava();

    loopId = requestAnimationFrame(loop);  // <- salva o ID aqui
}




// function começarJogo(){
    

//     contarTempo();
//     gerarTemoInicialAtaque();
//     iniciarBoss();
//     ataqueBoss();
//     iniciarMario();
//     loop();
// }


function começarJogo(){
    if (loopId !== null) {
        cancelAnimationFrame(loopId);
    }
    comecar = true;
    resetaTempo();
    contarTempo();
    resetaCampo();
    gerarTemoInicialAtaque();
    iniciarBoss();
    ataqueBoss();
    iniciarMario();
    loop();
}


window.iniciarJogo = function() {
    let nome  = salvarNome();
    if(nome == ""){
        return
    }
    salvarNome(nome);
    document.getElementById('telaInicio').style.display = 'none';
    
    começarJogo();;
}


window.mostrarRegras = function() {
    document.getElementById('popupRegras').style.display = 'flex';
}


window.fecharRegras = function() {
    document.getElementById('popupRegras').style.display = 'none';
}




window.reiniciarJogo = function() {
    document.getElementById('popupDerrota').style.display = 'none';
    document.getElementById('popupVitoria').style.display = 'none';
    resetaMario();
    resetaBoss();
    comecar = false;
    document.getElementById('telaInicio').style.display = 'flex';
}

function abrePopUpVendodor(){
    document.getElementById('popupVencedores').style.display = 'flex';
}


window.fecharVencedores = function() {
    document.getElementById('popupVencedores').style.display = 'none';
}




window.mostrarVencedores = function() {
    abrePopUpVendodor();
    fetch('http://192.168.208.46:5050/dados')
        .then(res => res.json())
        .then(jogadores => {
            const container = document.getElementById("adicionaDiv");
            const jogadoresContainer = document.createElement('div');
            jogadoresContainer.className = 'jogadores-lista';
            jogadores.forEach(j => {
                const jogadorElement = document.createElement('p');
                jogadorElement.className = 'jogador-info';
                jogadorElement.textContent = `${j.nome}, ${j.vidas} vidas, ${j.tempo}`;
                jogadoresContainer.appendChild(jogadorElement);
            });
            
            const elementosAntigos = container.querySelectorAll('.jogadores-lista, .jogador-info');
            elementosAntigos.forEach(el => el.remove());
            container.appendChild(jogadoresContainer);
        })
        .catch(error => {
            console.error('Erro ao buscar jogadores:', error);
        });
};




export function salvarNome(){
    const nome  = document.getElementById('nomeJogador').value;
    return nome;
}



document.addEventListener("keydown", function (event) {
    // if (event.key == "ArrowDown") moveMario("y", 1);
    if(comecar == false) return;
    if (event.key == "ArrowUp") moveMario("y", -1);
    if (event.key == "ArrowRight") moveMario("x", 1);
    if (event.key == "ArrowLeft") moveMario("x", -1);
});




