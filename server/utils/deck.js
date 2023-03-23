export default class Deck {
  constructor(startValue) {
    let cards = freshDeck(startValue);
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  shift() {
    return this.cards.shift(); //return/draw first card from the deck
  }

  push(card) {
    this.cards.push(card); // add the card to the bottom of the deck array
  }

  pop() {
    return this.cards.pop(); //return/draw last card from the deck
  }

  startHand(cards) {
    return this.cards.splice(0, cards); //Draw the first cards from the deck
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

function freshDeck(startValue) {
  const SUITS = ["♥", "♦", "♠", "♣"];
  // const SUITS = ["♥"];

  const VALUES = Array.from({ length: 10 - startValue + 1 }, (_, i) =>
    (i + startValue).toString()
  ).concat(["J", "Q", "K", "A"]);
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return { value: value, suit: suit };
    });
  });
}
