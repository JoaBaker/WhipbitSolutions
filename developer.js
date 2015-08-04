var Developer = function(id) {
 developers.push(this);
 this.posX = studio.posX[studio.level-1][developers.length-1];
 this.posY = studio.posY[studio.level-1][developers.length-1];
 
 this.id = id;
 this.src = allDevelopers[id];
 this.skills = this.src['skills'];
 this.name = this.src['name'];
 this.salary = this.src['salary'];
 this.skillPoints = this.src['skill_points'];
 this.speed = this.src['speed'];

 this.exp = 0.0;
 this.level = 1;
 stats.salaries += this.salary;
 this.startMonth = stats.month;

 // creates character
 this.sprite = createSprite(this.posX, this.posY, 'developers');
 this.sprite.animations.add('program', [this.id*3]);
 this.sprite.animations.play('program', 1);
 this.sprite.events.onAnimationComplete.add(function() {
  this.sprite.animations.add('program', [Math.floor(Math.random()*3)+this.id*3]);
  this.sprite.animations.play('program', Math.random()/2+0.1);
 }, this);
 this.g = game.add.group();
 this.g.add(this.sprite);

 // initializes whip button & text
 this.g.add(createButton(this.posX+25, this.posY+200, 'button_whip', this.incMotivation, this, 1, 1, 0));
 this.g.add(createText(this.posX+34, this.posY+207, 'WHIP', 16));

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
 this.fPointLoader = game.add.sprite(this.posX+30, this.posY+9, bd);
 this.fPointLoaderProgress = 16;
 this.fPointLoader.scale.setTo(Math.floor(this.fPointLoaderProgress)*4, 4);
 var fb = game.add.sprite(this.posX+30, this.posY+9, boundary);
 fb.alpha = .2;
 this.g.add(this.fPointLoader);
 this.g.add(fb);

 // initializes motivationSlider
 this.motivationSlider = game.add.sprite(this.posX+30, this.posY+15, bd);
 this.motivation = 16.2;
 var mb = game.add.sprite(this.posX+30, this.posY+15, boundary);
 mb.alpha = .2;
 this.g.add(this.motivationSlider);
 this.g.add(mb);

 this.timer = createTimer(false);
 this.timer.loop(50, this.develop, this);
 this.timer.start(); 
 
 this.projects = [];
 this.projectSkills = [];

 for(var i = 0; i < this.skills.length; i++) {
  for(var j = 0; j < allSkills.length; j++) {
   if(allSkills[j][0] == this.skills[i] && allSkillsAvailable.indexOf(allSkills[j]) == -1) {
    allSkillsAvailable.push(allSkills[j]);
   }
  }
 }
}

Developer.prototype.develop = function() {
 this.updateLoader();
 this.updateMotivation();
}

Developer.prototype.updateLoader = function() {
 while(this.projects.length != 0) {
  var i = Math.floor(Math.random() * this.projects.length);
  var project = this.projects[i];
  if(project.done) {
   this.removeProject(project);
   this.fPointLoaderProgress = 16;
   this.fPointLoader.scale.setTo(Math.floor(this.fPointLoaderProgress)*4, 4);
   continue;
  }

  this.fPointLoaderProgress -= this.motivation/20 + .3 + this.speed/50;
  if(this.fPointLoaderProgress <= 0) {
   var aptSkills = this.projectSkills[i];
   for(var j = 0; j < aptSkills.length; j++) {
    if(project.cells[aptSkills[j]] <= 0)  {
     aptSkills.splice(j, 1);
    }
   }
   if(aptSkills.length == 0) {
    this.removeProject(project);
    continue;
   }
   var skill = aptSkills[Math.floor(Math.random()*aptSkills.length)];
   var target = project.getPosition(skill);
   new FPoint(this.posX+65, this.posY, target, project); 
   this.fPointLoaderProgress = 16;
   this.incExp(0.5+1/this.level);
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
 else this.incExp(0.1);
 this.updateMotivation();
}

Developer.prototype.tryAddProject = function(project) {
 if(this.projects.indexOf(project) != -1)
  return false;
 
 var cells = project.cells;
 var found = false;
 for(var k in cells) {
  if(cells[k] > 0 && this.skills.indexOf(k) != -1) {
   found = true;
   break
  }
 }
 if(!found)
  return false;
 
 this.projects.push(project);
 this.projectSkills.push([]);
 for(var i = 0; i < project.requirements.length; i++)
  if(this.skills.indexOf(project.requirements[i]) != -1)
   this.projectSkills[this.projectSkills.length-1].push(project.requirements[i]);
 return true;
}

Developer.prototype.removeProject = function(project) {
 this.projectSkills.splice(this.projects.indexOf(project), 1);
 this.projects.splice(this.projects.indexOf(project), 1);
 this.fPointLoaderProgress = 16;
 this.fPointLoader.scale.setTo(Math.floor(this.fPointLoaderProgress)*4, 4);
}

Developer.prototype.incExp = function(val) {
 this.exp += val;
 if(this.exp >= this.level * 100) {
  this.exp = 0;
  this.incLevel();
 }
}

Developer.prototype.incLevel = function() {
 this.salary += this.level * 20;
 stats.salaries += this.level * 20;
 this.level ++;
 this.skillPoints++;
 this.speed+=Math.floor(Math.random()*2)+1;
}
