/**
 *
 */
function Story () {
   Phaser.State.call(this);
}
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Story.prototype = proto;

Story.prototype.preload = function() {
	this.load.pack("Story", "assets/assets-pack.json");
};

Story.prototype.create = function() {
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"1");
	text = this.add.text(30, this.world.height - 40, "มึงอย่ากดควยยยยไอ้สาสสส", {
		fill : 'white'
	});
	this.sprite.anchor.set(0.5, 0.5);
	this.input.onDown.add(this.startGame, this);
	this.time.events.add(0,this.change,this,"1");
	this.time.events.add(8000,this.change,this,"2");
	this.time.events.add(16000,this.change,this,"3");
	this.time.events.add(24000,this.change,this,"4");
	this.time.events.add(32000,this.change,this,"5");
	this.time.events.add(40000,this.change,this,"6");
	this.time.events.add(48000,this.change,this,"7");
	this.time.events.add(56000,this.change,this,"8");
	this.time.events.add(64000,this.startGame,this);
};
Story.prototype.change = function(k) {
 	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,k);
    this.sprite.anchor.set(0.5, 0.5);
};


Story.prototype.startGame = function() {
	this.game.state.start("Menu");
};

