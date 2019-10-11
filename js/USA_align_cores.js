Dendrochronology.USA_align_cores = function(game) {
	this.game = game; // keep reference to main game object
	var helpDialogSize = {width:860, height:360};
	GameLevel.call(this, 23, 'wood_grain_bg_1', helpDialogSize);
};

Dendrochronology.USA_align_cores.prototype = Object.create(GameLevel.prototype);
Dendrochronology.USA_align_cores.prototype.constructor = Dendrochronology.USA_align_cores;

Dendrochronology.USA_align_cores.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

Dendrochronology.USA_align_cores.prototype.buildLevel = function() {
	// Move dialog box up to keep core samples in view
	this._helpDialogBox.y = 70;
	
	// Screen title
	var textStyle = {
		font: "36px Arial",
		fill: "#57350e"
    };
		
	this._titleText = this.add.text(this.game.width/2, 20, "Align your tree ring core samples.", textStyle);
	this._titleText.anchor.setTo(0.5, 0);
	this._introTextVisible = true;
	
	// Temporary text disclaimer
	textStyle = {
		font: "18px Arial",
		fill: "#57350e",
		wordWrap: true,
		wordWrapWidth: 600
    };
		
	this._instructionsText = this.add.text(150, 100, "Line up your wood core samples by dragging a sample left or right until the pattern of stripes on your sample matches the pattern in the sample above or below it.\n\nThen drag the other samples right or left until some parts of their ring patterns line up with the core samples above and below. Continue sliding the samples around until all of the patterns match.\n\nBe ready for a surprise once you line up the patterns of all three core samples!", textStyle);
	
	this._coresAligned = {pair_12: false, pair_23: false};
	
	// Create tree ring cores
    this._createTreeRingCores();
	
	// Create temperature vs. time graph based on tree rings
    this._createGraph();
	
	// Create markers for historical events by date
	//this._createHistoricalEvents();
};

Dendrochronology.USA_align_cores.prototype.preload = function () {
    // load the JSON data file for Year vs. Temperature
    this._yearTemperatureData = this.cache.getJSON('temperatureData');
	
    // load the JSON data file for Graph layout parameters
    this._graphsData = this.cache.getJSON('graphsData');
	
    // load the JSON data file with Historical Event Descriptions (and years)
    this._eventsData = this.cache.getJSON('historicalEventsData');
	
    // load the JSON data file with formatting for Historical Event Data Markers
    this._eventMarkersFormat = this.cache.getJSON('eventMarkersFormat');
	
    // load the JSON data file with formatting for Tree Ring Cores
    this._treeRingCoresData = this.cache.getJSON('treeRingCoresData');
	
};

///////////
// Graph //
///////////

Dendrochronology.USA_align_cores.prototype._createGraph = function () {
	var aTemperatureData = this._yearTemperatureData["yearlyTemperatures_UK"];
	
	// Graph layout data from preloaded JSON file
    var graphData = this._graphsData.yearTempUSA;
	
	//var aTreeRingCores = [this._firstCore, this._secondCore, this._thirdCore];
	
	// Create graph using class TreeGraph
	this._graph = new TreeGraph(this, graphData, aTemperatureData, this._aCores);
	//this._graph = new TreeGraph(this, graphData, aTemperatureData, aTreeRingCores);
    this.add.existing(this._graph);
    this._graph.x = 10; this._graph.y = 10;
	
	this._graph.visible = false;
};

Dendrochronology.USA_align_cores.prototype.getGraphPlotRect = function () {
	var graphData = this._graphsData.yearTempUSA;
	
	var xLoc = this._graph.x + graphData.margins.left;
	var yLoc = this._graph.y + graphData.margins.top;
	
	var plotWidth = this._graph.width - (graphData.margins.left + graphData.margins.right);
	var plotHeight = this._graph.height - (graphData.margins.top + graphData.margins.bottom);
	
	var graphPlotRect = {x: xLoc, y: yLoc, width: plotWidth, height: plotHeight};
	return graphPlotRect;
};

// Get the x-coordinate (screen) corresponding to a year on the graph; relative to the origin point on the graph
Dendrochronology.USA_align_cores.prototype.getScreenLocYear = function (year) {
	return this._graph.getScreenLocX(year);
};

///////////
// Trees //
///////////

Dendrochronology.USA_align_cores.prototype._createTreeRingCores = function () {
	this._aCores = [];
	
	var configUSA = this._treeRingCoresData.treeCoresUSA;
	var aTemperatureData = this._yearTemperatureData["yearlyTemperatures_UK"];
	
	var config;
	for (var i = 0; i < configUSA.aTreeRingCores.length; i++) {
		config = configUSA.aTreeRingCores[i];
		config.aRingColors = configUSA.aRingColors;
		config.aTempData = aTemperatureData;
		config.sTempMap = configUSA.sTempMap;
		var treeRingCore = new TreeRingCore(this, config);
    	this.add.existing(treeRingCore);
		this._aCores[i] = treeRingCore;
	}
};

