/**
 * Level3 state.
 */
function Level3() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level3.prototype = proto;

Level3.prototype.create = function() {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;

	this.bg = this.game.add.sprite(0, 0, "BG3"); // BG(Map1),BG2(Map2),BG3(Map3)
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;

	/*
	  this.map = this.game.add.tilemap("lab73");
	  this.map.addTilesetImage('tile_set3'); this.maplayer =
	  this.map.createLayer("Tile Layer 1");
	 */

	// map2
	/*this.map = this.game.add.tilemap("lab7");
	this.map.addTilesetImage('tile_set1');
	this.maplayer = this.map.createLayer("Tile Layer 1"); */
	
	// map1
	this.map = this.game.add.tilemap("lab73");
	this.map.addTilesetImage('tile_set3');
	this.maplayer = this.map.createLayer("Tile Layer 1");
	this.scoretext=this.add.text(this.game.camera.width/1.1,0,'Coin :'+this.game.score,{font:'50px arial;',fill:'red'});
	this.scoretext.fixedToCamera = true;
	this.scoretext1=this.add.text(this.game.camera.hight/1.1,0,'Score :'+this.game.score,{font:'50px arial;',fill:'blue'});
	this.scoretext1.fixedToCamera = true;

	this.maplayer.resizeWorld();
	this.map.setCollisionBetween(0, 76, true, this.maplayer);
	// แสดง sprite
	this.enemies = this.add.group();
	this.goal = this.add.group();
	this.wizard = this.add.group();
	this.witch = this.add.group();
	this.coin = this.add.group();
	for (x in this.map.objects.object) {
		var obj = this.map.objects.object[x];
		if (obj.type == "player") {
			console.log(this.player);
			this.player = this.addPlayer(obj.x, obj.y);
			this.game.camera.follow(this.player,
					Phaser.Camera.FOLLOW_PLATFORMER);
			this.player.play("idle");
		} else if (obj.type == "enemy1") {
			var d = this.addDevil(obj.x, obj.y);
			this.enemies.add(d);
		} else if (obj.type == "enemy2") {
			var w = this.addWizard(obj.x, obj.y);
			this.wizard.add(w);
		} else if (obj.type == "enemy3") {
			var m = this.addWitch(obj.x, obj.y);
			this.witch.add(m);
		} else if (obj.type == "goal") {
			var g = this.addGoal(obj.x, obj.y);
			this.goal.add(g);
		}else if (obj.type == "coin") {
			var c = this.addCoin(obj.x, obj.y);
			this.coin.add(c);
			}
	}
	this.hpW = [];
	this.witch.hpW = 40;
	
	for(var i=0;i<this.witch.hpW;i++){
		this.hpW[i] = this.add.sprite(this.world.width-20-(3+32)*i,20,"boniatillo");
		this.hpW[i].fixedToCamera = true;
		this.hpW[i].anchor.set(0.5);
		this.hpW[i].animations.add("all").play(12,true);
	}
	
	this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
	this.createWeapon();
	this.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT,Phaser.Keyboard.RIGHT,Phaser.Keyboard.SPACEBAR, 
	                                   Phaser.Keyboard.DOWN]);
	this.player.inputEnable = true;
	this.player.events.onInputDown.add(this.fireWeapon, this);
};

