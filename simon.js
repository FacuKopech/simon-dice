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
popupNameInfo = document.getElementById('popupNameInfo');
btnGameOverClosePopup = document.getElementById('closeGameOverPopupBtn');
btnNameInfoClosePopup = document.getElementById('closeNameInfoPopupBtn');
btnReset = document.getElementById('btnReset');
looserLayerElement = document.querySelector('.color-layer-looser');
winnerLayerElement = document.querySelector('.color-layer-winner');
progressBar = document.getElementById('progressBar');
labelSeconds = document.getElementById('labelSeconds');

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
var completeCharactersOnTitle = false;
var totalSequenceTime = 5;
var secondsLeft = totalSequenceTime;
var progressInterval;

function updateProgressBar(secondsLeft) {    
    var progressPercentage = (secondsLeft / (totalSequenceTime + (level-1))) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    console.log(secondsLeft,progressPercentage);
  if (secondsLeft <= 0) {
    clearInterval(progressInterval);
    progressBar.style.width = '0%';    
    finalizarJuego();
  }
  if(progressPercentage <= 50){
    console.log(progressPercentage);
    progressBar.style.backgroundColor = "red";
    labelSeconds.style.color = "red";
  }else{
    progressBar.style.backgroundColor = "darkgreen";
    labelSeconds.style.color = "darkgreen";
  }
}



window.onload = function() {    
    popupNameInfo.style.display = "flex";
    var highestScore = localStorage.getItem('highScore');
    labelHighestScoreSaved.textContent = highestScore;
    var highLevel = localStorage.getItem('highLevel');
    labelHighestLevelSaved.textContent = highLevel;
    btnPlay.disabled = true;
    btnRed.disabled = true;
    btnBlue.disabled = true;
    btnGreen.disabled = true;
    btnYellow.disabled = true;     
  };
btnPlay.addEventListener("click", function() {  
    input.disabled = true;  
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
    secondsLeft = totalSequenceTime + (level-1);        
    updateProgressBar(secondsLeft);
    labelSeconds.textContent = secondsLeft;
    reproducirSecuencia();
    var sequenceDuration = 1500 * gameSequenceArray.length;
    setTimeout(function() {
       
        progressInterval = setInterval(() => {
            secondsLeft--;
            updateProgressBar(secondsLeft);
            labelSeconds.textContent = secondsLeft;
          }, 1000);         
        btnPlay.textContent = "REPETI LA SECUENCIA!";
        btnRed.disabled = false;
        btnBlue.disabled = false;
        btnGreen.disabled = false;
        btnYellow.disabled = false;
      }, sequenceDuration);    
}
function updateTitle() {    
    if(input.value.trim() !== ''){ //Check if typed values are not just spaces        
        var updatedTitle = `Bienvenido ${input.value}`;       
        title.textContent = updatedTitle;
        if(title.textContent.length >= 14){
            completeCharactersOnTitle = true; //Rise flag when title value reaches 14 characters
        }    
        if(title.textContent.length >= 14){
            btnPlay.disabled = false;
        }else if(title.textContent.length < 14 && completeCharactersOnTitle == true){ //If goes in here its because it is deleting value on input until less than 14 chars
            btnPlay.disabled = true;
            popupNameInfo.style.display = "flex";
        }
    }else{
        btnPlay.disabled = true;
    } 
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
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressBar.style.backgroundColor = "darkgreen";
    }else{
        actualScore += 1;
        labelScore.textContent = actualScore;
    }
    
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";
        
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressBar.style.backgroundColor = "darkgreen";

        setTimeout(() => {
            winnerLayerElement.style.display = "none";
        }, 900);
        setTimeout(function() {
            armarSecuencia()
        }, 1500);
    }    
    calcularPenalizacion();
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
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressBar.style.backgroundColor = "darkgreen";
    }else{
        actualScore += 1;
        labelScore.textContent = actualScore;
    }
    
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";
       
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressBar.style.backgroundColor = "darkgreen";

        setTimeout(() => {
            winnerLayerElement.style.display = "none";
        }, 900);
        setTimeout(function() {
            armarSecuencia()
        }, 1500);
    }    
    calcularPenalizacion();
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
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressBar.style.backgroundColor = "darkgreen";                        
    }else{
        actualScore += 1;
        labelScore.textContent = actualScore;
    } 
    
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";
        
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressBar.style.backgroundColor = "darkgreen";
        
        setTimeout(() => {
            winnerLayerElement.style.display = "none";
        }, 900);
        setTimeout(function() {
            armarSecuencia()        
        }, 1500);
    }    
    calcularPenalizacion();
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
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        progressBar.style.backgroundColor = "darkgreen";
    }else{
        actualScore += 1;
        labelScore.textContent = actualScore;
    }
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";
        
       clearInterval(progressInterval);
       progressBar.style.width = '100%';
       progressBar.style.backgroundColor = "darkgreen";

        setTimeout(() => {
            winnerLayerElement.style.display = "none";
        }, 900);
        setTimeout(function() {
            armarSecuencia()
        }, 1500);
    }    
    calcularPenalizacion();
});

btnYellow.addEventListener("mousedown", function() {
    btnYellow.classList.add("transition-active-yellow");
    audioAmarillo.play();
  });
    
  btnYellow.addEventListener("mouseup", function() {
    btnYellow.classList.remove("transition-active-yellow");
  });

function calcularPenalizacion(){
    var porcentageToTake = ((totalSequenceTime + (level-1)) - secondsLeft)
    amountToTakeFromActualScore = (actualScore * porcentageToTake) / 100; 
    actualScore = actualScore - amountToTakeFromActualScore;
    actualScore = actualScore.toFixed(2);
}

function finalizarJuego(){
    looserLayerElement.style.display = "flex";
    input.disabled = false;
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

btnGameOverClosePopup.addEventListener('click', function() {
    popupLooser.style.display = 'none';    
    btnPlay.disabled = false; 
  });
  btnNameInfoClosePopup.addEventListener('click', function() {       
    popupNameInfo.style.display = 'none'; 
  });

  btnReset.addEventListener('click', function() {
    localStorage.removeItem('highScore');    
    localStorage.removeItem('highLevel');
    labelHighestScoreSaved.textContent = "";    
    labelHighestLevelSaved.textContent = "";
  });

  //EL PARRAL ---- ESCAURIZA (mesa en la ventana mirando al rio)