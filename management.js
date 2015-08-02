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
  var button = this.devs.add(createButton(posX[i], posY[i], 'button_project', function(b) { dispplayDev(b.i); }, this, 1,1,0));
  button.i = i;
  this.devs.add(createText(posX[i]+10, posY[i]+10, developers[i].name, 16));
  this.devs.add(createText(posX[i]+10, posY[i]+40, 'Salary: $' + developers[i].salary, 16));
 }
 if(developers.length < studio.capacity) {
  var button = this.devs.add(createButton(posX[i], posY[i], 'button_project', function(b) { displayDev(b.i); }, this, 1,1,0));
  button.i = -1;
  this.devs.add(createText(posX[i]+175, posY[i]+40, 'HIRE', 16));
 } else {
  this.devs.add(createText(105, 444, 'Your office is full', 16));
 }
}

ManagementMenu.prototype.displayDev = function(i) {

}
