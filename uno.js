const cpuNames = {
    names: ['Elon Musk', 'Jeff Bezos', 'Joe Biden', 'Ur Mom', 'Your Firstborn', 'Garfield', 'Derek Zoolander', 'Oprah Winfrey', 'Thanks Obama', 'Light Yagami', 'Ash Ketchum', 'Pikachu', 'Katy Perry', 'Zendaya', 'Ice Cube', 'Eminem', 'Pedro Pascal', 'Baby Yoda', 'Vladimir Putin', 'Gwyneth Paltrow', 'Gwen Stefani', 'Gwendolyn Christie', 'Jenna Ortega', 'Scott Pilgrim', 'Aubrey Plaza', 'Mario Mario', 'Luigi Mario', 'Monkey Luffy', 'Son Goku', 'Gon Freecss', 'Killua Zoldyk', 'Roronoa Zoro', 'Orlando Bloom', 'Nick Cannon', 'Kanye West'],
    shuffle: function() {
        console.log('Shuffling cpu names');
        this.names.sort(() => Math.random() - 0.5);
    },
    removeName: function() {
        const removed = this.names.pop();
        console.log(`Popping ${removed} from names array`);
        return removed;
    }
}
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
        console.log('Shuffling Cards')
        this.cards.sort(() => Math.random() - 0.5);
    },
    isEmpty: function() {
        if (this.cards.length === 0) return true;
        else return false;
    },
    removeCard: function() {
        const removed = this.cards.pop();
        console.log(`Popping ${removed.number} ${removed.color} from deck array`)
        return removed;
    },
}
const discard = {
    cards: [],
    // topCard: this.cards[this.cards.length - 1],
}
const user = {
    hand: [],
    // handCount: this.hand.length,
    cardBoxElement: document.getElementById('userCardBox'),
}
const cpu1 = {
    identifier: 'cpu1',
    cardBoxElement: document.getElementById('cpu1'),
    nickname: '',
    hand: [],
    // cardCount: this.hand.length,
}
const cpu2 = {
    identifier: 'cpu2',
    cardBoxElement: document.getElementById('cpu2'),
    nickname: '',
    hand: [],
    // cardCount: this.hand.length,
}
const cpu3 = {
    identifier: 'cpu3',
    cardBoxElement: document.getElementById('cpu3'),
    nickname: '',
    hand: [],
    // cardCount: this.hand.length,
}
const createCardFaceUp = function(card) {
    let isWild = false;
    let isPlus4 = false;
    if (card.number === 'wild') isWild = true;
    if(card.number == 'plus4') isPlus4 = true;
    let newCard = document.createElement('div');
    newCard.className = `cardFaceUp ${card.color}`;
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
deck.shuffle();
cpuNames.shuffle();
cpu1.nickname = cpuNames.removeName();
cpu2.nickname = cpuNames.removeName();
cpu3.nickname = cpuNames.removeName();
console.log(cpu1.nickname);
console.log(cpu2.nickname);
console.log(cpu3.nickname);
user.cardBoxElement.appendChild(createCardFaceUp(deck.removeCard()));
user.cardBoxElement.appendChild(createCardFaceUp(deck.removeCard()));
user.cardBoxElement.appendChild(createCardFaceUp(deck.removeCard()));
user.cardBoxElement.appendChild(createCardFaceUp(deck.removeCard()));
user.cardBoxElement.appendChild(createCardFaceUp(deck.removeCard()));
user.cardBoxElement.appendChild(createCardFaceUp(deck.removeCard()));
user.cardBoxElement.appendChild(createCardFaceUp(deck.removeCard()));