Game = function() {

};

Game.prototype = {
 preload : function() {
  game.load.image('level_1', 'assets/level_1.png');
  game.load.image('developer_1', 'assets/developer_1.png');
  game.load.spritesheet('button_whip', 'assets/button_whip.png', 20, 7);
  game.load.spritesheet('button_project', 'assets/button_project.png', 64, 16);
  game.load.spritesheet('button_bottom_ui', 'assets/button_bottom_ui.png', 45, 8);
  game.load.spritesheet('button_stats', 'assets/button_stats.png', 59, 33);
  game.load.bitmapFont('visitor2','assets/fonts/visitor2.png', 'assets/fonts/visitor2.fnt');
 },

 create : function() {
  this.background = game.add.sprite(0, 0, 'level_1');
  this.background.smoothed = false;
  this.background.scale.setTo(4, 4);

  new Developer(230, 258);
  new Project(15, 5, "PROJECT-1");
  new Project(55, 5, "STUFFF");
  new Project(20, 6, "ABCDEFGHIJKLMNO");

  this.stats = new Stats();
  new BottomUI();
  gameCreate();
 },

 update : function() {
  for(var i = 0; i < updatable.length; i++) {
   updatable[i].update();
  }
  for(var i = 0; i < toRemove.length; i++)
   updatable.splice(toRemove[i], 1);
  toRemove = [];
 }
}

var project;
var updatable = [];
var toRemove = [];
function gameCreate() {
  project = new Project(15, 5, "PROJECT-8");
}
