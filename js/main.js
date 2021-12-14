"use strict";

const inputSelect = document.querySelector(".js_select_form");
const btnUpdate = document.querySelector(".js_btn_submit");
const msgResult = document.querySelector(".js_result_msg");
const restartBtn = document.querySelector(".js_restart_btn");
let playerCounterSpan = document.querySelector(".js_player_counter");
let pcCounterSpan = document.querySelector(".js_pc_counter");

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

function updateCounter() {
  let acc = 0;
  if (msgResult.innerHTML === "¡Has ganado!") {
    acc += 1;
    playerCounterSpan.innerHTML = acc;
  } else if (msgResult.innerHTML === "¡Has perdido!") {
    acc += 1;
    pcCounterSpan.innerHTML = acc;
  }
}

function createResetBtn() {
  restartBtn.classList.remove("hidden");
}

function handleClickUpdate(event) {
  event.preventDefault();
  compareResults();
  createResetBtn();
  updateCounter();
}

function handleRestartBtn() {
  playerCounterSpan.innerHTML = 0;
  pcCounterSpan.innerHTML = 0;
}

btnUpdate.addEventListener("click", handleClickUpdate);
restartBtn.addEventListener("click", handleRestartBtn);
