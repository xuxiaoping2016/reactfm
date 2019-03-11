import React, { Component } from 'react';


import { StringValidator } from "./m_validation";
import { ZipCodeValidator } from "./m_zipCodeValidator";
import { LettersOnlyValidator } from "./m_lettersOnlyValidator";

let strings = ["Hello", "98052", "101"];

let validators: { [s: string]: StringValidator; } = {};
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();

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
            <div>typescript 模块</div>
        )
    }
}