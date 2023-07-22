btnPlay = document.querySelector('button[id="btnPlay"]');
btnRed = document.querySelector('button[id="1"]');
btnBlue = document.querySelector('button[id="2"]');
btnGreen = document.querySelector('button[id="3"]');
btnYellow = document.querySelector('button[id="4"]');
juegoActualH3 = document.querySelector('h3[id="actualGame"]');
levelDisplay = document.querySelector('h6[id="h6LevelDisplay"]');
labelScore = document.querySelector('label[id="labelScore"]');
labelScoreGameOver = document.querySelector('label[id="labelScoreGameOver"]');
labelHighestScoreSaved = document.querySelector('label[id="highestScoreSaved"]');
labelHighestLevelSaved = document.querySelector('label[id="highestLevelSaved"]');
input = document.getElementById("textInput");
title = document.getElementById("welcomeTitle");
titlePopup = document.getElementById("popupTitle");
popupLooser = document.getElementById('popupLooser');
btnClosePopup = document.getElementById('closePopupBtn');
btnReset = document.getElementById('btnReset');
looserLayerElement = document.querySelector('.color-layer-looser');
winnerLayerElement = document.querySelector('.color-layer-winner');


var audioRojo = new Audio("C:/Users/FacundoKopech/Downloads/redBtnAudio.mp3");
var audioAzul = new Audio("C:/Users/FacundoKopech/Downloads/blueBtnAudio.mp3");
var audioVerde = new Audio("C:/Users/FacundoKopech/Downloads/btnGreenAudio.mp3");
var audioAmarillo = new Audio("C:/Users/FacundoKopech/Downloads/yellowAudioBtn.mp3");
var audioGameOver = new Audio("C:/Users/FacundoKopech/Downloads/loserAudio.mp3");

var gameSequenceArray = [];   
var playerSequenceArray = [];   
var playerClicksCounter = 0;
var level = 1;
var actualScore = 0;
var highestScore = 0;

window.onload = function() {
    var highestScore = localStorage.getItem('highScore');
    labelHighestScoreSaved.textContent = highestScore;
    var highLevel = localStorage.getItem('highLevel');
    labelHighestLevelSaved.textContent = highLevel;
    btnRed.disabled = true;
    btnBlue.disabled = true;
    btnGreen.disabled = true;
    btnYellow.disabled = true;
 
  };
btnPlay.addEventListener("click", function() {
    juegoActualH3.classList.remove("currentGameOver");
    juegoActualH3.classList.add("currentGame");    
    btnPlay.disabled = true;    
    levelDisplay.textContent = "Nivel: " + level;    
    btnPlay.textContent = "MIRA Y ESCUCHA!"; 
    armarSecuencia();    
});

function armarSecuencia(){             
    btnPlay.textContent = "MIRA Y ESCUCHA!"; 
    var randomNumber = Math.floor(Math.random() * 4) + 1;
    gameSequenceArray.push(randomNumber);    
    if(gameSequenceArray.length > 1){
        level += 1;
        levelDisplay.textContent = "Nivel: " + level;
        labelScore.textContent = actualScore;
    }
        btnRed.disabled = true;
        btnBlue.disabled = true;
        btnGreen.disabled = true;
        btnYellow.disabled = true;
    reproducirSecuencia();
    var sequenceDuration = 1500 * gameSequenceArray.length;
    setTimeout(function() {
        btnPlay.textContent = "REPETI LA SECUENCIA!";
        btnRed.disabled = false;
        btnBlue.disabled = false;
        btnGreen.disabled = false;
        btnYellow.disabled = false;
      }, sequenceDuration);    
}
function updateTitle() {    
    var updatedTitle = `Bienvenido ${input.value}`;
    title.textContent = updatedTitle;
  }

function  reproducirSecuencia(){      
    
    playerClicksCounter = 0;
    for (var i = 0; i < gameSequenceArray.length; i++) {
        if(gameSequenceArray[i] == parseInt(btnRed.id)){
            setTimeout(function() {
                luzYSonidoRojo();
              }, i * 1500);
        }else if(gameSequenceArray[i] == parseInt(btnBlue.id)){
            setTimeout(function() {
                luzYSonidoAzul();
              }, i * 1500); 
        }else if(gameSequenceArray[i] == parseInt(btnGreen.id)){
            setTimeout(function() {
                luzYSonidoVerde();
              }, i * 1500);  
        }else{
            setTimeout(function() {
                luzYSonidoAmarillo();
              }, i * 1500); 
        }        
    } 
}

function luzYSonidoRojo(){
    audioRojo.play();
      
    btnRed.classList.add("transition-active-red");
    setTimeout(function() {
        btnRed.classList.remove("transition-active-red");
      }, 1000); // Adjust the delay as needed
}
function luzYSonidoAzul(){
    audioAzul.play();
    
    btnBlue.classList.add("transition-active-blue");
    setTimeout(function() {
        btnBlue.classList.remove("transition-active-blue");
      }, 1000); // Adjust the delay as needed
}
function luzYSonidoVerde(){
    audioVerde.play();
  
    btnGreen.classList.add("transition-active-green");
    setTimeout(function() {
        btnGreen.classList.remove("transition-active-green");
      }, 1000); // Adjust the delay as needed
}
function luzYSonidoAmarillo(){
    audioAmarillo.play();
      
    btnYellow.classList.add("transition-active-yellow");
    setTimeout(function() {
        btnYellow.classList.remove("transition-active-yellow");
      }, 1000); // Adjust the delay as needed
}

