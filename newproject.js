NewProject = function() {
 this.g = game.add.group();
 this.projectTitle = this.g.add(createText(105, 110, '', 16));
 this.projectDesc = this.g.add(createText(105, 150, '', 16));
 this.projectRequirements = this.g.add(createText(105, 280, '', 16));
 this.projectPublicity = this.g.add(createText(105, 320, '', 16));
 this.projectLength = this.g.add(createText(105, 360, '', 16));
 this.projectReward = this.g.add(createText(105, 400, '', 16));
 
 this.buttonPrev = this.g.add(createButton(105, 437, 'button_whip', function() { this.showNext(-1); }, this, 1, 1, 0));
 this.buttonPrevText = this.g.add(createText(114, 444, 'PREV', 16));
 this.projectsIndicator = this.g.add(createText(213, 444, "0/0", 16));
 this.buttonNext = this.g.add(createButton(318, 437, 'button_whip', function() { this.showNext(1); }, this, 1, 1, 0));
 this.buttonNextText = this.g.add(createText(327, 444, 'NEXT', 16));
 
 this.buttonAccept = this.g.add(createButton(478, 103, 'button_bottom_ui', function() {
  var curProject = this.availableProjects[this.currentN-1];
  this.availableProjects.splice(this.currentN-1, 1);
  var nProject = new Project(curProject['length'], 6, curProject['title'], curProject['description'], curProject['reward'], curProject['publicity'], curProject);
  for(var i = 0; i < developers.length; i++)
   developers[i].tryAddProject(nProject);
  this.unlockRandom(true);
  windowOverlaySwitch(-1);
 }, this, 1, 1, 0));
 this.buttonAcceptText = this.g.add(createText(522, 112, 'ACCEPT', 16));
 this.g.visible = false;
 overlayGroups['newproject'] = this.g;

 this.currentN = 1;
 this.availableProjects = [];
 
 // loads all projects
 this.allProjects = game.cache.getJSON('all_projects');
}

NewProject.prototype.replace = function(place) {
 projects[place] = null;

 var button = createButton(posX[place]-8, posY[place], 'button_project', function() {
  this.currentN = 1;
  this.update();
  windowOverlaySwitch('newproject');
 }, this, 1, 1, 0);
 var text = createText(posX[place]+65, posY[place]+40, 'NEW PROJECT', 16);
}

NewProject.prototype.showNext = function(off) {
 this.currentN += off;
 if(this.currentN > this.maxN)
  this.currentN = this.maxN;
 if(this.currentN < 1)
  this.currentN = 1;
 
 this.update();
}

NewProject.prototype.update = function() {
 this.maxN = this.availableProjects.length;
 this.projectsIndicator.setText(this.currentN + '/' + this.maxN);
 if(this.maxN == 0)  {
  this.projectsIndicator.visible = false;
  this.projectTitle.setText('No available projects right now');
  this.projectDesc.setText('Higher reputation increases your\nchances for new projects.');
  this.projectRequirements.setText('');
  this.projectPublicity.setText('');
  this.projectLength.setText('');
  this.projectReward.setText('');
  this.buttonAccept.visible = false;
  this.buttonAcceptText.visible = false;
  this.buttonPrev.visible = false;
  this.buttonPrevText.visible = false;
  this.buttonNext.visible = false;
  this.buttonNextText.visible = false;
 } else {
  var curProject = this.availableProjects[this.currentN-1];
  
  this.projectsIndicator.visible = true;
  this.buttonAccept.visible = true;
  this.buttonAcceptText.visible = true;
  this.buttonPrev.visible = true;
  this.buttonPrevText.visible = true;
  this.buttonNext.visible = true;
  this.buttonNextText.visible = true;
  
  this.projectTitle.setText(curProject['title']);
  this.projectDesc.setText(curProject['description']);
  this.projectReward.setText(   'REWARD:          $' + curProject['reward']);
  var length = curProject['length'];
  var lengthWords;
  if(length < 10)
   lengthWords = 'Tiny';
  else if(length < 15)
   lengthWords = 'Small';
  else if(length < 20)
   lengthWords = 'Medium';
  else if(length < 25)
   lengthWords = 'Above average';
  else if(length < 30)
   lengthWords = 'Big';
  else if(length < 35)
   lengthWords = 'Huge';
  else if(length >= 35)
   lengthWords = 'Enormous';
  else
   lengthWords = 'N/A';
  this.projectLength.setText(   'LENGTH (EST):    ' + lengthWords);
  
  var publicity = curProject['publicity'];
  if(publicity < -150)
   publicityWords = 'Morally unacceptable';
  else if(publicity >= -15 && publicity < -10)
   publicityWords = 'Really bad';
  else if(publicity >= -10 && publicity < -5)
   publicityWords = 'Bad';
  else if(publicity >= -5 && publicity < -1)
   publicityWords = 'Slightly negative';
  else if(publicity >= -1 && publicity < 4)
   publicityWords = 'Mostly neutral';
  else if(publicity >= 4 && publicity < 10)
   publicityWords = 'Slightly positive';
  else if(publicity >= 10 && publicity < 15)
   publicityWords = 'Great';
  else if(publicity >= 15 && publicity < 20)
   publicityWords = 'Fantastic';
  else if(publicity >= 20)
   publicityWords = "Couldn't be better";
  else
   publicityWords = 'N/A';
  this.projectPublicity.setText('PUBLICITY (EST): ' + publicityWords);
  
  var requirementsWords = '';
  var requirementsList = curProject['requirements'];
  for(var i = 0; i < requirementsList.length; i++) {
   requirementsWords += requirementsList[i];
   if(i != requirementsList.length -1)
    requirementsWords += ', ';
  }
  this.projectRequirements.setText('REQUIREMENTS: ' + requirementsWords);
 }
}

NewProject.prototype.unlock = function(i) {
 this.availableProjects.push(this.allProjects[i]);
 this.allProjects[i]['active'] = true;
}

NewProject.prototype.unlockRandom = function(highOdds) {
 var probability = 0.4+stats.reputation/150.0 - this.availableProjects.length/13.0;
 if(highOdds)
  probability += 0.4;
 
 if(Math.random() > probability)
  return;

 var remProjects = this.allProjects.slice();
 
 while(remProjects.length > 0) {
  var i = Math.floor(Math.random() * remProjects.length);
  var project = remProjects[i];
  if(project['level'] == studio.level &&
  (typeof(project['active']) == 'undefined' || !project['active']) &&
  (typeof(project['date_finished']) == 'undefined' || stats.month - project['date_finished'] > 10) &&
  requirementsMatch(project['requirements'])) {
   this.unlock(this.allProjects.indexOf(project));
   return;
  }
  remProjects.splice(i, 1);
 }
 
 function requirementsMatch(skills) {
  for(var d = 0; d < developers.length; d++) {
   var all = true;
   for(var i = 0; i < skills.length; i++) {
    var found = false;
    for(var j = 0; j < developers[d].skills.length; j++) {
     if(skills[i] == developers[d].skills[j]) {
      found = true;
      break;
     } 
    }
    if(!found)
     all = false;
   }
   if(all)
    return true;
  }
  return false;
 }
 
}
