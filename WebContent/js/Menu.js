/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	this.bg = this.add.sprite(0, 0, "AS");
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	{
	}
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"tap-to-start");
	sprite.anchor.set(0.5, 0.5);
	
	story = this.add.sprite(this.world.centerX, 500, "story");
	story.anchor.set(1.25, -0.5);
	story.scale.set(0.5);
	story.inputEnabled = true;
	story.events.onInputDown.add(this.startStory, this);
	
	credit = this.add.sprite(this.world.centerX, 500, "Credit");
	credit.anchor.set(-0.05, -0.38);
	credit.scale.set(0.7);
	credit.inputEnabled = true;
	
	this.input.onDown.add(this.startGame, this);
};

Menu.prototype.startStory = function() {
	this.game.state.start("Story");
};
Menu.prototype.startGame = function() {
	this.game.state.start("Level");
};