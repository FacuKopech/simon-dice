"use strict";

//BUTTONS
var btnPlay = document.querySelector('button[id="btnPlay"]');
var btnRed = document.querySelector('button[id="1"]');
var btnBlue = document.querySelector('button[id="2"]');
var btnGreen = document.querySelector('button[id="3"]');
var btnYellow = document.querySelector('button[id="4"]');
var btnNameInfoClosePopup = document.getElementById("closeNameInfoPopupBtn");
var btnRankingClosePopup = document.getElementById("closeRankingPopupBtn");
var btnContact = document.getElementById("contactBtn");
var btnReset = document.getElementById("btnReset");
var btnRanking = document.getElementById("btnRanking");
var btnGameOverClosePopup = document.getElementById("closeGameOverPopupBtn");

//POPUPS
var popupLooser = document.getElementById("popupLooser");
var popupNameInfo = document.getElementById("popupNameInfo");
var popupRanking = document.getElementById("popupRanking");

//LABELS
var levelDisplay = document.querySelector('h6[id="h6LevelDisplay"]');
var labelScore = document.querySelector('label[id="labelScore"]');
var labelScoreGameOver = document.querySelector('label[id="labelScoreGameOver"]');
var labelHighestScoreSaved = document.querySelector('label[id="highestScoreSaved"]');
var labelOwnerHighestScoreSaved = document.querySelector('label[id="ownerHighestScoreSavedLabel"]');
var labelHighestLevelSaved = document.querySelector('label[id="highestLevelSaved"]');
var labelOwnerHighestLevelSaved = document.querySelector('label[id="ownerHighestLevelSavedLabel"]');
var labelSeconds = document.getElementById("labelSeconds");
var scoreLabelHeader = document.getElementById("scoreLabelHeader");
var dateLabelHeader = document.getElementById("dateLabelHeader");

//LAYERS
var looserLayerElement = document.querySelector(".color-layer-looser");
var winnerLayerElement = document.querySelector(".color-layer-winner");

//TITLES
var title = document.getElementById("welcomeTitle");
var titlePopup = document.getElementById("popupTitle");
var juegoActualH3 = document.querySelector('h3[id="actualGame"]');

//INPUTS
var input = document.getElementById("textInput");

// CONTAINERS
var rowDataContainer = document.getElementById("rowDataContainer");

//PROGRESS BAR
var progressBar = document.getElementById("progressBar");

//AUDIOS
var audioRojo = new Audio("C:/Users/FacundoKopech/Downloads/redBtnAudio.mp3");
var audioAzul = new Audio("C:/Users/FacundoKopech/Downloads/blueBtnAudio.mp3");
var audioVerde = new Audio("C:/Users/FacundoKopech/Downloads/btnGreenAudio.mp3");
var audioAmarillo = new Audio("C:/Users/FacundoKopech/Downloads/yellowAudioBtn.mp3");
var audioGameOver = new Audio("C:/Users/FacundoKopech/Downloads/loserAudio.mp3");

//VARIABLES

//arrays
var gameSequenceArray = [];   
var playerSequenceArray = [];   
var createdElementsForRanking = [];
var arrayOrderedByScore = [];
var arrayOrderedByDate = [];

//counters
var playerClicksCounter = 0;
var level = 1;
var actualScore = 0;
var highestScore = 0;
var gameNumber = 0;
var totalSecondsTaken = 0;

//flags
var completeCharactersOnTitle = false;
var completedSequenceCorrectly = false;

//others
var totalSequenceTime = 5;
var secondsLeft = totalSequenceTime;
var progressInterval;
var playerName = "";
var gameDate = null;

