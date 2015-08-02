Game = function() { };

Game.prototype = {
 preload : function() {
  game.load.image('ui_background', 'assets/ui_background.png');
  game.load.image('level_1', 'assets/level_1.png');
  game.load.image('developer_1', 'assets/developer_1.png');
  game.load.image('window_background', 'assets/window_background.png');
  game.load.image('window_alert_background', 'assets/window_alert_background.png');
  game.load.spritesheet('button_whip', 'assets/button_whip.png', 20, 7);
  game.load.spritesheet('button_cancel', 'assets/button_cancel.png', 30, 7);
  game.load.spritesheet('button_project', 'assets/button_project.png', 64, 16);
  game.load.spritesheet('button_bottom_ui', 'assets/button_bottom_ui.png', 45, 8);
  game.load.spritesheet('button_stats', 'assets/button_stats.png', 59, 33);
  game.load.bitmapFont('visitor2','assets/fonts/visitor2.png', 'assets/fonts/visitor2.fnt');
 },

 create : function() {
  createSprite(0, 0, 'ui_background');
  background = createSprite(0, 148, 'level_1');
  stats = new Stats();
  newProject = new NewProject();
  new BottomUI();
  projects.push(null);
  projects.push(null);
  projects.push(null);
  projects.push(null);

  developers.push(new Developer(230, 258));
  new Project(15, 5, "PROJECT-8", 'ASDFASDFASDFASDF', 500, 3);
  developers[0].curProject = projects[0];  
  
  newProject.replace(1);
  newProject.replace(2);
  newProject.replace(3);
 }
}
var stats, newProject;
var windowOverlay;
var developers = [], projects = [];
var background;

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
