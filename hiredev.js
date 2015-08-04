HireDev = function() {
 this.g = game.add.group();
 this.g.add(createButton(0, 0, 'window_background', function() {}, this, 0, 0, 0));
 
 this.devName = this.g.add(createText(105, 110, '', 16));
 this.devDesc = this.g.add(createText(105, 150, '', 16));
 this.devSkills = this.g.add(createText(105, 280, '', 16));
 this.devSkillPoints = this.g.add(createText(105, 320, '', 16));
 this.devSalary = this.g.add(createText(105, 360, '', 16));
 this.devHireFee = this.g.add(createText(105, 400, '', 16));
 
 this.buttonPrev = this.g.add(createButton(105, 437, 'button_whip', function() { this.showNext(-1); }, this, 1, 1, 0));
 this.buttonPrevText = this.g.add(createText(114, 444, 'PREV', 16));
 this.devsIndicator = this.g.add(createText(213, 444, "0/0", 16));
 this.buttonNext = this.g.add(createButton(318, 437, 'button_whip', function() { this.showNext(1); }, this, 1, 1, 0));
 this.buttonNextText = this.g.add(createText(327, 444, 'NEXT', 16));
 this.g.add(createButton(588, 437, 'button_whip', function() { this.g.visible = false; }, this, 1, 1, 0));
 this.g.add(createText(597, 444, 'BACK', 16));
 
 this.buttonHire = this.g.add(createButton(478, 103, 'button_bottom_ui', function() {

 }, this, 1, 1, 0));
 this.buttonHireText = this.g.add(createText(530, 112, 'HIRE', 16));
 this.unavailableText = this.g.add(createText(420, 112, 'NOT ENOUGHT MONEY', 16));
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
 console.log('update');
 this.maxN = availableDevelopers.length;
 this.devsIndicator.setText(this.currentN + '/' + this.maxN);
 var curDev = availableDevelopers[this.currentN-1];
 console.log('maxN: ' + this.maxN + ' currentN: ' + this.currentN);
  
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
 console.log(curDev['name']);
 this.devDesc.setText(curDev['description']);
 this.devSalary.setText('Salary: $' + curDev['salary']);
  
 var skillsWords = '';
 var skillsList = curDev['skills'];
 for(var i = 0; i < skillsList.length; i++) {
  skillsWords += skillsList[i];
  if(i != skillsList.length -1)
   skillsWords += ', ';
 }
 this.devSkills.setText('SKILLS: ' + skillsWords);
}
