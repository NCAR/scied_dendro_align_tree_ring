myGame.GameLevel_94 = function(game) {
	this.game = game; // keep reference to main game object
	var helpDialogSize = {width:500, height:400};
	GameLevel.call(this, 94, 'game_level_4_bg', helpDialogSize);
};

myGame.GameLevel_94.prototype = Object.create(GameLevel.prototype);
myGame.GameLevel_94.prototype.constructor = myGame.GameLevel_94;

myGame.GameLevel_94.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

myGame.GameLevel_94.prototype.buildLevel = function() { 
	var circle1 = this.add.graphics(0,0);
	circle1.lineStyle(2, 0x006600, 1);
	circle1.beginFill(0x339933);
	circle1.drawCircle(600, 50, 60);
	
	var circle2 = this.add.graphics(0,0);
	circle2.lineStyle(1, 0xff9900, 1);
	circle2.beginFill(0xffff00);
	circle2.drawCircle(600, 150, 60);
	
	var circle3 = this.add.graphics(0,0);
	circle3.lineStyle(2, 0x006600, 1);
	circle3.beginFill(0x66aa66);
	circle3.drawCircle(700, 50, 60);
	
	var circle4 = this.add.graphics(0,0);
	circle4.lineStyle(1, 0xff9900, 1);
	circle4.beginFill(0xffff66);
	circle4.drawCircle(700, 150, 60);
};