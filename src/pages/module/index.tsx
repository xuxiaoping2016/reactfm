import React, { Component } from 'react';


import { StringValidator } from "./m_validation";
import { ZipCodeValidator } from "./m_zipCodeValidator";
import { LettersOnlyValidator } from "./m_lettersOnlyValidator";

let strings = ["Hello", "98052", "101"];

interface TVa { [s: string]: StringValidator; }

let validators:TVa = {};
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();

const keys = Object.keys(validators)
strings.forEach(s => {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
});

export default class ModuleDemo extends Component {
    componentDidMount(){
    

    }
    render(){
        return (
            <div>
                {strings.map((s => {
                    keys.map((name) => `"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }` )
                }))}
            </div>
        )
    }
}