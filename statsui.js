var Stats = function() {
 createButton(5, 6, 'button_stats', function() { statsMenu.update(); windowOverlaySwitch(3); }, this, 1, 1, 0);
 this.moneyText = createText(12, 15, '', 16);
 this.moneyText.align = 'right';
 this.reputationText = createText(12, 55, '', 16);
 this.reputationText.align = 'right';
 this.monthText = createText(12, 95, '', 16);
 this.monthText.align = 'right';
 
 this.month = 0;
 this.expences = 12;
 this.money = 400;
 this.reputation = 50;
 this.reputationStanding = 1;
 this.rent = 8;
 this.salaries = 0;
 this.supplies = 4;
 this.incDay();

 this.timer = createTimer(false);
 this.timer.loop(30000, this.incDay, this);
 this.timer.start();
}

Stats.prototype.incDay = function() {
 this.expences = this.rent + this.salaries + this.supplies;
 this.monthText.setText('MONTH:       \n'+(++this.month));
 this.money -= this.expences;
 this.moneyText.setText('MONEY:       \n$'+ this.money);
 this.reputation += this.reputationStanding;
 this.reputationText.setText('REPUTATION:   \n'+ this.reputation +'*');
}

var BottomUI = function() {
 createButton(5, 517, 'button_bottom_ui', function() { windowOverlaySwitch(0); }, this, 1, 1, 0);
 createText(12, 525, 'MANAGEMENT', 16); 
 
 createButton(193, 517, 'button_bottom_ui', function() { windowOverlaySwitch(1);}, this, 1, 1, 0);
 createText(200, 525, 'UPGRADES', 16); 
 
 createButton(381, 517, 'button_bottom_ui', function() { windowOverlaySwitch(2);}, this, 1, 1, 0);
 createText(388, 525, 'SAVE&LOAD', 16); 
 
 createButton(571, 517, 'button_bottom_ui', function() {}, this, 1, 1, 0);
 createText(580, 525, 'MENU', 16);

 new OverlayMenu();
}

var overlayGroups = [];

function windowOverlaySwitch(i) {
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
