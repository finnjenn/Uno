const NUM_OF_STARTING_CARDS = 7;
let isCpuTurn = false;
let isUserTurn = true;
let isClockwise = true;
let removedCardObj = null;
const wildModal = new bootstrap.Modal("#wildModal");
const cpuNames = {
  names: [
    "Elon Musk",
    "Jeff Bezos",
    "Joe Biden",
    "Ur Mom",
    "Garfield",
    "Derek Zoolander",
    "Ariana Grande",
    "Oprah Winfrey",
    "Light Yagami",
    "Ash Ketchum",
    "Pikachu",
    "Katy Perry",
    "Dua Lipa",
    "Zendaya",
    "Ice Cube",
    "Eminem",
    "Pedro Pascal",
    "Baby Yoda",
    "Vladimir Putin",
    "Gwen Stefani",
    "Jenna Ortega",
    "Scott Pilgrim",
    "Aubrey Plaza",
    "Mario Mario",
    "Luigi Mario",
    "Monkey Luffy",
    "Son Goku",
    "Gon Freecss",
    "Killua Zoldyk",
    "Roronoa Zoro",
    "Orlando Bloom",
    "Nick Cannon",
    "Kanye West",
  ],
  shuffle: function () {
    console.log("Shuffling cpu names");
    this.names.sort(() => Math.random() - 0.5);
  },
  removeName: function () {
    const removed = this.names.pop();
    console.log(`Popping ${removed} from names array`);
    return removed;
  },
};
const deck = {
  cards: [
    { number: 0, color: "red" },
    { number: 1, color: "red" },
    { number: 1, color: "red" },
    { number: 2, color: "red" },
    { number: 2, color: "red" },
    { number: 3, color: "red" },
    { number: 3, color: "red" },
    { number: 4, color: "red" },
    { number: 4, color: "red" },
    { number: 5, color: "red" },
    { number: 5, color: "red" },
    { number: 6, color: "red" },
    { number: 6, color: "red" },
    { number: 7, color: "red" },
    { number: 7, color: "red" },
    { number: 8, color: "red" },
    { number: 8, color: "red" },
    { number: 9, color: "red" },
    { number: 9, color: "red" },
    { number: "reverse", color: "red" },
    { number: "reverse", color: "red" },
    { number: "skip", color: "red" },
    { number: "skip", color: "red" },
    { number: "plus2", color: "red" },
    { number: "plus2", color: "red" },
    { number: 0, color: "blue" },
    { number: 1, color: "blue" },
    { number: 1, color: "blue" },
    { number: 2, color: "blue" },
    { number: 2, color: "blue" },
    { number: 3, color: "blue" },
    { number: 3, color: "blue" },
    { number: 4, color: "blue" },
    { number: 4, color: "blue" },
    { number: 5, color: "blue" },
    { number: 5, color: "blue" },
    { number: 6, color: "blue" },
    { number: 6, color: "blue" },
    { number: 7, color: "blue" },
    { number: 7, color: "blue" },
    { number: 8, color: "blue" },
    { number: 8, color: "blue" },
    { number: 9, color: "blue" },
    { number: 9, color: "blue" },
    { number: "reverse", color: "blue" },
    { number: "reverse", color: "blue" },
    { number: "skip", color: "blue" },
    { number: "skip", color: "blue" },
    { number: "plus2", color: "blue" },
    { number: "plus2", color: "blue" },
    { number: 0, color: "green" },
    { number: 1, color: "green" },
    { number: 1, color: "green" },
    { number: 2, color: "green" },
    { number: 2, color: "green" },
    { number: 3, color: "green" },
    { number: 3, color: "green" },
    { number: 4, color: "green" },
    { number: 4, color: "green" },
    { number: 5, color: "green" },
    { number: 5, color: "green" },
    { number: 6, color: "green" },
    { number: 6, color: "green" },
    { number: 7, color: "green" },
    { number: 7, color: "green" },
    { number: 8, color: "green" },
    { number: 8, color: "green" },
    { number: 9, color: "green" },
    { number: 9, color: "green" },
    { number: "reverse", color: "green" },
    { number: "reverse", color: "green" },
    { number: "skip", color: "green" },
    { number: "skip", color: "green" },
    { number: "plus2", color: "green" },
    { number: "plus2", color: "green" },
    { number: 0, color: "yellow" },
    { number: 1, color: "yellow" },
    { number: 1, color: "yellow" },
    { number: 2, color: "yellow" },
    { number: 2, color: "yellow" },
    { number: 3, color: "yellow" },
    { number: 3, color: "yellow" },
    { number: 4, color: "yellow" },
    { number: 4, color: "yellow" },
    { number: 5, color: "yellow" },
    { number: 5, color: "yellow" },
    { number: 6, color: "yellow" },
    { number: 6, color: "yellow" },
    { number: 7, color: "yellow" },
    { number: 7, color: "yellow" },
    { number: 8, color: "yellow" },
    { number: 8, color: "yellow" },
    { number: 9, color: "yellow" },
    { number: 9, color: "yellow" },
    { number: "reverse", color: "yellow" },
    { number: "reverse", color: "yellow" },
    { number: "skip", color: "yellow" },
    { number: "skip", color: "yellow" },
    { number: "plus2", color: "yellow" },
    { number: "plus2", color: "yellow" },
    { number: "wild", color: "black" },
    { number: "wild", color: "black" },
    { number: "wild", color: "black" },
    { number: "wild", color: "black" },
    { number: "wild", color: "black" },
    { number: "wild", color: "black" },
    { number: "wild", color: "black" },
    { number: "wild", color: "black" },
    { number: "plus4", color: "black" },
    { number: "plus4", color: "black" },
    { number: "plus4", color: "black" },
    { number: "plus4", color: "black" },
  ],
  shuffle: function () {
    console.log("Shuffling Cards");
    this.cards.sort(() => Math.random() - 0.5);
  },
  isEmpty: function () {
    if (this.cards.length === 0) return true;
    else return false;
  },
  removeCard: function () {
    const removed = this.cards.pop();
    console.log(`Popping ${removed.number} ${removed.color} from deck array`);
    return removed;
  },
  deckElement: document.getElementById("deck"),
};
const discard = {
  cards: [],
  discardElement: document.getElementById("discard"),
  updateTopCard: function () {
    console.log("Changing discard top card");
    currentTopCardElement = document.querySelector("#discard .cardFaceUp");
    newTopCard = this.cards[this.cards.length - 1];
    currentTopCardElement.classList = `cardFaceUp ${newTopCard.color}`;
    currentTopCardOval = document.querySelector("#discard .cardFaceUp .oval");
    if (newTopCard.number == "plus4") {
      currentTopCardOval.className = "oval rainbow";
    } else {
      currentTopCardOval.className = "oval white";
    }
    currentTopCardImg = document.querySelector("#discard .cardFaceUp img");
    if (newTopCard.number == "wild") {
      currentTopCardImg.setAttribute("width", "40px");
    }
    currentTopCardImg.src = `icons/${newTopCard.number}_${newTopCard.color}.png`;
    console.log("New top card object", newTopCard);
  },
  processTopCard: function () {
    if (this.cards[this.cards.length - 1].number == "reverse") {
      console.log("Reverse card has been played. Changing direction of play.");
      if (isClockwise) isClockwise = false;
      else isClockwise = true;
    }
    if (
      this.cards[this.cards.length - 1].number == "wild" ||
      this.cards[this.cards.length - 1].number == "plus4"
    ) {
      console.log("Wild played. Showing modal.");
      wildModal.show();
    }
  },
};
const user = {
  hand: [],
  cardBoxElement: document.getElementById("userCardBox"),
};
const cpu1 = {
  identifier: "cpu1",
  cardBoxElement: document.getElementById("cpu1"),
  nicknameElement: document.querySelector("#cpu1 .nickname"),
  countElement: document.querySelector("#cpu1 .count"),
  hand: [],
};
const cpu2 = {
  identifier: "cpu2",
  cardBoxElement: document.getElementById("cpu2"),
  nicknameElement: document.querySelector("#cpu2 .nickname"),
  countElement: document.querySelector("#cpu2 .count"),
  hand: [],
};
const cpu3 = {
  identifier: "cpu3",
  cardBoxElement: document.getElementById("cpu3"),
  nicknameElement: document.querySelector("#cpu3 .nickname"),
  countElement: document.querySelector("#cpu3 .count"),
  hand: [],
};
const createCardFaceUp = function (card) {
  let newCard = document.createElement("div");
  newCard.className = `cardFaceUp ${card.color}`;
  let oval = document.createElement("div");
  oval.className = "oval";
  if (card.number == "plus4") oval.className = "oval rainbow";
  let img = document.createElement("img");
  img.src = `icons/${card.number}_${card.color}.png`;
  if (card.number === "wild") img.setAttribute("width", "40px");
  newCard.appendChild(oval);
  newCard.appendChild(img);
  return newCard;
};
// Event listener for removing card when clicked
document.addEventListener("click", (e) => {
  if (isCpuTurn) return;
  if (
    e.target.matches("#userCardBox .cardFaceUp") ||
    e.target.matches("#userCardBox .cardFaceUp .oval") ||
    e.target.matches("#userCardBox .cardFaceUp img")
  ) {
    let isAMatch = false;
    let imgSrc = "";
    if (e.target.matches("#userCardBox .cardFaceUp")) {
      console.log("Clicked User Card");
      imgSrc = e.target.children[1].getAttribute("src"); // icons/0_red.png
    }
    if (e.target.matches("#userCardBox .cardFaceUp .oval")) {
      console.log("Clicked oval in user card");
      imgSrc = e.target.nextSibling.getAttribute("src"); // icons/0_red.png
    }
    if (e.target.matches("#userCardBox .cardFaceUp img")) {
      console.log("Clicked image in user card");
      imgSrc = e.target.getAttribute("src"); // icons/0_red.png
    }
    let cardInfo = imgSrc.slice(6, imgSrc.indexOf(".")); // 0_red
    let cardProps = cardInfo.split("_"); // [0, red]
    if (
      cardProps[0] == discard.cards[discard.cards.length - 1].number ||
      cardProps[1] == discard.cards[discard.cards.length - 1].color ||
      cardProps[0] == "wild" ||
      cardProps[0] == "plus4"
    )
      isAMatch = true;
    if (!isAMatch) {
      console.log("Card picked does not match");
      return;
    }
    if (
      e.target.matches("#userCardBox .cardFaceUp .oval") ||
      e.target.matches("#userCardBox .cardFaceUp img")
    )
      e.target.parentNode.remove();
    e.target.remove();
    removedCardObj = { number: cardProps[0], color: cardProps[1] };
    console.log("Card Object being removed from user hand", removedCardObj);
    user.hand = user.hand.filter(
      (obj) =>
        obj.number != removedCardObj.number || obj.color != removedCardObj.color
    );
    console.log("User hand", user.hand);
    console.log("Clicked User Card");
    discard.cards.push(removedCardObj);
    console.log("Cards in discard", discard.cards);
    discard.updateTopCard();
    discard.processTopCard();
  }
});
// Returns random color
const randomColor = function () {
  let colorArray = ["red", "blue", "green", "yellow"];
  let rand = Math.floor(Math.random() * colorArray.length);
  return colorArray[rand];
};
// Event listener for when card in wild modal is clicked
document.addEventListener("click", (e) => {
  if (e.target.matches("#wildCardBox .cardFaceUp")) {
    console.log("Card in Wild Modal Clicked", e.target.classList[1]);
    if (discard.cards[discard.cards.length - 1].number == "plus4") {
      let discardElementOval = document.querySelector(
        "#discard .cardFaceUp .oval"
      );
      discardElementOval.classList = `oval ${e.target.classList[1]}`;
      discard.cards[discard.cards.length - 1].color = e.target.classList[1];
    } else {
      let discardElement = document.querySelector("#discard .cardFaceUp");
      discardElement.classList = `cardFaceUp ${e.target.classList[1]}`;
      discard.cards[discard.cards.length - 1].color = e.target.classList[1];
    }
  }
});
// Event listener for when draw pile is clicked
document.addEventListener("click", (e) => {
  if (isCpuTurn) return;
  if (
    e.target.matches("#deck .cardFaceDown") ||
    e.target.matches("#deck .cardFaceDown .oval")
  ) {
    console.log("Draw pile clicked. Drawing card for user.");
    let newCardObj = deck.cards.pop();
    console.log("New card object", newCardObj);
    let newCard = createCardFaceUp(newCardObj);
    user.cardBoxElement.appendChild(newCard);
  }
});

