var game = new Phaser.Game(768, 512, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
 game.load.image('level_1', 'assets/level_1.png');
 game.load.image('developer_1', 'assets/developer_1.png');
 game.load.spritesheet('button_whip', 'assets/button_whip.png', 20, 7);
 game.load.spritesheet('button_project', 'assets/button_project.png', 64, 16);
 game.load.bitmapFont('visitor2','assets/fonts/visitor2.png', 'assets/fonts/visitor2.fnt');
}

var level = 0;
var background;
var project;

function create() {
 game.stage.setBackgroundColor(0x8d8d9d); 
 background = game.add.sprite(0, 0, 'level_1');
 background.smoothed = false;
 background.scale.setTo(4, 4);

 project = new Project(15, 5, "PROJECT-1");
 var developer_1 = new Developer(230, 258);
 new Project(15, 5, "PROJECT-1");
 new Project(55, 5, "STUFFF");
 new Project(20, 6, "ABCDEFGHIJKLMNO");
}

var delta = 1.0;
var updatable = [];
var toRemove = [];
function update() {
 delta = game.time.elapsed /17;
 for(var i = 0; i < updatable.length; i++) {
  updatable[i].update(delta);
 }
 for(var i = 0; i < toRemove.length; i++)
  updatable.splice(toRemove[i], 1);
 toRemove = [];
}

