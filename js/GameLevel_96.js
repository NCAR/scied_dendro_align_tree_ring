myGame.GameLevel_96 = function(game) {
	this.game = game; // keep reference to main game object
	var helpDialogSize = {width:650, height:500};
	GameLevel.call(this, 96, 'game_level_6_bg', helpDialogSize);
};

myGame.GameLevel_96.prototype = Object.create(GameLevel.prototype);
myGame.GameLevel_96.prototype.constructor = myGame.GameLevel_96;

myGame.GameLevel_96.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

myGame.GameLevel_96.prototype.buildLevel = function() { 
	var rectangle1 = this.add.graphics(0,0);
    rectangle1.beginFill(0x339933);
    rectangle1.lineStyle(2, 0x006600, 1);
    rectangle1.drawRect(600, 50, 100, 50);
	
	var rectangle2 = this.add.graphics(0,0);
	rectangle2.beginFill(0x33aa33);
	rectangle2.lineStyle(2, 0x009900, 1);
	rectangle2.drawRect(600, 125, 100, 50);
	
	var rectangle3 = this.add.graphics(0,0);
	rectangle3.beginFill(0x339933);
	rectangle3.lineStyle(2, 0x006600, 1);
	rectangle3.drawRect(600, 200, 100, 50);
	
	var rectangle4 = this.add.graphics(0,0);
	rectangle4.beginFill(0x66ff66);
	rectangle4.lineStyle(2, 0x009900, 1);
	rectangle4.drawRect(750, 50, 100, 50);
	
	var rectangle5 = this.add.graphics(0,0);
	rectangle5.beginFill(0x009900);
	rectangle5.lineStyle(2, 0x000000, 1);
	rectangle5.drawRect(750, 125, 100, 50);
	
	var rectangle6 = this.add.graphics(0,0);
	rectangle6.beginFill(0x66cc66);
	rectangle6.lineStyle(2, 0xccffcc, 1);
	rectangle6.drawRect(750, 200, 100, 50);
};