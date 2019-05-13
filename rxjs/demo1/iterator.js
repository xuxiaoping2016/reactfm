// function IteratorFromArray(arr) {
//     if(!(this instanceof IteratorFromArray)) {
//         throw new Error('请用 new IteratorFromArray()!');
//     }
//     this._array = arr;    this._cursor = 0;   
// }

// IteratorFromArray.prototype.next = function() {
//     return this._cursor < this._array.length ?
//         { value: this._array[this._cursor++], done: false } :
//         { done: true };
// }


class IteratorFromArray {    
    constructor(arr) {
        this._array = arr;
        this._cursor = 0;
    }

    next() {
        return this._cursor < this._array.length ?
        { value: this._array[this._cursor++], done: false } :
        { done: true };
    }

    map(callback) {
        const iterator = new IteratorFromArray(this._array);
        return { 
            next: () => {
                const { done, value } = iterator.next();
                return { done: done,value: done ? undefined : callback(value) }
            }
        }
    }
}
var iterator = new IteratorFromArray([1,2,3]);
var newIterator = iterator.map(value => value + 3);

// console.log(newIterator.next())
// console.log(newIterator.next())
// console.log(newIterator.next())
// console.log(newIterator.next())
// { value: 4, done: false }newIterator.next();
// { value: 5, done: false }newIterator.next();
// { value: 6, done: false }


function* getNumbers(words) {
    for (let word of words) {
        if (/^[0-9]+$/.test(word)) {
            yield parseInt(word, 10);
        }
    }
}

const iterator = getNumbers('30 天精通 RxJS (04)');

iterator.next();    // { value: 3, done: false }
iterator.next();    // { value: 0, done: false }
iterator.next();    // { value: 0, done: false }
iterator.next();    // { value: 4, done: false }
iterator.next();    // { value: undefined, done: true }