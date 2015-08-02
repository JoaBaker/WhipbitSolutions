NewProject = function() {
 this.g = game.add.group();
 this.projectTitle = this.g.add(createText(105, 110, '', 16));
 this.projectDesc = this.g.add(createText(105, 150, '', 16));
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
  var nProject = new Project(5, curProject['length'], curProject['title'], curProject['description'], curProject['reward'], curProject['publicity']);
  developers[Math.floor(Math.random() * developers.length)].curProject = nProject;
  windowOverlaySwitch(-1);
 }, this, 1, 1, 0));
 this.buttonAcceptText = this.g.add(createText(487, 110, 'ACCEPT', 16));
 this.g.visible = false;
 overlayGroups['newproject'] = this.g;

 this.currentN = 1;
 this.availableProjects = [];
 
 // loads all projects
 this.allProjects = game.cache.getJSON('all_projects');
 this.unlock(0);
 this.unlock(1);

 this.update();
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

 var curProject = this.availableProjects[this.currentN-1];
 this.projectTitle.setText(curProject['title']);
 this.projectDesc.setText(curProject['description']);
 this.projectReward.setText(   'REWARD:          $' + curProject['reward']);
 var length = curProject['length'];
 var lengthWords;
 if(length < 10)
  lengthWords = 'TINY';
 else if(length < 15)
  lengthWords = 'SMALL';
 else if(length < 20)
  lengthWords = 'MEDIUM';
 else if(length < 25)
  lengthWords = 'ABOVE AVERAGE';
 else if(length < 30)
  lengthWords = 'BIG';
 else if(length < 35)
  lengthWords = 'HUGE';
 else
  lengthWords = 'N/A';
 this.projectLength.setText(   'LENGTH (EST):    ' + lengthWords);
 
 var publicity = curProject['publicity'];
 if(publicity < -30)
  publicityWords = 'MORALLY UNACCEPTABLE';
 else if(publicity > -30 && publicity < -20)
  publicityWords = 'REALLY BAD';
 else if(publicity > -20 && publicity < -10)
  publicityWords = 'BAD';
 else if(publicity > -10 && publicity < 0)
  publicityWords = 'MOSTLY NEGATIVE';
 else if(publicity > 0 && publicity < 10)
  publicityWords = 'MOSTLY POSITIVE';
 else if(publicity > 10 && publicity < 20)
  publicityWords = 'GREAT';
 else if(publicity > 20 && publicity < 30)
  publicityWords = 'FANTASTIC';
 else if(publicity > 30)
  publicityWords = "COULDN'T BE BETTER";
 else
  publicityWords = 'N/A';
 this.projectPublicity.setText('PUBLICITY (EST): ' + publicityWords);
}

NewProject.prototype.unlock = function(i) {
 this.availableProjects.push(this.allProjects[i]);
}
