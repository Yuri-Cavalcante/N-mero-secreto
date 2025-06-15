// GERADOR DE NÚMERO  
let numeroGerado = parseInt(Math.random() * (101 - 1) + 1);

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
    tela.style.display = 'flex';
    let numCerto = pegaElemento('numSecreto');
    numCerto.textContent = `Número: ${numeroGerado}`;
}

function recomeca() {
    location.reload();
}

function sombraTela() {
    const escurece =  pegaElemento('sombra');
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
let container = pegaElemento('numChutados');
let numerosChutados = [];

function registroCriado(valor) {
    numerosChutados.forEach((el, i) => {
        el.style.top = `${(i + 1) * 25}px`;
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

    if (registro >= 1 && registro <= 100) {
        registroCriado(registro);
    }
}

// MOSTRADOR DE VIDA E MODIFICADORES RELACIONADOS 
let vidas = 7;
pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;

function animacaoVidaBaixa() {
    let el = pegaElemento('pontosVida');
    const cabeca = pegaElemento('cabeca');
    const corpo  = pegaElemento('container1');
    const rodape = pegaElemento('rodape');

    switch(true) {
        case vidas < 4 && vidas > 1:
            el.className = 'animacaoVida1';
            break;
        case vidas == 1: 
            el.className = 'animacaoVida2';
            break;
        default:
            el.className = '';
    }

    switch(true) {
        case vidas >= 6:
            cabeca.style.backgroundColor = '#bcbcbc';
            corpo.style.backgroundColor = 'gray';
            rodape.style.backgroundColor = '#bcbcbc';
            break;
        case vidas < 6 && vidas > 3:
            cabeca.style.backgroundColor = '#dcd69e';
            corpo.style.backgroundColor = '#f3e653';
            rodape.style.backgroundColor = '#dcd69e';
            break;
        case vidas < 4 && vidas > 1:
            cabeca.style.backgroundColor = '#fb9745';
            corpo.style.backgroundColor = '#f57309';
            rodape.style.backgroundColor = '#fb9745';
            break;
        case vidas == 1:
            cabeca.style.backgroundColor = '#f94949';
            corpo.style.backgroundColor = '#e20808';
            rodape.style.backgroundColor = '#f94949';
            break; 
    }
}

//HABILIDADES 
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

    vidas -= 2;
    pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;
    pegaElemento('mostrador').textContent = ` Seu número está entre ${antecessor} e ${sucessor}`;

    animacaoVidaBaixa();
    verificaJogo();
    
    botao.id = 'botaoOff';
    botao.onclick = null;
}

function coringa(botao) {
    let antecessor = numeroGerado - 1;
    
    let sucessor = numeroGerado + 1; 
      
    vidas = 1;

    switch(true) {
        case numeroGerado == 1:
            pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;
            pegaElemento('mostrador').textContent = `Seu numero pode ser ${numeroGerado} ou ${sucessor}.`
            break;
        case numeroGerado == 100:
            pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;
            pegaElemento('mostrador').textContent = `Seu numero pode ser ${antecessor} ou ${numeroGerado}.`
            break;
        default:
            pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;
            pegaElemento('mostrador').textContent = `Seu número pode ser ${antecessor}, ${numeroGerado} ou ${sucessor}.`;   
    }

    let opcoes = [antecessor, numeroGerado, sucessor];

    numeroGerado = opcoes[Math.floor(Math.random() * opcoes.length)];

    animacaoVidaBaixa();
    
    botao.id = 'botaoOff';
    botao.onclick = null;
}

function trevo(botao) {
    pegaElemento('mostrador').textContent = 'Mais uma vida, use bem.'

    vidas += 1;

    pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;

    if (Math.random() < 0.2) {
        numeroGerado = parseInt(Math.random() * (101 - 1) + 1);
        pegaElemento('mostrador').textContent = 'O número mudou, mas que azar.'
    }

    animacaoVidaBaixa();
    
    botao.id = 'botaoOff';
    botao.onclick = null;
}

//DESCRIÇÃO HABILIDADES 

const idsSkills = ['facaDG', 'coringa', 'trevo'];
const elementos = idsSkills.map(id => pegaElemento(id));
const titulo = pegaElemento('titulo');
const descricao = pegaElemento('desc');

elementos.forEach(botao => {
    botao.addEventListener('mouseover', () => {
        titulo.textContent = botao.getAttribute('data-titulo');
        descricao.textContent = botao.getAttribute('data-desc');
    });

    botao.addEventListener('mouseout', () => {
        titulo.textContent = ''
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
            pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;
            break;
        case numeroEntrada > numeroGerado && numeroEntrada <= 100 && numeroEntrada >= 1:
            pegaElemento('mostrador').textContent = 'Você errou, o número é menor.'
            vidas--;
            pegaElemento('pontosVida').textContent = `Vidas: ${vidas}`;
            break;
        default:
            alert('o numero não pode ser negativo ou o campo estar vazio, e deve ser entre 1 e 100!');
    }

    pegaElemento('numeroChute').value = '';
    animacaoVidaBaixa();
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
