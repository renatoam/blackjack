import Card from "./Card";

import { SUITS, RANKS } from "../constants";
import { shuffle } from "../helpers";

class Deck {
  constructor() {
    this.cards = [];
    this.dropped = [];
    this.suits = SUITS;
    this.ranks = RANKS;
  }

  reset() {
    this.suits.forEach((suit) => {
      this.ranks.forEach((rank) => {
        this.cards.push(new Card(rank, suit));
        shuffle(this.cards);
      });
    });
  }
}

export default Deck;
