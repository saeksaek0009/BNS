/**
 *
 */
function Story2 () {
   Phaser.State.call(this);
}
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Story2.prototype = proto;

Story2.prototype.preload = function() {
	this.load.pack("Story2", "assets/assets-pack.json");
};

Story2.prototype.create = function() {
	this.bg = this.game.add.sprite(0, 0, "final"); // BG(Map1),BG2(Map2),BG3(Map3)
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	this.input.onDown.add(this.startGame, this);
};
Story2.prototype.change = function(k) {
 	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,k);
    this.sprite.anchor.set(0.5, 0.5);
};


Story2.prototype.startGame = function() {
	this.game.state.start("Menu2");
};

