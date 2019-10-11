// GraphPaper class/object
// Parameters: game object, instance of parent Graph class, paper parameters (color, size of rect)

GraphPaper = function(game, graph, paperParameters) {
	this.game = game;
	this.graph = graph;
    Phaser.Group.call(this, game);
	
	this._paperParameters = paperParameters;
	this._paperGraphics = this.game.add.graphics(0, 0);
	
	this._init();
};

GraphPaper.prototype = Object.create(Phaser.Group.prototype);
GraphPaper.prototype.constructor = GraphPaper;

// Inititalize
GraphPaper.prototype._init = function() {
	this._paperColor = this._paperParameters.color;
	
	// Size (x- and y-dimensions) of graph "paper"
	this.a_paperSize = this._paperParameters.size;
	
	// Place on screen within graph group
	this.graph.add(this._paperGraphics);
	
	this.drawPaper();
};

GraphPaper.prototype.drawPaper = function() {
	this._paperGraphics.beginFill(this._paperColor);
	this._paperGraphics.drawRect(0, 0, this.a_paperSize[0], this.a_paperSize[1]);
	this._paperGraphics.endFill();
};

GraphPaper.prototype.erasePaper = function(){
    this._paperGraphics.clear();
};

GraphPaper.prototype.setColor = function(newColor){
    this._paperGraphics.clear();
	this._paperColor = newColor;
	this.drawPaper();
};

GraphPaper.prototype.setSize = function(aSize){
    this._paperGraphics.clear();
	this.a_paperSize = aSize;
	this.drawPaper();
};