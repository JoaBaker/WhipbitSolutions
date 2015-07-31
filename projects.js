var posX = [253, 513, 253, 513];
var posY = [5, 5, 73, 73];
var posA = [true, true, true, true];

var Project = function (width, height, name, description, rewardMoney, rewardReputationStanding) {
 this.rewardMoney = rewardMoney;
 this.rewardReputationStanding = rewardReputationStanding;

 var place = 0;
 for(; place < posA.length; place++)
  if(posA[place]) break; 
 posA[place] = false;
 
 // group for overlay
 this.g = game.add.group(); 
 this.g.add(createText(105, 110, 'PROJECT: ' + name, 16)); 
 this.g.add(createText(105, 150, description, 16)); 
 this.g.add(createText(105, 190, 'PROGRESS: ', 16)); 
 this.g.add(createText(105, 230, 'REWARD: ', 16)); 
 this.g.add(createText(105, 270, 'START DATE (MONTH): ' + stats.month, 16)); 
 this.g.visible = false;
 overlayGroups[name+description] = this.g; 

 // initializes main project button and text
 var button = createButton(posX[place]-8, posY[place], 'button_project', function() { windowOverlaySwitch(name+description); }, this, 1, 1, 0);
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
}

Project.prototype.getPosition = function() {
 this.assigned++;
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
 stats.reputationStanding += this.rewardReputationStanding;
 stats.update();
}
