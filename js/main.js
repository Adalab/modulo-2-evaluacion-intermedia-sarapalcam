"use strict";

// Declaramos las variables que recogen nuestros selectores de HTML

const inputSelect = document.querySelector(".js_select_form");
const btnUpdate = document.querySelector(".js_btn_submit");
const msgResult = document.querySelector(".js_result_msg");
const restartBtn = document.querySelector(".js_restart_btn");
const playerCounter = document.querySelector(".js_player_counter");
const pcCounter = document.querySelector(".js_pc_counter");
const totalCounter = document.querySelector(".js_counter_msg");
const numberRounds = document.querySelector(".js_number_rounds");

// Declaramos nuestras variables globales

let accPlayer = 0;
let accPc = 0;
let accTotal = 0;

// Funciones

function getSelectedValue() {
  console.log(`Usuaria: ${inputSelect.value}`);
  return inputSelect.value;
}

function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

function generateRandomPlay() {
  const randomNum = getRandomNumber(3);
  if (randomNum === 1) {
    console.log(`PC: Piedra`);
    return "Piedra";
  } else if (randomNum === 2) {
    console.log(`PC: Papel`);
    return "Papel";
  } else if (randomNum === 3) {
    console.log(`PC: Tijera`);
    return "Tijera";
  }
}

function compareResults() {
  const userResult = getSelectedValue();
  const pcResult = generateRandomPlay();
  if (userResult === pcResult) {
    msgResult.innerHTML = "¡Empate!";
  } else if (
    (userResult === "Piedra" && pcResult === "Tijera") ||
    (userResult === "Papel" && pcResult === "Piedra") ||
    (userResult === "Tijera" && pcResult === "Papel")
  ) {
    msgResult.innerHTML = "¡Has ganado!";
    accPlayer++;
    playerCounter.innerHTML = accPlayer;
  } else if (
    (userResult === "Piedra" && pcResult === "Papel") ||
    (userResult === "Papel" && pcResult === "Tijera") ||
    (userResult === "Tijera" && pcResult === "Piedra")
  ) {
    msgResult.innerHTML = "¡Has perdido!";
    accPc++;
    pcCounter.innerHTML = accPc;
  }
}

function updateCounter() {
  accTotal++;
  numberRounds.innerHTML = 10 - accTotal;
  if (accTotal === 10 && accPlayer === accPc) {
    totalCounter.innerHTML = "Se ha acabado el juego ¡Habéis empatado!";
  } else if (accTotal === 10 && accPlayer > accPc) {
    totalCounter.innerHTML = "Se ha acabado el juego ¡Has ganado!";
  } else if (accTotal === 10 && accPlayer < accPc) {
    totalCounter.innerHTML = "Se ha acabado el juego ¡Has perdido!";
  }
  if (accTotal === 10) {
    btnUpdate.classList.add("hidden");
    restartBtn.classList.remove("hidden");
  }
}

function restartDefault() {
  accPlayer = 0;
  accPc = 0;
  accTotal = 0;
  playerCounter.innerHTML = `${accPlayer}`;
  pcCounter.innerHTML = `${accPc}`;
  btnUpdate.classList.remove("hidden");
  restartBtn.classList.add("hidden");
}

// Funciones manejadoras de eventos

function handleClickUpdate(event) {
  event.preventDefault();
  compareResults();
  updateCounter();
}

function handleClickRestart(event) {
  restartDefault();
}

// Eventos

btnUpdate.addEventListener("click", handleClickUpdate);
restartBtn.addEventListener("click", handleClickRestart);
