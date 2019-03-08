// export var firstName = 'Michael';
// export var lastName = 'Jackson';
// export var year = 1958;
// export function multiply(x, y) {
//     return x * y;
//   };

var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
function multiply(x, y) {
    return x * y;
  };

function multiply2(x, y) {
return `multiply2${x * y}`;
};


export { firstName, lastName, year, multiply};

export default { firstName, lastName, year, multiply2 }
// import {ht} from './profile.js'
