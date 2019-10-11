// EventMarker class/object
// Parameters: gameLevel, config
// Extends Phaser Group class
// config = {x, y, aEventsData};

EventMarker = function(gameLevel, eventMarkerGroup, config) {
	this._gameLevel = gameLevel;
	this._eventMarkerGroup = eventMarkerGroup;
	this._config = config;
	this.game = gameLevel.game;
    Phaser.Group.call(this, this.game);
	
	this._init();
};

EventMarker.prototype = Object.create(Phaser.Group.prototype);
EventMarker.prototype.constructor = EventMarker;

////////////////////
// Initialization //
////////////////////

// Inititalize EventMarker
EventMarker.prototype._init = function() {
	this._eventData = this._config.eventData;
	this._markerFormat = this._config.eventsMarkersFormat;
	
	this._setMarkerLoc();
	
	this._initMarkerBg();
	this._initMarkerSprite();
	this._initText();
	this._initDescriptionText();
};


// Inititalize background graphic/shape for marker
EventMarker.prototype._initMarkerBg = function() {
	var bgFormat = this._markerFormat.yearBg;
	
	// From JSON
	var touchSpot = this._markerFormat.touchSpot;
	var arrowFormat = this._markerFormat.arrow;
	var fillColor = this._markerFormat.bgGraphics.fillColor;
	
	this._markerBgGraphic = this.game.add.graphics(-100, 0);
	
	this._markerBgGraphic.beginFill(fillColor);
	this._markerBgGraphic.drawRect(-touchSpot.width/2, arrowFormat.height, touchSpot.width, touchSpot.height);
	//var circleDiameter = 30;
	//this._markerBgGraphic.drawCircle(0, bgFormat.yOffset, circleDiameter);
	
	// Pointer on top of Marker that precisely points to associated year along graph axis
	var pointerWidth = arrowFormat.width;
	var pointerHeight = arrowFormat.height;// var pointerHeight = bgFormat.yOffset;
	this._markerBgGraphic.lineStyle(1, fillColor, 1);
	this._markerBgGraphic.beginFill(fillColor);
	this._markerBgGraphic.moveTo(0, 0);
	this._markerBgGraphic.lineTo(pointerWidth/2, pointerHeight);
	this._markerBgGraphic.lineTo(-pointerWidth/2, pointerHeight);
	this._markerBgGraphic.lineTo(0, 0);
	
	// Extension beneath clickable marker to connect it to Description Text
	var extensionHeight = this._markerFormat.extension.height;
	var xLoc = this._markerLoc.x - touchSpot.width/2;
	var yLoc = this._markerLoc.y + touchSpot.yOffset + touchSpot.height;
	this._markerExtensionGraphic = this.game.add.graphics(xLoc, yLoc);
	this._markerExtensionGraphic.beginFill(fillColor);
	this._markerExtensionGraphic.drawRect(0, 0, touchSpot.width, extensionHeight);
	this.addChild(this._markerExtensionGraphic);
	this._markerExtensionGraphic.visible = false;
};


// Inititalize Sprite to support interactivity (clicks/touches)
EventMarker.prototype._initMarkerSprite = function() {
	var markerBgHeight = this._markerBgGraphic.height;
	var ySprite = this._markerLoc.y;
	
	// Create marker sprite using marker background graphic
	this._markerSprite = this.game.add.sprite(this._markerLoc.x, ySprite, this._markerBgGraphic.generateTexture());
	this.addChild(this._markerSprite);
	this._markerSprite.anchor.setTo(0.5, 0);
	
	this._markerSprite.inputEnabled = true;
	this._markerSprite.events.onInputDown.add(this._onPressMarker, this);
};

EventMarker.prototype._onPressMarker = function(pointer) {
	// Hide all Description Text fields
	this._eventMarkerGroup.hideDescriptions();
	
	var sEventDescription = this._config.eventData.description;
	var eventYear = this._config.eventData.year;
	
	var xLoc = pointer.worldPosition.x;
	
	if (xLoc > 450) {
		this._descriptionText.anchor.setTo(1, 0);
		this._descriptionText.x = this._markerLoc.x + this._markerBgGraphic.width/2;
	} else {
		this._descriptionText.anchor.setTo(0, 0);
		this._descriptionText.x = this._markerLoc.x - this._markerBgGraphic.width/2;
	}
	
	this._text.visible = false;
	this._descriptionText.visible = true;
	this._markerExtensionGraphic.visible = true;
};

// Inititalize Label text
EventMarker.prototype._initText = function() {
	var textFormat = this._markerFormat.textFormat;
	
	var styleFont = textFormat.size + ' ' + textFormat.font;
	var style = {font: styleFont, fill: textFormat.fillColor, align: "center"};
	this._text = this.game.add.text(this._markerLoc.x, this._markerLoc.y + this._markerFormat.yearText.yOffset, this._eventData.year, style);
	this.addChild(this._text);
	
	this._text.anchor.setTo(0.5, 0);
};

// Inititalize Description text
EventMarker.prototype._initDescriptionText = function() {
	var sText = this._eventData.year + ' ' + this._eventData.description;
	var textFormat = this._markerFormat.textFormat;
	
	var xLoc = this._markerLoc.x - this._markerBgGraphic.width/2;
	var yLoc = this._markerLoc.y + this._markerFormat.touchSpot.yOffset + this._markerFormat.touchSpot.height + this._markerFormat.extension.height;
	
	var styleFont = textFormat.size + ' ' + textFormat.font;
	var style = {font: styleFont, fill: textFormat.fillColor, align: "center", backgroundColor: "#57350e"};
	this._descriptionText = this.game.add.text(xLoc, yLoc, sText, style);
	this.addChild(this._descriptionText);
	this._descriptionText.anchor.setTo(0.5, 0);
	
	this._descriptionText.visible = false;
};

// Determine x- and y-coordinates (relative to group) for marker's "point"
EventMarker.prototype._setMarkerLoc = function() {
	var xLoc = this._gameLevel.getScreenLocYear(this._eventData.year);
	var yLoc = 0;
	this._markerLoc = {x: xLoc, y: yLoc};
};

// Public Methods

// Hide Event Description Text field for this Marker
EventMarker.prototype.hideDescription = function() {
	this._descriptionText.visible = false;
	this._markerExtensionGraphic.visible = false;
	this._text.visible = true;
}