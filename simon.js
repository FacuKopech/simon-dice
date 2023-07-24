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
popupRanking = document.getElementById('popupRanking');
btnGameOverClosePopup = document.getElementById('closeGameOverPopupBtn');
btnNameInfoClosePopup = document.getElementById('closeNameInfoPopupBtn');
btnRankingClosePopup = document.getElementById('closeRankingPopupBtn');
rowDataContainer = document.getElementById('rowDataContainer');
btnReset = document.getElementById('btnReset');
btnRanking = document.getElementById('btnRanking');
looserLayerElement = document.querySelector('.color-layer-looser');
winnerLayerElement = document.querySelector('.color-layer-winner');
progressBar = document.getElementById('progressBar');
labelSeconds = document.getElementById('labelSeconds');
scoreLabelHeader = document.getElementById('scoreLabelHeader');
dateLabelHeader = document.getElementById('dateLabelHeader');


var audioRojo = new Audio("C:/Users/FacundoKopech/Downloads/redBtnAudio.mp3");
var audioAzul = new Audio("C:/Users/FacundoKopech/Downloads/blueBtnAudio.mp3");
var audioVerde = new Audio("C:/Users/FacundoKopech/Downloads/btnGreenAudio.mp3");
var audioAmarillo = new Audio("C:/Users/FacundoKopech/Downloads/yellowAudioBtn.mp3");
var audioGameOver = new Audio("C:/Users/FacundoKopech/Downloads/loserAudio.mp3");

var gameSequenceArray = [];   
var playerSequenceArray = [];   
var createdElementsForRanking = [];
var arrayOrderedByScore = [];
var arrayOrderedByDate = [];
var playerClicksCounter = 0;
var level = 1;
var actualScore = 0;
var highestScore = 0;
var completeCharactersOnTitle = false;
var completedSequenceCorrectly = false;
var totalSequenceTime = 5;
var secondsLeft = totalSequenceTime;
var progressInterval;
var playerName = "";
var gameDate = null;
var gameNumber = 0;
var totalSecondsTaken = 0;

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
    getDate();
    input.disabled = true;  
    juegoActualH3.classList.remove("currentGameOver");
    juegoActualH3.classList.add("currentGame");    
    btnPlay.disabled = true;    
    levelDisplay.textContent = "Nivel: " + level;    
    btnPlay.textContent = "MIRA Y ESCUCHA!"; 
    armarSecuencia();        
});

function getDate(){    
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; 
    var day = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();


    var formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    var formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    gameDate = `${formattedDate} - ${formattedTime}`;
}

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
    labelSeconds.textContent = `${secondsLeft} seg`;
    reproducirSecuencia();
    var sequenceDuration = 1500 * gameSequenceArray.length;
    setTimeout(function() {
       
        progressInterval = setInterval(() => {
            secondsLeft--;
            updateProgressBar(secondsLeft);
            labelSeconds.textContent = `${secondsLeft} seg`;
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
            playerName = input.value;
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
    }
    
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";
        completedSequenceCorrectly = true;
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
    }
    
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";
        completedSequenceCorrectly = true;
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
    }
    
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";
        completedSequenceCorrectly = true;
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
    }
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";
        completedSequenceCorrectly = true;
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

function calcularPenalizacion(){ //if player took 2 seconds for example out of the total time to repeat the sequence, 2% of the correct clicks in that sequence will me removed from the score
    if(completedSequenceCorrectly){
        var porcentageToTake = ((totalSequenceTime + (level-1)) - secondsLeft);
        totalSecondsTaken = totalSecondsTaken + porcentageToTake;
        amountToTakeFromActualScore = (porcentageToTake * level) / 100; 
        var amountToAddToActualScore = level - amountToTakeFromActualScore;
        actualScore = actualScore + amountToAddToActualScore;
        actualScore  = (actualScore * 100) / 100; //two decimals
        labelScore.textContent = actualScore;
        console.log(actualScore);
    }else{
        
    }
    completedSequenceCorrectly = false;
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

    saveGameDataInLocalStorage();
    
    level = 1;    
    actualScore = 0;
    labelScore.textContent = actualScore;    
}

