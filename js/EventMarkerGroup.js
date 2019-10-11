// EventMarkerGroup class/object
// Parameters: gameLevel, config
// Extends Phaser Group class
// config = {x, y, aEventsData};


EventMarkerGroup = function(gameLevel, config) {
	this._gameLevel = gameLevel;
	this._config = config;
	this.game = gameLevel.game;
    Phaser.Group.call(this, this.game);
	
	this._init();
};

EventMarkerGroup.prototype = Object.create(Phaser.Group.prototype);
EventMarkerGroup.prototype.constructor = EventMarkerGroup;

////////////////////
// Initialization //
////////////////////

// Inititalize EventMarkerGroup group
EventMarkerGroup.prototype._init = function() {
	this._aEvents = [];
	this._aEventsData = this._config.aEventsData;
	
	var eventsMarkersFormat = this._config.eventsMarkersFormat;
	
	for (var i = 0; i < this._aEventsData.length; i++){
		var config = {eventData: this._aEventsData[i], eventsMarkersFormat: eventsMarkersFormat};
		
		var eventMarker = new EventMarker(this._gameLevel, this, config);
		this.addChild(eventMarker);
		this._aEvents.push(eventMarker);
	}
};

// Public Methods

// Hide event descriptions of all event markers
EventMarkerGroup.prototype.hideDescriptions = function() {
	for (var i = 0; i < this._aEvents.length; i++) {
		var eventMarker = this._aEvents[i];
		eventMarker.hideDescription();
	}
};