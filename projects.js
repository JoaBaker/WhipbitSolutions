var posX = [250, 425, 575];
var posA = [true, true, true];

var Project = function (width, height, name) {
 var place = 0;
 for(; place < posA.length; place++)
  if(posA[place]) break;

 posA[place] = false;
 var bd = game.add.bitmapData(width*6, height*6);
 bd.ctx.beginPath();
 bd.ctx.rect(0, 0, width*4, height*4);
 bd.ctx.fillStyle = '#000000';
 bd.ctx.fill();
 this.backgroundSprite = game.add.sprite(posX[place], 45, bd);
 this.backgroundSprite.alpha = 0.1;

 this.capacity = height*width;
 this.width = width;
 this.height = height;
 this.points = 0;
 this.assigned = -1;
 
 var text = game.add.bitmapText(posX[place], 20, 'visitor2', name, 16);
 text.smoothed = false;
 
 this.all = game.add.group();
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
