var Developer = function(posX, posY) {
 var sprite = game.add.sprite(posX, posY, 'developer_1');
 sprite.smoothed = false;
 sprite.scale.setTo(6, 6);
 

 var button = game.add.button(posX+94, posY+296, 'button_whip', function() { new FPoint(300, 300, project); } , this, 1, 1, 0);
 button.scale.setTo(6, 6);
 button.smoothed = false;
 
 var text = game.add.bitmapText(posX+112, posY+302, 'visitor2', 'whip', 42);
}

