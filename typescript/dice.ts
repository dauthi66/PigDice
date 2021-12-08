class Player {
    playerName:string;
    score:number;

    constructor(playerName:string, score:number) {
        this.playerName = playerName;
        this.score = score;
    }
}

const playerOne = new Player("Player 1", 0);
const playerTwo = new Player("Player 2", 0);

/**
 * Generates a random number between given min and max values
 * @param minValue minimum value die can roll
 * @param maxValue maximum value die can roll
 * @returns a random number between min and max value
 */
function generateDieRoll(minValue:number, maxValue:number):number{
    var random = Math.random();
    
    //use random to generate a number between min and max
    let roll = Math.floor(random * 6) + minValue;

    return roll;
}

window.onload = function(){
    let newGameBtn = $("new_game");
    newGameBtn.onclick = createNewGame;

    $("roll").onclick = rollDie;

    $("hold").onclick = holdDie;
}
/**
 * Creates player's name from user input, starts scores at 0, 
 */
function createNewGame():void{
    //create paths to inputs
    let player1NameInput = $HTMLinput("player1");
    let player2NameInput = $HTMLinput("player2");

    playerOne.score = 0;
    playerTwo.score = 0;

    playerOne.playerName = player1NameInput.value;
    playerTwo.playerName = player2NameInput.value;

    fixBlankNames(player1NameInput, player2NameInput);

    //open the game and start
    $("turn").classList.add("open");
    ($HTMLinput("total")).value = "0";
    //lock in player names and then change players
    $("player1").setAttribute("disabled", "disabled");
    $("player2").setAttribute("disabled", "disabled");
    //renable buttons and turn announcer if user has restarted
    $HTMLinput("roll").disabled = false;
    $HTMLinput("hold").disabled = false;
    //start announcer
    $("turnNotification").innerText = "'s Turn";

    changePlayers();
}
/**
 * Gives players a name who left their name blank
 * @param player1NameInput 1st name to rename if blank
 * @param player2NameInput 2nd name to rename if blank
 */
function fixBlankNames(player1NameInput: HTMLInputElement, player2NameInput: HTMLInputElement) {
    if (playerOne.playerName.trim() == "") {
        playerOne.playerName = "Nick Noname";
        player1NameInput.value = "Nick Noname";
    }

    if (playerTwo.playerName.trim() == "") {
        playerTwo.playerName = "Bianca Blankname";
        player2NameInput.value = "Bianca Blankname";
    }
}
/**
 * Creates a random number to add to players turn score
 * ends players turn if 1 is rolled or player holds their score
 */
function rollDie():void{
    playSound("roll_die");

    let currTotalInput = ($HTMLinput("total"));
    let rollTotal = parseInt(currTotalInput.value);
    //create the players roll from 1 - 6
    let roll = generateDieRoll(1, 6);
    //display the die rolled
    displayDie(roll);
    //reset rolled 1 warning
    $("roll1Notification").innerText = "";

    //end players turn, set total to 0, and play sound if 1
    if (roll == 1) {
        playSound("lose_turn");
        //set the die roll to value player rolled
        $HTMLinput("die").value = roll.toString();
        currTotalInput.value = "0";
        changePlayers();    
    }
    else {
        //  add roll value to current total
        rollTotal += roll;
        //set the die roll to value player rolled
        $HTMLinput("die").value = roll.toString();
        //add current total on form
        currTotalInput.value = rollTotal.toString();
    }
}

/**
 * checks current player, and swaps to opposite player.
 * If die value is a 1, gives notification
 */
 function changePlayers():void{
    let dieRoll = $HTMLinput("die");
    let currentPlayerName = $HTMLinput("current");
    //swap from player to player by comparing current name to player names
    if (currentPlayerName.innerText != playerOne.playerName) {
        currentPlayerName.innerText = playerOne.playerName;

    }
    else {
        currentPlayerName.innerText = playerTwo.playerName;
    }    
    if (dieRoll.value == "1") {
        $("roll1Notification").innerText = "Oops! You rolled a 1! \n";
    }
    //reset die roll
    dieRoll.value = "0";
}
/**
 * displays a pic of a die with the parameter passed to it face up
 * @param dieToDisplay the number on the 6 sided die to display
 */
function displayDie(dieToDisplay:number):void{
    let diePlacement = $("die_placement");
    let die = document.createElement("img");
    //let dieLocation = die.;
    die.src = `images\\Die${dieToDisplay}.png`;

    if (diePlacement.hasChildNodes()) {
        let dieLocation = document.querySelector("img");
        diePlacement.removeChild(dieLocation);
    }
    diePlacement.appendChild(die);
}
/**
 * sends the total score to the current player and changes turns
 */
function holdDie():void{

    let currPlayerName = $("current");

    let scoreBoard1 = $HTMLinput("score1");
    let scoreBoard2 = $HTMLinput("score2");

    let currTotalInput = $HTMLinput("total");
    let rollTotal = parseInt(currTotalInput.value);
    //determine who the current player is
    if (playerOne.playerName == currPlayerName.innerText) {
        //add roll total to player score
        playerOne.score += rollTotal;
        //display new player score
        scoreBoard1.value = playerOne.score.toString();
    }
    //repeat for player 2
    else {
        playerTwo.score += rollTotal;
        scoreBoard2.value = playerTwo.score.toString();
    }
    checkIfWinner();
    //reset the turn total to 0
    currTotalInput.value = "0";
}
/**
 * checks if anyone has more than 100 points
 * ends game and plays win sound if true
 */
function checkIfWinner():void {
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
/**
 * takes the name of a sound element ID and plays it
 * @param sound element ID of the sound to play
 */
function playSound(sound:string){
    (<HTMLAudioElement>document.getElementById(sound)).play();;
        
}

//refactor cast and get by id.
function $HTMLinput(id):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

//refactor cast and get by id.
function $(id):HTMLElement {
    return document.getElementById(id);
}