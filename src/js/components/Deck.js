import Card from './Card';

class Deck {

  constructor() {

    this.cards = [];
    this.dropped = [];
    this.suits = ["ouro", "espada", "copas", "paus"];
    this.ranks = ["2","3","4","5","6","7","8","9","10","Q","J","K","A"]
    
  }

  reset() {

    this.suits.forEach(suit => {

      this.ranks.forEach(rank => {

        this.cards.push(new Card(rank, suit))
        this.shuffle(this.cards)

      })

    });

  }

  shuffle(arr) {
  
    for (let idx = arr.length - 1; idx >= 0; idx--) {
      
      const rdm = Math.floor(Math.random() * idx);
      const curr = arr[idx];
  
      arr[idx] = arr[rdm];
      arr[rdm] = curr;
  
    }

    return arr;
  
  }
}

export default Deck;