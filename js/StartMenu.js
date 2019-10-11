Dendrochronology.StartMenu = function (game) {
    this.game = game; // keep reference to main game object

    this._selectedLevel = 0;
}

Dendrochronology.StartMenu.prototype = {

    create: function () {
        // Background image
		var startMenuBg = this.add.image(0, 0, 'start_menu_bg');
		startMenuBg.alpha = 0.4;
		
		// Screen title
		var titleStyle = {
            font: "36px Arial",
            fill: "#57350e",
            align: "center"
        };
		
        var titleText = this.add.text(this.world.centerX, 20, "Tree Rings and Climate Timeline Simulation\nSelect Standard or UK Schools Version", titleStyle);
        titleText.anchor.setTo(0.5, 0);
		
		// Select Standard or UK version
		var yVersionBtns = 150;
		this._standardVersionBtn = this.add.image(250, yVersionBtns, 'treeRingsPhoto_btn');
		this._standardVersionBtn.anchor.setTo(0.5, 0);
		this._ukVersionBtn = this.add.image(650, yVersionBtns, 'byward_windlass_btn');
		this._ukVersionBtn.anchor.setTo(0.5, 0);
		
		this._standardVersionBtn.inputEnabled = this._ukVersionBtn.inputEnabled = true;
		this._standardVersionBtn.input.useHandCursor = this._ukVersionBtn.input.useHandCursor = true;
		
		this._standardVersionBtn.events.onInputDown.add(this.clickStandardVersion, this);
		this._ukVersionBtn.events.onInputDown.add(this.clickUkVersion, this);
		
		//usaBtn.events.onInputDown.add(this.startLevel21, this);
        //ukBtn.events.onInputDown.add(this.startLevel1, this);
		
		var versionStyle = {
            font: "36px Arial",
            fill: "#57350e",
            align: "center"
        };
		
		this._standardVersionLabel = this.add.text(250, 410, "Standard Version", versionStyle);
        this._ukVersionLabel = this.add.text(650, 410, "Custom Version\nfor UK Schools", versionStyle);
		
        this._standardVersionLabel.anchor.setTo(0.5, 0);
        this._ukVersionLabel.anchor.setTo(0.5, 0);
		
		this._standardVersionLabel.inputEnabled = this._ukVersionLabel.inputEnabled = true;
		
		this._standardVersionLabel.events.onInputDown.addOnce(this.startLevel21, this);
        this._ukVersionLabel.events.onInputDown.addOnce(this.startLevel1, this);

		this._initHelp();
    },
    _initHelp: function () {
        // help button using parent DialogBox class
		var xLoc = this._standardVersionBtn.x;
		var yLoc = 460;
		this._helpBtnStandard = this.add.button(xLoc, yLoc, 'help_btn_spritesheet', this._toggleHelpStandard, this, 2, 1, 0);
		this._helpBtnStandard.name = 'helpBtnStandard';
		this._helpBtnStandard.anchor.setTo(0.5, 0);

		// Help dialog box
		var configStandard = {size: {width:750, height:300}, bodyText: this._helpData.aboutStandard};
		this._helpDialogBoxStandard = new SimpleDialog(this, configStandard);
		this._helpDialogBoxStandard.visible = false;
		
		
        // help button using parent DialogBox class
		xLoc = this._ukVersionBtn.x;
		yLoc = 510;
		this._helpBtnUK = this.add.button(xLoc, yLoc, 'help_btn_spritesheet', this._toggleHelpUK, this, 2, 1, 0);
		this._helpBtnUK.name = 'helpBtnUK';
		this._helpBtnUK.anchor.setTo(0.5, 0);

		// Help dialog box
		var configUK = {size: {width:750, height:380}, bodyText: this._helpData.aboutUK};
		this._helpDialogBoxUK = new SimpleDialog(this, configUK);
		this._helpDialogBoxUK.visible = false;
    },
    _toggleHelpStandard: function () {
		this.world.bringToTop(this._helpDialogBoxStandard);

		if (this._helpDialogBoxStandard.visible) {
			this._helpDialogBoxStandard.visible = false;
			this._toggleUIactive(false);
		} else {
			this._helpDialogBoxStandard.visible = true;
			this._helpDialogBoxUK.visible = false;
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
			this._helpDialogBoxStandard.visible = false;
			this._toggleUIactive(true);
		}
	},
	// Toggle UI controls enabled/disabled when Help dialogs shown/hidden
    _toggleUIactive: function (bDisable) {
        if (bDisable) {
			this._standardVersionBtn.input.enabled = false;
			this._standardVersionLabel.input.enabled = false;
			this._ukVersionBtn.input.enabled = false;
			this._ukVersionLabel.input.enabled = false;
		} else {
			this._standardVersionBtn.input.enabled = true;
			this._standardVersionLabel.input.enabled = true;
			this._ukVersionBtn.input.enabled = true;
			this._ukVersionLabel.input.enabled = true;
		}
    },
    startLevel1: function (pointer) {
        this._selectedLevel = 1;
        this.state.start('GameLevel_1');
    },
    startLevel21: function (pointer) {
        this._selectedLevel = 21;
        this.state.start('GameLevel_21');
    },
    startLevel91: function (pointer) {
		this._selectedLevel = 91;
        this.state.start('GameLevel_91');
    },
    startLevel92: function (pointer) {
		this._selectedLevel = 92;
        this.state.start('GameLevel_92');
    },
    startLevel93: function (pointer) {
		this._selectedLevel = 93;
        this.state.start('GameLevel_93');
    },
    startLevel95: function (pointer) {
        this._selectedLevel = 95;
        this.state.start('GameLevel_95');
    },
    clickStandardVersion: function (pointer) {
        this._selectedLevel = 21;
        this.state.start('GameLevel_21');
    },
    clickUkVersion: function (pointer) {
        this._selectedLevel = 1;
        this.state.start('GameLevel_1');
    },
    preload: function () {
        // load the JSON data file with text for the Help Dialogs about the Standard and UK versions
    	this._helpData = this.cache.getJSON('dialog');
    },
    closeDialog: function (dialogBox) {
        //console.log('Close dialog box');
		//console.log(dialogBox);
		
		this._toggleUIactive(false);
    }
};