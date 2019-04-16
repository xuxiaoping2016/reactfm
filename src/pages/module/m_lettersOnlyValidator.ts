// import { StringValidator } from "./m_validation";

// const lettersRegexp = /^[A-Za-z]+$/;

// export class LettersOnlyValidator implements StringValidator {
//     isAcceptable(s: string) {
//         return lettersRegexp.test(s);
//     }
// }

/// <reference path="m_validation.ts" />
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}