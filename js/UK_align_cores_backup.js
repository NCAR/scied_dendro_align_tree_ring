Dendrochronology.UK_align_cores = function(game) {
	this.game = game; // keep reference to main game object
	var helpDialogSize = {width:500, height:300};
	GameLevel.call(this, 3, 'wood_grain_bg_1', helpDialogSize);
};

Dendrochronology.UK_align_cores.prototype = Object.create(GameLevel.prototype);
Dendrochronology.UK_align_cores.prototype.constructor = Dendrochronology.UK_align_cores;

Dendrochronology.UK_align_cores.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

Dendrochronology.UK_align_cores.prototype.buildLevel = function() { 
	// Temporary text disclaimer
	var textStyle = {
		font: "36px Arial",
		fill: "#57350e"
    };
		
	var titleText = this.add.text(20, 20, "Align Tree Ring Core Samples", textStyle);
	
	this._coresAligned = {pair_12: false, pair_23: false};
	
	// Create tree ring cores
    this._createTreeRingCores();
	
	// Create temperature vs. time graph based on tree rings
    this._createGraph();
	
	// Create markers for historical events by date
	this._createHistoricalEvents();
	
	// Arrow buttons to move core samples and graph right or left, as a group
	this._initShiftControls();
};

Dendrochronology.UK_align_cores.prototype.preload = function () {
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

Dendrochronology.UK_align_cores.prototype._createGraph = function () {
	var aTemperatureData = this._yearTemperatureData["yearlyTemperatures_UK"];
	
	// Graph layout data from preloaded JSON file
    var graphData = this._graphsData.yearTempUK;
	
	var aTreeRingCores = [this._firstCore, this._secondCore, this._thirdCore];
	
	// Create graph using class TreeGraph
	this._graph = new TreeGraph(this, graphData, aTemperatureData, aTreeRingCores);
    this.add.existing(this._graph);
    this._graph.x = 10; this._graph.y = 80;
	
	this._graph.visible = false;
};

Dendrochronology.UK_align_cores.prototype.getGraphPlotRect = function () {
	var graphData = this._graphsData.yearTempUK;
	
	var xLoc = this._graph.x + graphData.margins.left;
	var yLoc = this._graph.y + graphData.margins.top;
	
	var plotWidth = this._graph.width - (graphData.margins.left + graphData.margins.right);
	var plotHeight = this._graph.height - (graphData.margins.top + graphData.margins.bottom);
	
	var graphPlotRect = {x: xLoc, y: yLoc, width: plotWidth, height: plotHeight};
	return graphPlotRect;
};

// Get the x-coordinate (screen) corresponding to a year on the graph; relative to the origin point on the graph
Dendrochronology.UK_align_cores.prototype.getScreenLocYear = function (year) {
	return this._graph.getScreenLocX(year);
};

///////////////////////////////////
// Markers for Historical Events //
///////////////////////////////////

Dendrochronology.UK_align_cores.prototype._createHistoricalEvents = function () {
	var aEventsData = this._eventsData["yearsEventsUK"];
	var eventsMarkersFormat = this._eventMarkersFormat.eventMarkersDefault;
	var config = {x: 0, y: 0, aEventsData: aEventsData, eventsMarkersFormat: eventsMarkersFormat};
	this._eventMarkerGroup = new EventMarkerGroup(this, config);
	this._eventMarkerGroup.x = this.getGraphPlotRect().x;
	this._eventMarkerGroup.y = this.getGraphPlotRect().y + this.getGraphPlotRect().height;
	
	this._eventMarkerGroup.visible = false; // Hide at start; reveal when cores aligned
};

///////////
// Trees //
///////////

Dendrochronology.UK_align_cores.prototype._createTreeRingCores = function () {
	var configUK = this._treeRingCoresData.treeCoresUK;
	var aTemperatureData = this._yearTemperatureData["yearlyTemperatures_UK"];
	
	// Insert first tree ring core (most recent)
	// Place all parameters into config
	var config = configUK.aTreeRingCores[0];
	config.aRingColors = configUK.aRingColors;
	config.aTempData = aTemperatureData;
	config.sTempMap = configUK.sTempMap;
	//var config = {x: 334, y: 430, aTempData: aTemperatureData, aYearRange: [1980, 2017], sTempMap: 'UK_1'};
    this._firstCore = new TreeRingCore(this, config);
    this.add.existing(this._firstCore);

    // Insert second tree ring core (older)
	config = configUK.aTreeRingCores[1];
	config.aRingColors = configUK.aRingColors;
	config.aTempData = aTemperatureData;
	config.sTempMap = configUK.sTempMap;
	//config.x = 100; config.y = 460;
	//config.aYearRange = [1950, 1990];
    this._secondCore = new TreeRingCore(this, config);
    this.add.existing(this._secondCore);

    // Insert third tree ring core (oldest)
	config = configUK.aTreeRingCores[2];
	config.aRingColors = configUK.aRingColors;
	config.aTempData = aTemperatureData;
	config.sTempMap = configUK.sTempMap;
	//config.x = 50; config.y = 490;
	//config.aYearRange = [1930, 1970];
    this._thirdCore = new TreeRingCore(this, config);
    this.add.existing(this._thirdCore);
};

Dendrochronology.UK_align_cores.prototype.endCoreDrag = function(startYear) {
	var aCoreOffsets = [418, 177, 0];
	var draggedCore;
	var draggedCoreNum = 0;
	
	// Determine which core sample was dragged by checking start year for each core
	switch (startYear) {
		case this._firstCore.getStartYear():
			draggedCoreNum = 1;
			draggedCore = this._firstCore;
			break;
		case this._secondCore.getStartYear():
			draggedCoreNum = 2;
			draggedCore = this._secondCore;
			break;
		case this._thirdCore.getStartYear():
			draggedCoreNum = 3;
			draggedCore = this._thirdCore;
			break;
		default:
			console.log('Error determining which core sample was dragged');
	}
	
	if (this._firstCore.x - aCoreOffsets[0] == this._secondCore.x - aCoreOffsets[1]) {
		this._coresAligned.pair_12 = true;
	} else {
		this._coresAligned.pair_12 = false;
	}
	
	if (this._secondCore.x - aCoreOffsets[1] == this._thirdCore.x - aCoreOffsets[2]) {
		this._coresAligned.pair_23 = true;
	} else {
		this._coresAligned.pair_23 = false;
	}
	
	if (this._coresAligned.pair_12 && this._coresAligned.pair_23) {
		this._graph.visible = true;
	
		var graphLeftMargin = this._graphsData.yearTempUK.margins.left;
		this._graph.x = this._thirdCore.x - graphLeftMargin;
		
		this._eventMarkerGroup.visible = true; // Show historical event markers
		this._eventMarkerGroup.x = this._thirdCore.x; // Align historical event markers
	} else {
		this._graph.visible = false;
		this._eventMarkerGroup.visible = false;
	}
};

// Controls to move tree cores and graph

// Arrow buttons to move core samples and graph right or left, as a group
Dendrochronology.UK_align_cores.prototype._initShiftControls = function () {
	// Arrow buttons to move core samples and graph right, as a group
	var xLoc = this.game.width - 35;
	var yLoc = 400;
	this._shiftRightBtn = this.add.button(xLoc, yLoc, 'forward_btn_spritesheet', this._shiftRight, this, 2, 1, 0);
    this._shiftRightBtn.name = 'shiftRightBtn';
	this._shiftRightBtn.anchor.setTo(0.5, 0.5);
	
	// Arrow buttons to move core samples and graph left, as a group
	xLoc = 35;
	this._shiftLeftBtn = this.add.button(xLoc, yLoc, 'forward_btn_spritesheet', this._shiftLeft, this, 2, 1, 0);
	this._shiftLeftBtn.angle = 180;
    this._shiftLeftBtn.name = 'shiftLeftBtn';
	this._shiftLeftBtn.anchor.setTo(0.5, 0.5);
};

Dendrochronology.UK_align_cores.prototype._shiftRight = function (pointer) {
    var shiftAmountPx = 400;
	
	this._firstCore.x += shiftAmountPx;
	this._secondCore.x += shiftAmountPx;
	this._thirdCore.x += shiftAmountPx;
	
	this._graph.x += shiftAmountPx;
	this._eventMarkerGroup.x += shiftAmountPx;
};

Dendrochronology.UK_align_cores.prototype._shiftLeft = function (pointer) {
    var shiftAmountPx = 400;
	
	this._firstCore.x -= shiftAmountPx;
	this._secondCore.x -= shiftAmountPx;
	this._thirdCore.x -= shiftAmountPx;
	
	this._graph.x -= shiftAmountPx;
	this._eventMarkerGroup.x -= shiftAmountPx;
};