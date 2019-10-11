// To do:
//   Add parameter to specify graphing of moisture or temperature or both
//   Add parameter to specify # of years along the x-axis


// TreeGraph class/object
// Parameters: game object, x coord, y coord
TreeGraph = function(game, graphParameters, aData, aTreeRingCores) {
	this.game = game;
    Phaser.Group.call(this, game);
	
	this._graphParameters = graphParameters;
	this._paper;
	this._aData = aData;
	
	this._aTreeRingCores = aTreeRingCores;
	
	this._init();
};

TreeGraph.prototype = Object.create(Phaser.Group.prototype);
TreeGraph.prototype.constructor = TreeGraph;

// Inititalize
TreeGraph.prototype._init = function() {
	// Size (x- and y-dimensions) of graph "paper"
	this._aPaperSize = this._graphParameters.paper.size;
	
	// Margins between graphing area and surrounding graph 'paper'
	this._margins = this._graphParameters.margins;
	
	// Size (x- and y-dimensions) of graph area
	this.a_graphSize = [this._aPaperSize[0] - (this._margins.left + this._margins.right), this._aPaperSize[1] - (this._margins.top + this._margins.bottom)];
	
	// Coordinates (pixels) of graph origin point
	this._aOrigin = [this._margins.left, this._aPaperSize[1] - this._margins.bottom];
	
	 // Horizontal length (x-direction) of combined data bars, in pixels
	this._graphDataLength = 0;
	
	// Array to store year and xLocation (screen) data pairs
	this._aYearScreenLocX = [];
	
	this._initPaper();
	this._initAxes();
	this._initLayers();
};

// reset the TreeGraph to init conditions
TreeGraph.prototype.resetGraph = function(){
    //this.setRings([]);
};

TreeGraph.prototype.debug = function(){
    console.log(this);   
};

//////////
// Axes //
//////////

TreeGraph.prototype._initAxes = function() {
	var textStyle = {
		font: "12px Arial",
		fill: "#000000"
    };
	
	// Create X-axis
	var xAxisParams = this._graphParameters.axes.year;
	xAxisParams.aPaperSize = this._aPaperSize;
	xAxisParams.margins = this._margins;
	this._xAxis = new GraphAxis(this.game, xAxisParams);
	this.add(this._xAxis);
	
	// Create Y-axis
	var yAxisParams = this._graphParameters.axes.temperature;
	yAxisParams.aPaperSize = this._aPaperSize;
	yAxisParams.margins = this._margins;
	this._yAxis = new GraphAxis(this.game, yAxisParams);
	this._yAxis.drawTickMarks();
	this.add(this._yAxis);
};

//////////////////////////////////////////
// Layers for different graphs and data //
//////////////////////////////////////////

TreeGraph.prototype._initLayers = function() {
	this._dataLayer = this.game.add.graphics(0, 0);
	// Place on screen within graph group
	this.add(this._dataLayer);
	
	var yearRange = this._graphParameters.yearRange;
	var yearSpan = yearRange.max - yearRange.min;
	
	var iYear;
	for (iYear = yearSpan; iYear >= 0; iYear--) {
		// Draw data bar on graph
		this._drawBar(this._aData[iYear]);
	}
};

TreeGraph.prototype._drawBar = function(aDataPoint) {
	var barsTraits = this._graphParameters.bars;
	
	var year = aDataPoint[0];
	var temperature = aDataPoint[1];
	
	var tRange = this._graphParameters.temperatureRange;
	var yearRange = this._graphParameters.yearRange;
	
	var barHeight = this.a_graphSize[1]*((temperature - tRange.min)/(tRange.max - tRange.min));
	//var xLoc = this._aOrigin[0] + this.a_graphSize[0]*((year - yearRange.min)/(yearRange.max - yearRange.min));
	
	// Scale bar width to corresponding ring width
	var ringWidth = this._aTreeRingCores[0].getRingWidth(temperature);
	var xLoc = this._aOrigin[0] + this._graphDataLength;
	
	this._dataLayer.beginFill(barsTraits.color);
	this._dataLayer.drawRect(xLoc, this._aOrigin[1], ringWidth, -barHeight);
	this._dataLayer.endFill();
	
	this._graphDataLength += (ringWidth + this._aTreeRingCores[0].getDarkRingWidth());
	
	// Draw tick marks along graph axis, aligned with tree rings
	// Temperature dictates bar width, hence tick mark position to place at bar's center
	var xTick = xLoc + Math.round(ringWidth/2) - 1;
	
	// Save year and xLocation pairs into array
	var xLocYear = xTick - this._aOrigin[0];
	this._aYearScreenLocX.push([year, xLocYear]);
	
	var tickIntervalYears = 10;
	if (year/tickIntervalYears == Math.trunc(year/tickIntervalYears)){
		this._xAxis.drawTickMark(xTick);
		this._xAxis.writeTickLabel(year, xTick);
	}
};

/////////////////
// Graph Paper //
/////////////////

TreeGraph.prototype._initPaper = function() {
	var paperParameters = this._graphParameters.paper;
	
	// Create graph paper using shared class GraphPaper
    this._paper = new GraphPaper(this.game, this, paperParameters);
};


TreeGraph.prototype.erasePaper = function() {
	this._paper.erasePaper();
};


TreeGraph.prototype.drawPaper = function() {
	this._paper.drawPaper();
};


TreeGraph.prototype.setPaperColor = function(newPaperColor) {
	this._paper.setColor(newPaperColor);
};


TreeGraph.prototype.setPaperSize = function(aNewPaperSize) {
	this._paper.setSize(aNewPaperSize);
};

////////////////////
// Public Methods //
////////////////////

// Get x-coordinate (on screen, relative to the y-axis) of a graphed bar based on the year
TreeGraph.prototype.getScreenLocX = function(year) {
	var xLoc;
	
	for (var i = 0; i < this._aYearScreenLocX.length; i++){
		var checkYear = this._aYearScreenLocX[i][0];
		if (checkYear == year){
			xLoc = this._aYearScreenLocX[i][1];
			break;
		}
	}
	return xLoc;
};
