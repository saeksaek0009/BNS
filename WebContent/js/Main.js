window.onload = function() {
	// Create your Phaser game and inject it into an auto-created canvas.
	// We did it in a window.onload event, but you can do it anywhere (requireJS
	// load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game(1000,600, Phaser.AUTO);

	// Add the States your game has.
	game.state.add("Boot", Boot);
	game.state.add("Menu", Menu);
	game.state.add("Preload", Preload);
	game.state.add("Level",Level);
	game.state.add("Story", Story);
	game.state.add("Level2",Level2);
	game.state.add("Level3",Level3);
	game.state.add("Menu2", Menu2);


	// Now start the Boot state.
	game.state.start("Boot");
};
