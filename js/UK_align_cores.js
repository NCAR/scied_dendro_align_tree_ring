Dendrochronology.UK_align_cores = function(game) {
	this.game = game; // keep reference to main game object
	var helpDialogSize = {width:750, height:360};
	GameLevel.call(this, 3, 'wood_grain_bg_1', helpDialogSize);
};

Dendrochronology.UK_align_cores.prototype = Object.create(GameLevel.prototype);
Dendrochronology.UK_align_cores.prototype.constructor = Dendrochronology.UK_align_cores;

Dendrochronology.UK_align_cores.prototype.create = function() {
	GameLevel.prototype.create.apply(this);
	this.buildLevel();
};

Dendrochronology.UK_align_cores.prototype.buildLevel = function() {
	// Move dialog box up to keep core samples in view
	this._helpDialogBox.y = 60;

	// Screen title
	var textStyle = {
		font: "36px Arial",
		fill: "#57350e"
    };

	this._titleText = this.add.text(this.game.width/2, 10, "Align your tree ring core samples.", textStyle);
	this._titleText.anchor.setTo(0.5, 0);
	this._introTextVisible = true;

	// Temporary text disclaimer
	textStyle = {
		font: "18px Arial",
		fill: "#57350e",
		wordWrap: true,
		wordWrapWidth: 700
    };

	this._instructionsText = this.add.text(100, 70, "Line up your wood core samples by dragging a sample left or right until the pattern of stripes on your sample matches the pattern in the sample above or below it.\n\nThen drag the other samples right or left until some parts of their ring patterns line up with the core samples above and below. Continue sliding the samples around until all of the patterns match.\n\nBe ready for a surprise once you line up the patterns of all four core samples!", textStyle);




	// Temporary text disclaimer
	/*var textStyle = {
		font: "36px Arial",
		fill: "#57350e"
    };

	var titleText = this.add.text(20, 20, "Align Tree Ring Core Samples", textStyle);*/

	this._coresAligned = {pair_12: false, pair_23: false, pair_34: false};

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
		this._dialog = this.cache.getJSON('dialog');
};

// Hide the screen title and into text
Dendrochronology.UK_align_cores.prototype._hideIntroText = function () {
	this._titleText.visible = false;
	this._instructionsText.visible = false;
	this._introTextVisible = false;
};

///////////
// Graph //
///////////

Dendrochronology.UK_align_cores.prototype._createGraph = function () {
	var aTemperatureData = this._yearTemperatureData["yearlyTemperatures_UK"];

	// Graph layout data from preloaded JSON file
    var graphData = this._graphsData.yearTempUK;

	// Create graph using class TreeGraph
	this._graph = new TreeGraph(this, graphData, aTemperatureData, this._aCores);
    this.add.existing(this._graph);
    this._graph.x = 10; this._graph.y = 10;
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
	this._aCores = [];

	var configUK = this._treeRingCoresData.treeCoresUK;
	var aTemperatureData = this._yearTemperatureData["yearlyTemperatures_UK"];

	var config;
	for (var i = 0; i < configUK.aTreeRingCores.length; i++) {
		config = configUK.aTreeRingCores[i];
		config.aRingColors = configUK.aRingColors;
		config.aTempData = aTemperatureData;
		config.sTempMap = configUK.sTempMap;
		var treeRingCore = new TreeRingCore(this, config);
    	this.add.existing(treeRingCore);
		this._aCores[i] = treeRingCore;
	}
};

Dendrochronology.UK_align_cores.prototype.endCoreDrag = function(startYear) {
	var aCoreOffsets = [1209, 814, 417, 0];// formerly [680, 316, 0, 0] // formerly [943, 438, 0] // formerly [418, 177, 0]
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
		case this._aCores[3].getStartYear():
			draggedCoreNum = 4;
			draggedCore = this._aCores[3];
			break;
		default:
			console.log('Error determining which core sample was dragged');
	}

	if (Math.round(this._aCores[0].x) - aCoreOffsets[0] == Math.round(this._aCores[1].x) - aCoreOffsets[1]) {
		this._coresAligned.pair_12 = true;
	} else {
		this._coresAligned.pair_12 = false;
	}

	if (Math.round(this._aCores[1].x) - aCoreOffsets[1] == Math.round(this._aCores[2].x) - aCoreOffsets[2]) {
		this._coresAligned.pair_23 = true;
	} else {
		this._coresAligned.pair_23 = false;
	}

	if (Math.round(this._aCores[2].x) - aCoreOffsets[2] == Math.round(this._aCores[3].x) - aCoreOffsets[3]) {
		this._coresAligned.pair_34 = true;
	} else {
		this._coresAligned.pair_34 = false;
	}

	if (this._coresAligned.pair_12 && this._coresAligned.pair_23 && this._coresAligned.pair_34) {
		// Hide screen title and intro text
		if (this._introTextVisible) this._hideIntroText();

		this._graph.visible = true;

		// Prevent further dragging of cores
		for (var i = 0; i < this._aCores.length; i++){
			this._aCores[i].disableDrag();
		}

		// Leftmost core
		var leftCore = this._aCores[this._aCores.length - 1];

		var graphLeftMargin = this._graphsData.yearTempUK.margins.left;
		this._graph.x = leftCore.x - graphLeftMargin;

		this._eventMarkerGroup.visible = true; // Show historical event markers
		this._eventMarkerGroup.x = leftCore.x; // Align historical event markers
	} else {
		this._graph.visible = false;
		this._eventMarkerGroup.visible = false;
	}

	// Debugging
	var offset_12 = this._aCores[0].x - this._aCores[1].x;
	var offset_23 = this._aCores[1].x - this._aCores[2].x;
	var offset_34 = this._aCores[2].x - this._aCores[3].x;
	console.log('Offset 1-2 = ' + offset_12 + ', Offset 2-3 = ' + offset_23 + ', Offset 3-4 = ' + offset_34);
	console.log('Aligned 1-2 = ' + this._coresAligned.pair_12);
	console.log('Aligned 2-3 = ' + this._coresAligned.pair_23);
	console.log('Aligned 3-4 = ' + this._coresAligned.pair_34);

	// If this is the first drag, hide screen title and intro text
	//if (this._introTextVisible) this._hideIntroText();
};

