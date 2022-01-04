'use strict';

// Declaramos las variables que recogen nuestros selectores de HTML

const inputSelect = document.querySelector('.js_select_form');
const btnUpdate = document.querySelector('.js_btn_submit');
const msgResult = document.querySelector('.js_result_msg');
const restartBtn = document.querySelector('.js_restart_btn');
const playerCounter = document.querySelector('.js_player_counter');
const pcCounter = document.querySelector('.js_pc_counter');
const totalCounter = document.querySelector('.js_counter_msg');
const userImg = document.querySelector('.js_user_img');
const pcImg = document.querySelector('.js_pc_img');
let numberRounds = document.querySelector('.js_number_rounds');

// Declaramos nuestras variables globales
const classNames = {
  resultPcImage: 'result__display--pc--img',
  playBtnOff: 'form__container--btn--off',
  hidden: 'hidden',
};

const srcImage = {
  rock: './assets/images/piedra.png',
  paper: './assets/images/papel.png',
  scissors: './assets/images/tijeras.png',
  placeholder: './assets/images/placeholder.png'
};

const message = {
  tie: '¡Empate!',
  win:'¡Has ganado!',
  lost: '¡Has perdido!'
};

const messageCounter = {
  lastRoundTie: 'Sólo te queda una tirada y hay un empate ¡Qué tensión!',
  lastRound: '¡Sólo te queda una tirada!',
  finishedTie: 'Se ha acabado el juego ¡Habéis empatado!',
  finishedWin: 'Se ha acabado el juego ¡Has ganado!',
  finishedLost: 'Se ha acabado el juego ¡Has perdido!',
};

let accPlayer = 0;
let accPc = 0;
let accTotal = 0;

numberRounds.innerHTML = '10';


// Funciones

function getSelectedValue() {
  return inputSelect.value;
}

function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

function generateRandomPlay() {
  pcImg.classList.remove(classNames.resultPcImage);
  const randomNum = getRandomNumber(3);
  if (randomNum === 1) {
    pcImg.src = srcImage.rock;
    return 'Piedra';
  } else if (randomNum === 2) {
    pcImg.src = srcImage.paper;
    return 'Papel';
  } else if (randomNum === 3) {
    pcImg.src = srcImage.scissors;
    return 'Tijera';
  }
}

function compareResults() {
  const userResult = getSelectedValue();
  const pcResult = generateRandomPlay();
  if (userResult === pcResult) {
    msgResult.innerHTML = message.tie;
  } else if (
    (userResult === 'Piedra' && pcResult === 'Tijera') ||
    (userResult === 'Papel' && pcResult === 'Piedra') ||
    (userResult === 'Tijera' && pcResult === 'Papel')
  ) {
    msgResult.innerHTML = message.win;
    accPlayer++;
    playerCounter.innerHTML = accPlayer;
  } else if (
    (userResult === 'Piedra' && pcResult === 'Papel') ||
    (userResult === 'Papel' && pcResult === 'Tijera') ||
    (userResult === 'Tijera' && pcResult === 'Piedra')
  ) {
    msgResult.innerHTML = message.lost;
    accPc++;
    pcCounter.innerHTML = accPc;
  }
}

function updateCounter() {
  accTotal++;
  numberRounds.innerHTML = 10 - accTotal;
  totalCounter.innerHTML = `Te quedan ${numberRounds.innerHTML} tiradas`;
  if (accTotal === 9 && accPlayer === accPc){
    totalCounter.innerHTML = messageCounter.lastRoundTie;
  } else if (accTotal === 9 ){
    totalCounter.innerHTML = messageCounter.lastRound;
  }
  if (accTotal === 10 && accPlayer === accPc) {
    totalCounter.innerHTML = messageCounter.finishedTie;
  } else if (accTotal === 10 && accPlayer > accPc) {
    totalCounter.innerHTML = messageCounter.finishedWin;
  } else if (accTotal === 10 && accPlayer < accPc) {
    totalCounter.innerHTML = messageCounter.finishedLost;
  }
  if (accTotal === 10) {
    btnUpdate.classList.add(classNames.playBtnOff);
    restartBtn.classList.remove(classNames.hidden);
  }
}

function restartDefault() {
  accPlayer = 0;
  accPc = 0;
  accTotal = 0;
  playerCounter.innerHTML = `${accPlayer}`;
  pcCounter.innerHTML = `${accPc}`;
  numberRounds.innerHTML = 10;
  btnUpdate.classList.remove(classNames.playBtnOff);
  restartBtn.classList.add(classNames.hidden);
  totalCounter.innerHTML = `Te quedan ${numberRounds.innerHTML} tiradas`;
}

// Funciones manejadoras de eventos
function handleClickUpdate(event) {
  event.preventDefault();
  compareResults();
  updateCounter();
}

function handleClickRestart() {
  restartDefault();
}

function handleChangeInput(){
  pcImg.src= srcImage.placeholder;
  pcImg.classList.add(classNames.resultPcImage);
  if (inputSelect.value === 'Piedra'){
    userImg.src = srcImage.rock;
  } else if (inputSelect.value === 'Papel'){
    userImg.src = srcImage.paper;
  } else if (inputSelect.value === 'Tijera'){
    userImg.src = srcImage.scissors;
  }
}

// Eventos
btnUpdate.addEventListener('click', handleClickUpdate);
restartBtn.addEventListener('click', handleClickRestart);
inputSelect.addEventListener('click', handleChangeInput);

