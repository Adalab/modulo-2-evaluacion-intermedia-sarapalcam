"use strict";

const inputSelect = document.querySelector(".js_select_form");
const btnUpdate = document.querySelector(".js_btn_submit");
const msgResult = document.querySelector(".js_result_msg");
const restartBtn = document.querySelector(".js_restart_btn");
let playerCounter = document.querySelector(".js_player_counter");
let pcCounter = document.querySelector(".js_pc_counter");
let playerCounter2 = document.querySelector(".js_player_counter2");
let pcCounter2 = document.querySelector(".js_pc_counter2");
let accPlayer = 0;
let accPc = 0;

function getSelectedValue() {
  const selectedValue = inputSelect.value;
  console.log(`La usuaria ha seleccionado ${selectedValue}`);
  return selectedValue;
}

function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

function getRandomPCResult() {
  const randomNumber = getRandomNumber(3);
  let pcResult = "";
  if (randomNumber === 1) {
    pcResult = "Piedra";
  } else if (randomNumber === 2) {
    pcResult = "Papel";
  } else if (randomNumber === 3) {
    pcResult = "Tijera";
  }
  console.log(`El ordenador ha sacado ${randomNumber}: ${pcResult}`);
  return pcResult;
}

function compareResults() {
  let userResultValue = getSelectedValue();
  let pcResultValue = getRandomPCResult();

  if (userResultValue === pcResultValue) {
    msgResult.innerHTML = "¡Empate!";
  } else if (
    (userResultValue === "Piedra" && pcResultValue === "Tijera") ||
    (userResultValue === "Papel" && pcResultValue === "Piedra") ||
    (userResultValue === "Tijera" && pcResultValue === "Papel")
  ) {
    msgResult.innerHTML = "¡Has ganado!";
  } else if (
    (userResultValue === "Piedra" && pcResultValue === "Papel") ||
    (userResultValue === "Papel" && pcResultValue === "Tijera") ||
    (userResultValue === "Tijera" && pcResultValue === "Piedra")
  ) {
    msgResult.innerHTML = "¡Has perdido!";
  }
}

function updateResults() {
  if (msgResult.innerHTML === "¡Has ganado!") {
    accPlayer += 1;
    playerCounter2.innerHTML = `${accPlayer}`;
  } else if (msgResult.innerHTML === "¡Has perdido!") {
    accPc += 1;
    pcCounter2.innerHTML = `${accPc}`;
  }
}

function createResetBtn() {
  restartBtn.classList.remove("hidden");
}

function handleRestartBtn() {
  accPlayer = 0;
  accPc = 0;
  playerCounter.innerHTML = `Jugador: ${accPlayer}`;
  pcCounter.innerHTML = `Computadora: ${accPc}`;
}

function handleClickUpdate(event) {
  event.preventDefault();
  compareResults();
  createResetBtn();
  updateResults();
}

btnUpdate.addEventListener("click", handleClickUpdate);
restartBtn.addEventListener("click", handleRestartBtn);
