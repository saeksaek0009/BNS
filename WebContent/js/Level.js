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

	
	
	this.enemies = this.add.group();
	this.bg = this.game.add.sprite(0, 0, "BG");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	 
	 this.map = this.game.add.tilemap("lab72");
	 this.map.addTilesetImage('tile_set2');
	 this.maplayer = this.map.createLayer("Tile Layer 2");
	 this.maplayer = this.map.createLayer("Tile Layer 1");
	
	 this.maplayer.resizeWorld();
	 this.map.setCollisionBetween(0, 17, true, this.maplayer);
	// แสดง sprite
	 this.enemies = this.add.group();
	 for(x in this.map.objects.object){
		 var obj = this.map.objects.object[x];
		 if(obj.type == "player"){
		 console.log(this.player);
		 this.player = this.addPlayer(obj.x,obj.y);
		 this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
		 this.player.play("idle");
		 }
		}
};

Level.prototype.addPlayer = function(x, y) {
	p = this.add.sprite(x, y, "player");
	p.animations.add("idle", gframes("idle", 15), 12, true);
	p.animations.add("fight", gframes("fight", 15), 12, true);
	p.animations.add("jump", gframes("jump", 15), 12, true);
	p.animations.add("walk", gframes("walk", 15), 12, true);
    p.scale.x = -1;
	p.anchor.set(0.6,1);
	
	p.smoothed = false;
	this.game.physics.arcade.enable(p);
	p.play("idle");
	p.body.collideWorldBounds = true;
	p.body.drag.setTo(500, 0);
	p.body.setSize(20,150,80,0);
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
function mframe(key,n){
	f=[ ];
	for(var i=1;i<n;i++){
	f.push(key+" ("+i+")");
	}
	return f;
	}

Level.prototype.addDevil = function(x, y) {
	d = this.add.sprite(x, y, "devil");
	d.animations.add("idle", mframe("Idle",10),12,true);
	d.play("idle");
	d.anchor.set(0,0.9);
	return d;
	};
Level.prototype.addCicken = function(x, y) {
		c = this.add.sprite(x, y, "cicken");
		
		c.animations.add("walk", mframe("ck",10),12,true);
		c.play("idle");
		c.anchor.set(0,0.9); return c; };
Level.prototype.update = function() {
			this.game.physics.arcade.collide(this.player,this.maplayer);
			if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				this.player.body.velocity.x = -200;this.player.scale.x = 1;
				this.player.play("walk");
			} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				this.player.body.velocity.x = 250;this.player.scale.x = -1;
				this.player.play("walk");
			}  
			
			if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				this.player.play("jump");
				if(this.player.body.velocity.y==0)
				this.player.body.velocity.y = -800;
				
			} else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
				//this.player.body.acceleration.y = 120;
			} else {
				//this.player.body.velocity.setTo(0, 0);
				//this.player.body.acceleration.setTo(0, 0);
				if(this.player.body.velocity.x==0) this.player.play("idle");
			}
			}

Level.prototype.quitGame = function() {
	this.game.state.start("Menu");
};