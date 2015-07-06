var posX = [253, 513, 253, 513];
var posY = [5, 5, 74, 74];
var posA = [true, true, true, true];

var Project = function (width, height, name) {
 var place = 0;
 for(; place < posA.length; place++)
  if(posA[place]) break;

 posA[place] = false;

 // initializes main project button and text
 var button = game.add.button(posX[place]-8, posY[place], 'button_project', this.incMotivation, this, 1, 1, 0);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 var text = game.add.bitmapText(posX[place], posY[place]+10, 'visitor2', name, 16);
 
 // initializes background for points
 var bd = game.add.bitmapData(width*4, height*4);
 bd.ctx.beginPath();
 bd.ctx.rect(0, 0, width*4, height*4);
 bd.ctx.fillStyle = '#000000';
 bd.ctx.fill();
 this.backgroundSprite = game.add.sprite(posX[place], posY[place]+30, bd);
 this.backgroundSprite.alpha = 0.1;

 // various points variables
 this.capacity = height*width;
 this.width = width;
 this.height = height;
 this.points = 0;
 this.assigned = -1;
 
 this.all = game.add.group();
 this.all.add(button); 
 this.all.add(text);
 this.all.add(this.backgroundSprite);
}

Project.prototype.getPosition = function() {
 this.assigned++;
 return [(this.assigned % this.width) * 4 + this.backgroundSprite.x, Math.floor(this.assigned/this.width) * 4 + this.backgroundSprite.y];
}

Project.prototype.arrived = function(fpoint) {
 this.all.add(fpoint.sprite);
 this.points++;
 if(this.points == this.capacity)
  this.all.destroy(true);
}
