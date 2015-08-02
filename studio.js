Studio = function() {
 this.skills = [];
 this.level = 1;
}

Studio.prototype.updateSkills = function() {
 this.skills = [];
 for(var i = 0; i < developers.length; i++) {
  for(var j = 0; j < developers[i].skills.length; j++) {
   var skill = developers[i].skills[j];
   var exists = false;
   for(var l = 0; l < this.skills.length; l++) {
    if(this.skills[l] == skill) {
     exists = true;
     break;
    }
   }
   if(exists == false)
    this.skills.push(developers[i].skills[j]);
  }
 }
}
