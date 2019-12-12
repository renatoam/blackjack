class Player {

  constructor() {

    this.wins = 0;
    this.points = 0;
    this.hand = [];

  }

  hit(arr, times = 1, hidden = false) {

    let idx = Math.floor(Math.random() * 53);

    for (let i = 0; i < times; i++) {
      this.hand.push(arr[idx]);
      arr.splice(idx, 1);
    }

    if (this.__proto__.constructor.name == "Croupier") {
      // fazer alguma coisa pra deixar a carta do croupier virada pra baixo
    }

  }

}

export default Player;