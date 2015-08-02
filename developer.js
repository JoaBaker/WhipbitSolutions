var Developer = function(posX, posY, skills) {
 this.posX = posX; this.posY = posY;
 this.skills = skills;

 // creates character
 this.sprite = createSprite(posX, posY, 'developer_1');

 // initializes whip button & text
 createButton(posX+55, posY+200, 'button_whip', this.incMotivation, this, 1, 1, 0);
 createText(posX+64, posY+207, 'WHIP', 16);

 // initializes background loader graphics
 var boundary = game.add.bitmapData(64, 4);
 boundary.ctx.beginPath();
 boundary.ctx.rect(0, 0, 64, 4);
 boundary.ctx.fillStyle = '#000000';
 boundary.ctx.fill();

 // initializes fPointLoader
 var bd = game.add.bitmapData(1, 1);
 bd.ctx.beginPath();
 bd.ctx.rect(0, 0, 1, 1);
 bd.ctx.fillStyle = '#000000';
 bd.ctx.fill();
 this.fPointLoader = game.add.sprite(posX+60, posY+9, bd);
 this.fPointLoaderProgress = 16;
 this.fPointLoader.scale.setTo(Math.floor(this.fPointLoaderProgress)*4, 4);
 var fb = game.add.sprite(posX+60, posY+9, boundary);
 fb.alpha = .2;

 // initializes motivationSlider
 this.motivationSlider = game.add.sprite(posX+60, posY+15, bd);
 this.motivation = 16.2;
 var mb = game.add.sprite(posX+60, posY+15, boundary);
 mb.alpha = .2;

 this.timer = createTimer(false);
 this.timer.loop(50, this.develop, this);
 this.timer.start(); 
 
 this.projects = [];
 this.speed = 10;
 developers.push(this);
 studio.updateSkills();
}

Developer.prototype.develop = function() {
 this.updateLoader();
 this.updateMotivation();
}

Developer.prototype.updateLoader = function() {
 while(this.projects.length != 0) {
  var i = Math.floor(Math.random() * this.projects.length);
  if(this.projects[i].done) {
   this.projects.splice(i, 1);
   this.fPointLoaderProgress = 16;
   this.fPointLoader.scale.setTo(Math.floor(this.fPointLoaderProgress)*4, 4);
   continue;
  }
 
  this.fPointLoaderProgress -= this.motivation/20 + .3 + this.speed/50;
  if(this.fPointLoaderProgress <= 0) {
   // add some fun to play crap about player xp; im tired; night
   new FPoint(this.posX+65, this.posY, this.projects[i]); 
   this.fPointLoaderProgress = 16;
  }
  this.fPointLoader.scale.setTo(Math.floor(this.fPointLoaderProgress)*4, 4);
  break;
 }
}

Developer.prototype.updateMotivation = function() {
 if(this.motivation > 1) this.motivation -= 0.02;
 this.motivationSlider.scale.setTo(Math.floor(this.motivation)*4, 4);
}

Developer.prototype.incMotivation = function() {
 this.motivation += .8;
 if(this.motivation > 16) this.motivation = 16.12; 
 this.updateMotivation();
}

Developer.prototype.tryAddProject = function(project) {
 for(var i = 0; i < project.projectAssigment['requirements'].length; i++) {
  var found = false;
  for(var j = 0; j < this.skills.length; j++) {
   if(project.projectAssigment['requirements'][i] == this.skills[j]) {
    found = true;
    break;
   } 
  }
  if(!found) {
   return;
  }
 }
 
 this.projects.push(project);
}
