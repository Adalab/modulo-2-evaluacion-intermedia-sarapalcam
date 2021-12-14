"use strict";

const inputSelect = document.querySelector(".js_select_form");
const btnUpdate = document.querySelector(".js_btn_submit");
const msgResult = document.querySelector(".js_result_msg");

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
  } else if (userResultValue === "Piedra" && pcResultValue === "Tijera") {
    msgResult.innerHTML = "¡Has ganado!";
  } else if (userResultValue === "Papel" && pcResultValue === "Piedra") {
    msgResult.innerHTML = "¡Has ganado!";
  } else if (userResultValue === "Tijera" && pcResultValue === "Papel") {
    msgResult.innerHTML = "¡Has ganado!";
  } else if (userResultValue === "Piedra" && pcResultValue === "Papel") {
    msgResult.innerHTML = "¡Has perdido!";
  } else if (userResultValue === "Papel" && pcResultValue === "Tijera") {
    msgResult.innerHTML = "¡Has perdido!";
  } else if (userResultValue === "Tijera" && pcResultValue === "Piedra") {
    msgResult.innerHTML = "¡Has perdido!";
  }
}

function handleClickUpdate(event) {
  event.preventDefault();

  compareResults();
}

btnUpdate.addEventListener("click", handleClickUpdate);
