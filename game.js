Game = function() { };

Game.prototype = {
 preload : function() {
  game.load.json('all_projects', 'assets/all_projects.json');
  game.load.json('all_developers', 'assets/all_developers.json');
  game.load.image('ui_background', 'assets/ui_background.png');
  game.load.image('level_1', 'assets/level_1.png');
  game.load.image('window_background', 'assets/window_background.png');
  game.load.image('window_alert_background', 'assets/window_alert_background.png');
  game.load.image('placeholder_table', 'assets/placeholder_table.png');
  game.load.spritesheet('developers', 'assets/developers.png', 32, 48);
  game.load.spritesheet('button_whip', 'assets/button_whip.png', 20, 7);
  game.load.spritesheet('button_cancel', 'assets/button_cancel.png', 30, 7);
  game.load.spritesheet('button_cancel_long', 'assets/button_cancel_long.png', 40, 7);
  game.load.spritesheet('button_project', 'assets/button_project.png', 64, 16);
  game.load.spritesheet('button_project_select', 'assets/button_project_select.png', 69, 7);
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
  indicators = new Indicators();
  new BottomUI();
  hireDev = new HireDev();
  hireDev.randomHire(false);
  
  projects.push(null);
  projects.push(null);
  projects.push(null);
  projects.push(null);

  new Developer(0);
  
  newProject = new NewProject();
  
  newProject.replace(0);
  newProject.replace(1);
  newProject.replace(2);
  newProject.replace(3);
  
  newProject.unlockRandom(1, false);
  newProject.unlockRandom(0.5, false);
 
  var timer = createTimer(false);
  timer.loop(10000, function() { newProject.unlockRandom(0.25, true); }, this);
  timer.start(); 
  
  managementMenu.update();
 }
}
var stats, newProject, studio, indicators;
var windowOverlay;
var developers = [], projects = [];
var background;
var allDevelopers, availableDevelopers = [];

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