function saveGameDataInLocalStorage(){
    gameNumber = localStorage.getItem('Game');
    if(gameNumber == null){
        gameNumber = 1;        
    }
    else{
        gameNumber = parseInt(gameNumber) + 1;
    }
    localStorage.setItem('Game', gameNumber);
    localStorage.setItem(`Game: ${gameNumber} - Player`, playerName);
    localStorage.setItem(`Game: ${gameNumber} - Score`, actualScore);
    localStorage.setItem(`Game: ${gameNumber} - Highest level reached`, level);
    localStorage.setItem(`Game: ${gameNumber} - Seconds taken`, totalSecondsTaken);
    localStorage.setItem(`Game: ${gameNumber} - Date`, gameDate);
    
    console.log(localStorage.getItem('Game'));    
}

function orderRankingByScore(){
    var gamesLastScores = [];
    for (let i = 1; i <= gameNumber; i++) {       //Store all scores and its respective game number inside an array                  
        var score = localStorage.getItem(`Game: ${i} - Score`);    
        gamesLastScores.push(score);
        gamesLastScores.push(i);
    }
    
    var highestNumber = 0;
    var indexOfHighestNumber;
    for (let i = 0; i < gamesLastScores.length; i+= 2) { 
        if(i == 0){
            highestNumber = gamesLastScores[0];
            indexOfHighestNumber = 0;
        }    
        else{
            if(gamesLastScores[i] > highestNumber){
                highestNumber = gamesLastScores[i];
                indexOfHighestNumber = i;
            }
        }

        if(i == gamesLastScores.length - 2){
            arrayOrderedByScore.push(gamesLastScores[indexOfHighestNumber+1]); //save game number with highest score
            gamesLastScores.splice(indexOfHighestNumber, 1); //remove highest score
            gamesLastScores.splice(indexOfHighestNumber, 1); //remove game of highest score            
            i = -2;                     
        }
    }
}

function orderRankingByDate(){
    var gamesDates = [];
    for (let i = 1; i <= gameNumber; i++) {       //Store all scores and its respective game number inside an array                  
        var date = localStorage.getItem(`Game: ${i} - Date`);    
        gamesDates.push(date);
        gamesDates.push(i);
    }
    
    var highestDate = 0;
    var indexOfHighestDate;
    for (let i = 0; i < gamesDates.length; i+= 2) { 
        if(i == 0){
            highestDate = gamesDates[0];
            indexOfHighestDate = 0;
        }    
        else{
            if(gamesDates[i] > highestDate){
                highestDate = gamesDates[i];
                indexOfHighestDate = i;
            }
        }

        if(i == gamesDates.length - 2){ //if it is evaluating last date value
            arrayOrderedByDate.push(gamesDates[indexOfHighestDate+1]); //save game number with highest date
            gamesDates.splice(indexOfHighestDate, 1); //remove highest date
            gamesDates.splice(indexOfHighestDate, 1); //remove game of highest date
            i = -2;
        }
    }
}

function showRankingPopupOrderedByScore(){
    gameNumber = localStorage.getItem('Game');
    if(gameNumber != null){
        orderRankingByScore();
        for (let i = 0; i < arrayOrderedByScore.length; i++) {                
            var playerItemValue = localStorage.getItem(`Game: ${arrayOrderedByScore[i]} - Player`);
            var scoreItemValue = localStorage.getItem(`Game: ${arrayOrderedByScore[i]} - Score`);
            var levelItemValue = localStorage.getItem(`Game: ${arrayOrderedByScore[i]} - Highest level reached`);
            var secondsItemValue = localStorage.getItem(`Game: ${arrayOrderedByScore[i]} - Seconds taken`);
            var dateItemValue = localStorage.getItem(`Game: ${arrayOrderedByScore[i]} - Date`);            
                      
            var divLabelsContainer = document.createElement('div');
            divLabelsContainer.classList.add('divLabelsContainer');
            var playerLabel = document.createElement('label');
            playerLabel.classList.add('labelPlayer');
            var gameNumberLabel = document.createElement('label');
            var scoreLabel = document.createElement('label');
            var levelLabel = document.createElement('label');
            var totalSecondsSpentOnGameLabel = document.createElement('label');
            totalSecondsSpentOnGameLabel.classList.add('labelSeconds');
            var dateLabel = document.createElement('label');
            dateLabel.classList.add('labelDate');
            
            playerLabel.textContent = playerItemValue;
            gameNumberLabel.textContent = arrayOrderedByScore[i];
            scoreLabel.textContent = scoreItemValue;
            levelLabel.textContent = levelItemValue; 
            totalSecondsSpentOnGameLabel.textContent = secondsItemValue;
            dateLabel.textContent = dateItemValue;

            rowDataContainer.appendChild(divLabelsContainer);
            divLabelsContainer.appendChild(gameNumberLabel);
            divLabelsContainer.appendChild(playerLabel);            
            divLabelsContainer.appendChild(scoreLabel);
            divLabelsContainer.appendChild(levelLabel);
            divLabelsContainer.appendChild(totalSecondsSpentOnGameLabel);
            divLabelsContainer.appendChild(dateLabel);

            createdElementsForRanking.push(divLabelsContainer, playerLabel, gameNumberLabel, scoreLabel, levelLabel, totalSecondsSpentOnGameLabel, dateLabel);
        }        
    }
}

