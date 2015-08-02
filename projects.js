var posX = [253, 513, 253, 513];
var posY = [5, 5, 73, 73];

var Project = function (width, height, name, description, rewardMoney, rewardReputationStanding, projectAssigment) {
 this.rewardMoney = rewardMoney;
 this.rewardReputationStanding = rewardReputationStanding;
 this.description = description;
 this.name = name;
 this.projectAssigment = projectAssigment;

 var place = 0;
 for(; place < projects.length; place++)
  if(projects[place] == null) break; 
 projects[place] = this;
 this.place = place;

 // group for overlay
 this.g = game.add.group(); 
 this.g.add(createText(105, 110, name, 16)); 
 this.progressText = this.g.add(createText(105, 150, 'PROGRESS: 0%', 16)); 
 this.g.add(createText(105, 190, 'REWARD: $' + rewardMoney, 16)); 
 this.g.add(createText(105, 230, 'START DATE (MONTH): ' + stats.month, 16)); 
 this.g.add(createText(105, 270, 'PUBLICITY: ' + this.rewardReputationStanding + '*', 16)); 
 this.g.add(createText(105, 305, description, 16)); 
 this.g.add(createButton(105, 437, 'button_whip', function() { this.gShip.visible = true; }, this, 1, 1, 0));
 this.g.add(createText(113, 444, 'SHIP', 16)); 
 this.g.add(createButton(195, 437, 'button_cancel', function() { this.gCancel.visible = true;}, this, 1, 1, 0));
 this.g.add(createText(208, 444, 'CANCEL', 16)); 
 this.g.visible = false;
 overlayGroups[name+description] = this.g; 
 
 // group for shipping unfinished project:
 this.gShip = game.add.group(); 
 this.gShip.add(createButton(0, 0, 'window_alert_background', function() {}, 0, 0, 0));
 this.gShip.add(createText(170,240,'DO YOU REALLY WANT TO SHIP\n  AN UNFINISHED PROJECT?\n   (REPUTATION PENALTY)\n     (SOME MONEY GAIN)', 16)); 
 this.gShip.add(createButton(272, 337, 'button_whip', function() {
  this.done = true;
  windowOverlaySwitch(-1);
  stats.money += Math.ceil(this.rewardMoney * this.assigned/(this.capacity*1.2)) * (Math.floor(Math.random() * 3) + 1);
  stats.reputationStanding -= Math.abs(this.rewardReputationStanding * (Math.floor(Math.random() * 3) + 1));
  stats.update();
  this.all.destroy(true);
  this.g.visible = false;
  this.removeFromLists();
 }, this, 1, 1, 0));
 this.gShip.add(createText(285, 344, 'YES', 16)); 
 this.gShip.add(createButton(410, 337, 'button_whip', function() { this.gShip.visible = false; }, this, 1, 1, 0));
 this.gShip.add(createText(418, 344, 'NOPE', 16)); 
 this.g.add(this.gShip);
 this.gShip.visible = false;
 
 // group for canceling project:
 this.gCancel = game.add.group(); 
 this.gCancel.add(createButton(0, 0, 'window_alert_background', function() {}, 0, 0, 0));
 this.gCancel.add(createText(200, 240, '  DO YOU REALLY WANT TO\n   CANCEL THIS PROJECT?\n(SMALL REPUTATION PENALTY)', 16)); 
 this.gCancel.add(createButton(272, 337, 'button_whip', function() {
  this.done = true;
  windowOverlaySwitch(-1);
  stats.reputationStanding -= Math.abs(this.rewardReputationStanding * Math.floor(Math.random() * 1.2));
  stats.update();
  this.all.destroy(true);
  this.g.visible = false;
  this.removeFromLists();
 }, this, 1, 1, 0));
 this.gCancel.add(createText(285, 344, 'YES', 16)); 
 this.gCancel.add(createButton(410, 337, 'button_whip', function() { this.gShip.visible = false; }, this, 1, 1, 0));
 this.gCancel.add(createText(418, 344, 'NOPE', 16)); 
 this.g.add(this.gCancel);
 this.gCancel.visible = false;
 
 // initializes main project button and text
 var button = createButton(posX[place]-8, posY[place], 'button_project', function() { this.display(); }, this, 1, 1, 0);
 var text = createText(posX[place], posY[place]+10, name, 16);
 
 // initializes background for points
 var bd = game.add.bitmapData(width, height);
 bd.ctx.beginPath();
 bd.ctx.rect(0, 0, width, height);
 bd.ctx.fillStyle = '#000000';
 bd.ctx.fill();
 this.backgroundSprite = createSprite(posX[place], posY[place]+30, bd);
 this.backgroundSprite.alpha = 0.1;

 // various points variables
 this.capacity = height*width;
 this.width = width;
 this.height = height;
 this.points = 0;
 this.assigned = -1;
 
 this.all = game.add.group();
 this.all.add(button); 
 this.all.add(text);
 this.all.add(this.backgroundSprite);
 
 this.done = false;
}

Project.prototype.display = function() {
 this.gShip.visible = false;  
 this.gCancel.visible = false;
 var tmpAssigned = this.assigned;
 if(tmpAssigned < 0) tmpAssigned = 0;
 this.progressText.setText('PROGRESS: ' + Math.floor(tmpAssigned/this.capacity*100) + '%'); 
 windowOverlaySwitch(this.name+this.description);
}

Project.prototype.getPosition = function() {
 this.assigned++;
 if(this.assigned +1 == this.capacity)
  this.done = true;
 return [(this.assigned % this.width) * 4 + this.backgroundSprite.x, Math.floor(this.assigned/this.width) * 4 + this.backgroundSprite.y];
}

Project.prototype.arrived = function(fpoint) {
 this.all.add(fpoint.sprite);
 this.points++;
 if(this.points == this.capacity) {
  this.all.destroy(true);
  this.finished();
 }
}

Project.prototype.finished = function() {
 stats.money += this.rewardMoney;
 stats.reputationStanding += Math.floor(this.rewardReputationStanding * (Math.floor(Math.random() * 2.5) + 1));
 stats.update();
 this.removeFromLists();
}

Project.prototype.removeFromLists = function() {
 this.projectAssigment['active'] = false;
 this.projectAssigment['date_finished'] = stats.month;
 delete windowOverlay[this.name + this.description];
 newProject.replace(this.place);
}
