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

}

class Croupier extends Player {}

class User extends Player {

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

class Match {

  constructor() {

    this.deck = new Deck;
    this.user = new User;
    this.croupier = new Croupier;

  }

  // Talvez separar a aposta em um componente genérico

  deal() {

    this.user.balance = this.user.bet.playing;
    document.getElementById('bet').innerText(this.user.bet.value);
    this.newGame();

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

  askForHitStand() {

    // Apresentar pro usuário as opções de Hit e Stand novamente, pra ele decidir se pega mais uma ou fica com o que tem.

  }

  burstBlackJack(player) {

    player == this.croupier ? this.user.wins += 1 : this.croupier.wins += 1;
    this.endGame();
    
  }
  
  blackJack(player) {
    
    player == this.user ? this.user.wins += 1 : this.croupier.wins += 1;
    this.endGame();

  }

  checkBlackJack(players) {

    players.forEach(p => {

      if (p.points > 21) {

        this.burstBlackJack(p);
  
      } else if (p.points === 21) {
  
        this.blackJack(p);
  
      } else {
  
        return;
  
      }

    });
     
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

    // Primeiro, confere se o User ou Croupier fizeram 21
    this.checkBlackJack([this.user, this.croupier]);

  }

  endGame() {
    
    this.user.hand = [];
    this.user.bet = {};
    this.croupier.hand = [];

  }

}