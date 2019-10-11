Dendrochronology.UK_intro = function(game) {
	this.game = game; // keep reference to main game object
	var helpDialogSize = {width:700, height:300};
	GameLevel.call(this, 1, 'wood_grain_bg_2', helpDialogSize);
};

Dendrochronology.UK_intro.prototype = Object.create(GameLevel.prototype);
Dendrochronology.UK_intro.prototype.constructor = Dendrochronology.UK_intro;

Dendrochronology.UK_intro.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

Dendrochronology.UK_intro.prototype.buildLevel = function() { 
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

Dendrochronology.UK_intro.prototype.preload = function () {
    // load the JSON data file with formatting for the Slide Show
    this._slideShowData = this.cache.getJSON('slideShowData');
};

Dendrochronology.UK_intro.prototype._initSlideShow = function () {
    var config = this._slideShowData.slideShowUK;
	this._slideShow = new SlideShow(this, config);
};

Dendrochronology.UK_intro.prototype._goForward = function (pointer) {
    // Go forward to next screen/level
	// Go to UK Collect Samples level
    this.state.start('GameLevel_2');
};

// Public Methods
Dendrochronology.UK_intro.prototype.lastSlide = function (trueFalse) {
	this._continueBtn.visible = trueFalse;
	this._forwardBtn.visible = !trueFalse;
};

Dendrochronology.UK_intro.prototype.goForward = function () {
    // Go forward to next screen/level
	// Go to UK Collect Samples level
	this.state.start('GameLevel_2');
};

// Close Credits and Help dialog boxes if open (visible)
Dendrochronology.UK_intro.prototype.closeDialogs = function () {
    this._helpDialogBox.visible = false;
	this._creditsDialogBox.visible = false;
}