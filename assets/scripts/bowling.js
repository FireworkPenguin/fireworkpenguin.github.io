/*Bowling Game Class*/
class fivePinBowlingGame{

	constructor(){

		this.playerScores = [];

	}

	getCurrentFrame(){
		return this.playerScores.length;
	}

	addScore(ball1, ball2, ball3){

		if(this.playerScores.length == 10){return;}

		this.playerScores.push([ball1, ball2, ball3]);

	}

	editFrame(frameIndex, ball1, ball2, ball3 ){

		if(this.playerScores[frameIndex] == undefined)
			return

		this.playerScores[frameIndex] = [ball1, ball2, ball3];

	}

	getScoreToDisplayForBall(frameNumber = 0, ballNumber = 0){

		if (frameNumber >= this.getCurrentFrame() || frameNumber < 0)
			return null;

		return this.playerScores[frameNumber][ballNumber];

	}

	getballValueForFrame(frameNumber = 0){

		return [this.playerScores[frameNumber][0], this.playerScores[frameNumber][1],  this.playerScores[frameNumber][2]]

	}

	getScoreOnFrame(frameNumber = 0){

		let score = 0;

		for (let x = 0; x <= frameNumber; x++){

			if (this.playerScores[x] == null)
				return null;

			// Handle Last Frame
			if (x == 9){

				if(	this.playerScores[x][0] == 31 && this.playerScores[x][1] == 31){
					score += 30 + this.pinfallToScore(this.playerScores[x][2])
					continue
				}

				if(this.playerScores[x][0] == 31){
					score += 15 + this.pinfallToScore(this.playerScores[x][1] | this.playerScores[x][2])
					continue
				}

				if (this.playerScores[x][0] | this.playerScores[x][1] == 31){
					score += 15 + this.pinfallToScore(this.playerScores[x][2])
					continue
				}

				score += this.pinfallToScore(this.playerScores[x][0] | this.playerScores[x][1] | this.playerScores[x][2])
				continue;

			}

			//Handle Strike on 9th frame
			if (this.playerScores[x][0] == 31 && x == 8){

				if(this.playerScores[x + 1] == null)
					return null;

				if(this.playerScores[x + 1][0] == 31){
					score += 30 + this.pinfallToScore(this.playerScores[x + 1][1])

				}else {
					score += 15 + this.pinfallToScore(this.playerScores[x + 1][0] | this.playerScores[x + 1][1])
				}

				continue
			}

			//If Strike
			if(this.playerScores[x][0] == 31){

				//Next Frame(s) have not been provided; wait until later
				if(this.playerScores[x + 1] == null || (this.playerScores[x + 1][0] == 31 && this.playerScores[x+2] == null ))
					return null;

				//A double++
				if(this.playerScores[x + 1][0] == 31 ){
					score += 30 + this.pinfallToScore(this.playerScores[x+2][0])
					continue
				}

				//Otherwise
				score += 15 + this.pinfallToScore(this.playerScores[x+1][0] | this.playerScores[x+1][1])
				continue
			}

			//If Spare
			if((this.playerScores[x][0] | this.playerScores[x][1]) == 31 ){

				if(this.playerScores[x + 1] == null)
					return null;

				score += 15 + this.pinfallToScore(this.playerScores[x+1][0])
				continue

			}

			//Otherwise;
			score += this.pinfallToScore(this.playerScores[x][0] | this.playerScores[x][1] | this.playerScores[x][2] );

		}
		return score;
	}

	pinfallToScore(ball){

		let value = 0;

		if(16 & ball) value += 2;
		if(8 & ball) value += 3;
		if(4 & ball) value += 5;
		if(2 & ball) value += 3;
		if(1 & ball) value += 2;

		return value;

	}

}

/* Class for bowler information */
class bowlingPlayer{

	constructor(name="Player 1", gamemode = 5){

		this.playername = name;
		this.playerScore = null;
		this.skip = false;

	}

	giveScoreToPlayer(ball1, ball2, ball3){

		this.playerScore.addScore(ball1, ball2, ball3)

	}

