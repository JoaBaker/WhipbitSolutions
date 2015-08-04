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
 this.inc();
}

Studio.prototype.inc = function() {
 this.level++;
 this.capacity = this.capacities[this.level-1];
}
