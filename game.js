Game = function() { };

Game.prototype = {
 preload : function() {
  game.load.image('level_1', 'assets/level_1.png');
  game.load.image('developer_1', 'assets/developer_1.png');
  game.load.image('window_background', 'assets/window_background.png');
  game.load.spritesheet('button_whip', 'assets/button_whip.png', 20, 7);
  game.load.spritesheet('button_project', 'assets/button_project.png', 64, 16);
  game.load.spritesheet('button_bottom_ui', 'assets/button_bottom_ui.png', 45, 8);
  game.load.spritesheet('button_stats', 'assets/button_stats.png', 59, 33);
  game.load.bitmapFont('visitor2','assets/fonts/visitor2.png', 'assets/fonts/visitor2.fnt');
 },

 create : function() {
  this.background = createSprite(0, 0, 'level_1');

  developers.push(new Developer(230, 258));
  new Project(15, 5, "PROJECT-1");
  new Project(55, 5, "STUFFF");
  new Project(20, 6, "ABCDEFGHIJKLMNO");
  project = new Project(15, 5, "PROJECT-8");
  
  this.stats = new Stats();
  new BottomUI();
  var windowBackground = createSprite(0, 0, 'window_background');
  windowOverlay = game.add.group(); 
  windowOverlay.add(windowBackground);
  windowOverlay.visible = false;
 }
}
var project;
var windowOverlay;
var developers = [];

var timers = [];
function pause(b) {
 if(b) {
  for(var i = 0; i < timers.length; i++) {
   timers[i].pause();
  }
 } else {
  for(var i = 0; i < timers.length; i++) {
   timers[i].resume();
  }
 }
}

function createTimer(b) {
 var t = game.time.create(b);
 timers.push(t);
 return t;
}