//Game Setup -- shuffle deck, shuffle cpu names and pick 3, put 7 cards in each player's hand array, deal 1 card to discard pile, if first discard is wild or plus4 choose a random color to start
//Shuffle Deck
deck.shuffle();
//Shuffle cpuNames array and pick the last 3
cpuNames.shuffle();
cpu1.nicknameElement.innerHTML = cpuNames.removeName();
cpu2.nicknameElement.innerHTML = cpuNames.removeName();
cpu3.nicknameElement.innerHTML = cpuNames.removeName();
//Put 7 cards in each players hand. Create visual user card that corresponds to card in hand
for (let i = 0; i < NUM_OF_STARTING_CARDS; i++) {
  cpu1.hand.push(deck.removeCard());
  cpu2.hand.push(deck.removeCard());
  cpu3.hand.push(deck.removeCard());
  user.hand.push(deck.removeCard());
  let userCard = createCardFaceUp(user.hand[i]);
  user.cardBoxElement.appendChild(userCard);
}
//Put one card in the discard. Create corresponding visual card
discard.cards.push(deck.removeCard());
discard.discardElement.appendChild(createCardFaceUp(discard.cards[0]));
//If first card is wild. Choose a random color for it. Visually change the card
if (discard.cards[0].number == "wild") {
  console.log("First discard is wild. Choosing random starting color.");
  discard.cards[0].color = randomColor();
  console.log("New random color is " + discard.cards[0].color);
  currentTopCardElement = document.querySelector("#discard .cardFaceUp");
  currentTopCardElement.className = `cardFaceUp ${discard.cards[0].color}`;
}
//If first card is +4. Choose a random color for it. Visually change the card
if (discard.cards[0].number == "plus4") {
  console.log("First discard is plus4. Choosing random starting color.");
  discard.cards[0].color = randomColor();
  console.log("New random color is " + discard.cards[0].color);
  currentTopCardOvalElement = document.querySelector(
    "#discard .cardFaceUp .oval"
  );
  currentTopCardOvalElement.className = `oval ${discard.cards[0].color}`;
}
