Dendrochronology.ReplayMenu = function (game) {
    this.game = game; // keep reference to main game object
    this._selectedLevel = 0;
}

Dendrochronology.ReplayMenu.prototype = {

    create: function () {
		var backgroundImage = this.add.image(0, 0, 'start_menu_bg');
		backgroundImage.alpha = 0.4;
		
		// Screen title
		var titleStyle = {
            font: "36px Arial",
            fill: "#57350e",
            align: "center"
        };
		
        var titleText = this.add.text(this.world.centerX, 20, "Tree Rings and Climate Timeline Simulation\nSelect Standard or UK Schools Version", titleStyle);
        titleText.anchor.setTo(0.5, 0);
		
		// Select USA or UK version
		var yFlags = 150;
		this._usaBtn = this.add.image(250, yFlags, 'treeRingsPhoto_btn');
		//var usaBtn = this.add.image(100, yFlags, 'usa_flag');
		this._ukBtn = this.add.image(650, yFlags, 'byward_windlass_btn');
		//var ukBtn = this.add.image(500, yFlags, 'uk_flag');
		this._usaBtn.inputEnabled = this._ukBtn.inputEnabled = true;
		this._usaBtn.input.useHandCursor = this._ukBtn.input.useHandCursor = true;
		this._usaBtn.anchor.setTo(0.5, 0);
		this._ukBtn.anchor.setTo(0.5, 0);
		
		this._usaBtn.events.onInputDown.add(this.clickFlagUSA, this);
		this._ukBtn.events.onInputDown.add(this.clickFlagUK, this);
		
		var versionStyle = {
            font: "36px Arial",
            fill: "#57350e",
            align: "center"
        };
		
		var usaLabel = this.add.text(250, 410, "Standard Version", versionStyle);
        var ukLabel = this.add.text(650, 410, "Custom Version\nfor UK Schools", versionStyle);
		
        usaLabel.anchor.setTo(0.5, 0);
        ukLabel.anchor.setTo(0.5, 0);
		
		usaLabel.inputEnabled = ukLabel.inputEnabled = true;
		
		usaLabel.events.onInputDown.addOnce(this.startLevel21, this);
        ukLabel.events.onInputDown.addOnce(this.startLevel1, this);

		this._initHelp();
    },
    _initHelp: function () {
        // help button using parent DialogBox class
		var xLoc = this._usaBtn.x;
		var yLoc = 460;
		this._helpBtnUSA = this.add.button(xLoc, yLoc, 'help_btn_spritesheet', this._toggleHelpUSA, this, 2, 1, 0);
		this._helpBtnUSA.name = 'helpBtnUSA';
		this._helpBtnUSA.anchor.setTo(0.5, 0);

		// Help dialog box
		var configUSA = {size: {width:750, height:300}, bodyText: this._helpData.aboutUSA};
		this._helpDialogBoxUSA = new SimpleDialog(this, configUSA);
		this._helpDialogBoxUSA.visible = false;
		
		
        // help button using parent DialogBox class
		xLoc = this._ukBtn.x;
		yLoc = 510;
		this._helpBtnUK = this.add.button(xLoc, yLoc, 'help_btn_spritesheet', this._toggleHelpUK, this, 2, 1, 0);
		this._helpBtnUK.name = 'helpBtnUK';
		this._helpBtnUK.anchor.setTo(0.5, 0);

		// Help dialog box
		var configUK = {size: {width:750, height:380}, bodyText: this._helpData.aboutUK};
		this._helpDialogBoxUK = new SimpleDialog(this, configUK);
		this._helpDialogBoxUK.visible = false;
    },
    _toggleHelpUSA: function () {
		this.world.bringToTop(this._helpDialogBoxUSA);

		if (this._helpDialogBoxUSA.visible) {
			this._helpDialogBoxUSA.visible = false;
			this._toggleUIactive(false);
		} else {
			this._helpDialogBoxUSA.visible = true;
			this._toggleUIactive(true);
		}
	},
    _toggleHelpUK: function () {
		this.world.bringToTop(this._helpDialogBoxUK);

		if (this._helpDialogBoxUK.visible) {
			this._helpDialogBoxUK.visible = false;
			this._toggleUIactive(false);
		} else {
			this._helpDialogBoxUK.visible = true;
			this._toggleUIactive(true);
		}
	},
	// Toggle UI controls enabled/disabled when Help dialogs shown/hidden
    _toggleUIactive: function (bDisable) {
        if (bDisable) {
			console.log('Disable UI');
		} else {
			console.log('Enable UI');
		}
    },
    /*replayGame: function () {
        // send the current level to the game state
        this.game.state.states['Game']._currentLevel = this._selectedLevel;
        this.state.start('Game');
    },
    startLevel1: function (pointer) {
        this._selectedLevel = 1;
        this.replayGame();
    },*/
    startLevel1: function (pointer) {
        this._selectedLevel = 1;
        //this.game.state.states['Game']._currentLevel = this._selectedLevel;
        this.state.start('GameLevel_1');
    },
	startLevel21: function (pointer) {
        this._selectedLevel = 21;
        //this.game.state.states['Game']._currentLevel = this._selectedLevel;
        this.state.start('GameLevel_21');
    },
	startLevel22: function (pointer) {
        this._selectedLevel = 22;
        //this.game.state.states['Game']._currentLevel = this._selectedLevel;
        this.state.start('GameLevel_22');
    },
	startLevel23: function (pointer) {
        this._selectedLevel = 23;
        //this.game.state.states['Game']._currentLevel = this._selectedLevel;
        this.state.start('GameLevel_23');
    },
	startLevel91: function (pointer) {
        this._selectedLevel = 91;
        //this.game.state.states['Game']._currentLevel = this._selectedLevel;
        this.state.start('GameLevel_91');
    },
    startLevel92: function (pointer) {
        this._selectedLevel = 92;
        //this.game.state.states['Game']._currentLevel = this._selectedLevel;
        this.state.start('GameLevel_92');
    },
    startLevel93: function (pointer) {
        this._selectedLevel = 93;
        //this.game.state.states['Game']._currentLevel = this._selectedLevel;
        this.state.start('GameLevel_93');
    },
    startLevel95: function (pointer) {
        this._selectedLevel = 95;
        //this.game.state.states['Game']._currentLevel = this._selectedLevel;
        this.state.start('GameLevel_95');
    },
    clickFlagUSA: function (pointer) {
        this._selectedLevel = 21;
        this.state.start('GameLevel_21');
    },
    clickFlagUK: function (pointer) {
        this._selectedLevel = 1;
        this.state.start('GameLevel_1');
    },
    preload: function () {
        // load the JSON data file with text for the Help Dialogs about the USA and UK versions
    	this._helpData = this.cache.getJSON('dialog');
    },
    closeDialog: function (dialogBox) {
        //console.log('Close dialog box');
		//console.log(dialogBox);
		
		this._toggleUIactive(false);
    }
};