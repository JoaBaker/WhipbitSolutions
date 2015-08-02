var ManagementMenu = function() {
 this.g = game.add.group(); 
 this.g.add(createText(105, 110, 'MANAGEMENT', 16)); 
 this.salariesText = this.g.add(createText(105, 150, '', 16)); 
 
 this.g.visible = false;
}

ManagementMenu.prototype.update = function() {
 this.salariesText.setText('SALARIES (TOTAL): $' + stats.salaries);
 
 if(typeof(this.devs) != 'undefined')
  this.devs.destroy(true);
 
 this.devs = game.add.group();
 this.g.add(this.devs);

 var posX = [105, 400, 105, 400, 105, 400];
 var posY = [190, 190, 270, 270, 350, 350];
 var i = 0;
 for(; i < developers.length; i++) {
  var button = this.devs.add(createButton(posX[i], posY[i], 'button_project', function(b) { this.displayDev(b.i); }, this, 1,1,0));
  button.i = i;
  this.devs.add(createText(posX[i]+10, posY[i]+10, developers[i].name, 16));
  this.devs.add(createText(posX[i]+10, posY[i]+40, 'Salary: $' + developers[i].salary, 16));
 }
 if(developers.length < studio.capacity) {
  var button = this.devs.add(createButton(posX[i], posY[i], 'button_project', function(b) { this.displayDev(b.i); }, this, 1,1,0));
  button.i = -1;
  this.devs.add(createText(posX[i]+175, posY[i]+40, 'HIRE', 16));
 } else {
  this.devs.add(createText(105, 444, 'Your office is full', 16));
 }
}

ManagementMenu.prototype.displayDev = function(i) {
 if(i == -1)
  return;
 this.gDev = game.add.group(); 
 var developer = developers[i];
 this.gDev.add(createButton(0, 0, 'window_background', function() {}, 0, 0, 0));
 this.gDev.add(createText(105, 110, developer.name, 16));
 var duration = stats.month - developer.startMonth;
 this.gDev.add(createText(105, 150, 'Pressing buttons for ' + duration + ' month' + (duration==1?'':'s'), 16)); 
 this.gDev.add(createText(105, 190, 'Salary: $' + developer.salary, 16)); 
 this.gDev.add(createText(105, 230, 'Experience: ' + Math.floor(developer.exp) + '^', 16)); 
 this.gDev.add(createText(455, 230, 'Level: ' + developer.level, 16)); 
 var skillsWords = '';
 for(var j = 0; j < developer.skills.length; j++) {
  var skill = developer.skills[j];
  if(skillsWords.length + skill.length + 2 >= 30)
   skillsWords += '\n';
  skillsWords += skill;
  if(j != developer.skills.length -1)
   skillsWords += ', ';
 }
 this.gDev.add(createText(105, 270, 'Skills: ', 16)); 
 this.gDev.add(createText(235, 270, skillsWords, 16)); 
 this.gDev.add(createButton(105, 437, 'button_whip', function() {
  stats.salaries -= developer.salary;
  developers.splice(i, 1);
  this.update();
  developer.g.destroy(true);
  this.gDev.destroy(true); 
 }, this, 1, 1, 0));
 this.gDev.add(createText(114, 444, 'FIRE', 16));  
 this.gDev.add(createButton(195, 437, 'button_cancel', function() { this.gDev.destroy(true); }, this, 1, 1, 0));
 this.gDev.add(createText(203, 444, 'PROMOTE', 15));  
 this.gDev.add(createButton(588, 437, 'button_whip', function() { this.gDev.destroy(true); }, this, 1, 1, 0));
 this.gDev.add(createText(597, 444, 'BACK', 16));  
 this.gDev.visible = true;
}
