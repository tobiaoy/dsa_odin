// write a recursive fn for fib sequences
// base case - if there are 1 or two items
// every value is the sum of the previous 2 items
// need the whole array of values

const fibsRec = (n) => {
    if (n < 0) {
      return [];
    } else if (n == 0) {
      return [0];
    } else if (n == 1 || n == 2) {
      return [0, 1];
    } else {
      let seq = fibsRec(n - 1);
      seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
      return seq;
    }
  }
  
  let test = fibsRec(8);
  console.log(test);
  