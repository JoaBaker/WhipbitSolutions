var Stats = function() {
 var button = game.add.button(5, 6, 'button_stats', function() {}, this, 1, 1, 0);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 this.moneyText = game.add.bitmapText(12, 15, 'visitor2', 'MONEY:        \n7000$', 16);
 this.moneyText.align = 'right';
 this.reputationText = game.add.bitmapText(12, 55, 'visitor2', 'REPUTATION:   \n40*', 16);
 this.reputationText.align = 'right';
 this.dayText = game.add.bitmapText(12, 95, 'visitor2', '', 16);
 this.dayText.align = 'right';
 
 this.day = 0;
 this.incDay();

 this.timer = createTimer(false);
 this.timer.loop(10000, this.incDay, this);
 this.timer.start();
}

Stats.prototype.incDay = function() {
 this.dayText.setText('DAY:          \n'+(++this.day));
}

var BottomUI = function() {
 var button = game.add.button(5, 517, 'button_bottom_ui', function() { windowOverlaySwitch(0); }, this, 1, 1, 0);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 game.add.bitmapText(12, 525, 'visitor2', 'MANAGEMENT', 16); 
 
 var button = game.add.button(193, 517, 'button_bottom_ui', function() { windowOverlay(1);}, this, 1, 1, 0);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 game.add.bitmapText(200, 525, 'visitor2', 'UPGRADES', 16); 
 
 var button = game.add.button(381, 517, 'button_bottom_ui', function() {}, this, 1, 1, 0);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 game.add.bitmapText(388, 525, 'visitor2', 'SAVE&LOAD', 16); 
 
 var button = game.add.button(571, 517, 'button_bottom_ui', function() {}, this, 1, 1, 0);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 game.add.bitmapText(576, 525, 'visitor2', 'MENU', 16);

 initOverlays();
}

function initOverlays() {
 var g = game.add.group(); 
 g.add(game.add.bitmapText(12, 225, 'visitor2', 'ASDFASFD', 16)); 
 overlayGroups.push(g);
}

var overlayGroups = [];

function windowOverlaySwitch(i) {
 console.log('focken works');
 windowOverlay.visible = !windowOverlay.visible;
 for(var j = 0; j < overlayGroups.length; j++)
  overlayGroups[j].visible = windowOverlay.visible && (i==j)?true:false;
 
 if(windowOverlay.visible) {
  pause(true)
  game.world.bringToTop(windowOverlay);
  game.world.bringToTop(overlayGroups[i]);
 } else 
  pause(false);
}
