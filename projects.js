var FPoint = function (posX, posY, project) {
 var target = project.getPosition();
 this.targetX = target[0];
 this.targetY = target[1];
 this.sprite = game.add.sprite(posX, posY, 'point_black');
 this.sprite.scale.setTo(4, 4);
 this.sprite.smoothed = false;
 this.SPEEDX = Math.abs(this.targetX - this.sprite.x)/45;
 this.SPEEDY = Math.abs(this.targetY - this.sprite.y)/45;
 updatable.push(this);
}

FPoint.prototype.update = function (delta) { 
 var xDone, yDone;
 if(Math.abs(this.sprite.x - this.targetX) < this.SPEEDX*1.1) {
  this.sprite.x = this.targetX;
  xDone = true;
 }
 if(Math.abs(this.sprite.y - this.targetY) < this.SPEEDY*1.1) {
  this.sprite.y = this.targetY;
  yDone = true;
 }
 
 if(!xDone) {
  if(this.sprite.x > this.targetX) this.sprite.x -= this.SPEEDX;
  else this.sprite.x += this.SPEEDX;
 }
 
 if(!yDone) {
  if(this.sprite.y > this.targetY) this.sprite.y -= this.SPEEDY;
  else this.sprite.y += this.SPEEDY;
 }

 if(xDone && yDone) toRemove.push(updatable.indexOf(this));
}

var posX = [250, 425, 575];
var posA = [true, true, true];
var Project = function (side) {
 var place = 0;
 for(; place < posA.length; place++)
  if(posA[place]) break;

 posA[place] = false;
 var bd = game.add.bitmapData(side*6, side*6);
 bd.ctx.beginPath();
 bd.ctx.rect(0, 0, side*4, side*4);
 bd.ctx.fillStyle = '#000000';
 bd.ctx.fill();
 this.backgroundSprite = game.add.sprite(posX[place], 45, bd);
 this.backgroundSprite.alpha = 0.1;

 this.capacity = side^2;
 this.side = side;
 this.points = 0;
 this.assigned = -1;
 
 var text = game.add.bitmapText(posX[place], 20, 'visitor2', 'PROJECT 9', 16);
 text.smoothed = false;
}

Project.prototype.getPosition = function() {
 this.assigned++;
 return [this.assigned % this.side * 4 + this.backgroundSprite.x, Math.floor(this.assigned/this.side) * 4 + this.backgroundSprite.y];
}
