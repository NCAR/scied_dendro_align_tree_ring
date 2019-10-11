// To do:
// Make UK instance work

// GraphAxis class/object
// Parameters: game object, axis parameters
GraphAxis = function(game, axisParameters) {
	this.game = game;
    Phaser.Group.call(this, game);
	
	this._axisParameters = axisParameters;
	
	this._init();
};

GraphAxis.prototype = Object.create(Phaser.Group.prototype);
GraphAxis.prototype.constructor = GraphAxis;

// Inititalize
GraphAxis.prototype._init = function() {
	// Create graphics object to draw on
	this._axisGraphics = this.game.add.graphics(0, 0);
	this.add(this._axisGraphics);
	
	this._drawAxis();
	this._writeTitle();
};

GraphAxis.prototype._drawAxis = function() {
	var axisColor = this._axisParameters.color;
	this._axisGraphics.lineStyle(1, axisColor, 1);
	
	var left = this._axisParameters.margins.left;
	var right = this._axisParameters.aPaperSize[0] - this._axisParameters.margins.right;
	var top = this._axisParameters.margins.top;
	var bottom = this._axisParameters.aPaperSize[1] - this._axisParameters.margins.bottom;
	
	if (this._axisParameters.orientation == 'horizontal'){
		this._axisGraphics.moveTo(left, bottom);
		this._axisGraphics.lineTo(right, bottom);
	} else if (this._axisParameters.orientation == 'vertical'){
		this._axisGraphics.moveTo(left, top);
		this._axisGraphics.lineTo(left, bottom);
	} else {
		console.log('Error drawing graph axis: orientation not specified!');
	}
};

GraphAxis.prototype._writeTitle = function() {
	var textStyle = {
		font: "14px Arial",
		fill: this._axisParameters.textColor,
		align: "center"
	};
	
	if (this._axisParameters.orientation == 'horizontal'){
		var graphWidth = this._axisParameters.aPaperSize[0] - (this._axisParameters.margins.left + this._axisParameters.margins.right);
		var xTitle = this._axisParameters.margins.left + Math.round(graphWidth/2);
		
		var yTitle = this._axisParameters.aPaperSize[1] - 5;
		
		var titleText = this.game.add.text(xTitle, yTitle, this._axisParameters.title, textStyle);
		this.add(titleText);
		
		titleText.x -= Math.round(titleText.width/2);
		titleText.y -= 0.7*titleText.height;
	} else if (this._axisParameters.orientation == 'vertical'){
		var titleText = this.game.add.text(0, 0, this._axisParameters.title, textStyle);
		this.add(titleText);
		
		titleText.angle = -90; // Rotate to display along vertical axis
		
		var graphHeight = this._axisParameters.aPaperSize[1] - (this._axisParameters.margins.top + this._axisParameters.margins.bottom);
		titleText.y += this._axisParameters.margins.top + Math.round(graphHeight/2) + Math.round(titleText.width/2);
	} else {
		console.log('Error writing title along graph axis: orientation not specified!');
	}
};

// Public Methods

GraphAxis.prototype.drawTickMarks = function() {
	var axisColor = this._axisParameters.color;
	this._axisGraphics.lineStyle(1, axisColor, 1);
	
	if (this._axisParameters.orientation == 'vertical'){
		var graphBottom = this._axisParameters.aPaperSize[1] - this._axisParameters.margins.bottom;
		
		// Screen scale, pixels per unit
		var valuesRange = this._axisParameters.valuesRange[1] - this._axisParameters.valuesRange[0];
		var pixelsRange = (this._axisParameters.aPaperSize[1] - this._axisParameters.margins.bottom) - this._axisParameters.margins.top;
		var yScale = pixelsRange/valuesRange;
		
		var tickCount = Math.trunc(valuesRange/this._axisParameters.tickInterval);
		
		// Multiple tick marks
		var tickIntervalPx = yScale * this._axisParameters.tickInterval;
		var iTickNum;
		for (iTickNum = 0; iTickNum <= tickCount; iTickNum++) {
			var yLocPx = graphBottom - iTickNum*tickIntervalPx;
			this.drawTickMark(yLocPx);
			
			// Determine numerical value to label this tick with
			var tickValue = this._axisParameters.valuesRange[0] + iTickNum*this._axisParameters.tickInterval;
			this.writeTickLabel(tickValue, graphBottom - iTickNum*tickIntervalPx);
		}
	} else if (this._axisParameters.orientation == 'horizontal'){
		console.log('Draw tick marks along horizontal axis');
	} else {
		console.log('Error drawing graph axis: orientation not specified!');
	}
};

GraphAxis.prototype.drawTickMark = function(axisLocPx) {
	var axisColor = this._axisParameters.color;
	this._axisGraphics.lineStyle(1, axisColor, 1);
	
	if (this._axisParameters.orientation == 'horizontal'){
		var tickTop = this._axisParameters.aPaperSize[1] - this._axisParameters.margins.bottom;
		var tickBottom = tickTop + this._axisParameters.tickLength;
		
		this._axisGraphics.moveTo(axisLocPx, tickTop);
		this._axisGraphics.lineTo(axisLocPx, tickBottom);
	} else if (this._axisParameters.orientation == 'vertical'){
		var tickRight = this._axisParameters.margins.left;
		var tickLeft = tickRight - this._axisParameters.tickLength;
		
		this._axisGraphics.moveTo(tickLeft, axisLocPx);
		this._axisGraphics.lineTo(tickRight, axisLocPx);
	} else {
		console.log('Error drawing tick mark on graph axis: orientation not specified!');
	}
};

// Write text label for number associated with tick mark
GraphAxis.prototype.writeTickLabel = function(labelText, axisLocPx) {
	var textStyle = {
		font: "12px Arial",
		fill: this._axisParameters.textColor,
		align: "center"
	};
	
	if (this._axisParameters.orientation == 'horizontal'){
		var yText = (this._axisParameters.aPaperSize[1] - this._axisParameters.margins.bottom) + this._axisParameters.tickLength;
		var tickText = this.game.add.text(axisLocPx, yText, labelText, textStyle);
		this.add(tickText);
		tickText.x -= Math.round(tickText.width/2);
		
	} else if (this._axisParameters.orientation == 'vertical'){
		var xText = this._axisParameters.margins.left - this._axisParameters.tickLength;
		var tickText = this.game.add.text(xText, axisLocPx, labelText, textStyle);
		this.add(tickText);
		tickText.x -= tickText.width;
		tickText.y -= Math.round(0.35*tickText.height);
	} else {
		console.log('Error writing label for tick mark on graph axis: orientation not specified!');
	}
};