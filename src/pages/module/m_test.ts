/// <reference path="m_validation.ts" />
/// <reference path="m_lettersOnlyValidator.ts" />
/// <reference path="m_zipCodeValidator.ts" />

// Some samples to try
let strings = ["Hello", "98052", "101"];
console.log("Validation",Validation)
// Validators to use
let validators: { [s: string]: Validation.StringValidator} = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}