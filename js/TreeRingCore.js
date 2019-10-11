// TreeRingCore object
// config = {x, y, aTempData, aYearRange, sTempMap};
TreeRingCore = function(gameLevel, config) {
	this._gameLevel = gameLevel;
	this._config = config;
	
	this._darkRingWidth = 2;
	
	// Create draggable sprite from graphics (instead of image)
	var treeRingCoreGraphics = this._initCoreGraphics();
	
    Phaser.Sprite.call(this, gameLevel, config.x, config.y, treeRingCoreGraphics.generateTexture());
	
    this.exists = true;
	
	this._init();
};

TreeRingCore.prototype = Object.create(Phaser.Sprite.prototype);
TreeRingCore.prototype.constructor = TreeRingCore;

TreeRingCore.prototype._init = function() {
	var dragBoundsRect = new Phaser.Rectangle(-400,0,1300,600);
	
	this.inputEnabled = true;
	//this.input.useHandCursor = true;
	this.input.enableDrag(false,false,false,0,dragBoundsRect);
	this.input.setDragLock(true,false);
	
	// NEW OCTOBER 2018
	this._aCoreOffsets = [0, 166, 397];
	this.events.onDragStop.add(this._coreDragStop, this);
};

// Determine ring width from temperature
TreeRingCore.prototype._getCoreData = function() {
	var aTemperatureData = this._config.aTempData;
	
    // Start and end years for this core
	var startYear = this._config.aYearRange[0];
	var endYear = this._config.aYearRange[1];
	
	// Position of data for start and end years within full annual temperature data array
	var startIndex;
	var endIndex;
	
	var totalYears = aTemperatureData.length;
	
	for (var i = (totalYears - 1); i >= 0; i--) {
		var year = aTemperatureData[i][0];
		if (year == startYear) startIndex = i;
		if (year == endYear) endIndex = i;
	}
	
	// Grab a section of the full aray of temperature data across all years
	var aCoreData = aTemperatureData.slice(endIndex, startIndex + 1);
	
	// Return temperature data for the specified range of years
	return aCoreData;
};
	
TreeRingCore.prototype._initCoreGraphics = function() {
	var treeRingCore = new Phaser.Graphics(0,0);
	
	var aCoreData = this._getCoreData();
		
	var coreLength = 0; // Length of tree ring core, in pixels
	
	// Cycle through the years for this Tree Ring Core
	var coreYears = aCoreData.length;
	
	for (var i = (coreYears - 1); i >= 0; i--) {
        var year = aCoreData[i][0];
		var temperature =  aCoreData[i][1];
		var ringWidth = this.getRingWidth(temperature);
		this._drawRing(treeRingCore, coreLength, ringWidth);
		coreLength += (ringWidth + this._darkRingWidth);
	}
	
	return treeRingCore;
};
	
// Draw a ring
TreeRingCore.prototype._drawRing = function(treeRingCore, coreLength, ringWidth) {
	var coreHeight = 30;
	
	var aRingColors = this._config.aRingColors;
	//var aRingColors = [0x754200, 0x9e6b00, 0xb58200, 0xcc9901, 0xd3a51b, 0xd9af33, 0xdfba4c, 0xe5c566, 0xecd07e, 0xf2db97, 0xf8e6b1, 0xfef1c9];
	
	var fullRingWidth = ringWidth + 2;
	
	for (var i = 0; i < fullRingWidth; i++) {
		var ringColor = aRingColors[i];
		treeRingCore.beginFill(ringColor);
		treeRingCore.drawRect(coreLength + (fullRingWidth - (i + 1)), 0, 1, coreHeight);
	}
	
	// Early growth (lighter color)
	//treeRingCore.beginFill(aRingColors[5]);
	//treeRingCore.drawRect(coreLength, 0, ringWidth, coreHeight);
	//treeRingCore.beginFill(0xcccc99);
	//treeRingCore.drawRect(coreLength, 0, ringWidth, coreHeight);
	// Late growth, darker brown
	//treeRingCore.beginFill(aRingColors[0]);
	//treeRingCore.beginFill(0x996633);
	//treeRingCore.drawRect(coreLength + ringWidth, 0, this._darkRingWidth, coreHeight);
	
};
	
// Determine ring width from temperature
TreeRingCore.prototype.getRingWidth = function(temperature) {
	var ringWidth;
	
	if (this._config.sTempMap == 'UK_1') {
		if (temperature <= 13){
			ringWidth = 1;
		} else if (temperature <= 14){
			ringWidth = 2;
		} else if (temperature <= 15){
			ringWidth = 3;
		} else if (temperature <= 16){
			ringWidth = 4;
		} else if (temperature <= 17){
			ringWidth = 5;
		} else {
			ringWidth = 6;
		}
	} else if (this._config.sTempMap == 'USA_1') {
		if (temperature <= 13){
			ringWidth = 1;
		} else if (temperature <= 13.5){
			ringWidth = 2;
		} else if (temperature <= 14){
			ringWidth = 3;
		} else if (temperature <= 14.5){
			ringWidth = 4;
		} else if (temperature <= 15){
			ringWidth = 5;
		} else if (temperature <= 15.5){
			ringWidth = 6;
		} else if (temperature <= 16){
			ringWidth = 7;
		} else if (temperature <= 16.5){
			ringWidth = 8;
		} else if (temperature <= 17){
			ringWidth = 9;
		} else {
			ringWidth = 10;
		}   
	}
	
	return ringWidth;
};

// reset the tree to init conditions
/*TreeRingCore.prototype.resetTree = function(){
    //this.setRings([]);
};*/

TreeRingCore.prototype.debug = function(){
    console.log(this);   
};

TreeRingCore.prototype._coreDragStop = function(coreSprite) {
	var xLocScreen = coreSprite.x;
	
	var startYear = this._config.aYearRange[0];
	
	this._gameLevel.endCoreDrag(startYear);
};

TreeRingCore.prototype.disableDrag = function() {
	this.input.enabled = false;
	//this.inputEnabled = false;
	//this.input.enableDrag(false,false,false,0,dragBoundsRect);
};

TreeRingCore.prototype.getStartYear = function(coreSprite) {
	var startYear = this._config.aYearRange[0];
	return startYear;
};

TreeRingCore.prototype.getDarkRingWidth = function() {
	return this._darkRingWidth;
};