	getScoreOnFrame(frameNumber){

		return this.playerScore.getScoreOnFrame(frameNumber)

	}

	getScoreToDisplayForBall(frameNumber, ballNumber){

		return this.playerScore.getScoreToDisplayForBall(frameNumber, ballNumber)

	}

	getballValueForFrame(frameNumber){

		return this.playerScore.getballValueForFrame(frameNumber);

	}
	
	getNumberOfFramesBowled(){

		return this.playerScore.getCurrentFrame()

	}

	getSkip(){

		return this.skip;

	}

	setSkip(value = false){

		this.skip = value;

	}
	
	toggleSkip(){
		this.skip = !this.getSkip();
	}

	toBowl(){

		if(this.getNumberOfFramesBowled() >= 10 || this.getSkip()){
			return -1;

		}

		return this.getNumberOfFramesBowled();

	}

	editFrame(frameIndex, ball1, ball2, ball3){

		this.playerScore.editFrame(frameIndex, ball1, ball2, ball3)



	}

	newGame(){
		
		this.playerScore = new fivePinBowlingGame();
		
	}
}

/* Pin Display Area Functionality */
class pinIdentifiactionArea{

	constructor(frameNumber = 0){
		this.pinState = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
		this.frame = frameNumber;
	}

	pinAction(ball, pin){

		if (this.frame == 9){

			if(this.pinState[ball][pin] == 1){
				this.pinState[ball][pin] = 0

			} else {
				this.pinState[ball][pin] = 1

			}

			this.pinStateRender();
			return;

		}

		if(this.pinState[ball][pin] == 1){
			for(let x = 0; x <= ball; x++){
				this.pinState[x][pin] = 0

			}
		} else {
			for(let x = ball; x < 3; x++){
				this.pinState[x][pin] = 1

			}
		}

		this.pinStateRender();

	}

	pinStateRender(){

		for(let x = 0; x < 3; x++){

			for(let y = 0; y < 5; y++){

				let vector = document.getElementById(`PinButton${x}${y}`)

				if (this.pinState[x][y] == 1){
					vector.setAttribute("class", "pinSelected");
				} else {
					vector.setAttribute("class", "pinUnselected");
				}

			}
		}
	}

	setframenumber(frameNumber = 0){
		this.frame = frameNumber;
		if(this.frame == -1){
			this.lockFunction();
		} else {
			this.unlockFunction();
		}
			
	}

	setballValue(ball, value){

		let newValue = [0,0,0,0,0]

		if(value & 16)
			newValue[0] = 1;
		if(value & 8)
			newValue[1] = 1;
		if(value & 4)
			newValue[2] = 1;
		if(value & 2)
			newValue[3] = 1;
		if(value & 1)
			newValue[4] = 1;

		this.pinState[ball] = newValue;

	}

	displaySpecificFrameValue(ball1, ball2, ball3){

		this.resetDisplayState();
		this.setballValue(0, ball1);
		this.setballValue(1, ball2);
		this.setballValue(2, ball3);
		this.pinStateRender();

	}

	getballValue(ball){

		let newValue = 0;

		if(this.pinState[ball][0])
			newValue += 16;
		if(this.pinState[ball][1])
			newValue += 8;31
		if(this.pinState[ball][2])
			newValue += 4;
		if(this.pinState[ball][3])
			newValue += 2;
		if(this.pinState[ball][4])
			newValue += 1;

		return newValue;

	}

	getballValueForFrame(){

		return [this.getballValue(0),this.getballValue(1),this.getballValue(2)];

	}

	resetDisplayState(){

		this.pinState = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
		this.pinStateRender();

	}

	unlockFunction(){
		/* Look into why reinsterting this causes functions to act twice before reimplmenting*/
		for (let x = 0; x < 3; x++){
			for (let y = 0; y < 5; y++){
				document.getElementById('PinButton'+x+y).onclick = function(){pinDeck.pinAction(x,y)}
		}}

		document.getElementById('PinSubmitButton').onclick = function(){z.submitPinFall()}


	}

