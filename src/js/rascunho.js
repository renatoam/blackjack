let cards = [];
let hand = [];
let deck = [];
let suits = ["ouro", "espada", "copas", "paus"];
let ranks = ["2","3","4","5","6","7","8","9","10","Q","J","K","A"];

function shuffle(arr) {
  
  for (let idx = arr.length - 1; idx >= 0; idx--) {
    
    const rdm = Math.floor(Math.random() * idx);
    const curr = arr[idx];

    arr[idx] = arr[rdm];
    arr[rdm] = curr;

  }

  return arr;

}

suits.forEach(suit => {

  ranks.forEach(rank => {

    cards.push({ rank, suit })

  })

});

shuffle(cards)

let i = Math.floor(Math.random() * 53);

hand.push(cards[i]);
cards.splice(i, 1);

let val = hand.forEach(el => {
  console.log(Number(el.rank))
})