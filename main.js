var game = new Phaser.Game(768, 552, Phaser.AUTO, '');
game.state.add('game', Game);

game.state.start('game');