	lockFunction(){

		for (let x = 0; x < 3; x++){
			for (let y = 0; y < 5; y++){
				document.getElementById('PinButton'+x+y).onclick = " "
		}}

		document.getElementById('PinSubmitButton').onclick = " "

	}

}

/* Main class for handling Scoring logic*/
class bowlingGameScoreDisplay{

/* Constructor */
	constructor(){

		this.frameToEdit = null
		this.gameActive = false;

	}

/* Protocols for operation */
	startup(gm = 5){

		this.gamemode = gm;
		this.playerScores = [];
		
		this.populatePlayers(this.getPlayerNames());
		document.getElementById("NameForm").style.display = "none"
		document.getElementById("ScoreBoard").style.display = "inline-block"

		this.newGame();

	}

	debugTest(){

		this.gamemode = 5;
		this.playerScores = [];
		this.gameActive = true;

		//Make everythin visable
		document.getElementById("NameForm").style.display = "inline-block"
		document.getElementById("ScoreBoard").style.display = "inline-block"

		//List to use as debug
		//let debugNameList = ['Dave', 'Tim', 'Meena', 'Zaccheus', 'Shobha', 'Nadia', 'Suad', 'Ilsa'];
		let debugNameList = ['Dave', 'Tim'];

		this.populatePlayers(debugNameList);
		this.renderNames();
		this.setupPlayer()

		console.log("Hello World")

		//simulate a game
		let y = 0;

		for (let x = 0; x < 10; x++){

			let temp1 = (y + 1) % 32
			let temp2 = (y + 2) % 32

			this.getPlayer(0).giveScoreToPlayer(31, 31, 31);
			this.renderScoresForPlayer(0);

			this.getPlayer(1).giveScoreToPlayer(y, temp1, temp2);
			this.renderScoresForPlayer(1);

			y = (y + 3) % 32

		}

	}

