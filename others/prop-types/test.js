function has(obj){
    return Object.prototype.hasOwnProperty.bind(obj);
}

let obj ={
    age : 18,
    name: 'xuxi'
}
// let has1 = has(obj)
// console.log(has1('age'), has1('fff'), has1('name'))

var hav = Function.call.bind(Object.prototype.hasOwnProperty);

// function d(obj,key){
//     return Object.prototype.hasOwnProperty.call(obj,key)
// }
// console.log(hav(obj,'age'), hav(obj,'fff'), hav(obj,'name'))


// console.log(Function.call == Function.prototype.call)


// function is(x, y) {
//     // SameValue algorithm
//     if (x === y) {
//       // Steps 1-5, 7-10
//       // Steps 6.b-6.e: +0 != -0
//       return x !== 0 || 1 / x === 1 / y;
//     } else {
//       // Step 6.a: NaN == NaN
//       return x !== x && y !== y;
//     }
//   }

//   console.log(is(NaN,NaN))


// ============================================================================

// console.log(Function.prototype.apply.call(Math.floor, undefined, [1.75])) // 1

// console.log(Math.floor.apply(undefined,[1.74]))

// ============================================================================

var myObject = {
    foo: 4,
    set bar(value) {
      return this.foo = value;
    },
  };
  
  var myReceiverObject = {
    foo: 0,
  };
  
  Reflect.set(myObject, 'bar', 1, myReceiverObject);
  console.log(myObject.foo) // 4
  console.log(myReceiverObject.foo) // 1

// ============================================================================



// ============================================================================




// ============================================================================




// ============================================================================


// ============================================================================
