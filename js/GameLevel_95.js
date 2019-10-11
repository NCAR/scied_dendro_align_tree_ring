Dendrochronology.GameLevel_95 = function(game) {
	this.game = game; // keep reference to main game object
	var helpDialogSize = {width:500, height:400};
	GameLevel.call(this, 95, 'game_level_5_bg', helpDialogSize);
};

Dendrochronology.GameLevel_95.prototype = Object.create(GameLevel.prototype);
Dendrochronology.GameLevel_95.prototype.constructor = Dendrochronology.GameLevel_95;

Dendrochronology.GameLevel_95.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

Dendrochronology.GameLevel_95.prototype.buildLevel = function() { 
	// Button that adds points to Score
	var xLoc = 20; var yLoc = 20;
	this._scoreAddBtn = this.add.button(xLoc, yLoc, 'score_btn_spritesheet', this._scoreAdd, this, 2, 1, 0);
	this._scoreAddBtn.name = 'scoreAddBtn';
};

// Handler for button that adds points to the Score
Dendrochronology.GameLevel_95.prototype._scoreAdd = function(pointer) {
	this.changeScore('add', 100);
	this._scoreText.setText("Score: " + this.game.score);
};