	testGame(){

		this.gamemode = 5;
		this.playerScores = [];

		//Make everythin visable
		document.getElementById("NameForm").style.display = "none"
		document.getElementById("ScoreBoard").style.display = "inline-block"

		//List to use as debug
		let debugNameList = ['Dave', 'Tim'];

		pinDeck.unlockFunction();
		pinDeck.setframenumber(0);
		pinDeck.resetDisplayState();

		this.populatePlayers(debugNameList);
		this.renderNames();
		this.setupPlayer()
		
		

	}

/* funtion to Render the scores for A player for each bowled frame */
	renderFrameResult(playerNumber=0, frameNumber){

		//Meant to handle the Display of Score data for one frame and one player per call of the function

		let player = this.playerScores[playerNumber];

		let areaId = "p"+playerNumber+"f"+frameNumber;
		this.clearDisplayedScore(areaId); //Clear Pevious Data

	/* Part 1 Total Score */
		//Generate Score for Frame.
		let Score = player.getScoreOnFrame(frameNumber);

		//Add Score to Area (Will only show if valid)
		this.renderScore(areaId, Score)

		/*To Add Additional indicators (Fouls and Edits)*/

	/*Part 2 Show Special First Ball */

		let value = ""

		//Head Pin
		if(player.getScoreToDisplayForBall(frameNumber,0) == 4){
			value = "H"

		//Split
		} else if(player.getScoreToDisplayForBall(frameNumber,0) == 12 || player.getScoreToDisplayForBall(frameNumber,0) == 6){
			value = "S "

		//Right
		} else if(player.getScoreToDisplayForBall(frameNumber,0) == 15){
			value = "R"

		//Left
		} else if(player.getScoreToDisplayForBall(frameNumber,0) == 30){
			value = "L"

		//Chop off
		} else if(player.getScoreToDisplayForBall(frameNumber,0) == 28 || player.getScoreToDisplayForBall(frameNumber,0) == 7){
			value = "C"

		//Aces
		} else if(player.getScoreToDisplayForBall(frameNumber,0) == 14){
			value = "A"
		}

		document.getElementById(areaId).innerHTML += ' <text fill="#000000" font-size="20" font-family="Verdana" x="35" y="18"> ' + value + ' </text>';


	/* Part 3 Strikes And Spares Fall */

		//Handle 10th Frame
		if(frameNumber == 9){

			//Turkey
			if (player.getScoreToDisplayForBall(frameNumber,0) == 31 && player.getScoreToDisplayForBall(frameNumber,1) == 31 && player.getScoreToDisplayForBall(frameNumber,2) == 31){

				this.renderStrike(areaId, 0);
				this.renderStrike(areaId, 1);
				this.renderStrike(areaId, 2);

			}

			//Two Strikes
			else if (player.getScoreToDisplayForBall(frameNumber,0) == 31 && player.getScoreToDisplayForBall(frameNumber,1) == 31){
				this.renderStrike(areaId, 0);
				this.renderStrike(areaId, 1);

			}

			//Strike and Spare
			else if (player.getScoreToDisplayForBall(frameNumber,0) == 31 && (player.getScoreToDisplayForBall(frameNumber,1) | player.getScoreToDisplayForBall(frameNumber,2)) == 31){
				this.renderSpare(areaId, 0)
				this.renderStrike(areaId, 1)
			}

			//Spare and Strike
			else if ((player.getScoreToDisplayForBall(frameNumber,0) | player.getScoreToDisplayForBall(frameNumber,1)) == 31 && player.getScoreToDisplayForBall(frameNumber,2) == 31){
				this.renderStrike(areaId, 0);
				this.renderSpare(areaId, 1);

			}

			//One Strike
			else if (player.getScoreToDisplayForBall(frameNumber,0) == 31){

				this.renderStrike(areaId, 0);

			}

			//One Spare
			else if ((player.getScoreToDisplayForBall(frameNumber,0) | player.getScoreToDisplayForBall(frameNumber,1)) == 31){
				this.renderSpare(areaId, 0)

			}

			return;
		}

		//Otherwise

		//If it is a Strike
		if (player.getScoreToDisplayForBall(frameNumber,0) == 31){
			this.renderStrike(areaId, 0)
			return;

		}

		//If it is a Spare
		if ((player.getScoreToDisplayForBall(frameNumber,0) | player.getScoreToDisplayForBall(frameNumber,1)) == 31){
			this.renderSpare(areaId, 0)

		}

	}

/* Funtions which print On to the the display */
	renderStrike(areaId, index){

		let pos = 85;

		if(areaId[3] == 9){
			pos = 100;

		}

		document.getElementById(areaId).innerHTML += `<line x1="${pos-((index+1)*20)}" y1="20" x2="${pos-((index)*20)}" y2="0" class="ScoreBoardLines" />`;
		document.getElementById(areaId).innerHTML += `<line x1="${pos-((index+1)*20)}" y1="0" x2="${pos-((index)*20)}" y2="20" class="ScoreBoardLines" />`;


	}

	renderSpare(areaId, index){

		let pos = 85;

		if(areaId[3] == 9){
			pos = 100;

		}

		document.getElementById(areaId).innerHTML += `<line x1="${pos-((index+1)*20)}" y1="20" x2="${pos-((index)*20)}" y2="0" class="ScoreBoardLines" />`;

	}

	renderScore(areaId, score){

		if (score == null)
			return;

		if(areaId[3] == 9){
			document.getElementById(areaId).innerHTML += `<text fill="#000000" font-size="24" font-family="Verdana" x="45" y="55"> ` + score + ` </text> `;
		} else {
			document.getElementById(areaId).innerHTML += `<text fill="#000000" font-size="24" font-family="Verdana" x="20" y="55"> ` + score + ` </text> `;
		}

	}

	renderNames(){

		for(let x = 0; x < this.playerScores.length; x++){
			this.renderPlayerName(x)
		}

	}

	renderPlayerName(playerIndex){
		document.getElementById("NameSpace"+playerIndex).getElementById("name").innerHTML += this.playerScores[playerIndex].playername;

	}

