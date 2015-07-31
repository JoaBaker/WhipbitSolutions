NewProject = function() { }

NewProject.prototype.replace = function(place) {
 projects[place] = null;

 var button = createButton(posX[place]-8, posY[place], 'button_project', function() { this.display(); }, this, 1, 1, 0);
 var text = createText(posX[place]+65, posY[place]+40, 'NEW PROJECT', 16);
}

NewProject.prototype.display = function() {

}
