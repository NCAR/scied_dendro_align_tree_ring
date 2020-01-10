Dendrochronology.USA_intro = function(game) {
	this.game = game; // keep reference to main game object
	var helpDialogSize = {width:700, height:300};
	GameLevel.call(this, 21, 'wood_grain_bg_3', helpDialogSize);
};

Dendrochronology.USA_intro.prototype = Object.create(GameLevel.prototype);
Dendrochronology.USA_intro.prototype.constructor = Dendrochronology.USA_intro;

Dendrochronology.USA_intro.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

Dendrochronology.USA_intro.prototype.buildLevel = function() {
	// Button to move forward to the next screen/level (Skip Intro)
	var xLoc = this.game.width - 260;
	var yLoc = this.game.height - 60;
	this._forwardBtn = this.add.button(xLoc, yLoc, 'skip_intro_btn_spritesheet', this._goForward, this, 1, 0, 2, 0);
    this._forwardBtn.name = 'forwardButton';


	// Button to move forward to the next screen/level (Continue)
	this._continueBtn = this.add.button(xLoc, yLoc, 'continue_btn_spritesheet', this._goForward, this, 1, 0, 2, 0);
    this._continueBtn.name = 'continueButton';
	this._continueBtn.visible = false;

	this._initSlideShow();
};

Dendrochronology.USA_intro.prototype.preload = function () {
    // load the JSON data file with formatting for the Slide Show
    this._slideShowData = this.cache.getJSON('slideShowData');
		this._dialog = this.cache.getJSON('dialog');
};

Dendrochronology.USA_intro.prototype._initSlideShow = function () {
    var config = this._slideShowData.slideShowUSA;
	this._slideShow = new SlideShow(this, config);
	//this._slideShow.x = 100;
	//this._slideShow.y = 200;
};

Dendrochronology.USA_intro.prototype._goForward = function (pointer) {
    // Go forward to next screen/level
	// Go to USA Collect Samples level
	//this._selectedLevel = 22;
    this.state.start('GameLevel_22');
};

// Public Methods
Dendrochronology.USA_intro.prototype.lastSlide = function (trueFalse) {
	this._continueBtn.visible = trueFalse;
	this._forwardBtn.visible = !trueFalse;
};


Dendrochronology.USA_intro.prototype.goForward = function () {
    // Go forward to next screen/level
	// Go to USA Collect Samples level
	this.state.start('GameLevel_22');
};

// Close Credits and Help dialog boxes if open (visible)
Dendrochronology.USA_intro.prototype.closeDialogs = function () {
    this._helpDialogBox.visible = false;
	this._creditsDialogBox.visible = false;
}
