export class Patient {
  constructor() {
    this.infectionLevel = 0;
  }

  startInfection() {
    const intervalHandler = setInterval(() => {
      this.infectionLevel += Math.floor(Math.random() * 6 + 1);
      if (this.isDead()) {
        clearInterval(intervalHandler);
      }
    }, 1000);
  }

  isDead() {
    if (this.infectionLevel >= 100) {
      return true;
    } else {
      return false;
    }
  }
  hasWon() {
    if (this.infectionLevel <= 1) {
      return true;
    } else {
      return false;
    }
  }

  cure(callback) {
    setTimeout(() => {
      // console.log(`Math.floor(${Math.random()} * (7 - 1) + 1) => ${Math.floor(Math.random() * (7 - 1) + 1)}`);
      this.infectionLevel -= Math.floor(Math.random() * (7 - 1) + 1);
      this.infectionLevel = Math.max(0, this.infectionLevel);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 1001);
  }

  cure2(callback) {
    setTimeout(() => {
      this.infectionLevel -= Math.floor(Math.random() * (8 - 4) + 4); // to get random number between 8 and 4
      this.infectionLevel = Math.max(0, this.infectionLevel); // for avoiding -ve integer
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 1001);
  }
}
