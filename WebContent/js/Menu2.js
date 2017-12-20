/**
 * Menu2 state.
 */
function Menu2() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu2.prototype = proto;

Menu2.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu2.prototype.create = function() {
	this.bg = this.add.sprite(0, 0, "AS");
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	{
	}
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"tap");
	sprite.anchor.set(1.5, 0.57);
	sprite.scale.set(0.45);

	var twn = this.add.tween(sprite);
	twn.to({
		y : 200
	}, 1000, "Quad.easeInOut", true, 0, Number.MAX_VALUE, true);
	
	story = this.add.sprite(this.world.centerX, 500, "story");
	story.anchor.set(2.95, -0.5);
	story.scale.set(0.5);
	story.inputEnabled = true;
	story.events.onInputDown.add(this.startStory, this);
	
	credit = this.add.sprite(this.world.centerX, 500, "Credit");
	credit.anchor.set(1.55, -0.38);
	credit.scale.set(0.7);
	credit.inputEnabled = true;
	credit.events.onInputDown.add(this.startCredit, this);
	
	this.input.onDown.add(this.startGame, this);
	

};

Menu2.prototype.startStory = function() {
	this.game.state.start("Story");
};
Menu2.prototype.startCredit = function() {
	this.game.state.start("Credit1");
};
Menu2.prototype.startGame = function() {
	this.game.state.start("Level");
};