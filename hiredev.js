HireDev = function() {
 // loads every developer into Game variable
 allDevelopers = game.cache.getJSON('all_developers');
 for(var i = 0; i < allDevelopers.length; i++) {
  allDevelopers[i].id = i;
  allDevelopers[i].active = false;
 }
 
 this.g = game.add.group();
 this.g.add(createButton(0, 0, 'window_background', function() {}, this, 0, 0, 0));
 
 this.devName = this.g.add(createText(105, 110, '', 16));
 this.devDesc = this.g.add(createText(105, 150, '', 16));
 this.g.add(createText(105, 370, 'SKILLS:', 16));
 this.devSkills = this.g.add(createText(220, 370, '', 16));
 this.devSalary = this.g.add(createText(105, 230, '', 16));
 this.devHireFee = this.g.add(createText(105, 265, '', 16));
 this.devSpeed = this.g.add(createText(105, 300, '', 16));
 this.devSkillPoints = this.g.add(createText(105, 335, '', 16));
 
 this.buttonPrev = this.g.add(createButton(105, 437, 'button_whip', function() { this.showNext(-1); }, this, 1, 1, 0));
 this.buttonPrevText = this.g.add(createText(114, 444, 'PREV', 16));
 this.devsIndicator = this.g.add(createText(213, 444, "0/0", 16));
 this.buttonNext = this.g.add(createButton(318, 437, 'button_whip', function() { this.showNext(1); }, this, 1, 1, 0));
 this.buttonNextText = this.g.add(createText(327, 444, 'NEXT', 16));
 this.g.add(createButton(588, 437, 'button_whip', function() { this.g.visible = false; }, this, 1, 1, 0));
 this.g.add(createText(597, 444, 'BACK', 16));
 
 this.g.add(createSprite(521, 249, 'placeholder_table'));
 this.prevSprite = this.g.add(createSprite(520, 160, 'developers'));

 this.buttonHire = this.g.add(createButton(478, 103, 'button_bottom_ui', function() {

 }, this, 1, 1, 0));
 this.buttonHireText = this.g.add(createText(535, 112, 'HIRE', 16));
 this.unavailableText = this.g.add(createText(400, 112, 'NOT ENOUGHT MONEY', 16));
 this.g.visible = false;
 this.currentN = 1;
}

HireDev.prototype.showNext = function(off) {
 this.currentN += off;
 if(this.currentN > this.maxN)
  this.currentN = this.maxN;
 if(this.currentN < 1)
  this.currentN = 1;
 
 this.update();
}

HireDev.prototype.display = function() {
 this.update();
 this.g.visible = true;
 game.world.bringToTop(this.g);
}

HireDev.prototype.update = function() {
 this.maxN = availableDevelopers.length;
 this.devsIndicator.setText(this.currentN + '/' + this.maxN);
 var curDev = availableDevelopers[this.currentN-1];
  
 if(curDev['hire_fee'] <= stats.money) {
  this.buttonHire.visible = true;
  this.buttonHireText.visible = true;
  this.unavailableText.visible = false;
 } else {
  this.buttonHire.visible = false;
  this.buttonHireText.visible = false;
  this.unavailableText.visible = true;
 }
 
 this.buttonPrev.visible = true;
 this.buttonPrevText.visible = true;
 this.buttonNext.visible = true;
 this.buttonNextText.visible = true;
  
 this.devName.setText(curDev['name']);
 this.devDesc.setText(curDev['description']);
 this.devSkillPoints.setText('FREE SKILL POINTS: ' + curDev['skill_points']);
 this.devSalary.setText('SALARY: $' + curDev['salary']);
 this.devHireFee.setText('HIRE FEE: $' + curDev['hire_fee']);
 this.devSpeed.setText('SPEED: ' + curDev['speed']);
 
 this.prevSprite.frame = (curDev['id'])*3;

 var skillsWords = '';
 var skillsList = curDev['skills'];
 for(var i = 0; i < skillsList.length; i++) {
  if(skillsWords.length + skillsList[i].length > 30)
   skillsWords += '\n';
  skillsWords += skillsList[i];
  if(i != skillsList.length -1)
   skillsWords += ', ';
 }
 this.devSkills.setText(skillsWords);
}

HireDev.prototype.unlock = function(index) {
 if(availableDevelopers.indexOf(allDevelopers[index]) == -1 && allDevelopers[index].active == false) {
  availableDevelopers.push(allDevelopers[index]);
  return true;
 } else {
  return false;
 }
}

HireDev.prototype.lock = function(index) {
 var v = availableDevelopers.indexOf(allDevelopers[index]);
 if(v != -1) availableDevelopers.splice(v, 1);
}
