Dendrochronology.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

Dendrochronology.Preloader.prototype = {

	create: function() {
		this.preloadBar.cropEnabled = false;
	},
	init: function() {
		
	},
	loadRender: function(){
		
		
	},
	loadUpdate: function() {
		
	},
	paused: function() {
		
	},
	pauseUpdate: function() {
		
	},
	preload: function() {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
		this.titleText = this.add.image(this.world.centerX, this.world.centerY, 'titleimage');
		this.titleText.alpha = 0.4;
		this.titleText.anchor.setTo(0.5, 0.5);
		
		this.load.json('dialog', 'assets/data/dialog.json');
		this.load.json('temperatureData', 'assets/data/year_temperature.json');
		this.load.json('graphsData', 'assets/data/graphs.json');
		this.load.json('historicalEventsData', 'assets/data/years_events.json');
		this.load.json('eventMarkersFormat', 'assets/data/event_markers.json');
		this.load.json('treeRingCoresData', 'assets/data/tree_ring_cores.json');
		this.load.json('slideShowData', 'assets/data/slide_shows.json');
		
		// Background images
		this.load.image('start_menu_bg', 'assets/images/start_menu_bg_900x600.jpg');
		this.load.image('replay_menu_bg', 'assets/images/replay_menu_bg.jpg');
		
		this.load.image('wood_grain_bg_1', 'assets/images/wood_grain_bg_1_900x600.jpg');
		this.load.image('wood_grain_bg_2', 'assets/images/wood_grain_bg_2_900x600.jpg');
		this.load.image('wood_grain_bg_3', 'assets/images/wood_grain_bg_3_900x600.jpg');
		
		this.load.image('game_level_1_bg', 'assets/images/game_level_1_bg.jpg');
		this.load.image('game_level_2_bg', 'assets/images/game_level_2_bg.jpg');
		this.load.image('game_level_3_bg', 'assets/images/game_level_3_bg.jpg');
		this.load.image('game_level_4_bg', 'assets/images/game_level_4_bg.jpg');
		this.load.image('game_level_5_bg', 'assets/images/game_level_5_bg.png');
		this.load.image('game_level_6_bg', 'assets/images/game_level_6_bg.png');
		
		// Images
		this.load.image('usa_flag', 'assets/images/usa_flag_300x158.png');
		this.load.image('uk_flag', 'assets/images/uk_flag_300x150.png');
		this.load.image('treeRingsPhoto_btn', 'assets/images/tree_rings_photo_di0057_330x250.jpg');
		this.load.image('byward_windlass_btn', 'assets/images/byward_windlass_330x250.jpg');
		
		// Slide show images
		this.load.image('treeRingsPhotoLightDark', 'assets/images/tree_rings_photo_di0057_300x440.jpg');
		this.load.image('treeRingsPhotoCloser', 'assets/images/tree_rings_photo_closer_di0057_300x440.jpg');
		this.load.image('borerCoreSample', 'assets/images/increment_borer_core_sample_300x440.jpg');
		this.load.image('bristleconeAlignedCores', 'assets/images/old_tree_cores_aligned_300x440.jpg');
		
		
		// Collect samples screen images
		this.load.image('borer_tool', 'assets/images/tree_core_borer_tool.png');
		this.load.image('live_tree', 'assets/images/live_tree_250x270.png');
		this.load.image('log', 'assets/images/log_300x110.png');
		this.load.image('log_cabin', 'assets/images/log_cabin_250x240.png');
		
		
		this.load.image('british_oak', 'assets/images/british_oak_200x210.jpg');
		this.load.image('bog_log', 'assets/images/bog_log_200x220.jpg');
		this.load.image('byward_windlass', 'assets/images/byward_windlass_290x220.jpg');
		this.load.image('goosegreen_farmhouse', 'assets/images/goosegreen_farmhouse_200x200.jpg');
		
		this.load.image('sample_carrier_box', 'assets/images/sample_carrier_box.png');
		this.load.image('sample_carrier_box_uk', 'assets/images/sample_carrier_box_222x102.png');
		this.load.image('core_sample_1', 'assets/images/core_sample_1_10x100.png');
		this.load.image('core_sample_2', 'assets/images/core_sample_2_10x100.png');
		this.load.image('core_sample_3', 'assets/images/core_sample_3_10x100.png');
		this.load.image('core_sample_4', 'assets/images/core_sample_4_10x100.png');
		
		this.load.image('phaser_pistol', 'assets/images/phaser_pistol_200x150.jpg');
		this.load.image('mini_phaser', 'assets/images/mini_phaser_200x150.jpg');
		this.load.image('hand_phaser', 'assets/images/hand_phaser_200x140.jpg');
		
		// Buttons
		this.load.spritesheet('score_btn_spritesheet', 'assets/images/spritesheets/score_btn_spritesheet.png', 50, 50);
		this.load.spritesheet('home_btn_spritesheet', 'assets/images/spritesheets/home_btn_spritesheet.png', 50, 50);
		this.load.spritesheet('help_btn_spritesheet', 'assets/images/spritesheets/help_btn_spritesheet.png', 50, 50);
		this.load.spritesheet('credits_btn_spritesheet', 'assets/images/spritesheets/credits_btn_spritesheet.png', 150, 50);
		this.load.spritesheet('reset_btn_spritesheet', 'assets/images/spritesheets/reset_btn_spritesheet.png', 50, 50);
		this.load.spritesheet('close_btn_spritesheet', 'assets/images/spritesheets/close_btn_spritesheet.png', 150, 50);
		this.load.spritesheet('forward_btn_spritesheet', 'assets/images/spritesheets/forward_btn_spritesheet.png', 50, 50);
		
		this.load.spritesheet('tell_more_btn_spritesheet', 'assets/images/spritesheets/tell_more_btn_spritesheet.png', 250, 50);
		this.load.spritesheet('skip_intro_btn_spritesheet', 'assets/images/spritesheets/skip_intro_btn_spritesheet.png', 250, 50);
		this.load.spritesheet('continue_btn_spritesheet', 'assets/images/spritesheets/continue_btn_spritesheet.png', 250, 50);
        
	},
	preRender: function() {
		
	},
	render: function (){
		
	},
	resize: function() {
		
	},
	resumed: function() {
		
	},
	shutdown: function() {
		
	},
	update: function () {
		this.ready = true;
        this.state.start('StartMenu');
		
	}
};