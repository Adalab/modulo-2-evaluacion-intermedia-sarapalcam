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
const randomWordN = document.querySelector('.js-random-n-word');
const randomWordD = document.querySelector('.js-random-d-word');
const randomWordY = document.querySelector('.js-random-y-word');

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
  placeholder: './assets/images/placeholder.png',
};

const message = {
  tie: '¡Empate!',
  win: '¡Has ganado!',
  lost: '¡Has perdido!',
};

const messageCounter = {
  lastRoundTie: 'Sólo te queda una tirada y hay un empate ¡Qué tensión!',
  lastRound: '¡Sólo te queda una tirada!',
  finishedTie: 'Se ha acabado el juego ¡Habéis empatado!',
  finishedWin: 'Se ha acabado el juego ¡Has ganado!',
  finishedLost: 'Se ha acabado el juego ¡Has perdido!',
};

const playName = {
  rock: 'Piedra',
  paper: 'Papel',
  scissors: 'Tijera',
};

let accPlayer = 0;
let accPc = 0;
let accTotal = 0;

numberRounds.innerHTML = '10';

// Funciones
fetch('https://random-word-form.herokuapp.com/random/noun/n')
  .then((responseN) => responseN.json())
  .then((wordN) => {
    randomWordN.innerHTML = wordN;
  });

fetch('https://random-word-form.herokuapp.com/random/adjective/d')
  .then((responseD) => responseD.json())
  .then((wordD) => {
    randomWordD.innerHTML = wordD;
  });

fetch('https://random-word-form.herokuapp.com/random/noun/y')
  .then((responseY) => responseY.json())
  .then((wordY) => {
    randomWordY.innerHTML = wordY;
  });

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
    return playName.rock;
  } else if (randomNum === 2) {
    pcImg.src = srcImage.paper;
    return playName.paper;
  } else if (randomNum === 3) {
    pcImg.src = srcImage.scissors;
    return playName.scissors;
  }
}

function compareResults() {
  const userResult = getSelectedValue();
  const pcResult = generateRandomPlay();
  if (userResult === pcResult) {
    msgResult.innerHTML = message.tie;
  } else if (
    (userResult === playName.rock && pcResult === playName.scissors) ||
    (userResult === playName.paper && pcResult === playName.rock) ||
    (userResult === playName.scissors && pcResult === playName.paper)
  ) {
    msgResult.innerHTML = message.win;
    accPlayer++;
    playerCounter.innerHTML = accPlayer;
  } else if (
    (userResult === playName.rock && pcResult === playName.paper) ||
    (userResult === playName.paper && pcResult === playName.scissors) ||
    (userResult === playName.scissors && pcResult === playName.rock)
  ) {
    msgResult.innerHTML = message.lost;
    accPc++;
    pcCounter.innerHTML = accPc;
  }
}

function endGameBtnsStatus(){
  btnUpdate.disabled = true;
  btnUpdate.classList.add(classNames.playBtnOff);
  restartBtn.classList.remove(classNames.hidden);
}

function updateCounter() {
  accTotal++;
  numberRounds.innerHTML = 10 - accTotal;
  totalCounter.innerHTML = `Te quedan ${numberRounds.innerHTML} tiradas`;
  if (accTotal === 9 && accPlayer === accPc) {
    totalCounter.innerHTML = messageCounter.lastRoundTie;
  } else if (accTotal === 9) {
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
    endGameBtnsStatus();
  }
}

function restartBtnsStatus(){
  btnUpdate.disabled = false;
  btnUpdate.classList.remove(classNames.playBtnOff);
  restartBtn.classList.add(classNames.hidden);
}

function restartDefault() {
  accPlayer = 0;
  accPc = 0;
  accTotal = 0;
  playerCounter.innerHTML = `${accPlayer}`;
  pcCounter.innerHTML = `${accPc}`;
  numberRounds.innerHTML = 10;
  totalCounter.innerHTML = `Te quedan ${numberRounds.innerHTML} tiradas`;
  restartBtnsStatus();
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

function handleClickInput() {
  pcImg.src = srcImage.placeholder;
  pcImg.classList.add(classNames.resultPcImage);
}

function handleChangeInput() {
  if (inputSelect.value === playName.rock) {
    userImg.src = srcImage.rock;
  } else if (inputSelect.value === playName.paper) {
    userImg.src = srcImage.paper;
  } else if (inputSelect.value === playName.scissors) {
    userImg.src = srcImage.scissors;
  }
}

// Eventos
btnUpdate.addEventListener('click', handleClickUpdate);
restartBtn.addEventListener('click', handleClickRestart);
inputSelect.addEventListener('click', handleClickInput);
inputSelect.addEventListener('change', handleChangeInput);