// Controls to move tree cores and graph

// Arrow buttons to move core samples and graph right or left, as a group
Dendrochronology.UK_align_cores.prototype._initShiftControls = function () {
	// Arrow buttons to move core samples and graph right, as a group
	var xLoc = this.game.width - 35;
	var yLoc = 380;
	this._shiftRightBtn = this.add.button(xLoc, yLoc, 'forward_btn_spritesheet', this._shiftRight, this, 2, 1, 0);
    this._shiftRightBtn.name = 'shiftRightBtn';
	this._shiftRightBtn.anchor.setTo(0.5, 0.5);

	// Arrow buttons to move core samples and graph left, as a group
	xLoc = 35;
	this._shiftLeftBtn = this.add.button(xLoc, yLoc, 'forward_btn_spritesheet', this._shiftLeft, this, 2, 1, 0);
	this._shiftLeftBtn.angle = 180;
    this._shiftLeftBtn.name = 'shiftLeftBtn';
	this._shiftLeftBtn.anchor.setTo(0.5, 0.5);

	// Animate buttons to make more evident
	var tweenDuration = 2000; // milliseconds
	var tweenStartDelay = 20000; // milliseconds
	var tweenAlpha = 0.2;
	this._leftBtnTween = this.game.add.tween(this._shiftLeftBtn);
	this._leftBtnTween.to( { alpha: tweenAlpha }, tweenDuration, Phaser.Easing.Linear.None, true, tweenStartDelay, -1, true);
	this._rightBtnTween = this.game.add.tween(this._shiftRightBtn);
	this._rightBtnTween.to( { alpha: tweenAlpha }, tweenDuration, Phaser.Easing.Linear.None, true, tweenStartDelay, -1, true);
};

Dendrochronology.UK_align_cores.prototype._shiftRight = function (pointer) {
	this._rightBtnTween.pause(); // Cease "flashing" to draw user's attention
	this._shiftRightBtn.alpha = 1;

    var shiftAmountPx = 200;
	var tweenDuration = 1000; // milliseconds

	var graphTween = this.game.add.tween(this._graph);
	var endLocGraph = {x: this._graph.x - shiftAmountPx, y: this._graph.y};
	graphTween.to( { x: endLocGraph.x, y: endLocGraph.y }, tweenDuration, Phaser.Easing.Linear.None);

	var markersTween = this.game.add.tween(this._eventMarkerGroup);
	var endLocMarkers = {x: this._eventMarkerGroup.x - shiftAmountPx, y: this._eventMarkerGroup.y};
	markersTween.to( { x: endLocMarkers.x, y: endLocMarkers.y }, tweenDuration, Phaser.Easing.Linear.None)

	for (var i = 0; i < this._aCores.length; i++){
		var coreTween = this.game.add.tween(this._aCores[i]);
		var endLocCore = {x: this._aCores[i].x - shiftAmountPx, y: this._aCores[i].y};
		coreTween.to( { x: endLocCore.x, y: endLocCore.y }, tweenDuration, Phaser.Easing.Linear.None);
		coreTween.start();
	}

	graphTween.start();
	markersTween.start();
};

Dendrochronology.UK_align_cores.prototype._shiftLeft = function (pointer) {
	this._leftBtnTween.pause(); // Cease "flashing" to draw user's attention
	this._shiftLeftBtn.alpha = 1;

    var shiftAmountPx = 200;
	var tweenDuration = 1000; // milliseconds

	var graphTween = this.game.add.tween(this._graph);
	var endLocGraph = {x: this._graph.x + shiftAmountPx, y: this._graph.y};
	graphTween.to( { x: endLocGraph.x, y: endLocGraph.y }, tweenDuration, Phaser.Easing.Linear.None);

	var markersTween = this.game.add.tween(this._eventMarkerGroup);
	var endLocMarkers = {x: this._eventMarkerGroup.x + shiftAmountPx, y: this._eventMarkerGroup.y};
	markersTween.to( { x: endLocMarkers.x, y: endLocMarkers.y }, tweenDuration, Phaser.Easing.Linear.None)

	for (var i = 0; i < this._aCores.length; i++){
		var coreTween = this.game.add.tween(this._aCores[i]);
		var endLocCore = {x: this._aCores[i].x + shiftAmountPx, y: this._aCores[i].y};
		coreTween.to( { x: endLocCore.x, y: endLocCore.y }, tweenDuration, Phaser.Easing.Linear.None);
		coreTween.start();
	}

	graphTween.start();
	markersTween.start();
};
