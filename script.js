// GERADOR DE NÚMERO  
let numeroGerado = parseInt(Math.random() * (101 - 1) + 1);
console.log(numeroGerado);

// UTILITÁRIOS E TELAS DE VITORIA OU DERROTA
const pegaElemento = (id) => document.getElementById(id);

let condicaoVitoria = false;

function telaVitoria() {
    pegaElemento('gameOver').id = 'telaVitoria';
    const tela = pegaElemento('telaVitoria');
    tela.style.display = "flex";
    pegaElemento('mostradorTelaFinal').textContent = 'VITÓRIA';
}

function telaDerrota() {
    const tela = pegaElemento('gameOver');
    tela.style.display = "flex";
}

function recomeca() {
    location.reload();
}

function sombraTela() {
    const escurece =  pegaElemento('sombraTelaDerrota');
    escurece.style.filter = 'brightness(0.5)';
}

function verificaJogo() {
    if (vidas <= 0) {
        telaDerrota();
        sombraTela();
    } else {
        if (condicaoVitoria == true) {
            telaVitoria();
            sombraTela();
        }
    }
}

// RESGISTRO DE NUMEROS

let container = pegaElemento('registroNumeros');
let numerosChutados = [];

function registroCriado(valor) {
    numerosChutados.forEach((el, i) => {
        el.style.top = `${(i + 1) * 40}px`;
    });

    const novoNumero = document.createElement('div');
    novoNumero.id = 'numero';
    novoNumero.style.top = '0px'
    novoNumero.textContent = valor;

    container.appendChild(novoNumero);
    numerosChutados.unshift(novoNumero);
}

function registroRotativo(numero) {  
    registro = numero;
    registroCriado(registro);
}

// MOSTRADOR VIDA
let vidas = 7;
pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;

//HABILIDADES 

let pontos = 1000 

function faca(botao) {
    let antecessor = numeroGerado - 15;
    if (antecessor  <= 0) {
        antecessor = (antecessor * -1) + antecessor + 1;
    }
    let sucessor = numeroGerado + 15;
    if (sucessor > 100) {
        sucessor = sucessor - (sucessor - 100) ;
    }

    numeroGerado = parseInt(Math.random() * (sucessor - antecessor) + antecessor);
    console.log(antecessor);
    console.log(sucessor);
    console.log(numeroGerado);

    vidas -= 2;
    pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;
    pegaElemento('mostrador').textContent = ` Seu número está entre ${antecessor} e ${sucessor}`;
    verificaJogo();
    botao.disabled = true;
}

function coringa(botao) {
    let antecessor = numeroGerado - 1;
    
    let sucessor = numeroGerado + 1; 
      
    vidas = 1;

    switch(true) {
        case numeroGerado == 1:
            pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;
            pegaElemento('mostrador').textContent = `Seu numero pode ser ${numeroGerado} ou ${sucessor}`
            break;
        case numeroGerado == 100:
            pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;
            pegaElemento('mostrador').textContent = `Seu numero pode ser ${antecessor} ou ${numeroGerado}`
            break;
        default:
            pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;
            pegaElemento('mostrador').textContent = ` Seu número pode ser ${antecessor}, ${numeroGerado} ou ${sucessor}`;   
    }

    let opcoes = [antecessor, numeroGerado, sucessor];

    numeroGerado = opcoes[Math.floor(Math.random() * opcoes.length)];

    console.log(antecessor);
    console.log(numeroGerado);
    console.log(sucessor);

    botao.disabled = true;
}

function trevo(botao) {
    pegaElemento('mostrador').textContent = 'Mais uma vida, use bem.'

    vidas += 1;

    pegaElemento('pontosVida').textContent = vidas;

    if (Math.random() < 0.1) {
        numeroGerado = parseInt(Math.random() * (101 - 1) + 1);
        pegaElemento('mostrador').textContent = 'O número mudou, mas que azar.'
        console.log(numeroGerado);    
    }
    
    botao.disabled = true
}

//DESCRIÇÃO HABILIDADES 

const ids = ['facaDG', 'coringa', 'trevo'];
const elementos = ids.map(id => pegaElemento(id));
const descricao = pegaElemento('descricaoSpeciais');

elementos.forEach(botao => {
    botao.addEventListener('mouseover', () => {
        descricao.textContent = botao.getAttribute('data-desc');
    });

    botao.addEventListener('mouseout', () => {
        descricao.textContent = '...'
    });

})

//CHUTAR NUMERO 

function chutarNumero () {
    let numeroEntrada = document.getElementById('numeroChute').value;

    switch(true) {
        case numeroEntrada == numeroGerado:
            pegaElemento('mostrador').textContent = 'Você acertou!'
            condicaoVitoria = true;
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

    verificaJogo();
    registroRotativo(numeroEntrada);
}



//1. gerar numero aletorio  de 1 a 100 
//2. Definir o número máximo de tentativas (ex: 10).
//3. Validar se o palpite é um número válido entre 1 e 100.
//4. Comparar o palpite com o número secreto, caso acerte o jogo termina, caso erre indicar se o numero secreto é maior ou menor que o digitado
//5. decrementar o contador de tentativas a cada erro 
//6. Caso o num de vidas chegar a 0, mostrar tela de derrota, o numero secreto e o botão de recomeçar 
//7. criar repositorio com os arquivos no github

// ESTRUTURA DE REPETIÇÃO COM GERAÇÃO DE NUMERO ALEATORIO 