Dendrochronology.USA_align_cores.prototype.endCoreDrag = function(startYear) {
	var aCoreOffsets = [412, 162, 0]; // formerly [397, 166, 0]
	// 1-2 326, 2-3 = 229
	var draggedCore;
	var draggedCoreNum = 0;
	
	// Determine which core sample was dragged by checking start year for each core
	switch (startYear) {
		case this._aCores[0].getStartYear():
			draggedCoreNum = 1;
			draggedCore = this._aCores[0];
			break;
		case this._aCores[1].getStartYear():
			draggedCoreNum = 2;
			draggedCore = this._aCores[1];
			break;
		case this._aCores[2].getStartYear():
			draggedCoreNum = 3;
			draggedCore = this._aCores[2];
			break;
		default:
			console.log('Error determining which core sample was dragged');
	}
	
	
	if (this._aCores[0].x - aCoreOffsets[0] == this._aCores[1].x - aCoreOffsets[1]) {
		this._coresAligned.pair_12 = true;
	} else {
		this._coresAligned.pair_12 = false;
	}
	
	if (this._aCores[1].x - aCoreOffsets[1] == this._aCores[2].x - aCoreOffsets[2]) {
		this._coresAligned.pair_23 = true;
	} else {
		this._coresAligned.pair_23 = false;
	}
	
	if (this._coresAligned.pair_12 && this._coresAligned.pair_23) {
		// Hide screen title and intro text
		if (this._introTextVisible) this._hideIntroText();
		
		this._graph.visible = true;
		
		// Prevent further dragging of cores
		for (var i = 0; i < this._aCores.length; i++){
			this._aCores[i].disableDrag();
		}
		
		// Leftmost core
		var leftCore = this._aCores[this._aCores.length - 1];
		
		// Align graph with cores (wherever user dragged them to)
		var graphLeftMargin = this._graphsData.yearTempUSA.margins.left;
		this._graph.x = leftCore.x - graphLeftMargin;
		
		//this._eventMarkerGroup.visible = true; // Show historical event markers
		//this._eventMarkerGroup.x = this._thirdCore.x; // Align historical event markers
		
		// If graph is partially offscreen to the left, tween it right a bit
		if (this._graph.x <= 0) {
			this._shiftGraphRightward();
		}
	} else {
		this._graph.visible = false;
		//this._eventMarkerGroup.visible = false;
	}
	
	var offset_12 = this._aCores[0].x - this._aCores[1].x;
	var offset_23 = this._aCores[1].x - this._aCores[2].x;
	console.log('Offset 1-2 = ' + offset_12 + ', Offset 2-3 = ' + offset_23);
	console.log('Aligned 1-2 = ' + this._coresAligned.pair_12);
	console.log('Aligned 2-3 = ' + this._coresAligned.pair_23);
	
	// If this is the first drag, hide screen title and intro text
	//if (this._introTextVisible) this._hideIntroText();
};

// Hide the screen title and into text
Dendrochronology.USA_align_cores.prototype._hideIntroText = function () {
	this._titleText.visible = false;
	this._instructionsText.visible = false;
	this._introTextVisible = false;
};

// Move (tween) graph a bit to the right if it is too far left
Dendrochronology.USA_align_cores.prototype._shiftGraphRightward = function () {
	var desiredLoc = 10;
    var shiftAmountPx = desiredLoc - this._graph.x;
	var tweenDuration = 2000; // milliseconds
	
	var graphTween = this.game.add.tween(this._graph);
	var endLocGraph = {x: desiredLoc, y: this._graph.y};
	graphTween.to( { x: endLocGraph.x, y: endLocGraph.y }, tweenDuration, Phaser.Easing.Linear.None, false, 500);
	// Maybe add a short delay
	
	for (var i = 0; i < this._aCores.length; i++){
		var coreTween = this.game.add.tween(this._aCores[i]);
		var endLocCore = {x: this._aCores[i].x + shiftAmountPx, y: this._aCores[i].y};
		coreTween.to( { x: endLocCore.x, y: endLocCore.y }, tweenDuration, Phaser.Easing.Linear.None, false, 500);
		coreTween.start();
	}
	
	graphTween.start();
};

///////////////////////////////////
// Markers for Historical Events //
///////////////////////////////////

/*Dendrochronology.USA_align_cores.prototype._createHistoricalEvents = function () {
	var aEventsData = this._eventsData["yearsEventsUSA"];
	var eventsMarkersFormat = this._eventMarkersFormat.eventMarkersDefault;
	var config = {x: 0, y: 0, aEventsData: aEventsData, eventsMarkersFormat: eventsMarkersFormat};
	this._eventMarkerGroup = new EventMarkerGroup(this, config);
	this._eventMarkerGroup.x = this.getGraphPlotRect().x;
	this._eventMarkerGroup.y = this.getGraphPlotRect().y + this.getGraphPlotRect().height;
	//this._eventMarkerGroup.x = config.x;
	//this._eventMarkerGroup.y = config.y;
	
	this._eventMarkerGroup.visible = false; // Hide at start; reveal when cores aligned
};*/