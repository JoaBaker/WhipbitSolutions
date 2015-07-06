var Developer = function(posX, posY) {
 var sprite = game.add.sprite(posX, posY, 'developer_1');
 sprite.smoothed = false;
 sprite.scale.setTo(4, 4);
 

 var button = game.add.button(posX+55, posY+200, 'button_whip', function() { new FPoint(300, 300, project); } , this, 1, 1, 0);
 button.scale.setTo(4, 4);
 button.smoothed = false;
 
 var text = game.add.bitmapText(posX+65, posY+207, 'visitor2', 'WHIP', 16);
}

