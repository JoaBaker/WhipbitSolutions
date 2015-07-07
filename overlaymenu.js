var OverlayMenu = function() { 
 managementMenu = new ManagementMenu();
 overlayGroups.push(managementMenu.g);
 
 upgradesMenu = new UpgradesMenu();
 overlayGroups.push(upgradesMenu.g);
 
 saveLoadMenu = new SaveLoadMenu();
 overlayGroups.push(saveLoadMenu.g);
}

var managementMenu, upgradesMenu, saveLoadMenu;

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
