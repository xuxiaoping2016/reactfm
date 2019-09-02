import React, { Component } from 'react';

export default class Enum extends Component {
    componentDidMount(){
        // interface Bird {
        //     fly():void;
        //     layEggs():void;
        // }
        
        // interface Fish {
        //     swim():void;
        //     layEggs():void;
        // }
        
        // function getSmallPet(): Fish | Bird {
        //     return {
        //         swim(){
        //             console.log('swim')
        //         },
        //         layEggs(){
        //             console.log('layEggs')
        //         }
        //     }
        // }
        
        // let pet = getSmallPet();
        // if ((pet as Fish).swim) {
        //     (pet as Fish).swim();
        // }
        // else if ((pet as Bird).fly) {
        //     (pet as Bird).fly();
        // }


        interface Animal {
            [propName:string]: string
        }
        // let pets = new Set(["Cat", "Dog", "Hamster"]);
        // pets["species"] = "mammals";

        // for (let pet in pets) {
        //     console.log(pet); // "species"
        // }

        // for (let pet of pets) {
        //     console.log(pet); // "Cat", "Dog", "Hamster"
        // }

    }
    render(){
        return (
            <div>高级类型</div>
        )
    }
}