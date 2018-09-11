export default class Die {
  constructor(sides, randomPlus = true) {
    this.sides = sides;
    if (!randomPlus) {
      this.probilities = new Array(sides).fill(1);
    }
  }

  random() {
    return Math.floor(Math.random() * this.sides);
  }

  roll() {
    let rolls = 1;
    let roll = this.random();
    while(this.probilities && this.probilities[roll] > rolls) {
      roll = this.random();
      rolls += 1;
    }

    if (this.probilities) {
      this.probilities[roll] += 1;
    }
    return roll + 1;
  }
}
