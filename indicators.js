Indicators = function () {
 this.gProject = game.add.group();
 this.gProject.add(createButton(-6, 160, 'button_project_select', null, this, 0, 0, 0));
 this.gProject.add(createText(2, 168, 'NEW PROJECT AVAILABLE', 14));
 this.gProject.visible = false;
 
 this.gDev = game.add.group();
 this.gDev.add(createButton(-6, 200, 'button_project_select', null, this, 0, 0, 0));
 this.gDev.add(createText(2, 208, 'NEW DEV AVAILABLE', 14));
 this.gDev.visible = false;
}

Indicators.prototype.newProject = function() {
 this.gProject.visible = true;
 game.time.events.add(4000, function() { this.gProject.visible = false; }, this); 
}

Indicators.prototype.newDev = function() {
 this.gDev.visible = true;
 game.time.events.add(4000, function() { this.gDev.visible = false; }, this); 
}
