import React, { Component } from 'react';

interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}

let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

interface StringArray {
    [key:number]:number,
    name:string
}

let arr3: StringArray = {
    name: 'fdfd',
    0:12
}

class Functions extends Component {
    componentDidMount(){
        
    }
    render() {
        let cardPicker = deck.createCardPicker();
        let pickedCard = cardPicker();
        return <h1>{"card: " + pickedCard.card + " of " + pickedCard.suit}</h1>;
    }
}
export default Functions;