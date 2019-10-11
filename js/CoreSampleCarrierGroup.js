// CoreSampleCarrierGroup class/object
// Parameters: gameLevel, config
// Extends Phaser Group class
// config = {nnnn};


CoreSampleCarrierGroup = function(gameLevel, config) {
	this._gameLevel = gameLevel;
	this._config = config;
	this.game = gameLevel.game;
    Phaser.Group.call(this, this.game);
	
	this._init();
};

CoreSampleCarrierGroup.prototype = Object.create(Phaser.Group.prototype);
CoreSampleCarrierGroup.prototype.constructor = CoreSampleCarrierGroup;

////////////////////
// Initialization //
////////////////////

// Inititalize CoreSampleCarrierGroup group
CoreSampleCarrierGroup.prototype._init = function() {
	this._bFull = false;
	//this._coreCount = 3; // Total number of sampling sites cores can be gotten from
	this._aCoresCollected = [];
	
	this._sampleCarrierBox = this.game.add.sprite(-100, 0, this._config.carrierKey);
	//this._sampleCarrierBox = this.game.add.sprite(-100, 0, 'sample_carrier_box');
	this._sampleCarrierBox.anchor.setTo(0.5, 0.5);
	this.addChild(this._sampleCarrierBox);
	this._sampleCarrierBox.x = 0;
	
	// Insert first tree ring core (most recent)
	var config = {x: 10, y: -16, angle: 90, key: 'core_sample_1'};
	this._treeCore = new TreeRingCoreSample(this, config);
	this.addChild(this._treeCore);
	this._treeCore.x = config.x;
	this._treeCore.y = config.y;
	this._treeCore.angle = config.angle;
	this._treeCore.visible = false;
	
	config = {x: 0, y: -4, angle: 90, key: 'core_sample_2'};
	this._logCore = new TreeRingCoreSample(this, config);
	this.addChild(this._logCore);
	this._logCore.x = config.x;
	this._logCore.y = config.y;
	this._logCore.angle = config.angle;
	this._logCore.visible = false;
	
	config = {x: -10, y: 8, angle: 90, key: 'core_sample_3'};
	this._buildingCore = new TreeRingCoreSample(this, config);
	this.addChild(this._buildingCore);
	this._buildingCore.x = config.x;
	this._buildingCore.y = config.y;
	this._buildingCore.angle = config.angle;
	this._buildingCore.visible = false;
	
	config = {x: -20, y: 20, angle: 90, key: 'core_sample_4'};
	this._windlassCore = new TreeRingCoreSample(this, config);
	this.addChild(this._windlassCore);
	this._windlassCore.x = config.x;
	this._windlassCore.y = config.y;
	this._windlassCore.angle = config.angle;
	this._windlassCore.visible = false;
};

CoreSampleCarrierGroup.prototype._checkAlreadyCollected = function(coreSprite) {
	var bAlreadyCollected = false;
	if (this._aCoresCollected.length > 0){
		for (var i = 0; i < this._aCoresCollected.length; i++){
			var collectedCore = this._aCoresCollected[i];
			if (collectedCore == coreSprite) {
				bAlreadyCollected = true;
			}
		}
	}
	
	return bAlreadyCollected;
};

// Public Methods
CoreSampleCarrierGroup.prototype.collectSample = function(sampleSource) {
	var coreSprite;
	var sampleSprite = this._gameLevel.getSampleSprite(sampleSource);
	
	if (sampleSource == 'live tree') {
		coreSprite = this._treeCore;
	} else if (sampleSource == 'log') {
		coreSprite = this._logCore;
	} else if (sampleSource == 'building') {
		coreSprite = this._buildingCore;
	} else if (sampleSource == 'windlass') {
		coreSprite = this._windlassCore;
	} else {
		console.log('Error collecting core sample!')
	}
	
	if (!this._checkAlreadyCollected(coreSprite)) {
		coreSprite.visible = true;
		
		// Store location (in carrier) of core, which will be ending location of animation
		var endLoc = {x: coreSprite.x, y: coreSprite.y};
		
		// Move core sample sprite to location of wood source being sampled (to start animation)
		coreSprite.x = sampleSprite.x - this.x;
		coreSprite.y = sampleSprite.y - this.y;
		// Animate core sample moving from wood source to core carrier
		this.game.add.tween(coreSprite).to( { x: endLoc.x, y: endLoc.y }, 3000, Phaser.Easing.Quadratic.InOut, true, 200);
		
		// Add core sample to array of already collected samples
		this._aCoresCollected.push(coreSprite);
		
		if (this._config.coreCount == this._aCoresCollected.length) {
			this._bFull = true;
		}
	}
};

CoreSampleCarrierGroup.prototype.getFull = function() {
	return this._bFull;
};