	renderScoresForPlayer(playerNumber = 0){

		if(playerNumber < 0)
			return

		let currentFrame = this.playerScores[playerNumber].playerScore.getCurrentFrame();

		for (let x = 0; x < currentFrame; x++){

			this.renderFrameResult(playerNumber, x);

		}

	}
	
	displayTurnIndicator(playerIndex){
		if(playerIndex > -1)
		document.getElementById("NameSpace"+playerIndex).getElementById("TurnIndicator").style.visibility = "visible"
		
	}
	
	clearTurnIndicator(playerIndex){
		if(playerIndex > -1)
		document.getElementById("NameSpace"+playerIndex).getElementById("TurnIndicator").style.visibility = "hidden"		
	}

/* Functions for clearing the board */

	clearDisplayedScore(areaId = 0){

		document.getElementById(areaId).innerHTML = " "
	}

	clearNames(){

		for(let x = 0; x < this.playerScores.length; x++){
			this.clearDisplayedName(x)
		}

	}

	clearDisplayedName(playerIndex = 0){
		document.getElementById("NameSpace"+playerIndex).getElementById("name").innerHTML = "";
	}

	clearDisplayedTurnIndicator(playerIndex = 0){

		document.getElementById(areaId).innerHTML = " "

	}

	totalRemoval(){

		for (let x = 0; x<8; x++){
			for (let y = 0; y<10; y++){

				this.clearDisplayedScore("p"+x+"f"+y)
			}

			this.clearDisplayedName(x)
		}

	}

/* Utility functions */
	determineNextPlayer(){

			// frameIndex is the minimum number of frames encountered within the this.playerScores of the players
			// playerIndex is the index of the player with the least number of frames bowled,
			// updated when a player with a lower value is encountered, otherwise the order should go top to bottom

			//Values selected to be impossible values, which can be flaged as no valid canidates
			let frameIndex = 256;
			let playerIndex = -1;

			for (let x = 0; x < this.playerScores.length; x++){
				//Skip a player if flaged to skip
				if (this.playerScores[x].toBowl() < 0)
					continue;

				//Skip player if all frames have been bowled
				//Act if the number of frames bowled is less than the previous minimum
				if(this.playerScores[x].toBowl() < frameIndex){

					playerIndex = x;
					frameIndex = this.playerScores[x].toBowl();

				}

			}

			//Return the index of the next player (-1 means no player is aviable)
			return playerIndex;

	}

	populatePlayers(playerList = []){

		//Use if empty list is provided
		if (playerList.length == 0)
			playerList = ['Player 1']

		//create player objects

		this.numberOfPlayers = playerList.length;
		for (let x = 0; x < this.numberOfPlayers; x++){
			this.playerScores.push(new bowlingPlayer(playerList[x]));

		}

	}

	getPlayer(playerIndex){

		return this.playerScores[playerIndex];

	}

/* Functions which get data from elsewhere */

	/* Function to handle PinFall being Submitted */

	setupPlayer(){
		
		let playerUp = this.determineNextPlayer();
		
		if(playerUp == -1){
			pinDeck.lockFunction();
			document.getElementById("postGameSection").style.visibility = "visible";
			return
		}
		pinDeck.setframenumber(this.getPlayer(playerUp).toBowl());
		pinDeck.resetDisplayState();
		
		this.displayTurnIndicator(playerUp);
		
	}

	submitPinFall(){

		let balls = pinDeck.getballValueForFrame();
		let playerUp = this.determineNextPlayer();
		
		this.clearTurnIndicator(playerUp);

		if(this.frameToEdit != null){

			this.getPlayer(this.frameToEdit.player).editFrame(this.frameToEdit.frame, balls[0], balls[1], balls[2]);
			this.renderScoresForPlayer(this.frameToEdit.player);
			this.frameToEdit = null;

		} else {

			this.gameActive = true;
			this.getPlayer(playerUp).giveScoreToPlayer(balls[0], balls[1], balls[2]);
			this.renderScoresForPlayer(playerUp);

		}
		
		this.setupPlayer();
				
	}

