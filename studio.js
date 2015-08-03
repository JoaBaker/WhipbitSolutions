Studio = function() {
 this.level = 0;
 this.capacities = [3, 5, 6];
 this.inc();
}

Studio.prototype.inc = function() {
 this.level++;
 this.capacity = this.capacities[this.level-1];
}
