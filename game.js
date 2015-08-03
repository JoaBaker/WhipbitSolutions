Game = function() { };

Game.prototype = {
 preload : function() {
  game.load.json('all_projects', 'assets/all_projects.json');
  game.load.image('ui_background', 'assets/ui_background.png');
  game.load.image('level_1', 'assets/level_1.png');
  game.load.image('developer_1', 'assets/developer_1.png');
  game.load.image('window_background', 'assets/window_background.png');
  game.load.image('window_alert_background', 'assets/window_alert_background.png');
  game.load.spritesheet('button_whip', 'assets/button_whip.png', 20, 7);
  game.load.spritesheet('button_cancel', 'assets/button_cancel.png', 30, 7);
  game.load.spritesheet('button_cancel_long', 'assets/button_cancel_long.png', 40, 7);
  game.load.spritesheet('button_project', 'assets/button_project.png', 64, 16);
  game.load.spritesheet('button_project_select', 'assets/button_project_select.png', 75, 7);
  game.load.spritesheet('button_bottom_ui', 'assets/button_bottom_ui.png', 45, 8);
  game.load.spritesheet('button_stats', 'assets/button_stats.png', 59, 33);
  game.load.spritesheet('button_allow', 'assets/allow_spritesheet.png', 7, 7);
  game.load.bitmapFont('visitor2','assets/fonts/visitor2.png', 'assets/fonts/visitor2.fnt');
 },

 create : function() {
  createSprite(0, 0, 'ui_background');
  background = createSprite(0, 148, 'level_1');
  studio = new Studio();
  stats = new Stats();
  new BottomUI();

  projects.push(null);
  projects.push(null);
  projects.push(null);
  projects.push(null);

  new Developer(230, 258, 'ViliX', 0, ['JS', 'CSS', 'SQL', 'Website Design']);
  new Developer(430, 258, 'Tony', 200, ['Networking', 'Python']);
  
  newProject = new NewProject();
  
  newProject.replace(0);
  newProject.replace(1);
  newProject.replace(2);
  newProject.replace(3);
  
  newProject.unlockRandom(1);
  newProject.unlockRandom(0.5);
 
  var timer = createTimer(false);
  timer.loop(10000, function() { newProject.unlockRandom(0.1); }, this);
  timer.start(); 
  
  managementMenu.update();
 }
}
var stats, newProject, studio;
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
