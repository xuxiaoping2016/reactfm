// import { StringValidator } from "./m_validation";
// import { ZipCodeValidator } from "./m_zipCodeValidator";
// import { LettersOnlyValidator } from "./m_lettersOnlyValidator";

// // Some samples to try
// let strings = ["Hello", "98052", "101"];

// // Validators to use
// let validators: { [s: string]: StringValidator; } = {};
// validators["ZIP code"] = new ZipCodeValidator();
// validators["Letters only"] = new LettersOnlyValidator();

// // Show whether each string passed each validator
// strings.forEach(s => {
//     for (let name in validators) {
//         console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
//     }
// });



/// <reference path="m_validation.ts" />
/// <reference path="m_lettersOnlyValidator.ts" />
/// <reference path="m_zipCodeValidator.ts" />

// Some samples to try
let strings2 = ["Hello", "98052", "101"];

// Validators to use
let validators2: { [s: string]: Validation.StringValidator; } = {};
validators2["ZIP code"] = new Validation.ZipCodeValidator();
validators2["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings2) {
    for (let name in validators2) {
        console.log(`"${ s }" - ${ validators2[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}