	functionSelectToEdit(playerNumber, frameNumber){

			console.log("Ping Link")

			let balls = this.getPlayer(playerNumber).getballValueForFrame(frameNumber);
			if(balls != null){
				this.frameToEdit = {player: playerNumber, frame:frameNumber}
				pinDeck.setframenumber(frameNumber);
				pinDeck.displaySpecificFrameValue(balls[0], balls[1], balls[2]);
			}

			this.functionCleanUpEditbuttons();
	}

	functionCleanUpEditbuttons(){

		/* Clean up the triggers to edit */
		for (let x = 0; x < this.playerScores.length; x++){
			for (let y = 0; y < this.getPlayer(x).getNumberOfFramesBowled(); y++){
				let areaId = "p"+x+"f"+y;
				this.clearDisplayedScore(areaId);
				this.renderFrameResult(x, y);
				document.getElementById(areaId).onclick = null;

			}
		}

			pinDeck.unlockFunction();
			document.getElementById("pbd0").onclick = function(){z.functionTriggerEdit()};

	}

	functionTriggerEdit(){

		if(this.gameActive == false )
			return;

		pinDeck.lockFunction();
		for (let x = 0; x < this.playerScores.length; x++){
			for (let y = 0; y < this.getPlayer(x).getNumberOfFramesBowled(); y++){
				//Look into adding backstop to display when ativiacted since to click in an area there needs to be somethin in it
				document.getElementById("p"+x+"f"+y).onclick = function(){z.functionSelectToEdit(x,y)}
				document.getElementById("p"+x+"f"+y).innerHTML += `<rect width="100%" height="100%" x="0" y="0" style="fill:rgba(255,255,100, 0.5);" />`

			}
		}
		
		document.getElementById("pbd0").onclick = function(){z.functionCleanUpEditbuttons()};

	}

	functionTriggerSkip(){
		
		pinDeck.lockFunction();
		for (let x = 0; x < this.playerScores.length; x++){
			//Look into adding backstop to display when ativiacted since to click in an area there needs to be somethin in it
			document.getElementById("NameSpace"+x).onclick = function(){z.functionSelectToSkip(x)}
		}
		
		document.getElementById("pbd1").onclick = function(){z.functionCleanUpSkipButtons()};
		
	}
	
	functionSelectToSkip(playerIndex){
		
		let playerUp = this.determineNextPlayer();		
		this.clearTurnIndicator(playerUp);
		
		this.getPlayer(playerIndex).toggleSkip();
		
		if(this.getPlayer(playerIndex).getSkip()){
			document.getElementById("NameSpace"+playerIndex).getElementById("SkipIndicator").style.visibility = "visible"
			
		} else {
			
			document.getElementById("NameSpace"+playerIndex).getElementById("SkipIndicator").style.visibility = "hidden"
			
		}
		
		this.functionCleanUpSkipButtons();
		this.setupPlayer();		
		
	}
	
	functionCleanUpSkipButtons(){
		
		pinDeck.lockFunction();
		for (let x = 0; x < this.playerScores.length; x++){
			//Look into adding backstop to display when ativiacted since to click in an area there needs to be somethin in it
			document.getElementById("NameSpace"+x).onclick = null
		}
		
		document.getElementById("pbd1").onclick = function(){z.functionTriggerSkip()};

	}

	getPlayerNames(){

		let namesList = []
		for (let y = 0; y < 8; y++){

			let tempName = document.getElementById(`NameForm${y}`).value.trim()
			//Only Put into list if it is not empty
			if(tempName)
				namesList.push(tempName)

		}

		return namesList

	}

	newGame(){
		
		this.gameActive = false;
		this.totalRemoval();

		pinDeck.unlockFunction();
		pinDeck.setframenumber(0);
		pinDeck.resetDisplayState();
		
		for (let x = 0; x < this.numberOfPlayers; x++){
			this.playerScores[x].newGame();

		}
		
		document.getElementById("postGameSection").style.visibility = "hidden";
		
		this.renderNames();
		this.setupPlayer();
		
	}
	
}

let pinDeck = new pinIdentifiactionArea(0);
//Test Functions
let z = new bowlingGameScoreDisplay();
//z.testGame();


