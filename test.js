

/*
class Playerhand {
  constructor(player, cards) {
    this.player = player
    this.cards = cards
  }
  inputCard = () => {
    return this.cards.pop()
  }
}
*/
class Card {
  constructor(rank, suit, score) {
    this.rank = rank
    this.score = score
    this.suit = suit
  }
}



class Deck {
  constructor() {
    this.deck = []
    this.dealDeck()
    this.randomize()
  }


  dealDeck() {
    let suit = ["Hearts", "Spades", "Clubs", "Diamonds"];
    let rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

    for (let i = 0; i < suit.length; i++) {
      for (let j = 0; j < rank.length; j++) {
        this.deck.push(new Card(rank[j], suit[i], j + 2));
      }
    }
    return this.deck;
  }

  randomize() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }
  }
}


// randomize(playingDeck.deck)
//Splitting Deck & Card Logic

class WarGame {
  constructor() {
    this.player1 = []
    this.player2 = []
    this.warPile = [];
    this.setup();
  }

  setup() {
    let playingDeck = new Deck
    this.player1.push(...playingDeck.deck.splice(0, 26))
    this.player2.push(...playingDeck.deck.splice(0))
  }

  startGame() {
    while (this.player1.length > 0 && this.player2.length > 0) {

      let P1Hand = this.player1.pop();

      let P2Hand = this.player2.pop();

      if (P1Hand.score < P2Hand.score) {
        this.player2.unshift(P2Hand, P1Hand, ...this.warPile)
        this.warPile.length = 0
        console.log('Hand won by Player Two')

      } else if (P1Hand.score > P2Hand.score) {
        this.player1.unshift(P1Hand, P2Hand, ...this.warPile)
        this.warPile.length = 0
        console.log('Hand won by Player One')

      } else if (P1Hand.score == P2Hand.score) {
        this.war(P1Hand, P2Hand);
        console.log('This means War!')
      }
    }

    if (this.player1.length > 0) {
      console.log("Player 1 is the Winner", this.player1.length)
    } else {
      console.log("Player 2 is the Winner", this.player2.length)
    }
  }

  war(x, y) {
    this.warPile.push(x, y)
    if (this.player1.length >= 4 && this.player2.length >= 4) {
      let P1 = this.player1.splice(this.player1.length - 3, 3);
      let P2 = this.player2.splice(this.player2.length - 3, 3);
      this.warPile.push(...P1, ...P2);
    } else if (this.player1.length < 4 && this.player2.length >= 4) {
      this.player2.unshift(...this.warPile)
      this.player2.unshift(...this.player1.splice(0, this.player1.length));
      this.warPile.length = 0
    } else if (this.player2.length < 4 && this.player1.length >= 4) {
      this.player1.unshift(...this.player2.splice(0, this.player2.length));
      this.player1.unshift(...this.warPile);
      this.warPile.length = 0
    }
  }
}
let initialize = new WarGame();
console.log(initialize.startGame());
