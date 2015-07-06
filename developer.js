var Developer = function(posX, posY) {
 this.posX = posX; this.posY = posY;
 
 // creates character
 var sprite = game.add.sprite(posX, posY, 'developer_1');
 sprite.smoothed = false;
 sprite.scale.setTo(4, 4);

 // initializes whip button & text
 var button = game.add.button(posX+55, posY+200, 'button_whip', this.incMotivation, this, 1, 1, 0);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 var text = game.add.bitmapText(posX+64, posY+207, 'visitor2', 'WHIP', 16);

 // initializes background loader graphics
 var boundary = game.add.bitmapData(64, 4);
 boundary.ctx.beginPath();
 boundary.ctx.rect(0, 0, 64, 4);
 boundary.ctx.fillStyle = '#000000';
 boundary.ctx.fill();

 // initializes fPointLoader
 var bd = game.add.bitmapData(1, 1);
 bd.ctx.beginPath();
 bd.ctx.rect(0, 0, 1, 1);
 bd.ctx.fillStyle = '#000000';
 bd.ctx.fill();
 this.fPointLoader = game.add.sprite(posX+60, posY+5, bd);
 this.fPointLoaderProgress = 16;
 var fb = game.add.sprite(posX+60, posY+5, boundary);
 fb.alpha = .2;

 // initializes motivationSlider
 this.motivationSlider = game.add.sprite(posX+60, posY+15, bd);
 this.motivation = 16;
 var mb = game.add.sprite(posX+60, posY+15, boundary);
 mb.alpha = .2;

 this.develop();
}

Developer.prototype.develop = function() {
 this.updateLoader();
 this.updateMotivation();
 game.time.events.add(50, this.develop, this);
}

Developer.prototype.updateLoader = function() {
 this.fPointLoaderProgress -= this.motivation/20 + .3;
 if(this.fPointLoaderProgress <= 0) {
  new FPoint(this.posX+65, this.posY, project); 
  this.fPointLoaderProgress = 16;
 }
 this.fPointLoader.scale.setTo(Math.floor(this.fPointLoaderProgress)*4, 4);
}

Developer.prototype.updateMotivation = function() {
 if(this.motivation > 1) this.motivation -= 0.02;
 this.motivationSlider.scale.setTo(Math.floor(this.motivation)*4, 4);
}

Developer.prototype.incMotivation = function() {
 this.motivation += .5;
 if(this.motivation > 16) this.motivation = 16.12; 
 this.updateMotivation();
}
