Indicators = function () {
 this.gProject = game.add.group();
 this.gProject.add(createButton(-6, 160, 'button_project_select', null, this, 0, 0, 0));
 this.gProject.add(createText(2, 168, 'NEW PROJECT AVAILABLE', 14));
 this.gProject.visible = false;
 
 this.gDev = game.add.group();
 this.gDev.add(createButton(-6, 200, 'button_project_select', null, this, 0, 0, 0));
 this.gDev.add(createText(2, 208, 'NEW DEV AVAILABLE', 14));
 this.gDev.visible = false;
 
 this.gDevLvl = game.add.group();
 this.gDevLvl.add(createButton(-6, 240, 'button_project_select', null, this, 0, 0, 0));
 this.devLvlText = this.gDevLvl.add(createText(2, 248, 'X LEVELED UP', 14));
 this.gDevLvl.visible = false;
}

Indicators.prototype.newProject = function() {
 this.gProject.visible = true;
 game.time.events.add(4000, function() { this.gProject.visible = false; }, this); 
}

Indicators.prototype.newDev = function() {
 this.gDev.visible = true;
 game.time.events.add(4000, function() { this.gDev.visible = false; }, this); 
}

Indicators.prototype.devLvlUp = function(name) {
 this.devLvlText.setText(name + ' LEVELED UP');
 this.gDevLvl.visible = true;
 game.time.events.add(4000, function() {  this.gDevLvl.visible = false; }, this); 
}