Level3.prototype.addPlayer = function(x, y) {
	p = this.add.sprite(x, y, "player");
	p.animations.add("idle", gframes("idle", 15), 12, true);
	p.animations.add("fight", gframes("fight", 15), 20, true);
	p.animations.add("jump", gframes("jump", 15), 12, true);
	p.animations.add("walk", gframes("walk", 15), 12, true);
	p.scale.x = -1;
	p.anchor.set(0.6, 1);

	p.smoothed = false;
	this.game.physics.arcade.enable(p);
	p.play("idle");
	p.body.collideWorldBounds = true;
	p.body.drag.setTo(500, 0);
	p.body.setSize(20, 160, 60, -7);
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
function mframe(key, n) {
	f = [];
	for (var i = 1; i < n; i++) {
		f.push(key + " (" + i + ")");
	}
	return f;
}

Level3.prototype.hitEnemy = function(p, x) {
	this.game.state.start("Level3");
}
Level3.prototype.hitGoal = function(p, x) {
	this.game.state.start("Story2");
}
Level3.prototype.hitCoin = function(p, x) {
	x.kill();
	
	coinS = this.add.audio("nenadsimic",0.5,false);
	coinS.play();
	
	 this.game.score++;
	 this.scoretext.text = 'coin :'+this.game.score;
	 return true;
	
	// stop all monkey's movements
	//this.tweens.remove();

	// rotate monkey
	//var twn = this.add.tween(this.coin);
	//twn.to({
		//angle : this.coin.angle + 360
	//}, 1000, "Linear", true);

	// scale monkey
	//twn = this.add.tween(this.coin.scale);
	//twn.to({
	//	x : 0.1,
	//	y : 0.1
	//}, 1000, "Linear", true);

	// when tween completes, quit the game



}

Level3.prototype.addDevil = function(x, y) {
	d = this.add.sprite(x, y, "devil");
	d.animations.add("idle", gframes("Idle", 10), 12, true);
	d.play("idle");
	d.anchor.set(0, 0.9);
	this.game.physics.enable(d);
	d.body.collideWorldBounds = true;
	d.body.setSize(20, 120, 100, 0);
	return d;
};

Level3.prototype.addWitch = function(x, y) {
	m = this.add.sprite(x, y, "witch");
	m.animations.add("idle", gframes("idle", 12), 12, true);
	m.animations.add("fight", gframes("fight", 16), 12, true);
	m.play("fight");
	m.anchor.set(0, 0);
	m.scale.set(2);
	this.game.physics.enable(m);
	m.body.collideWorldBounds = true;
	m.body.setSize(0, 165, 0, 95);
	return m;
};

Level3.prototype.addWizard = function(x, y) {
	w = this.add.sprite(x, y, "wizard");
	w.animations.add("idle", gframes("Idle", 12), 12, true);
	w.animations.add("fight", gframes("fight", 12), 12, true);
	w.play("idle");
	w.anchor.set(0, 0.9);
	w.scale.set(1.5);
	this.game.physics.enable(w);
	w.body.collideWorldBounds = true;
	w.body.setSize(20, 120, 100, 0);
	return w;
};

Level3.prototype.addGoal = function(x, y) {
	g = this.add.sprite(x, y, "cicken");
	g.animations.add("walk", mframe("ck", 10), 12, true);
	g.play("idle");
	g.anchor.set(0, 0.9);
	g.scale.set(1.5);
	this.game.physics.enable(g);
	g.body.collideWorldBounds = true;
	return g;
};

Level3.prototype.addCoin = function(x, y) {
	c = this.add.sprite(x, y, "coin");
	c.animations.add("coin", gframes("coin", 12), 12, true);
	c.anchor.set(0, 2);
	c.scale.set(0.5);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	c.play("coin");
	return c;
};

Level3.prototype.createWeapon = function() {
	this.weapon = this.add.weapon(1, "moonlight");
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.trackSprite(this.play,50, -100);
	this.weapon.bulletSpeed= 2000;
	this.weapon.fireAngle = -7;
	this.weapon.rate = 0;
};

Level3.prototype.fireWeapon = function() {
	this.weapon.fire();
};

Level3.prototype.BossonCollidebullet = function(witch,bullet){
	bullet.kill();
	this.witch.hpW--;
	witch.alpha = 0.1;
	var wi = this.add.tween(witch);
	wi.to({alpha:1},200, "Linear",true,0,5);
	wi.onComplete.addOnce(function(){this.alpha=1;this},witch);
	
	var wi2 = this.add.tween(witch);
	wi2.to({
		x : 0
	}, 5000, "Quad.easeInOut", true, 0, Number.MAX_VALUE, true);
	

if(this.witch.hpW<=0){
	witch.kill();
	exp = this.add.sprite(witch.x, witch.y,"boom");
	exp.anchor.set(0.0,0.3);
	exp.scale.set(3);
	exp.animations.add("all",null,15,false).play().killOnComplete=true;
	
	blaster = this.add.audio("Explosion",0.5,false);
	blaster.play();
	}
/*Boss.kill();
bullet.kill();
this.game.score++;
this.scoreText.text = ''+this.game.score;
exp = this.add.sprite(Boss.x, Boss.y, "boom");
 exp.anchor.set(0.5);
 exp.animations.add("all",null,12,false).play().killOnComplete=true;
 this.boom.play();*/
};



Level3.prototype.update = function() {

	this.game.physics.enable(this.player,Phaser.Physics.ARCADE);
	this.game.physics.arcade.collide(this.player,Phaser.Physics.ARCADE);
	this.game.physics.arcade.collide(this.player, this.maplayer);
	this.game.physics.arcade.collide(this.goal, this.maplayer);
	this.game.physics.arcade.collide(this.coin, this.maplayer);
	this.game.physics.arcade.collide(this.wizard, this.maplayer);
	this.game.physics.arcade.collide(this.witch, this.maplayer);
	this.game.physics.arcade.collide(this.enemies, this.maplayer);
	this.physics.arcade.collide(this.witch,this.weapon.bullets,this.BossonCollidebullet,null,this);
	this.game.physics.arcade.collide(this.player, this.enemies, this.hitEnemy,
			null, this);
	this.game.physics.arcade.collide(this.player, this.weapon.bullets, this.hitEnemy,
			null, this);
	this.game.physics.arcade.collide(this.weapon.bullets, this.enemies, this.onCollide,
			null, this);
	this.game.physics.arcade.collide(this.weapon.bullets, this.witch, this.onCollide,
			null, this);
	this.game.physics.arcade.collide(this.player, this.goal, this.hitGoal,
		null, this);
	this.game.physics.arcade.collide(this.player, this.coin, this.hitCoin,
			null, this);
	this.game.physics.arcade.collide(this.player, this.wizard, this.hitEnemy,
			null, this);
	this.game.physics.arcade.collide(this.player, this.witch, this.hitEnemy,
			null, this);
	
	if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		this.player.body.velocity.x = -200;
		this.player.scale.x = 1;
		this.player.play("walk");
		this.weapon.trackSprite(this.player, 200, -20);
		this.weapon.fireAngle = 180;
	} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.player.body.velocity.x = 250;
		this.player.scale.x = -1;
		this.player.play("walk");
		this.weapon.trackSprite(this.player, -200, -20);
		this.weapon.fireAngle = -7;
	} else if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		this.fireWeapon();
		this.player.play("fight");
	}

	if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		this.player.play("jump");
		if (this.player.body.velocity.y == 0)
			this.player.body.velocity.y = -750;

	} else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		// this.player.body.acceleration.y = 120;
	} else {
		// this.player.body.velocity.setTo(0, 0);
		// this.player.body.acceleration.setTo(0, 0);
		if (this.player.body.velocity.x == 0)
			this.player.play("idle");
	}
	
}

Level3.prototype.onCollide = function(p, x) {
	x.kill();
	p.kill();
	exp = this.add.sprite(x.x, x.y,"bomp");
	exp.anchor.set(0.0,0.85);
	exp.scale.set(2);
	exp.animations.add("all",null,40,false).play().killOnComplete=true;
	this.game.score++;
	this.scoretext1.text = 'Score :'+this.game.score;
	
	blaster = this.add.audio("Explosion",0.5,false);
	blaster.play();
	
	return true;
};

Level3.prototype.quitGame = function() {
	this.game.state.start("Menu");
};