//Onload Event on window
window.onload = function() {    
    popupNameInfo.style.display = "flex";
    if(localStorage.getItem("Game") != null && localStorage.getItem("Game") >= 1){
        var highestScore = localStorage.getItem("highestScore");
        labelHighestScoreSaved.textContent = highestScore;
        var ownerHighestScore = localStorage.getItem("ownerHighestScore");
        labelOwnerHighestScoreSaved.textContent = ownerHighestScore;
        var highestLevel = localStorage.getItem("highestLevel");
        labelHighestLevelSaved.textContent = highestLevel;
        var ownerHighestLevel = localStorage.getItem("ownerHighestLevel");
        labelOwnerHighestLevelSaved.textContent = ownerHighestLevel;
    }    
    btnPlay.disabled = true;
    btnRed.disabled = true;
    btnBlue.disabled = true;
    btnGreen.disabled = true;
    btnYellow.disabled = true;     
  };

//EVENT LISTENERS

//btnPlay Event
btnPlay.addEventListener("click", function() {  
    getDate();
    input.disabled = true;  
    juegoActualH3.classList.remove("currentGameOver");
    juegoActualH3.classList.add("currentGame");    
    btnPlay.disabled = true;    
    levelDisplay.textContent = "Nivel: " + level;    
    btnPlay.textContent = "MIRA Y ESCUCHA!"; 
    buildSequence();        
});

//btnContact Event
btnContact.addEventListener("click", function(){
    window.open("contactPage.html", "_blank");
});

//btnRed Events
btnRed.addEventListener("click", function(){                    
    playerClicksCounter += 1;
    if(gameSequenceArray[playerClicksCounter - 1] != parseInt(btnRed.id)){        
        clearInterval(progressInterval);
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "darkgreen";
        calculatePenalization();
        GameOver();
    }
    
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";
        completedSequenceCorrectly = true;
        clearInterval(progressInterval);
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "darkgreen";

        setTimeout(() => {
            winnerLayerElement.style.display = "none";
        }, 900);
        setTimeout(function() {
            buildSequence()
        }, 1500);
        calculatePenalization();
    }        
});

btnRed.addEventListener("mousedown", function() {
    btnRed.classList.add("transition-active-red");
    audioRojo.play();
});
    
btnRed.addEventListener("mouseup", function() {
    btnRed.classList.remove("transition-active-red");
});

//btnBlue Events
btnBlue.addEventListener("click", function(){          
    playerClicksCounter += 1;
    if(gameSequenceArray[playerClicksCounter - 1] != parseInt(btnBlue.id)){        
        clearInterval(progressInterval);
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "darkgreen";
        calculatePenalization();
        GameOver();
    }
    
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";
        completedSequenceCorrectly = true;
        clearInterval(progressInterval);
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "darkgreen";

        setTimeout(() => {
            winnerLayerElement.style.display = "none";
        }, 900);
        setTimeout(function() {
            buildSequence()
        }, 1500);
        calculatePenalization();
    }        
});

btnBlue.addEventListener("mousedown", function() {
    btnBlue.classList.add("transition-active-blue");
    audioAzul.play();
});
    
btnBlue.addEventListener("mouseup", function() {
    btnBlue.classList.remove("transition-active-blue");
});

//btnGreen Events
btnGreen.addEventListener("click", function(){            
    playerClicksCounter += 1;
    if(gameSequenceArray[playerClicksCounter - 1] != parseInt(btnGreen.id)){    
        clearInterval(progressInterval);
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "darkgreen";         
        calculatePenalization();               
        GameOver();
    }
    
    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";
        completedSequenceCorrectly = true;
        clearInterval(progressInterval);
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "darkgreen";
        
        setTimeout(() => {
            winnerLayerElement.style.display = "none";
        }, 900);
        setTimeout(function() {
            buildSequence()        
        }, 1500);
        calculatePenalization();
    }        
});

btnGreen.addEventListener("mousedown", function() {
    btnGreen.classList.add("transition-active-green");
    audioVerde.play();    
});
    
btnGreen.addEventListener("mouseup", function() {
    btnGreen.classList.remove("transition-active-green");
   
});

