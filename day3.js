#!/usr/local/bin/node

const data = require('./data/day3');

const TREE = '#';

function checkSlope (x, y) {

  let position = 0;
  let treeCount = 0;

  data.forEach((line, idx, arr) => {
    if (idx % y === 0) {
      if (line.charAt(position) === TREE) {
        treeCount++;
      }

      if (arr[idx + y]) {
        position = ((position + x) > (arr[idx + 1].length - 1)
          ? (position + x) - (arr[idx + 1].length)
          : (position + x)
        );
      }
    }
  });

  return treeCount;
}

let slope1 = checkSlope(1, 1);
let slope2 = checkSlope(3, 1);
let slope3 = checkSlope(5, 1);
let slope4 = checkSlope(7, 1);
let slope5 = checkSlope(1, 2);
let product = (
  slope1 *
  slope2 *
  slope3 *
  slope4 *
  slope5
);

console.log(`Right 1, down 1. -> ${slope1}`);
console.log(`Right 3, down 1. -> ${slope2}`);
console.log(`Right 5, down 1. -> ${slope3}`);
console.log(`Right 7, down 1. -> ${slope4}`);
console.log(`Right 1, down 2. -> ${slope5}`);

console.log(`product ${product}`);