btnRed.addEventListener("click", function(){                    
    playerClicksCounter += 1;
    if(gameSequenceArray[playerClicksCounter - 1] != parseInt(btnRed.id)){
        finalizarJuego();
    }else{
        actualScore += 1;
        labelScore.textContent = actualScore;
    }
    
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";

        setTimeout(() => {
            winnerLayerElement.style.display = "none";
        }, 900);
        setTimeout(function() {
            armarSecuencia()
        }, 1500);
    }    
});

btnRed.addEventListener("mousedown", function() {
    btnRed.classList.add("transition-active-red");
    audioRojo.play();
  });
    
  btnRed.addEventListener("mouseup", function() {
    btnRed.classList.remove("transition-active-red");
  });

btnBlue.addEventListener("click", function(){
          
    playerClicksCounter += 1;
    if(gameSequenceArray[playerClicksCounter - 1] != parseInt(btnBlue.id)){
        finalizarJuego();
    }else{
        actualScore += 1;
        labelScore.textContent = actualScore;
    }
    
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";

        setTimeout(() => {
            winnerLayerElement.style.display = "none";
        }, 900);
        setTimeout(function() {
            armarSecuencia()
        }, 1500);
    }    
});

btnBlue.addEventListener("mousedown", function() {
    btnBlue.classList.add("transition-active-blue");
    audioAzul.play();
  });
    
  btnBlue.addEventListener("mouseup", function() {
    btnBlue.classList.remove("transition-active-blue");
  });

btnGreen.addEventListener("click", function(){
            
    playerClicksCounter += 1;
    if(gameSequenceArray[playerClicksCounter - 1] != parseInt(btnGreen.id)){
        finalizarJuego();
    }else{
        actualScore += 1;
        labelScore.textContent = actualScore;
    } 
    
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";

        setTimeout(() => {
            winnerLayerElement.style.display = "none";
        }, 900);
        setTimeout(function() {
            armarSecuencia()        
        }, 1500);
    }    
});

btnGreen.addEventListener("mousedown", function() {
    btnGreen.classList.add("transition-active-green");
    audioVerde.play();    
  });
    
  btnGreen.addEventListener("mouseup", function() {
    btnGreen.classList.remove("transition-active-green");
   
  });

btnYellow.addEventListener("click", function(){
  
    playerClicksCounter += 1;
    if(gameSequenceArray[playerClicksCounter - 1] != parseInt(btnYellow.id)){
        finalizarJuego();
    }else{
        actualScore += 1;
        labelScore.textContent = actualScore;
    }
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";

        setTimeout(() => {
            winnerLayerElement.style.display = "none";
        }, 900);
        setTimeout(function() {
            armarSecuencia()
        }, 1500);
    }    
});

btnYellow.addEventListener("mousedown", function() {
    btnYellow.classList.add("transition-active-yellow");
    audioAmarillo.play();
  });
    
  btnYellow.addEventListener("mouseup", function() {
    btnYellow.classList.remove("transition-active-yellow");
  });

function finalizarJuego(){
    looserLayerElement.style.display = "flex";

    setTimeout(() => {
        looserLayerElement.style.display = "none";
    }, 900);

    popupLooser.style.display = "flex";
    btnPlay.disabled = true;
    var updatedTitle = `GAME OVER ${input.value}!`;
    titlePopup.textContent = updatedTitle;
    labelScoreGameOver.textContent = actualScore;
    juegoActualH3.classList.remove("currentGame");
    juegoActualH3.classList.add("currentGameOver");
    playerClicksCounter = 0;
    playerSequenceArray = [];
    gameSequenceArray = [];
    btnRed.disabled = true;
    btnBlue.disabled = true;
    btnGreen.disabled = true;
    btnYellow.disabled = true;
    levelDisplay.textContent = "";    
    btnPlay.textContent = "JUGAR";
    
    
    audioGameOver.play();
    var highScore = localStorage.getItem('highScore');
    var highestLevelSaved = localStorage.getItem('highLevel');

    if (highScore == null) {
        localStorage.setItem('highScore', actualScore);
    }else{
        var highestScoreSaved = parseInt(highScore);
        if(actualScore > highestScoreSaved){
            localStorage.setItem('highScore', actualScore);
        }
    }
    if (highestLevelSaved == null) {
        localStorage.setItem('highLevel', level);
    }else{
        var highestLevel = parseInt(highestLevelSaved);
        if(level > highestLevel){
            localStorage.setItem('highLevel', level);
        }
    }
    var highestScore = localStorage.getItem('highScore');
    labelHighestScoreSaved.textContent = highestScore;
    var highLevel = localStorage.getItem('highLevel');
    labelHighestLevelSaved.textContent = highLevel;
    level = 1;    
    actualScore = 0;
    labelScore.textContent = actualScore;    
}

btnClosePopup.addEventListener('click', function() {
    popupLooser.style.display = 'none';
    btnPlay.disabled = false;
  });

  btnReset.addEventListener('click', function() {
    localStorage.removeItem('highScore');    
    localStorage.removeItem('highLevel');
    labelHighestScoreSaved.textContent = "";    
    labelHighestLevelSaved.textContent = "";
  });