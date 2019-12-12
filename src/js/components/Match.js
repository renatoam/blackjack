import Deck from './Deck';
import User from './User';
import Croupier from './Croupier';

export default class Match {

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