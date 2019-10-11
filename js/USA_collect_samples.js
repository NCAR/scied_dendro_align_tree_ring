Dendrochronology.USA_collect_samples = function(game) {
	this.game = game; // keep reference to main game object
	var helpDialogSize = {width:700, height:360};
	GameLevel.call(this, 22, 'wood_grain_bg_2', helpDialogSize);
};

Dendrochronology.USA_collect_samples.prototype = Object.create(GameLevel.prototype);
Dendrochronology.USA_collect_samples.prototype.constructor = Dendrochronology.USA_collect_samples;

Dendrochronology.USA_collect_samples.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

Dendrochronology.USA_collect_samples.prototype.buildLevel = function() { 
	// Button to move forward to the next screen/level
	var xLoc = this.game.width - 60;
	var yLoc = this.game.height - 60;
	this._forwardBtn = this.add.button(xLoc, yLoc, 'forward_btn_spritesheet', this._goForward, this, 2, 1, 0);
    this._forwardBtn.name = 'forwardButton';
	this._forwardBtn.visible = false;
	
	// Screen title
	var textStyle = {
		font: "36px Arial",
		fill: "#57350e"
    };
		
	this._titleText = this.add.text(this.game.width/2, 20, "Now it is your turn to collect wood samples!", textStyle);
	this._titleText.anchor.setTo(0.5, 0);
	//this._introTextVisible = true;
	
	// Temporary text disclaimer
	textStyle = {
		font: "18px Arial",
		fill: "#57350e",
		wordWrap: true,
		wordWrapWidth: 400
    };
		
	var disclaimerText = this.add.text(290, 80, "Use the core sampling tool at the right to collect wood samples of different ages. Drag the tool to items in this scene (the living tree, log, and log cabin) to collect wood samples from each source.\n\n" + "After you collect all three samples, an arrow button will appear in the lower right, which will take your samples to the lab for further analysis.", textStyle);
	
	// Sprites where wood samples can be collected (tree, log, building, ship)
	this._initWoodSources();
	
	// Group of sprites to collect small core sample icons in a carrying case or satchel
	this._initSampleCarrier();
	
	// Wood core borer tool
	this._initBorerTool();
};

Dendrochronology.USA_collect_samples.prototype._initBorerTool = function() {
	// Tree Core Boring Tool
	this._borerToolSprite = this.add.sprite(780, 200, 'borer_tool');
	this._borerToolSprite.anchor.setTo(0.5, 0.5);
	this._borerToolSprite.inputEnabled = true;
	this._borerToolSprite.input.enableDrag();
	
	this._borerToolSprite.events.onDragStop.add(this._stopDragTool, this);
};

Dendrochronology.USA_collect_samples.prototype._initWoodSources = function() {
	// Living Tree
	this._liveTreeSprite = this.add.sprite(145, 200, 'live_tree');
	this._liveTreeSprite.anchor.setTo(0.5, 0.5);
	this._liveTreeSprite.name = 'live tree';
	
	// Log
	this._logSprite = this.add.sprite(160, 440, 'log');
	this._logSprite.anchor.setTo(0.5, 0.5);
	this._logSprite.name = 'log';
	
	// Log cabin
	this._buildingSprite = this.add.sprite(500, 420, 'log_cabin');
	this._buildingSprite.anchor.setTo(0.5, 0.5);
	this._buildingSprite.name = 'building';
};

Dendrochronology.USA_collect_samples.prototype._initSampleCarrier = function() {
	var config = {x: 780, y: 400, coreCount: 3, carrierKey: 'sample_carrier_box'};
	
	this._sampleCarrierGroup = new CoreSampleCarrierGroup(this, config);
	this._sampleCarrierGroup.x = config.x;
	this._sampleCarrierGroup.y = config.y;
};

Dendrochronology.USA_collect_samples.prototype._stopDragTool = function(borerToolSprite, pointer) {
	if (this._checkToolSampleOverlap(borerToolSprite, this._logSprite)) {
		this._sampleCarrierGroup.collectSample('log');
    } else if (this._checkToolSampleOverlap(borerToolSprite, this._liveTreeSprite)) {
		this._sampleCarrierGroup.collectSample('live tree');
	} else if (this._checkToolSampleOverlap(borerToolSprite, this._buildingSprite)) {
		this._sampleCarrierGroup.collectSample('building');
	}
	
	// Check if all samples have been collected
	if (this._sampleCarrierGroup.getFull()) {
		this._forwardBtn.visible = true;
	}
};


// Check whether the Core Borer Tool sprite intersects with a Wood Sample sprite
Dendrochronology.USA_collect_samples.prototype._checkToolSampleOverlap = function(toolSprite, sampleSprite) {
	var boundsTool = toolSprite.getBounds();
    var boundsSample = sampleSprite.getBounds();

    return Phaser.Rectangle.intersects(boundsTool, boundsSample);
};

Dendrochronology.USA_collect_samples.prototype._goForward = function (pointer) {
    // Go forward to next screen/level
	// Go to USA Align Cores level
	//this._selectedLevel = 23;
    this.state.start('GameLevel_23');
};

// Public Methods

Dendrochronology.USA_collect_samples.prototype.getSampleSprite = function (spriteName) {
	var sampleSprite;
    var aSprites = [this._liveTreeSprite, this._logSprite, this._buildingSprite];
	
	for (var i = 0; i < aSprites.length; i++) {
		var checkSprite = aSprites[i];
		if (checkSprite.name == spriteName) {
			sampleSprite = checkSprite;
		}
	}
	
	return sampleSprite;
};