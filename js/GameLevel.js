// GameLevel object - Parent for all specific game level children (e.g. GameLevel_1, GameLevel_2, etc.)

GameLevel = function(currentGameLevel, sBgImage, helpDialogSize) {
    this._currentLevel = currentGameLevel;
    this._sBgImage = sBgImage;

    this._quitBtn;
    this._helpBtn;
	this._helpDialogBox;
	this._helpDialogSize = helpDialogSize;
    this._creditsBtn;
	this._creditsDialogBox;
    this._resetBtn;
};

GameLevel.prototype.create = function() {
	var bgImage = this.add.image(0, 0, this._sBgImage);
	bgImage.alpha = 0.3;

	this._initHelp();
	this._initCredits();
	//this._initQuitLevel();
	//this._initScoring();
	this._initReset();
	this._initQuitLevel();
};

GameLevel.prototype.preload = function() {
	// load the dialog json data file
	this._dialog = this.cache.getJSON('dialog');
};

///////////
// Score //
///////////

GameLevel.prototype.changeScore = function (sWhichChange, points) {
    switch (sWhichChange) {
    case 'replace':
        this.game.score = points;
        break;
    case 'add':
        this.game.score += points;
        break;
    case 'subtract':
        this.game.score -= points;
        break;
    default:
        this.game.score = 0;
    }
};

GameLevel.prototype._initScoring = function () {
    // score text
    var xLoc = this.game.width/2;
    var yLoc = this.game.height - 50;
	var style = { font: "bold 32px Arial", fill: "#2c5283", align: "center" };
    this._scoreText = this.add.text(xLoc, yLoc, "Score: " + this.game.score, style);
	this._scoreText.setShadow(2, 2, 'rgba(58,101,155,0.7)', 0);
    this._scoreText.anchor.setTo(0.5, 0);
};

GameLevel.prototype._scorePoints = function (pointer) {
    this.changeScore('add', 10 * this._currentLevel);
    this._scoreText.setText("Score: " + this.game.score);
};

//////////
// Help //
//////////

GameLevel.prototype._initHelp = function() {
    // help button using parent DialogBox class
	var xLoc = 10;
	//var xLoc = this.game.width - 280;
	var yLoc = this.game.height - 60;
	this._helpBtn = this.add.button(xLoc, yLoc, 'help_btn_spritesheet', this._toggleHelp, this, 2, 1, 0);
	this._helpBtn.name = 'helpBtn';

	// Help dialog box
  var txt = '';
  if(this._dialog){
    txt = this._dialog['level'+this._currentLevel];
  }
	this._helpDialogBox = new HelpDialog(this, this._helpDialogSize, txt);
	this._helpDialogBox.visible = false;
};

GameLevel.prototype._toggleHelp = function(pointer) {
	this._creditsDialogBox.visible = false;
	this.world.bringToTop(this._helpDialogBox);

    if (this._helpDialogBox.visible) {
		this._helpDialogBox.visible = false;
	} else {
		this._helpDialogBox.visible = true;
	}
};

////////////////
// Quit Level //
////////////////

GameLevel.prototype._initQuitLevel = function () {
    // Button to Quit Level
	var xLoc = this._resetBtn.x + this._resetBtn.width + 10;
	//var xLoc = 10;
	var yLoc = this.game.height - 60;
    this._quitBtn = this.add.button(xLoc, yLoc, 'home_btn_spritesheet', this._quitLevel, this, 2, 1, 0);
    this._quitBtn.name = 'quitButton';
};

GameLevel.prototype._quitLevel = function (pointer) {
    this.state.start('StartMenu');
    //this.state.start('ReplayMenu');
};

////////////////////////
// Reset/Replay Level //
////////////////////////

GameLevel.prototype._initReset = function () {
    // Button to Reset or Replay Level
    var xLoc = this._creditsBtn.x + this._creditsBtn.width + 10;
    this._resetBtn = this.add.button(xLoc, this._helpBtn.y, 'reset_btn_spritesheet', this._reset, this, 2, 1, 0);
    this._resetBtn.name = 'resetButton';
};

GameLevel.prototype._reset = function (pointer) {
    // Restart this level
    this.state.start('GameLevel_' + this._currentLevel);
};

/////////////
// Credits //
/////////////

GameLevel.prototype._initCredits = function() {
	// Credits button
	var xLoc = this._helpBtn.x + this._helpBtn.width + 10;
	var yLoc = this._helpBtn.y;
	this._creditsBtn = this.add.button(xLoc, yLoc, 'credits_btn_spritesheet', this._toggleCredits, this, 2, 1, 0);
	this._creditsBtn.name = 'creditsBtn';

	// Credits dialog box
	var size = {width:800, height:450};
  var txt = '';
  if(this._dialog){
    txt = this._dialog['credits'];
  }
	this._creditsDialogBox = new CreditsDialog(this, size, txt);
	this._creditsDialogBox.visible = false;
};

GameLevel.prototype._toggleCredits = function(pointer) {
	this._helpDialogBox.visible = false;
	this.world.bringToTop(this._creditsDialogBox);

	if (this._creditsDialogBox.visible) {
		this._creditsDialogBox.visible = false;
	} else {
		this._creditsDialogBox.visible = true;
	}
};
GameLevel.prototype.closeDialog = function() {

};
