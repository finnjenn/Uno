const NUM_OF_STARTING_CARDS = 7;
const TIME_CPUS_WAIT_FOR_TURN = 1500;
const wildModal = new bootstrap.Modal("#wildModal");
const gameOverModal = new bootstrap.Modal("#gameOverModal");
let isCpuTurn = false;
let isUserTurn = true;
let isClockwise = true;
let skipPlayed = false;
let removedCardObj = null;
let isModalShowing = false;
// Returns random color
const randomColor = function () {
  let colorArray = ["red", "blue", "green", "yellow"];
  let rand = Math.floor(Math.random() * colorArray.length);
  console.log("Random Color picked is:", colorArray[rand]);
  return colorArray[rand];
};
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
  topCardIndex: function () {
    return this.cards.length - 1;
  },
  // Checks last/most recently added card object and uses its properties to change the appearance of the top of the discard pile
  updateTopCard: function () {
    console.log("Changing discard top card");
    currentTopCardElement = document.querySelector("#discard .cardFaceUp");
    newTopCard = this.cards[this.topCardIndex()];
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
    if (this.cards[this.topCardIndex()].number == "reverse") {
      console.log("Reverse card has been played. Changing direction of play.");
      if (isClockwise) isClockwise = false;
      else isClockwise = true;
      return;
    }
    if (this.cards[this.topCardIndex()].number == "skip") {
      console.log("Skip card has been played.");
      skipPlayed = true;
      return;
    }
    if (this.cards[this.topCardIndex()].number == "plus2") {
      console.log("Plus 2 played, adding cards to next in play.");
      let current = takingTurn();
      if (isClockwise) {
        // Add card objects to next player if clockwise
        current.next.hand.push(deck.removeCard());
        current.next.hand.push(deck.removeCard());
        // If plus2 was played on user, create the visual cards
        if (current.next == user) {
          user.cardBoxElement.appendChild(
            createCardFaceUp(user.hand[user.hand.length - 2])
          );
          user.cardBoxElement.appendChild(
            createCardFaceUp(user.hand[user.hand.length - 1])
          );
        }
        updateCpuCardCount();
      }
      if (!isClockwise) {
        // Add card objects to previous player if not clockwise
        current.prev.hand.push(deck.removeCard());
        current.prev.hand.push(deck.removeCard());
        // If plus2 was played on user, create the visual cards
        if (current.prev == user) {
          user.cardBoxElement.appendChild(
            createCardFaceUp(user.hand[user.hand.length - 2])
          );
          user.cardBoxElement.appendChild(
            createCardFaceUp(user.hand[user.hand.length - 1])
          );
        }
        updateCpuCardCount();
      }
    }
    if (this.cards[this.topCardIndex()].number == "plus4") {
      console.log("Plus 4 played, adding cards to next in play.");
      let current = takingTurn();
      // Add card objects to next player if clockwise
      if (isClockwise) {
        current.next.hand.push(deck.removeCard());
        current.next.hand.push(deck.removeCard());
        current.next.hand.push(deck.removeCard());
        current.next.hand.push(deck.removeCard());
        // If plus4 was played on user, create the visual cards
        if (current.next == user) {
          user.cardBoxElement.appendChild(
            createCardFaceUp(user.hand[user.hand.length - 4])
          );
          user.cardBoxElement.appendChild(
            createCardFaceUp(user.hand[user.hand.length - 3])
          );
          user.cardBoxElement.appendChild(
            createCardFaceUp(user.hand[user.hand.length - 2])
          );
          user.cardBoxElement.appendChild(
            createCardFaceUp(user.hand[user.hand.length - 1])
          );
        }
        updateCpuCardCount();
      }
      if (!isClockwise) {
        // Add card objects to previous player if not clockwise
        current.prev.hand.push(deck.removeCard());
        current.prev.hand.push(deck.removeCard());
        current.prev.hand.push(deck.removeCard());
        current.prev.hand.push(deck.removeCard());
        // If plus4 was played on user, create the visual cards
        if (current.prev == user) {
          user.cardBoxElement.appendChild(
            createCardFaceUp(user.hand[user.hand.length - 4])
          );
          user.cardBoxElement.appendChild(
            createCardFaceUp(user.hand[user.hand.length - 3])
          );
          user.cardBoxElement.appendChild(
            createCardFaceUp(user.hand[user.hand.length - 2])
          );
          user.cardBoxElement.appendChild(
            createCardFaceUp(user.hand[user.hand.length - 1])
          );
        }
        updateCpuCardCount();
      }
    }
    if (
      this.cards[this.topCardIndex()].number == "wild" &&
      !user.isTakingTurn
    ) {
      let currentTopCardElement = document.querySelector(
        "#discard .cardFaceUp"
      );
      let rand = randomColor();
      currentTopCardElement.classList = `cardFaceUp ${rand}`;
      discard.cards[discard.topCardIndex()].color = rand;
    }
    if (
      this.cards[this.topCardIndex()].number == "plus4" &&
      !user.isTakingTurn
    ) {
      let currentTopCardOval = document.querySelector(
        "#discard .cardFaceUp .oval"
      );
      let rand = randomColor();
      currentTopCardOval.classList = `oval ${rand}`;
      console.log(discard.cards[discard.topCardIndex]);
      discard.cards[discard.topCardIndex()].color = rand;
    }
    // Show wild card color selection modal if its user turn and they played a wild card
    if (
      (this.cards[this.topCardIndex()].number == "wild" ||
        this.cards[this.topCardIndex()].number == "plus4") &&
      user.isTakingTurn
    ) {
      if (user.hand.length == 0) return;
      console.log("Wild played. Showing modal.");
      isModalShowing = true;
      console.log("isModalShowing:", isModalShowing);
      wildModal.show();
    }
  },
  // Called when player has picked their card and control of play needs to move to another player
  movePlayControl: function () {
    // Exit function if a player has used up all their cards
    if (
      user.hand.length == 0 ||
      cpu1.hand.length == 0 ||
      cpu2.hand.length == 0 ||
      cpu3.hand.length == 0
    )
      return;
    // Exit function if modal is showing. Modal will call this function again once it closes
    if (isModalShowing) {
      console.log("Modal is showing. Exiting movePlayControl.");
      return;
    }
    let current = takingTurn();
    current.isTakingTurn = false;
    console.log("Player that just finished playing", current);
    if (skipPlayed) {
      skipPlayed = false;
      current.next.next.isTakingTurn = true;
      current.next.next.startTurn();
      return;
    }
    if (isClockwise) {
      current.next.isTakingTurn = true;
      current.next.startTurn();
    } else {
      current.prev.isTakingTurn = true;
      current.prev.startTurn();
    }
  },
};
const user = {
  hand: [],
  cardBoxElement: document.getElementById("userCardBox"),
  isTakingTurn: true,
  startTurn: function () {
    console.log("User starting turn");
    this.cardBoxElement.childNodes.forEach((card) => {
      card.classList.add("active");
    });
  },
};
const cpu1 = {
  identifier: "cpu1",
  cardBoxElement: document.getElementById("cpu1"),
  nicknameElement: document.querySelector("#cpu1 .nickname"),
  countElement: document.querySelector("#cpu1 .count"),
  hand: [],
  isTakingTurn: false,
  drawCard: function () {
    if (deck.cards.length == 0) emptyDiscardIntoDeck();
    this.hand.push(deck.removeCard());
    console.log("Card Drawn by CPU:", this.hand[this.hand.length - 1]);
    updateCpuCardCount();
  },
  pickCard: function () {
    console.log("Cpu1 picking a card");
    let pickedCard;
    let topCard = discard.cards[discard.topCardIndex()];
    for (let i = 0; i < this.hand.length; i++) {
      if (
        this.hand[i].number == topCard.number ||
        this.hand[i].color == topCard.color ||
        this.hand[i].color == "black"
      ) {
        pickedCard = this.hand[i];
        let indexOfPickedCard = i;
        this.hand.splice(indexOfPickedCard, 1);
        updateCpuCardCount();
        discard.cards.push(pickedCard);
        discard.updateTopCard();
        discard.processTopCard();
        return pickedCard;
      }
    }
    console.log("Card not found. Drawing card from deck");
    this.drawCard();
  },
  startTurn: function () {
    console.log("Cpu1 starting turn");
    this.countElement.style.backgroundColor = "white";
    this.countElement.style.color = "black";
    this.cardBoxElement.style.transform = "translateY(-10%)";
    setTimeout(() => {
      let cardPicked = this.pickCard();
      console.log("I pick", cardPicked);
      this.countElement.style.backgroundColor = "black";
      this.countElement.style.color = "white";
      this.cardBoxElement.style.transform = "translate(0)";
      discard.movePlayControl();
    }, TIME_CPUS_WAIT_FOR_TURN);
  },
};
const cpu2 = {
  identifier: "cpu2",
  cardBoxElement: document.getElementById("cpu2"),
  nicknameElement: document.querySelector("#cpu2 .nickname"),
  countElement: document.querySelector("#cpu2 .count"),
  hand: [],
  isTakingTurn: false,
  drawCard: function () {
    if (deck.cards.length == 0) emptyDiscardIntoDeck();
    this.hand.push(deck.removeCard());
    console.log("Card Drawn by CPU:", this.hand[this.hand.length - 1]);
    updateCpuCardCount();
  },
  pickCard: function () {
    console.log("Cpu2 picking a card");
    let pickedCard;
    let topCard = discard.cards[discard.topCardIndex()];
    for (let i = 0; i < this.hand.length; i++) {
      if (
        this.hand[i].number == topCard.number ||
        this.hand[i].color == topCard.color ||
        this.hand.color == "black"
      ) {
        pickedCard = this.hand[i];
        let indexOfPickedCard = i;
        this.hand.splice(indexOfPickedCard, 1);
        updateCpuCardCount();
        discard.cards.push(pickedCard);
        discard.updateTopCard();
        discard.processTopCard();
        return pickedCard;
      }
    }
    console.log("Card not found. Drawing card from deck");
    this.drawCard();
  },
  startTurn: function () {
    console.log("Cpu2 starting turn");
    this.countElement.style.backgroundColor = "white";
    this.countElement.style.color = "black";
    this.cardBoxElement.style.transform = "translateY(-10%)";
    setTimeout(() => {
      console.log("Cpu2 picking a card");
      let cardPicked = this.pickCard();
      console.log("I pick", cardPicked);
      this.countElement.style.backgroundColor = "black";
      this.countElement.style.color = "white";
      this.cardBoxElement.style.transform = "translate(0)";
      discard.movePlayControl();
    }, TIME_CPUS_WAIT_FOR_TURN);
  },
};
const cpu3 = {
  identifier: "cpu3",
  cardBoxElement: document.getElementById("cpu3"),
  nicknameElement: document.querySelector("#cpu3 .nickname"),
  countElement: document.querySelector("#cpu3 .count"),
  hand: [],
  isTakingTurn: false,
  drawCard: function () {
    if (deck.cards.length == 0) emptyDiscardIntoDeck();
    this.hand.push(deck.removeCard());
    console.log("Card Drawn by CPU:", this.hand[this.hand.length - 1]);
    updateCpuCardCount();
  },
  pickCard: function () {
    console.log("Cpu3 picking a card");
    let pickedCard;
    let topCard = discard.cards[discard.topCardIndex()];
    for (let i = 0; i < this.hand.length; i++) {
      if (
        this.hand[i].number == topCard.number ||
        this.hand[i].color == topCard.color ||
        this.hand.color == "black"
      ) {
        pickedCard = this.hand[i];
        let indexOfPickedCard = i;
        this.hand.splice(indexOfPickedCard, 1);
        updateCpuCardCount();
        discard.cards.push(pickedCard);
        discard.updateTopCard();
        discard.processTopCard();
        return pickedCard;
      }
    }
    console.log("Card not found. Drawing card from deck");
    this.drawCard();
  },
  startTurn: function () {
    console.log("Cpu3 starting turn");
    this.countElement.style.backgroundColor = "white";
    this.countElement.style.color = "black";
    this.cardBoxElement.style.transform = "translateY(-10%)";
    setTimeout(() => {
      console.log("Cpu3 picking a card");
      let cardPicked = this.pickCard();
      console.log("I pick", cardPicked);
      this.countElement.style.backgroundColor = "black";
      this.countElement.style.color = "white";
      this.cardBoxElement.style.transform = "translate(0)";
      discard.movePlayControl();
    }, TIME_CPUS_WAIT_FOR_TURN);
  },
};
user.next = cpu1;
user.prev = cpu3;
cpu1.next = cpu2;
cpu1.prev = user;
cpu2.next = cpu3;
cpu2.prev = cpu1;
cpu3.next = user;
cpu3.prev = cpu2;
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
  if (cpu1.isTakingTurn) return;
  if (cpu2.isTakingTurn) return;
  if (cpu3.isTakingTurn) return;
  if (
    e.target.matches("#userCardBox .cardFaceUp") ||
    e.target.matches("#userCardBox .cardFaceUp .oval") ||
    e.target.matches("#userCardBox .cardFaceUp img")
  ) {
    // Keeps track of whether card clicked matches the top of the discard
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
      cardProps[0] == discard.cards[discard.topCardIndex()].number ||
      cardProps[1] == discard.cards[discard.topCardIndex()].color ||
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
    let indexOfRemovedCard = user.hand.findIndex(function (obj) {
      return (
        obj.number == removedCardObj.number && obj.color == removedCardObj.color
      );
    });
    console.log("The index of the removed card is", indexOfRemovedCard),
      ": splicing card from user hand";
    user.hand.splice(indexOfRemovedCard, 1);
    console.log("User hand", user.hand);
    console.log("Clicked User Card");
    discard.cards.push(removedCardObj);
    console.log("Cards in discard", discard.cards);
    discard.updateTopCard();
    discard.processTopCard();
    if (user.hand.length == 0) {
      let modalTextElement = document.querySelector("#gameOverModal h1");
      modalTextElement.innerText = "You Won! Congratulations";
      gameOverModal.show();
    }
    // Removes visual indication that it is user's turn
    user.cardBoxElement.childNodes.forEach((card) => {
      card.classList.remove("active");
    });
    discard.movePlayControl();
  }
});
const takingTurn = function () {
  if (user.isTakingTurn) return user;
  if (cpu1.isTakingTurn) return cpu1;
  if (cpu2.isTakingTurn) return cpu2;
  if (cpu3.isTakingTurn) return cpu3;
};
const updateCpuCardCount = function () {
  if (cpu1.hand.length == 0 || cpu2.hand.length == 0 || cpu3.hand.length == 0) {
    let modalTextElement = document.querySelector("#gameOverModal h1");
    modalTextElement.innerText = "Game Over. You Lose";
    gameOverModal.show();
  }
  if (cpu1.hand.length == 1) cpu1.countElement.innerText = "UNO";
  else cpu1.countElement.innerText = cpu1.hand.length;
  if (cpu2.hand.length == 1) cpu2.countElement.innerText = "UNO";
  else cpu2.countElement.innerText = cpu2.hand.length;
  if (cpu3.hand.length == 1) cpu3.countElement.innerText = "UNO";
  else cpu3.countElement.innerText = cpu3.hand.length;
};
const emptyDiscardIntoDeck = function () {
  console.log("Deck is out of cards. Emptying discard cards into deck.");
  let discardTop = discard.pop();
  deck.cards = discard.cards;
  deck.cards.shuffle();
  discard.cards = { discardTop };
};
// Event listener for when card in wild color selection modal is clicked
// Changes how the wild card visually looks based on which color user picks
// If a regular wild was played, the background color changes to match user color selection
// If a wild plus 4 was played, the oval color changes to match user color selection
document.addEventListener("click", (e) => {
  if (e.target.matches("#wildCardBox .cardFaceUp")) {
    console.log("Card in Wild Modal Clicked", e.target.classList[1]);
    if (discard.cards[discard.topCardIndex()].number == "plus4") {
      let discardElementOval = document.querySelector(
        "#discard .cardFaceUp .oval"
      );
      discardElementOval.classList = `oval ${e.target.classList[1]}`;
      discard.cards[discard.topCardIndex()].color = e.target.classList[1];
    } else {
      let discardElement = document.querySelector("#discard .cardFaceUp");
      discardElement.classList = `cardFaceUp ${e.target.classList[1]}`;
      discard.cards[discard.topCardIndex()].color = e.target.classList[1];
    }
    console.log(
      "Hiding modal and changing isModalShowing from:",
      isModalShowing
    );
    isModalShowing = false;
    console.log("To:", isModalShowing);
    discard.movePlayControl();
  }
});
// Event listener for when draw pile is clicked
document.addEventListener("click", (e) => {
  if (cpu1.isTakingTurn) return;
  if (cpu2.isTakingTurn) return;
  if (cpu3.isTakingTurn) return;
  if (
    e.target.matches("#deck .cardFaceDown") ||
    e.target.matches("#deck .cardFaceDown .oval")
  ) {
    if (deck.cards.length == 0) emptyDiscardIntoDeck();
    console.log("Draw pile clicked. Drawing card for user.");
    let newCardObj = deck.cards.pop();
    user.hand.push(newCardObj);
    console.log("New card object", newCardObj);
    let newCard = createCardFaceUp(newCardObj);
    newCard.classList.add("active");
    user.cardBoxElement.appendChild(newCard);
    // Removes visual indication that it is user's turn
    user.cardBoxElement.childNodes.forEach((card) => {
      card.classList.remove("active");
    });
    if (
      newCardObj.color == discard.cards[discard.topCardIndex()].color ||
      newCardObj.number == discard.cards[discard.topCardIndex()].number ||
      newCardObj.color == "black"
    ) {
      setTimeout(() => {
        console.log(
          "Drawn card:",
          newCardObj,
          "matches the discard. Playing drawn card."
        );
        user.cardBoxElement.removeChild(newCard);
        discard.cards.push(user.hand.pop());
        discard.updateTopCard();
        discard.processTopCard();
        discard.movePlayControl();
      }, 1000);
    } else discard.movePlayControl();
  }
});

//Game Setup -- shuffle deck, shuffle cpu names and pick 3, put 7 cards in each player's hand array, deal 1 card to discard pile, if first discard is wild or plus4 choose a random color to start, user starts their turn
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
user.startTurn();
