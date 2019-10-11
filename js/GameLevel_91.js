Dendrochronology.GameLevel_91 = function(game) {
	this.game = game; // keep reference to main game object
	var helpDialogSize = {width:500, height:300};
	GameLevel.call(this, 91, 'game_level_1_bg', helpDialogSize);
};

Dendrochronology.GameLevel_91.prototype = Object.create(GameLevel.prototype);
Dendrochronology.GameLevel_91.prototype.constructor = Dendrochronology.GameLevel_91;

Dendrochronology.GameLevel_91.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

Dendrochronology.GameLevel_91.prototype.buildLevel = function() { 
	this.drawCircles();
	this.drawRectangles();
	this.drawOtherShapes();
	
	// To do: draw some objects onto (as children) of a parent object (Sprite?) that can be moved as a group
	// Draw something in response to a button click
};

Dendrochronology.GameLevel_91.prototype.drawCircles = function() { 
	// Draw a circle with a filled interior
	var circleFilled_1 = this.add.graphics(100,50);
	circleFilled_1.lineStyle(2, 0x339933, 1);
	circleFilled_1.beginFill(0x99aa00);
	circleFilled_1.drawCircle(0, 0, 60);
	
	// Draw another circle with a thicker border line
	var circleFilled_2 = this.add.graphics(200,50);
	circleFilled_2.lineStyle(4, 0x993333, 1);
	circleFilled_2.beginFill(0xaa9900);
	circleFilled_2.drawCircle(0, 0, 60);
	
	// Draw a larger circle
	var circleFilled_3 = this.add.graphics(300,60);
	circleFilled_3.lineStyle(2, 0x333333, 1);
	circleFilled_3.beginFill(0xffffff);
	circleFilled_3.drawCircle(0, 0, 100);
	
	// Draw a circle without a fill
	var circleFilled_4 = this.add.graphics(400,50);
	circleFilled_4.lineStyle(2, 0xffff33, 1);
	circleFilled_4.drawCircle(0, 0, 60);
	
	// Draw a partially transparent circle
	var circleFilled_5 = this.add.graphics(650,50);
	circleFilled_5.lineStyle(2, 0x660000, 1);
	circleFilled_5.beginFill(0xff0033);
	circleFilled_5.drawCircle(0, 0, 60);
	circleFilled_5.alpha = 0.4;
};

Dendrochronology.GameLevel_91.prototype.drawRectangles = function() { 
	// Draw a rectangle with a filled interior
	var rectFilled_1 = this.add.graphics(50,150);
	rectFilled_1.lineStyle(2, 0x333399, 1);
	rectFilled_1.beginFill(0x9999aa);
	rectFilled_1.drawRect(0, 0, 60, 40);
	
	// Draw another rectangle with a thicker border line
	var rectFilled_2 = this.add.graphics(150,150);
	rectFilled_2.lineStyle(5, 0x339933, 1);
	rectFilled_2.beginFill(0x99aa00);
	rectFilled_2.drawRect(0, 0, 60, 40);
	
	// Draw a rectangle without a fill
	var rectFilled_3 = this.add.graphics(250,150);
	rectFilled_3.lineStyle(2, 0xaa3333, 1);
	rectFilled_3.drawRect(0, 0, 60, 40);
};

Dendrochronology.GameLevel_91.prototype.drawOtherShapes = function() { 
	// Draw an ellipse with a filled interior
	var ellipseFilled = this.add.graphics(80,250);
	ellipseFilled.lineStyle(2, 0x9900ff, 1);
	ellipseFilled.beginFill(0xcc99ff);
	ellipseFilled.drawEllipse(0, 0, 40, 30);
	
	// Draw a rectangle with rounded corners a filled interior
	var roundedRectFilled = this.add.graphics(150,220);
	roundedRectFilled.lineStyle(2, 0xcc6600, 1);
	roundedRectFilled.beginFill(0xffcc99);
	roundedRectFilled.drawRoundedRect(0, 0, 70, 50, 5);
	
	// Draw a polygon with a filled interior
	var polygonFilled_1 = this.add.graphics(250,250);
	polygonFilled_1.lineStyle(2, 0x006699, 1);
	polygonFilled_1.beginFill(0x99cccc);
	var aPoints = [ new Phaser.Point(0, -20), new Phaser.Point(30, -40), new Phaser.Point(60, -20), new Phaser.Point(50, 30), new Phaser.Point(10, 30) ];
	polygonFilled_1.drawPolygon(aPoints);
};