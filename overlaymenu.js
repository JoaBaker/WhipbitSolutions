var OverlayMenu = function() { 
 managementMenu = new ManagementMenu();
 overlayGroups.push(managementMenu.g);
 
 upgradesMenu = new UpgradesMenu();
 overlayGroups.push(upgradesMenu.g);
 
 saveLoadMenu = new SaveLoadMenu();
 overlayGroups.push(saveLoadMenu.g);
 
 statsMenu = new StatsMenu();
 overlayGroups.push(statsMenu.g);
}

var managementMenu, upgradesMenu, saveLoadMenu, statsMenu;

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

var SaveLoadMenu = function() {
 this.g = game.add.group(); 
 this.g.add(createText(105, 110, 'SAVE&LOAD', 16)); 
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
 
 this.g.add(createButton(588, 437, 'button_whip', function() { windowOverlaySwitch(3); }, this, 1, 1, 0));
 this.g.add(createText(597, 444, 'BACK', 16));
 this.g.visible = false;
}

StatsMenu.prototype.update = function() {
 stats.expences = stats.salaries + stats.rent + stats.supplies;
 this.moneyText.setText('MONEY: $' + stats.money);
 this.incomeText.setText('EXPENCES: $' + stats.expences + '/month');
 this.rentText.setText('RENT: $' + stats.rent);
 this.salariesText.setText('SALARIES: $' + stats.salaries);
 this.suppliesText.setText('SUPPLIES: $' + stats.supplies);
 
 this.reputationText.setText('REPUTATION: ' + stats.reputation + '*');
 this.standingText.setText('STANDING: ' + stats.reputationStanding + '*/day');
}
