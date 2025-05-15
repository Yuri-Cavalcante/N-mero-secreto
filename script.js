// gerador de numero 
let numeroGerado = parseInt(Math.random() * (101 - 1) + 1);

// utilitarios
const pegaElemento = (id) => document.getElementById(id);

function telaDerrota() {
    const tela = document.getElementById('gameOver');
    tela.style.display = "flex"
}

document.addEventListener('DOMContentLoaded', function() {
    const botaoRecomecar = pegaElemento("recomecar");
    botaoRecomecar.addEventListener("click", recomeca);
    function recomeca() {
        location.reload();
    }
})

function SomTelaDer() {
    const escurece =  pegaElemento('sombraTelaDeDerrota');
    escurece.style.filter = 'brightness(0.5)';
}

// mostrador de vida 
let vidas = 8;
pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;

//função principal

function chutarNumero () {
    let numeroEntrada = document.getElementById('numeroChute').value;
        
    switch(true) {
        case numeroEntrada == numeroGerado:
            pegaElemento('mostrador').textContent = 'Você acertou!'
            break;
        case numeroEntrada < numeroGerado && numeroEntrada <= 100 && numeroEntrada >= 1:
            pegaElemento('mostrador').textContent = 'Você errou, o número é maior.'
            vidas--;
            pegaElemento('pontosVida').textContent = vidas;
            break;
        case numeroEntrada > numeroGerado && numeroEntrada <= 100 && numeroEntrada >= 1:
            pegaElemento('mostrador').textContent = 'Você errou, o número é menor.'
            vidas--;
            pegaElemento('pontosVida').textContent = vidas;
            break;
        default:
            alert('o numero não pode ser negativo ou o campo estar vazio, e deve ser entre 1 e 100!');
    }

    if (vidas == 0) {
        telaDerrota();
        SomTelaDer();
    }
    
    console.log(numeroGerado);
}


//1. gerar numero aletorio  de 1 a 100 
//2. Definir o número máximo de tentativas (ex: 10).
//3. Validar se o palpite é um número válido entre 1 e 100.
//4. Comparar o palpite com o número secreto, caso acerte o jogo termina, caso erre indicar se o numero secreto é maior ou menor que o digitado
//5. decrementar o contador de tentativas a cada erro 
//6. Caso o num de vidas chegar a 0, mostrar tela de derrota, o numero secreto e o botão de recomeçar 
//7. criar repositorio com os arquivos no github



























// ESTRUTURA DE REPETIÇÃO COM GERAÇÃO DE NUMERO ALEATORIO 

// let alvo = 1;
// let tentativa;


// do {
//     tentativa = Math.floor(Math.random() * (101 - 1) + 1);
//     console.log(`Número gerado ${tentativa}`);
// } while (tentativa !== alvo);