import React, { Component } from 'react';

let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
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