//btnYellow Events
btnYellow.addEventListener("click", function(){  
    playerClicksCounter += 1;
    if(gameSequenceArray[playerClicksCounter - 1] != parseInt(btnYellow.id)){        
        clearInterval(progressInterval);
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "darkgreen";
        calculatePenalization();
        GameOver();
    }

    if(playerClicksCounter == gameSequenceArray.length && playerClicksCounter != 0){
        winnerLayerElement.style.display = "flex";
        completedSequenceCorrectly = true;
       clearInterval(progressInterval);
       progressBar.style.width = "100%";
       progressBar.style.backgroundColor = "darkgreen";

        setTimeout(() => {
            winnerLayerElement.style.display = "none";
        }, 900);
        setTimeout(function() {
            buildSequence()
        }, 1500);
        calculatePenalization();
    }        
});

btnYellow.addEventListener("mousedown", function() {
    btnYellow.classList.add("transition-active-yellow");
    audioAmarillo.play();
});
    
btnYellow.addEventListener("mouseup", function() {
    btnYellow.classList.remove("transition-active-yellow");
});

//btnGameOverClosePopup Event
btnGameOverClosePopup.addEventListener("click", function() {
    popupLooser.style.display = "none";    
    btnPlay.disabled = false; 
});

//btnNameInfoClosePopup Event
btnNameInfoClosePopup.addEventListener("click", function() {       
    popupNameInfo.style.display = "none"; 
});

//btnRankingClosePopup Event
btnRankingClosePopup.addEventListener("click", function() {       
    popupRanking.style.display = "none";
    for (var element of createdElementsForRanking) {
        element.remove();
    }
    arrayOrderedByScore = [];
});

//btnReset Event
btnReset.addEventListener("click", function() {
    localStorage.clear();
    labelHighestScoreSaved.textContent = "";
    labelOwnerHighestScoreSaved.textContent = "";
    labelHighestLevelSaved.textContent = "";
    labelOwnerHighestLevelSaved.textContent = "";  
});  

//btnRanking Event
btnRanking.addEventListener("click", function() {    
    showRankingPopupOrderedByScore();
    popupRanking.style.display = "flex";
});  

//scoreLabelHeader Event
scoreLabelHeader.addEventListener("click", function(){
    for (var element of createdElementsForRanking) {
        element.remove();
    }
    arrayOrderedByScore = [];
    showRankingPopupOrderedByScore();
});

//dateLabelHeader Event
dateLabelHeader.addEventListener("click", function(){
    for (var element of createdElementsForRanking) {
        element.remove();
    }    
    arrayOrderedByDate = [];
    showRankingPopupOrderedByDate();
});

//FUNCTIONS

function getDate(){ //gets the current Date to save in Local Storage for Ranking
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; 
    var day = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();


    var formattedDate = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
    var formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    gameDate = `${formattedDate} - ${formattedTime}`;
}

