class ScoreTracker {
    constructor(scoreOutput, linesOutput, levelOutput, tickerOutput) {
        this.level = 1;
        this.score = 0;
        this.linesRemaining = ScoreTracker.levelLines(this.level);

        this.scoreOutput = scoreOutput;
        this.linesOutput = linesOutput;
        this.levelOutput = levelOutput;
        this.tickerOutput = tickerOutput;
    
        this.curCombo = -1;
        this.lastWasBonus = false;
        this.backToBackCount = 0;

        this.isGameWon = false;

        this.outputScore();
        this.outputLines();
        this.outputLevel();
    };
    static levelLines(level) {
        return level*5;
    };
    updateScore(config) {
        var linesCleared = 0,
        isBonus = false,
        scoreDiff = 0,
        tickerLines = [];

        if (config.miniT) {
	        // mini t spin, 1 for no lines, 2 for 1 line
	        tickerLines.push("T Spin Mini");
	        linesCleared++;
	        scoreDiff += 100 * this.level;
	        if (config.lines === 1) {
	            linesCleared++;
	            scoreDiff += 100 * this.level;
	        };
        } else if (config.normalT) {
	        // normal t spin, bonus for eveything but 0 lines
            tickerLines.push(["T Spin", "T Spin Single", "T Spin Double", "T SPIN TRIPLE"][config.lines]);
            linesCleared+=(config.lines+1)*4;
            isBonus=!!config.lines;
            scoreDiff+=(config.lines+1)*400*this.level;
        } else if (config.lines > 0) {
	        // plain old line clears
            tickerLines.push(["Single", "Double", "Triple", "TETRIS"][config.lines-1]);
            linesCleared+=[1, 3, 5, 8][config.lines-1];
            scoreDiff+=[100, 300, 500, 800][config.lines-1]*this.level;
            isBonus=config.lines==4;
        };

        // apply the combo
        if (linesCleared > 0) {
	        this.curCombo++;
	        linesCleared += Math.floor(this.curCombo * 0.5);
	        scoreDiff += 50 * this.curCombo * this.level;
	        if (this.curCombo >= 1) tickerLines.push(`Combo x${this.curCombo}`);
	    } else this.curCombo = -1;

        // apply back-to-back bonus
        if (this.lastWasBonus && isBonus) {
	        tickerLines.push("Back-to-Back");
	        this.backToBackCount++;
	        linesCleared = Math.floor(linesCleared * 1.5);	
	        scoreDiff += this.backToBackCount * 0.5 * scoreDiff;
        } else this.backToBackCount = 0;
        // only update the last bonus state if a single through triple was gotten
        if (config.lines > 0) this.lastWasBonus = isBonus;
        // apply the lines cleared
        this.linesRemaining -= linesCleared;    
        if (this.linesRemaining <= 0) {
	        if (this.level < 15) {
	            this.level++;
	            this.linesRemaining = ScoreTracker.levelLines(this.level);
	        } else { // INFINITE MODE BABY!
	            //this.isGameWon = true;
	        };
	        this.outputLevel();
        };

        if (linesCleared > 0) this.outputLines();
        this.score += scoreDiff;
        this.outputScore();

        if (tickerLines.length === 0) this.tickerOutput.addLine("");
        else for (let i = 0; i < tickerLines.length; i++) this.tickerOutput.addLine(tickerLines[i]);
    };
    softDrop() { this.score++; };
    hardDrop(dist) { this.score+=2*dist; };
    getLinesRemaining() { return this.linesRemaining; };
    getScore() { return this.score; };
    getLevel() { return this.level; };
    getLevelPeriod() {
        var periods = [
	        1000,
	        800,
	        600,
	        470,
	        380,
	        250,
	        200,
	        160,
	        130,
	        90,
	        50,
	        27,
	        20,
	        15,
	        10
        ];
        return periods[(this.level < periods.length) ? this.level : periods.length - 1];
    };
    getResults() {
        return {
	        score: this.score,
	        level: this.level,
	        won: this.isGameWon
        };
    };
    outputScore() {
        this.scoreOutput.addLine("Score:");
        this.scoreOutput.addLine(this.score);
        this.scoreOutput.addLine("");
    };
    outputLines() {
        this.linesOutput.addLine("Lines:");
        this.linesOutput.addLine(this.linesRemaining);
        this.linesOutput.addLine("");
    };
    outputLevel() {
        this.levelOutput.addLine("Level:");
        this.levelOutput.addLine(this.level);
        this.levelOutput.addLine("");
    };
    gameWon() { return this.isGameWon; };
};