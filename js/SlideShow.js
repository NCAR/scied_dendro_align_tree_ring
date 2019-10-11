// SlideShow group class/object
// Parameters: gameLevel, config
// Extends Phaser Group class
// config = {???};


SlideShow = function(gameLevel, config) {
	this._gameLevel = gameLevel;
	this._config = config;
	this.game = gameLevel.game;
    Phaser.Group.call(this, this.game);
	
	this._init();
};

SlideShow.prototype = Object.create(Phaser.Group.prototype);
SlideShow.prototype.constructor = SlideShow;

////////////////////
// Initialization //
////////////////////

// Inititalize SlideShow group
SlideShow.prototype._init = function() {
	this._slideNum = 0; // Array position of first slide
	
	this._initImage();
	this._initText();
	
	// Arrow buttons to move to next or previous slide
	this._initControls();
};

// Controls to move to next or previous slide
SlideShow.prototype._initImage = function () {
	var imageName = this._config.aSlides[this._slideNum].image;
	this._slideImage = this.game.add.image(10, 10, imageName);
};

// Controls to move to next or previous slide
SlideShow.prototype._initText = function () {
	var sSlideText = this._config.aSlides[this._slideNum].text;
	var textWidth = this._config.aSlides[this._slideNum].textWidth;
	
	var textFormat = this._config.textFormat;
	var textFont = textFormat.size + " " + textFormat.font;
	
	// Temporary text disclaimer
	var textStyle = {
		font: textFont,
		fill: textFormat.fillColor,
		wordWrap: true,
		wordWrapWidth: 550
    };
		
	this._bodyText = this.game.add.text(320, 10, sSlideText, textStyle);
};

// Controls to move to next or previous slide
SlideShow.prototype._initControls = function () {
	var xLoc = this.game.width - 135;
	//var xLoc = this.game.width - 35;
	var yLoc = 485;
	this._nextSlideBtn = this.game.add.button(xLoc, yLoc, 'tell_more_btn_spritesheet', this._nextSlide, this,  1, 0, 2, 0);
    this._nextSlideBtn.name = 'nextSlideBtn';
	this._nextSlideBtn.anchor.setTo(0.5, 0.5);
	
	// Arrow buttons to move core samples and graph left, as a group
	xLoc = 35;
	this._previousSlideBtn = this.game.add.button(xLoc, yLoc, 'forward_btn_spritesheet', this._previousSlide, this, 2, 1, 0);
	this._previousSlideBtn.angle = 180;
    this._previousSlideBtn.name = 'previousSlideBtn';
	this._previousSlideBtn.anchor.setTo(0.5, 0.5);
	this._previousSlideBtn.visible = false;
};


SlideShow.prototype._nextSlide = function (pointer) {
    this._slideNum += 1;
	
	if (this._slideNum >= this._config.aSlides.length) {
		// Last slide, move on to the Collect Samples screen
		this._gameLevel.goForward();
	} else {
		var imageName = this._config.aSlides[this._slideNum].image;
		this._slideImage = this.game.add.image(10, 10, imageName);
		this._bodyText.text = this._config.aSlides[this._slideNum].text;
	}
	
	// Hide the "Go Next Slide (Tell Me More)" button if currently on the last slide
	if (this._slideNum >= this._config.aSlides.length - 1) {
		this._nextSlideBtn.visible = false;
		this._gameLevel.lastSlide(true);
	}
		
	this._previousSlideBtn.visible = true; // Show "Go Previous" button, in case it was hidden
	
	// Close Credits and Help dialog boxes if open (visible)
	this._gameLevel.closeDialogs();
};

SlideShow.prototype._previousSlide = function (pointer) {
    this._slideNum -= 1;
	
	var imageName = this._config.aSlides[this._slideNum].image;
	this._slideImage = this.game.add.image(10, 10, imageName);
	this._bodyText.text = this._config.aSlides[this._slideNum].text;
	
	// Hide the "Go Previous Slide" button if currently on the first slide
	if (this._slideNum <= 0) {
		this._previousSlideBtn.visible = false;
	}
	
	this._nextSlideBtn.visible = true; // Show "Go Next (Tell Me More)" button, in case it was hidden
	this._gameLevel.lastSlide(false);
	
	// Close Credits and Help dialog boxes if open (visible)
	this._gameLevel.closeDialogs();
};

// Public Methods
