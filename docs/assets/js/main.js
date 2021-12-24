"use strict";const inputSelect=document.querySelector(".js_select_form"),btnUpdate=document.querySelector(".js_btn_submit"),msgResult=document.querySelector(".js_result_msg"),restartBtn=document.querySelector(".js_restart_btn"),playerCounter=document.querySelector(".js_player_counter"),pcCounter=document.querySelector(".js_pc_counter"),totalCounter=document.querySelector(".js_counter_msg"),userImg=document.querySelector(".js_user_img"),pcImg=document.querySelector(".js_pc_img");let numberRounds=document.querySelector(".js_number_rounds"),accPlayer=0,accPc=0,accTotal=0;function getSelectedValue(){return console.log("Usuaria: "+inputSelect.value),inputSelect.value}function getRandomNumber(e){return Math.ceil(Math.random()*e)}function generateRandomPlay(){pcImg.classList.remove("result__display--pc--img");const e=getRandomNumber(3);return 1===e?(console.log("PC: Piedra"),pcImg.src="../assets/images/piedra.png","Piedra"):2===e?(console.log("PC: Papel"),pcImg.src="../assets/images/papel.png","Papel"):3===e?(console.log("PC: Tijera"),pcImg.src="../assets/images/tijeras.png","Tijera"):void 0}function compareResults(){const e=getSelectedValue(),a=generateRandomPlay();e===a?msgResult.innerHTML="¡Empate!":"Piedra"===e&&"Tijera"===a||"Papel"===e&&"Piedra"===a||"Tijera"===e&&"Papel"===a?(msgResult.innerHTML="¡Has ganado!",accPlayer++,playerCounter.innerHTML=accPlayer):("Piedra"===e&&"Papel"===a||"Papel"===e&&"Tijera"===a||"Tijera"===e&&"Piedra"===a)&&(msgResult.innerHTML="¡Has perdido!",accPc++,pcCounter.innerHTML=accPc)}function updateCounter(){accTotal++,numberRounds.innerHTML=10-accTotal,totalCounter.innerHTML=`Te quedan ${numberRounds.innerHTML} tiradas`,9===accTotal&&accPlayer===accPc?totalCounter.innerHTML="Sólo te queda una tirada y hay un empate ¡Qué tensión!":9===accTotal&&(totalCounter.innerHTML="¡Sólo te queda una tirada!"),10===accTotal&&accPlayer===accPc?totalCounter.innerHTML="Se ha acabado el juego ¡Habéis empatado!":10===accTotal&&accPlayer>accPc?totalCounter.innerHTML="Se ha acabado el juego ¡Has ganado!":10===accTotal&&accPlayer<accPc&&(totalCounter.innerHTML="Se ha acabado el juego ¡Has perdido!"),10===accTotal&&(btnUpdate.classList.add("form__container--btn--off"),restartBtn.classList.remove("hidden"))}function restartDefault(){accPlayer=0,accPc=0,accTotal=0,playerCounter.innerHTML=""+accPlayer,pcCounter.innerHTML=""+accPc,numberRounds.innerHTML=10,btnUpdate.classList.remove("form__container--btn--off"),restartBtn.classList.add("hidden"),totalCounter.innerHTML=`Te quedan ${numberRounds.innerHTML} tiradas`}function handleClickUpdate(e){e.preventDefault(),compareResults(),updateCounter()}function handleClickRestart(){restartDefault()}function handleChangeInput(){pcImg.src="../assets/images/placeholder.png",pcImg.classList.add("result__display--pc--img"),"Piedra"===inputSelect.value?userImg.src="../assets/images/piedra.png":"Papel"===inputSelect.value?userImg.src="../assets/images/papel.png":"Tijera"===inputSelect.value&&(userImg.src="../assets/images/tijeras.png")}numberRounds.innerHTML="10",btnUpdate.addEventListener("click",handleClickUpdate),restartBtn.addEventListener("click",handleClickRestart),inputSelect.addEventListener("click",handleChangeInput);