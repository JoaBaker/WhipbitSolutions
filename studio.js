Studio = function() {
 this.level = 0;
 this.capacities = [2, 3, 4];
 this.inc();
}

Studio.prototype.inc = function() {
 this.level++;
 this.capacity = this.capacities[this.level-1];
}
