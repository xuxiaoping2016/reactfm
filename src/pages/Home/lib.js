// var counter = 3;
// function incCounter() {
//   counter++;
// }
// module.exports = {
//   get counter(){
//       return counter
//   },
//   incCounter: incCounter,
// };


export var counter = 3;
export function incCounter() {
  counter++;
}

export var foo = 'bar';
setTimeout(() => foo = 'baz', 1000);
