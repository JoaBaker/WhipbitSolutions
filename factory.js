function createSprite(x, y, name) {
 var sprite = game.add.sprite(x, y, name);
 sprite.scale.setTo(4, 4);
 sprite.smoothed = false; 
 return sprite;
}

function createButton(x, y, name, func, context, s1, s2, s3) {
 var button = game.add.button(x, y, name, func, context, s1, s2, s3);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 return button;
}

function createText(x, y, text, size) {
 return game.add.bitmapText(x, y, 'visitor2', text, size); 
}
