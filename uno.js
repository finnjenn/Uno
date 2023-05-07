const deck = {
    cards: [
        {number:0, color:'red'},{number:1, color:'red'},{number:1, color:'red'},{number:2, color:'red'},
        {number:2, color:'red'},{number:3, color:'red'},{number:3, color:'red'},{number:4, color:'red'},
        {number:4, color:'red'},{number:5, color:'red'},{number:5, color:'red'},{number:6, color:'red'},
        {number:6, color:'red'},{number:7, color:'red'},{number:7, color:'red'},{number:8, color:'red'},
        {number:8, color:'red'},{number:9, color:'red'},{number:9, color:'red'},{number:'reverse', color:'red'},
        {number:'reverse', color:'red'},{number:'skip', color:'red'},{number:'skip', color:'red'},{number:'plus2', color:'red'},
        {number:'plus2', color:'red'},
        {number:0, color:'blue'},{number:1, color:'blue'},{number:1, color:'blue'},{number:2, color:'blue'},
        {number:2, color:'blue'},{number:3, color:'blue'},{number:3, color:'blue'},{number:4, color:'blue'},
        {number:4, color:'blue'},{number:5, color:'blue'},{number:5, color:'blue'},{number:6, color:'blue'},
        {number:6, color:'blue'},{number:7, color:'blue'},{number:7, color:'blue'},{number:8, color:'blue'},
        {number:8, color:'blue'},{number:9, color:'blue'},{number:9, color:'blue'},{number:'reverse', color:'blue'},
        {number:'reverse', color:'blue'},{number:'skip', color:'blue'},{number:'skip', color:'blue'},{number:'plus2', color:'blue'},
        {number:'plus2', color:'blue'},
        {number:0, color:'green'},{number:1, color:'green'},{number:1, color:'green'},{number:2, color:'green'},
        {number:2, color:'green'},{number:3, color:'green'},{number:3, color:'green'},{number:4, color:'green'},
        {number:4, color:'green'},{number:5, color:'green'},{number:5, color:'green'},{number:6, color:'green'},
        {number:6, color:'green'},{number:7, color:'green'},{number:7, color:'green'},{number:8, color:'green'},
        {number:8, color:'green'},{number:9, color:'green'},{number:9, color:'green'},{number:'reverse', color:'green'},
        {number:'reverse', color:'green'},{number:'skip', color:'green'},{number:'skip', color:'green'},{number:'plus2', color:'green'},
        {number:'plus2', color:'green'},
        {number:0, color:'yellow'},{number:1, color:'yellow'},{number:1, color:'yellow'},{number:2, color:'yellow'},
        {number:2, color:'yellow'},{number:3, color:'yellow'},{number:3, color:'yellow'},{number:4, color:'yellow'},
        {number:4, color:'yellow'},{number:5, color:'yellow'},{number:5, color:'yellow'},{number:6, color:'yellow'},
        {number:6, color:'yellow'},{number:7, color:'yellow'},{number:7, color:'yellow'},{number:8, color:'yellow'},
        {number:8, color:'yellow'},{number:9, color:'yellow'},{number:9, color:'yellow'},{number:'reverse', color:'yellow'},
        {number:'reverse', color:'yellow'},{number:'skip', color:'yellow'},{number:'skip', color:'yellow'},{number:'plus2', color:'yellow'},
        {number:'plus2', color:'yellow'},
        {number:'wild', color:'black'},{number:'wild', color:'black'},{number:'wild', color:'black'},{number:'wild', color:'black'},
        {number:'wild', color:'black'},{number:'wild', color:'black'},{number:'wild', color:'black'},{number:'wild', color:'black'},
        {number:'plus4', color:'black'},{number:'plus4', color:'black'},{number:'plus4', color:'black'},{number:'plus4', color:'black'},
    ],
    shuffle: function() {
        this.cards.sort(() => Math.random() - 0.5);
    },
    isEmpty: function() {
        if (this.cards.length === 0) return true;
        else return false;
    },
    removeCard: function() {
        return this.cards.pop();
    },
}
const discard = {
    cards: [],
    topCard: this.cards[this.cards.length - 1],
}
const user = {
    hand: [],
    handCount: this.userHand.length,
}
const cpu1 = {
    nickname: '',
    hand: [],
    cardCount: this.hand.length,
}
const cpu2 = {
    nickname: '',
    hand: [],
    cardCount: this.hand.length,
}
const cpu3 = {
    nickname: '',
    hand: [],
    cardCount: this.hand.length,
}
const createCardFaceUp = function(card) {
    let isWild = false;
    let isPlus4 = false;
    if (card.number === 'wild') isWild = true;
    if(card.number == 'plus4') isPlus4 = true;
    let newCard = document.createElement('div');
    newCard.className = `card ${card.color}`;
    let oval = document.createElement('div');
    oval.className = 'oval';
    if(isPlus4) oval.className = 'oval rainbow';
    let img = document.createElement('img');
    img.src = `icons/${card.number}_${card.color}.png`;
    if (isWild) img.setAttribute('width', '40px');
    newCard.appendChild(oval);
    newCard.appendChild(img);
    return newCard;
}