let intervaloTempo = null;
let segundos = 0

export function contarTempo() {
    intervaloTempo = setInterval(() => {
        segundos++;
        console.log(`Tempo passado: ${segundos} segundo(s)`);
      }, 1000);

}

export function pegarTempo(){
    return formatarTempo(segundos);
}

function formatarTempo(segundosTotais) {
    const horas = Math.floor(segundosTotais / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundosRestantes = segundosTotais % 60;
  
    const hh = String(horas).padStart(2, '0');
    const mm = String(minutos).padStart(2, '0');
    const ss = String(segundosRestantes).padStart(2, '0');
  
    return `${hh}:${mm}:${ss}`;
  }



  export function resetaTempo(){
    clearInterval(intervaloTempo);  
    segundos = 0;                   
    intervaloTempo = null;          
  }