function buildSequence(){  //builds the sequence of buttons to repeat          
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
    reproduceSequence();
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

function reproduceSequence(){  //plays the sequence of buttons to the player  
    playerClicksCounter = 0;
    for (var i = 0; i < gameSequenceArray.length; i++) {
        if(gameSequenceArray[i] == parseInt(btnRed.id)){
            setTimeout(function() {
                playRedSoundAndLight();
            }, i * 1500);
        }else if(gameSequenceArray[i] == parseInt(btnBlue.id)){
            setTimeout(function() {
                playBlueSoundAndLight();
            }, i * 1500); 
        }else if(gameSequenceArray[i] == parseInt(btnGreen.id)){
            setTimeout(function() {
                playGreenSoundAndLight();
            }, i * 1500);  
        }else{
            setTimeout(function() {
                playYellowSoundAndLight();
            }, i * 1500); 
        }        
    } 
}

function playRedSoundAndLight(){ //plays sound and light for red button
    audioRojo.play();      
    btnRed.classList.add("transition-active-red");
    setTimeout(function() {
        btnRed.classList.remove("transition-active-red");
    }, 1000); 
}

function playBlueSoundAndLight(){ //plays sound and light for blue button
    audioAzul.play();    
    btnBlue.classList.add("transition-active-blue");
    setTimeout(function() {
        btnBlue.classList.remove("transition-active-blue");
    }, 1000); 
}

function playGreenSoundAndLight(){ //plays sound and light for green button
    audioVerde.play();  
    btnGreen.classList.add("transition-active-green");
    setTimeout(function() {
        btnGreen.classList.remove("transition-active-green");
    }, 1000);
}
function playYellowSoundAndLight(){ //plays sound and light for yellow button
    audioAmarillo.play();      
    btnYellow.classList.add("transition-active-yellow");
    setTimeout(function() {
        btnYellow.classList.remove("transition-active-yellow");
    }, 1000); 
}

function updateTitle() {    //updates the "Bienvenido" title on user's name input with input's value
    if(input.value.trim() !== ""){ //Check if typed values are not just spaces        
        var updatedTitle = `Bienvenido ${input.value}`;       
        title.textContent = updatedTitle;
        if(title.textContent.length >= 14){
            completeCharactersOnTitle = true; //Rise flag when title value reaches 14 characters (Bienvenido + [space] + 3 letters)
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

function updateProgressBar(secondsLeft) {  //updates the progress bar every second
    var progressPercentage = (secondsLeft / (totalSequenceTime + (level-1))) * 100;
    progressBar.style.width = `${progressPercentage-10}%`;    
  if (secondsLeft <= 0) {
    clearInterval(progressInterval);
    progressBar.style.width = "0%";    
    GameOver();
  }
  if(progressPercentage <= 50 && progressPercentage >= 20){    
    progressBar.style.backgroundColor = "yellow";
    labelSeconds.style.color = "yellow";
  }else if(progressPercentage > 50){
    progressBar.style.backgroundColor = "darkgreen";
    labelSeconds.style.color = "darkgreen";
  }else if(progressPercentage < 20){
    progressBar.style.backgroundColor = "red";
    labelSeconds.style.color = "red";
  }
}

function calculatePenalization(){ //if player took 2 seconds for example out of the total time to repeat the sequence, 2% of the correct clicks in that sequence will be removed from the score
    if(completedSequenceCorrectly){ //if the sequence was completed correctly, the penalization applies to the amount of clicks on that level (amount of clicks = level)
        var porcentageToTake = ((totalSequenceTime + (level-1)) - secondsLeft);
        totalSecondsTaken = totalSecondsTaken + porcentageToTake; //this value is not for the penalization, is just to keep track in storage of how many seconds in total it took for the player from starting to loosing the game
        amountToTakeFromActualScore = (porcentageToTake * level) / 100; 
        var amountToAddToActualScore = level - amountToTakeFromActualScore;
        actualScore = actualScore + amountToAddToActualScore;
        actualScore  = (actualScore * 100) / 100; //result with two decimals
        labelScore.textContent = actualScore;        
    }else{ // if the sequence was NOT completed correctly, the penalization applies only to the amount of correct clicks in that level        
        var totalOfCorrectClicksUntilMistake = level -1;
        var porcentageToTake = ((totalSequenceTime + (level-1)) - secondsLeft);
        totalSecondsTaken = totalSecondsTaken + porcentageToTake; 
        amountToTakeFromActualScore = (porcentageToTake * totalOfCorrectClicksUntilMistake) / 100; 
        var amountToAddToActualScore = totalOfCorrectClicksUntilMistake - amountToTakeFromActualScore;
        actualScore = actualScore + amountToAddToActualScore;
        actualScore  = (Math.round(actualScore * 100) / 100).toFixed(2);
        labelScore.textContent = actualScore;        
    }
    completedSequenceCorrectly = false;
}

function GameOver(){ //sets the variables and calls the appropiate methods to prepare for the next Game
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
    calculateHighestLevelAndScoreSaved();
    
    level = 1;    
    actualScore = 0;
    labelScore.textContent = actualScore;    
}

function saveGameDataInLocalStorage(){ //saves data in local storage for Ranking
    gameNumber = localStorage.getItem("Game");
    if(gameNumber == null){
        gameNumber = 1;        
    }
    else{
        gameNumber = parseInt(gameNumber) + 1;
    }
    localStorage.setItem("Game", gameNumber);
    localStorage.setItem(`Game: ${gameNumber} - Player`, playerName);
    localStorage.setItem(`Game: ${gameNumber} - Score`, actualScore);
    localStorage.setItem(`Game: ${gameNumber} - Highest level reached`, level);
    localStorage.setItem(`Game: ${gameNumber} - Seconds taken`, totalSecondsTaken);
    localStorage.setItem(`Game: ${gameNumber} - Date`, gameDate);    
}

function calculateHighestLevelAndScoreSaved(){ //calculate highest level and score saved to know to which player do the values belong to
    gameNumber = localStorage.getItem("Game");
    if(gameNumber != null){
        var highestScore = 0;
        var highestScoreBelongsTo = null;
        var highestLevel = 0;
        var highestLevelBelongsTo = null;
        for (var i = 1; i <= gameNumber; i++) {    
            if(i == 1){
                highestScore = localStorage.getItem(`Game: ${1} - Score`);
                highestScoreBelongsTo = localStorage.getItem(`Game: ${1} - Player`);
                highestLevel = localStorage.getItem(`Game: ${1} - Highest level reached`);
                highestLevelBelongsTo = localStorage.getItem(`Game: ${1} - Player`);
            }else{
                if(localStorage.getItem(`Game: ${i} - Score`) > highestScore){
                    highestScore = localStorage.getItem(`Game: ${i} - Score`);
                    highestScoreBelongsTo = localStorage.getItem(`Game: ${i} - Player`);
                }

                if(localStorage.getItem(`Game: ${i} - Highest level reached`) > highestLevel){
                    highestLevel = localStorage.getItem(`Game: ${i} - Highest level reached`);
                    highestLevelBelongsTo = localStorage.getItem(`Game: ${i} - Player`);
                }
            }
        }
    }

    labelHighestScoreSaved.textContent = highestScore;
    labelOwnerHighestScoreSaved.textContent = highestScoreBelongsTo;
    labelHighestLevelSaved.textContent = highestLevel;
    labelOwnerHighestLevelSaved.textContent = highestLevelBelongsTo;

    localStorage.setItem("highestScore", highestScore);
    localStorage.setItem("ownerHighestScore", highestScoreBelongsTo);
    localStorage.setItem("highestLevel", highestLevel);
    localStorage.setItem("ownerHighestLevel", highestLevelBelongsTo);
}

function orderRankingByScore(){ //orders the array by score (from highest to lowest)
    var gamesLastScores = [];
    for (var i = 1; i <= gameNumber; i++) {  //Store all scores and its respective game number inside an array                  
        var score = localStorage.getItem(`Game: ${i} - Score`);    
        gamesLastScores.push(score);
        gamesLastScores.push(i);
    }
    
    var highestNumber = 0;
    var indexOfHighestNumber;
    for (var i = 0; i < gamesLastScores.length; i+= 2) { 
        if(i == 0){
            highestNumber = gamesLastScores[0];
            indexOfHighestNumber = 0;
        }    
        else if(gamesLastScores[i] > highestNumber){
            highestNumber = gamesLastScores[i];
            indexOfHighestNumber = i;
        }        

        if(i == gamesLastScores.length - 2){
            arrayOrderedByScore.push(gamesLastScores[indexOfHighestNumber+1]); //save game number with highest score
            gamesLastScores.splice(indexOfHighestNumber, 1); //remove highest score
            gamesLastScores.splice(indexOfHighestNumber, 1); //remove game of highest score            
            i = -2;                     
        }
    }
}

function orderRankingByDate(){ //orders the array by date (from highest to lowest)
    var gamesDates = [];
    for (var i = 1; i <= gameNumber; i++) {       //Store all scores and its respective game number inside an array                  
        var date = localStorage.getItem(`Game: ${i} - Date`);    
        gamesDates.push(date);
        gamesDates.push(i);
    }
    
    var highestDate = 0;
    var indexOfHighestDate;
    for (var i = 0; i < gamesDates.length; i+= 2) { 
        if(i == 0){
            highestDate = gamesDates[0];
            indexOfHighestDate = 0;
        }    
        else if(gamesDates[i] > highestDate){
            highestDate = gamesDates[i];
            indexOfHighestDate = i;
        }        

        if(i == gamesDates.length - 2){ //if it is evaluating last date value
            arrayOrderedByDate.push(gamesDates[indexOfHighestDate+1]); //save game number with highest date
            gamesDates.splice(indexOfHighestDate, 1); //remove highest date
            gamesDates.splice(indexOfHighestDate, 1); //remove game of highest date
            i = -2;
        }
    }
}

function showRankingPopupOrderedByScore(){ //if the "Score" label is clicked, the Ranking will be ordered by score
    gameNumber = localStorage.getItem("Game");
    if(gameNumber != null){
        orderRankingByScore();
        for (var i = 0; i < arrayOrderedByScore.length; i++) {                
            var playerItemValue = localStorage.getItem(`Game: ${arrayOrderedByScore[i]} - Player`);
            var scoreItemValue = localStorage.getItem(`Game: ${arrayOrderedByScore[i]} - Score`);
            var levelItemValue = localStorage.getItem(`Game: ${arrayOrderedByScore[i]} - Highest level reached`);
            var secondsItemValue = localStorage.getItem(`Game: ${arrayOrderedByScore[i]} - Seconds taken`);
            var dateItemValue = localStorage.getItem(`Game: ${arrayOrderedByScore[i]} - Date`);            
                      
            var divLabelsContainer = document.createElement("div");
            divLabelsContainer.classList.add("divLabelsContainer");
            var playerLabel = document.createElement("label");
            playerLabel.classList.add("labelPlayer");
            var gameNumberLabel = document.createElement("label");
            var scoreLabel = document.createElement("label");
            var levelLabel = document.createElement("label");
            var totalSecondsSpentOnGameLabel = document.createElement("label");
            totalSecondsSpentOnGameLabel.classList.add("labelSeconds");
            var dateLabel = document.createElement("label");
            dateLabel.classList.add("labelDate");
            
            playerLabel.textContent = playerItemValue;
            gameNumberLabel.textContent = arrayOrderedByScore[i];            
            scoreLabel.textContent =  scoreItemValue;
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

function showRankingPopupOrderedByDate(){ //if the "Date" label is clicked, the Ranking will be ordered by date
    gameNumber = localStorage.getItem("Game");
    if(gameNumber != null){
        orderRankingByDate();
        for (var i = 0; i < arrayOrderedByDate.length; i++) {                
            var playerItemValue = localStorage.getItem(`Game: ${arrayOrderedByDate[i]} - Player`);
            var scoreItemValue = localStorage.getItem(`Game: ${arrayOrderedByDate[i]} - Score`);
            var levelItemValue = localStorage.getItem(`Game: ${arrayOrderedByDate[i]} - Highest level reached`);
            var secondsItemValue = localStorage.getItem(`Game: ${arrayOrderedByDate[i]} - Seconds taken`);
            var dateItemValue = localStorage.getItem(`Game: ${arrayOrderedByDate[i]} - Date`);            
                      
            var divLabelsContainer = document.createElement("div");
            divLabelsContainer.classList.add("divLabelsContainer");
            var playerLabel = document.createElement("label");
            playerLabel.classList.add("labelPlayer");
            var gameNumberLabel = document.createElement("label");
            var scoreLabel = document.createElement("label");
            var levelLabel = document.createElement("label");
            var totalSecondsSpentOnGameLabel = document.createElement("label");
            totalSecondsSpentOnGameLabel.classList.add("labelSeconds");
            var dateLabel = document.createElement("label");
            dateLabel.classList.add("labelDate");
            
            playerLabel.textContent = playerItemValue;
            gameNumberLabel.textContent = arrayOrderedByDate[i];            
            scoreLabel.textContent =  scoreItemValue;
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