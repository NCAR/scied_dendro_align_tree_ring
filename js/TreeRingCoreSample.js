// TreeRingCoreSample object
// config = {x, y};

TreeRingCoreSample = function(gameLevel, config) {
	this._gameLevel = gameLevel;
	this._config = config;
	this.game = gameLevel.game;
    Phaser.Group.call(this, this.game);
	
	this._init();
};

TreeRingCoreSample.prototype = Object.create(Phaser.Group.prototype);
TreeRingCoreSample.prototype.constructor = TreeRingCoreSample;

TreeRingCoreSample.prototype._init = function() {
	this._coreSampleSprite = this.game.add.sprite(0, 0, this._config.key);
	this._coreSampleSprite.anchor.setTo(0.5, 0.5);
	this.addChild(this._coreSampleSprite);
};