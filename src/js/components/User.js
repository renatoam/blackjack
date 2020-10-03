import Player from "./Player";

import {
  INITIAL_BALANCE,
  NUMBER_OF_PLAYERS,
  VERIFICATION_CROUPIER_POINTS,
  BLACKJACK,
} from "../constants";

export default class User extends Player {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.bet = {};
  }

  setBet(value) {
    this.bet = {
      value,
      playing: this.balance - value,
      win: this.balance + value * NUMBER_OF_PLAYERS,
      lose: this.balance - value * NUMBER_OF_PLAYERS,
    };
  }

  setBalance(status) {
    const betStatus = {
      win: () => (this.balance = this.bet.win),
      lose: () => (this.balance = this.bet.lose),
    };

    return betStatus[status];
  }

  stand(foe, deck, callback) {
    for (let i = 0; foe.points >= VERIFICATION_CROUPIER_POINTS; i++) {
      if (foe.points > BLACKJACK) {
        this.blackjack(foe); // esse this é referente ao objeto que ira chamar essa função sem bind, no caso, Match
      } else if (foe.points > this.points) {
        this.checkPlayerPoints(); // esse this é referente ao objeto que ira chamar essa função sem bind, no caso, Match
      } else {
        foe.hit(deck);
      }
    }

    callback(); // no caso, será a askForHitStand()
  }
}
