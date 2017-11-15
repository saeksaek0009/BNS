/**
 * Level state.
 */
function Level() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level.prototype = proto;

Level.prototype.create = function() {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;
	//this.addMonkey();
	//this.moveMonkey();

	
	
	this.bg = this.game.add.sprite(0, 0, "BG");
	 this.bg.fixedToCamera = true;
	 this.bg.width = this.game.width;
	 this.bg.height = this.game.height;
	 
	 this.map = this.game.add.tilemap("lab7");
	 this.map.addTilesetImage('tile_set1');
	 this.maplayer = this.map.createLayer("Tile Layer 1");
	 this.maplayer = this.map.createLayer("Tile Layer 2");
	 
	 
	 //แสดงสไปรท์
	 for (x in this.map.objects.Object) {
			var obj = this.map.objects.Object[x];
			if (obj.type == "player") {
				console.log(this.player);
				this.player = this.addPlayer(obj.x, obj.y);
				this.game.camera.follow(this.player,
						Phaser.Camera.FOLLOW_PLATFORMER);
				this.player.play("walk");
			} else if (obj.type == "enemy1") {
				var c = this.addCat(obj.x, obj.y);
				this.enemies.add(c);
			} 
	 }
};

Level.prototype.addPlayer = function(x, y) {
	p = this.add.sprite(x, y, "player");
	p.animations.add("idle", gframes("idle", 15), 12, true);
	p.animations.add("fight", gframes("fight", 15), 12, true);
	p.animations.add("jump", gframes("jump", 15), 12, true);
	p.animations.add("walk", gframes("walk", 15), 12, true);

	p.anchor.set(0, 1);
	p.smoothed = false;
	this.game.physics.arcade.enable(p);
	p.play("idle");
	p.body.collideWorldBounds = false;
	p.body.drag.setTo(500, 0);
	p.body.setSize(20,60,5,0);
	return p;

};
function gframes(key, n) {
	var f = [];
	for (var i = 0; i <= n; i++) {
		var kf = key + "_" + (("00" + i).slice(-3));
		f.push(kf);
	}
	return f;
}




/*Level.prototype.addMonkey = function() {
	// add monkey
	this.monkey = this.add.sprite(this.world.centerX, this.world.height - 250,
			"player");
	this.monkey.anchor.set(0.5, 0.5);

	// listen for a monkey click
	this.monkey.inputEnabled = true;
	this.monkey.events.onInputDown.add(this.hitMonkey, this);
};

Level.prototype.moveMonkey = function() {
	// tween monkey like a yoyo
	var twn = this.add.tween(this.monkey);
	twn.to({
		y : 200
	}, 100, "Quad.easeInOut", true, 0, Number.MAX_VALUE, true);

	// rotate monkey
	twn = this.add.tween(this.monkey);
	twn.to({
		angle : 360
	}, 2000, "Linear", true, 0, Number.MAX_VALUE);
};

Level.prototype.hitMonkey = function() {
	// stop all monkey's movements
	this.tweens.removeAll();

	// rotate monkey
	var twn = this.add.tween(this.monkey);
	twn.to({
		angle : this.monkey.angle + 360
	}, 1000, "Linear", true);

	// scale monkey
	twn = this.add.tween(this.monkey.scale);
	twn.to({
		x : 0.1,
		y : 0.1
	}, 1000, "Linear", true);

	// when tween completes, quit the game
	twn.onComplete.addOnce(this.quitGame, this);
};*/

Level.prototype.quitGame = function() {
	this.game.state.start("Menu");
};