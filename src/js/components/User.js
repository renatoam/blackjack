import Player from './Player';

export default class User extends Player {

  constructor() {

    this.balance = 500;
    this.bet = {};

  }

  setBet(value) {

    this.bet = {
      value,
      playing: this.balance - value,
      win: this.balance + (value * 2),
      lose: this.balance - (value * 2)
    }

  }

  winBet() {

    this.balance = this.bet.win;

  }

  loseBet() {

    this.balance = this.bet.lose;

  }

  stand(foe, deck, callback) {

    for (let i = 0; foe.points >= 17; i++) {

      if (foe.points > 21) {

        this.burstBlackJack(foe); // esse this é referente ao objeto que ira chamar essa função sem bind, no caso, Match

      } else if (foe.points > this.points) {

        this.checkPlayerPoints(); // esse this é referente ao objeto que ira chamar essa função sem bind, no caso, Match

      } else {

        foe.hit(deck);

      }

    }

    callback(); // no caso, será a askForHitStand()

  }

}