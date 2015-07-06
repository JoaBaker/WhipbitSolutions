var Stats = function() {
 var button = game.add.button(5, 6, 'button_stats', function() {}, this, 1, 1, 0);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 this.moneyText = game.add.bitmapText(12, 15, 'visitor2', 'MONEY:        \n7000$', 16);
 this.moneyText.align = 'right';
 this.reputationText = game.add.bitmapText(12, 55, 'visitor2', 'REPUTATION:   \n40*', 16);
 this.reputationText.align = 'right';
 this.reputationText = game.add.bitmapText(12, 95, 'visitor2', 'DAY:          \n400', 16);
 this.reputationText.align = 'right';
}

var BottomUI = function() {
 var button = game.add.button(5, 517, 'button_bottom_ui', function() {}, this, 1, 1, 0);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 game.add.bitmapText(12, 525, 'visitor2', 'MANAGEMENT', 16); 
 
 var button = game.add.button(190, 517, 'button_bottom_ui', function() {}, this, 1, 1, 0);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 game.add.bitmapText(197, 525, 'visitor2', 'UPGRADES', 16); 
 
 var button = game.add.button(375, 517, 'button_bottom_ui', function() {}, this, 1, 1, 0);
 button.scale.setTo(4, 4);
 button.smoothed = false; 
 game.add.bitmapText(382, 525, 'visitor2', 'OPTIONS', 16); 
 
 
 game.add.bitmapText(575, 525, 'visitor2', 'by @ViliX64', 16); 
}
