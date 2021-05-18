console.log("Hello World")




class fivePinBowlingGame{
	
	constructor(){
		
		this.testScore = [];
		
	}
	
	addScore(frameToAdd){
		
		this.testScore.push(frameToAdd);
		
	}

	editFrame(frameToReplace, index, player = 1 ){
		

		if(this.testScore[index] == undefined)
			return

		this.testScore[index]=frameToReplace;
		
	}

	addNextFrameToScore(frameToAdd){
		
		this.testScore.push(frameToAdd);
		
	}
	
	getScore(ScoreSheet, frameNumber = 10){	
	
		let score = 0;
			
		for (let x = 0; x < frameNumber; x++){

			if (ScoreSheet[x] == null)
				continue;
			
			// Handle Last Frame
			if (x == 9){
				
				if(ScoreSheet[x].ball1 == 31 && ScoreSheet[x].ball2 == 31){
					score += 30 + this.pinfallToScore(this.frameCombination(ScoreSheet[x].ball3))
					continue
				} 
					
				if(ScoreSheet[x].ball1 == 31){
					score += 15 + this.pinfallToScore(this.frameCombination(ScoreSheet[x].ball2, ScoreSheet[x].ball3))
					continue
				} 
				
				if (ballConvertToInt(frameCombination(ScoreSheet[x].ball1, ScoreSheet[x].ball2)) == 31){
					score += 15 + this.pinfallToScore(this.frameCombination(ScoreSheet[x].ball3))
					continue
				}
				
				score += this.pinfallToScore(frameCombination(ScoreSheet[x].ball1, ScoreSheet[x].ball2, ScoreSheet[x].ball3))			
				continue;
			
			}	
			
			//Handle Strike on 9th frame
			if (ScoreSheet[x].ball1 == 31 && x == 8){
				
				if(ScoreSheet[x + 1] == null)
					continue
				
				if(ScoreSheet[x + 1].ball1 == 31){
					score += 30 + this.pinfallToScore(this.frameCombination(ScoreSheet[x + 1].ball2))
					
				}else {
					score += 15 + this.pinfallToScore(this.frameCombination(ScoreSheet[x + 1].ball1, ScoreSheet[x + 1].ball2))	
				}
				
				continue
			} 
			
			//If Strike
			if(ScoreSheet[x].ball1 == 31){
				
				//Next Frame(s) have not been provided; wait until later
				if(ScoreSheet[x + 1] == null || (ScoreSheet[x + 1].ball1 == 31 && ScoreSheet[x+2] == null ))
					continue
				
				//A double++
				if(ScoreSheet[x + 1].ball1 == 31 ){
					score += 30 + this.pinfallToScore(this.frameCombination(ScoreSheet[x+2].ball1))
					continue
				}

				//Otherwise 
				score += 15 + this.pinfallToScore(this.frameCombination(ScoreSheet[x+1].ball1, ScoreSheet[x+1].ball2))
				continue
			}  
			
			//If Spare	
			if(this.ballConvertToInt(this.frameCombination(ScoreSheet[x].ball1, ScoreSheet[x].ball2)) == 31 ){
				
				if(ScoreSheet[x + 1] == null)
					continue
				
				score += 15 + this.pinfallToScore(this.frameCombination(ScoreSheet[x+1].ball1))
				continue
				
			} 
			
			////Otherwise;	
			score += pinfallToScore( this.frameCombination(ScoreSheet[x].ball1, ScoreSheet[x].ball2, ScoreSheet[x].ball3) );

		}
		return score;
	}
	frameCombination(){
		
		let temp = []
		
		let value = ""
		
		
		for (let x = 0; x < arguments.length; x++){
			temp.push(this.ballConvertToString(arguments[x]))
		}
		
		for (let y = 0; y < temp[0].length; y++){
			
			let fallenPin = false;
			
			for (let z = 0; z < temp.length; z++){
				if (temp[z][y] == '1'){
					fallenPin = true;
				}

			}
			
			if (fallenPin){
				value += "1";
			} else {
				value += "0";
			}
			
		}
		
		return value;
		
	}

	ballConvertToInt(ball){
		
		let value = 0;
		
		for (let x = 0; x < ball.length; x++){
			if(ball[x] == '1') value += 2 ** (ball.length - x - 1);
		}
		return value;
	}


	ballConvertToString(ball){
		
		let value = "";
		
		let ballcount = 5; 
		
		for (let x =  0; x < ballcount; x++){
			let tempValue =  2**(ballcount - x - 1);
			if (ball >= tempValue){
				ball -= tempValue;
				value+= "1";
			} else {
				value += "0";
			}		
		}
		return value;

	}

	pinfallToScore(ball){
		
		let value = 0;
		
		if(ball[0] == '1') value += 2;
		if(ball[1] == '1') value += 3;
		if(ball[2] == '1') value += 5;
		if(ball[3] == '1') value += 3;
		if(ball[4] == '1') value += 2;
		
		return value;
		
	}
}

//Score Object = {ball1:0, ball2:0, ball3:0}
let game = new fivePinBowlingGame();


for (let x = 0; x < 10; x++){
	
	game.addScore({ball1:31, ball2:31, ball3:31});

}

console.log(game.getScore(game.testScore));
