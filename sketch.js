//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diamBolinha = 15;
let raio = diamBolinha / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5
let yRaquete = 150
let raqueteCompr = 10;
let raqueteAlt = 90;

//variáveis Raquete Oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let raqueteCompr2 = 10;
let raqueteAlt2 = 90;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilhaSonora;

let colidiu = false;
let chanceDeErrar = 0;

function preload(){
  trilhaSonora = loadSound('trilha.mp3');
  ponto = loadSound('ponto.mp3');
  raquetada = loadSound('raquetada.mp3');
}

function setup() {
  createCanvas(600, 400);
  trilhaSonora.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquetes(xRaquete, yRaquete);
  verificaColisaoRaquetes(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPontos();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diamBolinha);
}

function movimentaBolinha(){
   xBolinha += velocidadeXBolinha;
   yBolinha += velocidadeYBolinha;
}
  
function verificaColisaoBorda (){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}
  
function mostraRaquete(x, y) {
  rect(x, y, raqueteCompr, raqueteAlt);
  } 
  
function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
 }
 
function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteCompr 
      && yBolinha - raio < yRaquete + raqueteAlt && 
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}
  
function verificaColisaoRaquetes(x,y){
  colidiu = collideRectCircle(x,y,raqueteCompr,raqueteAlt, xBolinha,yBolinha,raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
//Opção para jogar com 02 jogadores 
/*function movimentaRaqueteOponente(){
  if (keyIsDown(87)){ //87 é o código da tecla W
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){ //83 é o código da tecla S
    yRaqueteOponente += 10;
  }
}*/

//Opção de oponente automático
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - 
  raqueteCompr / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(18);
  fill(color(255,165,0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,165,0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPontos(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    xBolinha = 300;
    }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35;
    }
  }
}

