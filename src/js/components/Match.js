import Deck from "./Deck";
import User from "./User";
import Croupier from "./Croupier";

import {
  ACE_ONE,
  ACE_ELEVEN,
  FIGURE_VALUE,
  BLACKJACK,
  INITIAL_CARDS_QUANTITY,
} from "../constants";

export default class Match {
  constructor() {
    this.deck = new Deck();
    this.user = new User();
    this.croupier = new Croupier();
    this.players = [this.user, this.croupier];
  }

  // Talvez separar a aposta em um componente genérico

  deal() {
    this.user.balance = this.user.bet.playing;
    document.getElementById("bet").innerText(this.user.bet.value);
    this.newGame();
  }

  checkAce() {
    return this.user.points >= 11 ? ACE_ONE : ACE_ELEVEN;
  }

  getValue({ rank }) {
    const numericRank = Number(rank);

    if (rank === "A") this.checkAce();
    if (isNaN(numericRank)) FIGURE_VALUE;
    if (!isNaN(numericRank)) numericRank;
  }

  setPoints(hand) {
    hand.forEach((card) => {
      this.user.points += this.getValue(card);
    });
  }

  askForHitStand() {
    // Apresentar pro usuário as opções de Hit e Stand novamente, pra ele decidir se pega mais uma ou fica com o que tem.
  }

  addWinPoints(player) {
    const playerPoints = {
      croupier: () => this.croupier.wins++,
      user: () => this.user.wins++,
    };

    playerPoints[player]();
  }

  blackJack(player) {
    addWinPoints(player);
    this.endGame();
  }

  checkBlackJack() {
    this.players.forEach.call(this, (player) => {
      if (player.points > BLACKJACK || player.points === BLACKJACK)
        this.blackJack(player);
      else return;
    });
  }

  checkPlayerPoints() {
    if (this.user.points === this.croupier.points) return;
    if (this.user.points > this.croupier.points) this.blackJack(this.user);
    else this.blackJack(this.croupier);
  }

  hitCards() {
    const players = [this.user, this.croupier];

    players.forEach.call(this, (player) =>
      player.hit(this.deck.cards, INITIAL_CARDS_QUANTITY)
    );
  }

  newGame() {
    this.deck.reset();
    this.hitCards();

    // Primeiro, confere se o User ou Croupier fizeram 21
    this.checkBlackJack();
  }

  endGame() {
    this.user.hand = [];
    this.user.bet = {};
    this.croupier.hand = [];
  }
}
