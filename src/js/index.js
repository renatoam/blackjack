class Intro {

  constructor() {

    this.match = new Match();

  }

  play() {

    // funcionalidade que inicia "chama" o jogo

  }

}

class Card {

 constructor(suit, rank) {

  this.suit = suit;
  this.rank = rank;
  this.value = 0;

 }

}

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

  // stand() {

  // }

  // setCardValue() {
    
  // }

}

class Croupier extends Player {}

class User extends Player {

  constructor() {

    this.balance = 500;
    this.bet = {};

  }

  // Talvez separar a aposta em um componente genérico

  deal() {

    this.balance = this.bet.playing;

  }

  setBet(value) {

    this.bet = {
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

}

class Match {

  constructor() {

    this.deck = new Deck;
    this.user = new User;
    this.croupier = new Croupier;

  }

  checkAce() {

    return this.user.points >= 11 ? 1 : 11;

  }

  getValue(card) {

    if (card.rank == "A") return this.checkAce();
    if (isNaN(Number(card.rank))) return 10;
    if (!isNaN(Number(card.rank))) return Number(card.rank);

  }

  setPoints(hand) {

    hand.forEach(card => {
      
      this.user.points += this.getValue(card);

    });

  }

  burstBlackJack(player) {

    player == this.croupier ? this.user.wins += 1 : this.croupier.wins += 1;
    this.endGame();
    
  }
  
  blackJack(player) {
    
    player == this.user ? this.user.wins += 1 : this.croupier.wins += 1;
    this.endGame();

  }

  checkBlackJack(player) {

    if (player.points > 21) {

      this.burstBlackJack(player);

    } else if (player.points === 21) {

      this.blackJack(player);

    } else {

      return;

    }
     
  }

  checkPlayerPoints() {

    if (this.user.points > this.croupier.points) {

      this.user.wins += 1;
      this.endGame();

    } else if (this.user.points < this.croupier.points) {

      this.croupier.wins += 1;
      this.endGame();

    }

  }

  newGame() {

    this.deck.reset();
    this.user.hit(this.deck.cards, 2);
    this.croupier.hit(this.deck.cards, 2);

    // Primeiro, confere se o User ganhou
    this.checkBlackJack(this.user);

    // Depois confere se o Croupier ganhou
    this.checkBlackJack(this.croupier);

  }

  endGame() {
    
    this.user.hand = [];
    this.croupier.hand = [];

  }

}