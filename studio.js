Studio = function() {
 this.level = 0;
 this.capacities = [2, 3, 4];
 this.posX = [
  [540, 250],
  [250, 500, 600],
  [250, 500, 100, 400]
 ];
 this.posY = [
  [258, 258],
  [258, 258, 258],
  [258, 258, 258, 258]
 ]
 this.supplies = [50, 110, 190];
 this.rent = [100, 300, 600];
 this.inc();
}

Studio.prototype.inc = function() {
 this.level++;
 stats.supplies += this.supplies[this.level-1];
 stats.rent += this.rent[this.level-1];
 if(this.level > 1) {
  stats.supplies -= this.supplies[this.level-2];
  stats.rent -= this.rent[this.level-2];
 }
 this.capacity = this.capacities[this.level-1];
 stats.update();
}