function showRankingPopupOrderedByDate(){
    gameNumber = localStorage.getItem('Game');
    if(gameNumber != null){
        orderRankingByDate();
        for (let i = 0; i < arrayOrderedByDate.length; i++) {                
            var playerItemValue = localStorage.getItem(`Game: ${arrayOrderedByDate[i]} - Player`);
            var scoreItemValue = localStorage.getItem(`Game: ${arrayOrderedByDate[i]} - Score`);
            var levelItemValue = localStorage.getItem(`Game: ${arrayOrderedByDate[i]} - Highest level reached`);
            var secondsItemValue = localStorage.getItem(`Game: ${arrayOrderedByDate[i]} - Seconds taken`);
            var dateItemValue = localStorage.getItem(`Game: ${arrayOrderedByDate[i]} - Date`);            
                      
            var divLabelsContainer = document.createElement('div');
            divLabelsContainer.classList.add('divLabelsContainer');
            var playerLabel = document.createElement('label');
            playerLabel.classList.add('labelPlayer');
            var gameNumberLabel = document.createElement('label');
            var scoreLabel = document.createElement('label');
            var levelLabel = document.createElement('label');
            var totalSecondsSpentOnGameLabel = document.createElement('label');
            totalSecondsSpentOnGameLabel.classList.add('labelSeconds');
            var dateLabel = document.createElement('label');
            dateLabel.classList.add('labelDate');
            
            playerLabel.textContent = playerItemValue;
            gameNumberLabel.textContent = arrayOrderedByDate[i];
            scoreLabel.textContent = scoreItemValue;
            levelLabel.textContent = levelItemValue; 
            totalSecondsSpentOnGameLabel.textContent = secondsItemValue;
            dateLabel.textContent = dateItemValue;

            rowDataContainer.appendChild(divLabelsContainer);
            divLabelsContainer.appendChild(gameNumberLabel);
            divLabelsContainer.appendChild(playerLabel);            
            divLabelsContainer.appendChild(scoreLabel);
            divLabelsContainer.appendChild(levelLabel);
            divLabelsContainer.appendChild(totalSecondsSpentOnGameLabel);
            divLabelsContainer.appendChild(dateLabel);

            createdElementsForRanking.push(divLabelsContainer, playerLabel, gameNumberLabel, scoreLabel, levelLabel, totalSecondsSpentOnGameLabel, dateLabel);
        }        
    }
}

btnGameOverClosePopup.addEventListener('click', function() {
    popupLooser.style.display = 'none';    
    btnPlay.disabled = false; 
  });
  btnNameInfoClosePopup.addEventListener('click', function() {       
    popupNameInfo.style.display = 'none'; 
  });
  btnRankingClosePopup.addEventListener('click', function() {       
    popupRanking.style.display = "none";
    for (var element of createdElementsForRanking) {
        element.remove();
    }
    arrayOrderedByScore = [];
  });

  btnReset.addEventListener('click', function() {
    localStorage.clear();
  });  

  btnRanking.addEventListener('click', function() {    
    showRankingPopupOrderedByScore();
    popupRanking.style.display = "flex";
  });  

  scoreLabelHeader.addEventListener('click', function(){
    for (var element of createdElementsForRanking) {
        element.remove();
    }
    arrayOrderedByScore = [];
    showRankingPopupOrderedByScore();
  });

  dateLabelHeader.addEventListener('click', function(){
    for (var element of createdElementsForRanking) {
        element.remove();
    }    
    arrayOrderedByDate = [];
    showRankingPopupOrderedByDate();
  });