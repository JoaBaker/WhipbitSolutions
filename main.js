var game = new Phaser.Game(768, 512, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
 game.load.image('point_black', 'assets/point_black.png');
 game.load.image('level_1', 'assets/level_1.png');
 game.load.image('developer_1', 'assets/developer_1.png');
 game.load.spritesheet('button_whip', 'assets/button_whip.png', 16, 6);
 game.load.bitmapFont('visitor2','assets/fonts/visitor2.png', 'assets/fonts/visitor2.fnt');
}

var background;
var project;

function create() {
 game.stage.setBackgroundColor(0x8d8d9d); 
 background = game.add.sprite(0, 0, 'level_1');
 background.smoothed = false;
 background.scale.setTo(6, 6);

 project = new Project(5);
 var developer_1 = new Developer(315, 171);
 var point = new FPoint(315, 171, project);
}

var delta = 1.0;
var updatable = [];
function update() {
 delta = game.time.elapsed /17;
 for(var i = 0; i < updatable.length; i++) {
  updatable[i].update(delta);
 }
}

