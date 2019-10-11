Dendrochronology.GameLevel_92 = function(game) {
	this.game = game; // keep reference to main game object
	var helpDialogSize = {width:500, height:350};
	GameLevel.call(this, 92, 'game_level_2_bg', helpDialogSize);
	
    this._addImageBtn;
};

Dendrochronology.GameLevel_92.prototype = Object.create(GameLevel.prototype);
Dendrochronology.GameLevel_92.prototype.constructor = Dendrochronology.GameLevel_92;

Dendrochronology.GameLevel_92.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

Dendrochronology.GameLevel_92.prototype.buildLevel = function() { 
	// To do: draw some objects onto (as children of) a parent object (Sprite?) that can be moved as a group
	
	// Draw image - using a jpeg that was Preloaded
	var phaserPistol = this.add.image(10, 10, 'phaser_pistol');
	phaserPistol.inputEnabled = true;
	phaserPistol.input.useHandCursor = true;
	phaserPistol.events.onInputDown.add(this.onDown, this);
	
	// Set transparency (alpha)
	var miniPhaser = this.add.image(220, 10, 'mini_phaser');
	miniPhaser.alpha = 0.5;
	
	// Button that shows an image
	var xLoc = 10; var yLoc = 400;
	this._addImageBtn = this.add.button(xLoc, yLoc, 'score_btn_spritesheet', this._addImage, this, 2, 1, 0);
	this._addImageBtn.name = 'addImageBtn';
};

// Handler for button click to show image
Dendrochronology.GameLevel_92.prototype._addImage = function(pointer) {
	var handPhaser = this.add.image(10, 170, 'hand_phaser');
};

// Handler for image click
Dendrochronology.GameLevel_92.prototype.onDown = function(pointer) {
	console.log("Phaser image clicked on!");
};