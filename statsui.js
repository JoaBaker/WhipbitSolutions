var Stats = function() {
 createButton(5, 6, 'button_stats', function() { statsMenu.update(); windowOverlaySwitch('stats'); }, this, 1, 1, 0);
 this.moneyText = createText(12, 15, '', 16);
 this.moneyText.align = 'right';
 this.reputationText = createText(12, 55, '', 16);
 this.reputationText.align = 'right';
 this.monthText = createText(12, 95, '', 16);
 this.monthText.align = 'right';
 
 this.month = 1;
 this.days = -1;
 this.money = 3000;
 this.reputation = 10;
 this.reputationStanding = 0;
 this.rent = 0;
 this.salaries = 0;
 this.supplies = 0;
 this.expences = this.rent + this.salaries + this.supplies;
 this.incDay();
 this.update();

 this.timer = createTimer(false);
 this.timer.loop(1000, this.incDay, this);
 this.timer.start();
}

Stats.prototype.incMonth = function() {
 if(this.money < 0)
  console.log('GONE BAKRUPT');
 this.month++;
 this.expences = this.rent + this.salaries + this.supplies;
 this.money -= this.expences;
 this.reputation += this.reputationStanding;
 this.reputationStanding += this.reputationStanding>0?(-1-Math.floor(this.reputationStanding/10)):(1+Math.floor(-this.reputationStanding/15))
 for(var i = 0; i < projects.length; i++) {
  if(projects[i] == null)
   continue;
  if(projects[i].readyToCount)
   projects[i].decMonth();
  else
   projects[i].readyToCount = true;
 }
 this.update();
 hireDev.randomHire(true);
}

Stats.prototype.incDay = function() {
 this.days++;
 if(this.days >= 30) {
  this.incMonth();
  this.days = 0;
 }
 this.monthText.setText('MONTH: (' + (this.days > 20?'0':'') + (30-this.days) + ')  \n' + this.month);
}

Stats.prototype.update = function() {
 this.expences = this.rent + this.salaries + this.supplies;
 this.moneyText.setText('MONEY:       \n$'+ this.money);
 this.reputationText.setText('REPUTATION:   \n'+ this.reputation +'*');
}

var BottomUI = function() {
 createButton(5, 517, 'button_bottom_ui', function() { windowOverlaySwitch('management'); }, this, 1, 1, 0);
 createText(17, 525, 'MANAGEMENT', 16); 
 
 createButton(193, 517, 'button_bottom_ui', function() { windowOverlaySwitch('upgrades');}, this, 1, 1, 0);
 createText(218, 525, 'UPGRADES', 16); 
 
 createButton(381, 517, 'button_bottom_ui', function() { windowOverlaySwitch('help'); }, this, 1, 1, 0);
 createText(439, 525, 'HELP', 16); 
 
 createButton(571, 517, 'button_bottom_ui', function() { window.open('https://twitter.com/ViliX64', '_blank'); }, this, 1, 1, 0);
 createText(597, 525, '@VILIX64', 16);

 new OverlayMenu();
}
