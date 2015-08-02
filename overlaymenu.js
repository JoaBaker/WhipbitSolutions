var overlayGroups = [];

function windowOverlaySwitch(i) {
 windowOverlay.visible = !windowOverlay.visible;
 for(var k in overlayGroups) {
  overlayGroups[k].visible = windowOverlay.visible && (i==k)?true:false;
 }

 if(windowOverlay.visible) {
  pause(true)
  game.world.bringToTop(windowOverlay);
  game.world.bringToTop(overlayGroups[i]);
 } else 
  pause(false);
}


var OverlayMenu = function() { 
 // creates big gray box for ui stuff
 windowOverlay = game.add.group(); 
 windowOverlay.add(createButton(652, -4, 'button_cancel', function() { windowOverlaySwitch(-1); }, this, 1, 1, 0));
 windowOverlay.add(createText(662, 3, 'PAUSED', 16));
 windowOverlay.add(createButton(0, 0, 'window_background', function() {}, this, 0, 0, 0));
 windowOverlay.add(createButton(588, 437, 'button_whip', function() { windowOverlaySwitch(-1); }, this, 1, 1, 0));
 windowOverlay.add(createText(597, 444, 'BACK', 16));
 windowOverlay.visible = false;
 
 
 managementMenu = new ManagementMenu();
 overlayGroups['management'] = managementMenu.g;
 
 upgradesMenu = new UpgradesMenu();
 overlayGroups['upgrades'] = upgradesMenu.g;
 
 statsMenu = new StatsMenu();
 overlayGroups['stats'] = statsMenu.g;
}

var managementMenu, upgradesMenu, statsMenu;

var ManagementMenu = function() {
 this.g = game.add.group(); 
 this.g.add(createText(105, 110, 'MANAGEMENT', 16)); 
 this.g.visible = false;
}

var UpgradesMenu = function() {
 this.g = game.add.group(); 
 this.g.add(createText(105, 110, 'UPGRADES', 16)); 
 this.g.visible = false;
}

var StatsMenu = function() {
 this.g = game.add.group(); 
 this.moneyText = createText(105, 110, '', 16);
 this.g.add(this.moneyText); 
 this.incomeText = createText(105, 150, '', 16);
 this.g.add(this.incomeText); 
 this.rentText = createText(155, 190, '', 16);
 this.g.add(this.rentText); 
 this.salariesText = createText(155, 230, '', 16);
 this.g.add(this.salariesText); 
 this.suppliesText = createText(155, 270, '', 16);
 this.g.add(this.suppliesText); 
 
 this.reputationText = createText(105, 320, '', 16);
 this.g.add(this.reputationText); 
 this.standingText = createText(105, 360, '', 16);
 this.g.add(this.standingText); 
}

StatsMenu.prototype.update = function() {
 stats.expences = stats.salaries + stats.rent + stats.supplies;
 this.moneyText.setText('MONEY: $' + stats.money);
 this.incomeText.setText('EXPENCES: $' + stats.expences + '/month');
 this.rentText.setText('RENT: $' + stats.rent);
 this.salariesText.setText('SALARIES: $' + stats.salaries);
 this.suppliesText.setText('SUPPLIES: $' + stats.supplies);
 
 this.reputationText.setText('REPUTATION: ' + stats.reputation + '*');
 this.standingText.setText('STANDING: ' + stats.reputationStanding + '*/month');
}
