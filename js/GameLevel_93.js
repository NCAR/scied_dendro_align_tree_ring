Dendrochronology.GameLevel_93 = function(game) {
	this.game = game; // keep reference to main game object
	var helpDialogSize = {width:650, height:400};
	GameLevel.call(this, 93, 'game_level_3_bg', helpDialogSize);
	
	this._btn1;
};

Dendrochronology.GameLevel_93.prototype = Object.create(GameLevel.prototype);
Dendrochronology.GameLevel_93.prototype.constructor = Dendrochronology.GameLevel_93;

Dendrochronology.GameLevel_93.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

Dendrochronology.GameLevel_93.prototype.buildLevel = function() { 
	// Button that shows an alert
	var xLoc = 20; var yLoc = 20;
	this._btn1 = this.add.button(xLoc, yLoc, 'score_btn_spritesheet', this._pressBtn1, this, 2, 1, 0);
	this._btn1.name = 'btn1';
};

// Handler for button 1
Dendrochronology.GameLevel_93.prototype._pressBtn1 = function(pointer) {
	alert('Button #1 was pressed!');
};