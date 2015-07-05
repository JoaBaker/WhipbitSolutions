var FPoint = function (posX, posY, project) {
 var target = project.getPosition();
 this.targetX = target[0];
 this.targetY = target[1];
 this.SPEED = 5;
 var sprite = game.add.sprite(posX, posY, 'point_black');
 sprite.scale.setTo(6, 6);
 sprite.smoothed = false;
 this.sprite = sprite;
 updatable.push(this);
}

FPoint.prototype.update = function (delta) { 
 if(this.done) return;

 if(this.sprite.x > this.targetX) this.sprite.x -= this.SPEED;
 else this.sprite.x += this.SPEED;
 
 if(this.sprite.y > this.targetY) this.sprite.y -= this.SPEED;
 else this.sprite.y += this.SPEED;


 var x;
 if(Math.abs(this.sprite.x - this.targetX) < this.SPEED*2) {
  this.sprite.x = this.targetX;
  x = true;
 }
 if(Math.abs(this.sprite.y - this.targetY) < this.SPEED*2) {
  this.sprite.y = this.targetY;
  if(x) this.done = true;
 }
}

var Project = function (side) {
 this.capacity = side^2;
 this.side = side;
 this.points = 0;
 this.assigned = -1;
}

Project.prototype.getPosition = function() {
 this.assigned++;
 return [this.assigned % this.side * 7, Math.floor(this.assigned/this.side) * 7];
}
