var posX = [253, 513, 253, 513];
var posY = [5, 5, 73, 73];
var posA = [true, true, true, true];

var Project = function (width, height, name) {
 var place = 0;
 for(; place < posA.length; place++)
  if(posA[place]) break;
 
 posA[place] = false;

 // initializes main project button and text
 var button = createButton(posX[place]-8, posY[place], 'button_project', function() {}, this, 1, 1, 0);
 var text = createText(posX[place], posY[place]+10, name, 16);
 
 // initializes background for points
 var bd = game.add.bitmapData(width, height);
 bd.ctx.beginPath();
 bd.ctx.rect(0, 0, width, height);
 bd.ctx.fillStyle = '#000000';
 bd.ctx.fill();
 this.backgroundSprite = createSprite(posX[place], posY[place]+30, bd);
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
