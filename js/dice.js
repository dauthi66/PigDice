var Player = (function () {
    function Player(playerName, score) {
        this.playerName = playerName;
        this.score = score;
    }
    return Player;
}());
var playerOne = new Player("Player 1", 0);
var playerTwo = new Player("Player 2", 0);
function generateDieRoll(minValue, maxValue) {
    var random = Math.random();
    var roll = Math.floor(random * 6) + minValue;
    return roll;
}
window.onload = function () {
    var newGameBtn = $("new_game");
    newGameBtn.onclick = createNewGame;
    $("roll").onclick = rollDie;
    $("hold").onclick = holdDie;
};
function createNewGame() {
    var player1NameInput = $HTMLinput("player1");
    var player2NameInput = $HTMLinput("player2");
    playerOne.score = 0;
    playerTwo.score = 0;
    playerOne.playerName = player1NameInput.value;
    playerTwo.playerName = player2NameInput.value;
    fixBlankNames(player1NameInput, player2NameInput);
    $("turn").classList.add("open");
    ($HTMLinput("total")).value = "0";
    $("player1").setAttribute("disabled", "disabled");
    $("player2").setAttribute("disabled", "disabled");
    $HTMLinput("roll").disabled = false;
    $HTMLinput("hold").disabled = false;
    $("turnNotification").innerText = "'s Turn";
    changePlayers();
}
function fixBlankNames(player1NameInput, player2NameInput) {
    if (playerOne.playerName.trim() == "") {
        playerOne.playerName = "Nick Noname";
        player1NameInput.value = "Nick Noname";
    }
    if (playerTwo.playerName.trim() == "") {
        playerTwo.playerName = "Bianca Blankname";
        player2NameInput.value = "Bianca Blankname";
    }
}
function rollDie() {
    playSound("roll_die");
    var currTotalInput = ($HTMLinput("total"));
    var rollTotal = parseInt(currTotalInput.value);
    var roll = generateDieRoll(1, 6);
    displayDie(roll);
    $("roll1Notification").innerText = "";
    if (roll == 1) {
        playSound("lose_turn");
        $HTMLinput("die").value = roll.toString();
        currTotalInput.value = "0";
        changePlayers();
    }
    else {
        rollTotal += roll;
        $HTMLinput("die").value = roll.toString();
        currTotalInput.value = rollTotal.toString();
    }
}
function changePlayers() {
    var dieRoll = $HTMLinput("die");
    var currentPlayerName = $HTMLinput("current");
    if (currentPlayerName.innerText != playerOne.playerName) {
        currentPlayerName.innerText = playerOne.playerName;
    }
    else {
        currentPlayerName.innerText = playerTwo.playerName;
    }
    if (dieRoll.value == "1") {
        $("roll1Notification").innerText = "Oops! You rolled a 1! \n";
    }
    dieRoll.value = "0";
}
function displayDie(dieToDisplay) {
    var diePlacement = $("die_placement");
    var die = document.createElement("img");
    die.src = "images\\Die" + dieToDisplay + ".png";
    if (diePlacement.hasChildNodes()) {
        var dieLocation = document.querySelector("img");
        diePlacement.removeChild(dieLocation);
    }
    diePlacement.appendChild(die);
}
function holdDie() {
    var currPlayerName = $("current");
    var scoreBoard1 = $HTMLinput("score1");
    var scoreBoard2 = $HTMLinput("score2");
    var currTotalInput = $HTMLinput("total");
    var rollTotal = parseInt(currTotalInput.value);
    if (playerOne.playerName == currPlayerName.innerText) {
        playerOne.score += rollTotal;
        scoreBoard1.value = playerOne.score.toString();
    }
    else {
        playerTwo.score += rollTotal;
        scoreBoard2.value = playerTwo.score.toString();
    }
    checkIfWinner();
    currTotalInput.value = "0";
}
function checkIfWinner() {
    if (playerOne.score >= 100 || playerTwo.score >= 100) {
        playSound("win_game");
        $("turnNotification").innerText = "Wins!";
        $("roll").setAttribute("disabled", "disabled");
        $("hold").setAttribute("disabled", "disabled");
    }
    else {
        changePlayers();
    }
}
function playSound(sound) {
    document.getElementById(sound).play();
    ;
}
function $HTMLinput(id) {
    return document.getElementById(id);
}
function $(id) {
    return document.getElementById(id);
}
