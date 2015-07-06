var FPoint = function (posX, posY, project) {
 var target = project.getPosition();
 this.targetX = target[0];
 this.targetY = target[1];
 this.project = project;
 
 var bd = game.add.bitmapData(4, 4);
 bd.ctx.beginPath();
 bd.ctx.rect(0, 0, 4, 4);
 bd.ctx.fillStyle = '#000000';
 bd.ctx.fill();
 this.sprite = game.add.sprite(posX, posY, bd);
 
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

 if(xDone && yDone) {
  toRemove.push(updatable.indexOf(this));
  this.project.arrived(this); 
 }
}
