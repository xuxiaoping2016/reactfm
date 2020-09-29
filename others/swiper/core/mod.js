// Extended version of % with negative integer support.
function mod(n, m) {
  const q = n % m;
  return q < 0 ? q + m : q;
}

export default mod;


// mod(10,4)  2
// mod(10,4)  2