#!/usr/local/bin/node

const input = require('./data/day9');

const PREAMBLE_SIZE = 25;

// checks if a pair of numbers sum to a given number in an
// array of other numbers, vague enough, joe? :)
function hasPair (num, previous) {
  let found = false;

  for (let i = 0; i < previous.length && !found; i++) {
    let current = previous[i];
    let other = num - current;

    if (other > 0 && previous.slice(i).indexOf(other) > -1) {
      found = true;
    }
  }

  return found;
}

function findWeakness (num, list) {
  let found = false;
  let group = [];

  for (let i = 0; i < list.length && !found; i++) {
    let sum = list[i];
    let j = i + 1;

    group = [ list[i] ];

    while (sum < num && !found) {
      sum += list[j];
      group.push(list[j]);

      if (sum === num) {
        found = true;
      }

      j++;
    }
  }

  let sorted = group.sort();
  let first = sorted[0];
  let last = sorted[sorted.length - 1];

  return first + last;
}

let found = false;
let value = -1;
for (let i = PREAMBLE_SIZE; i < input.length && !found; i++) {
  let num = input[i];
  let previous = input.slice(
    i - PREAMBLE_SIZE,
    i + PREAMBLE_SIZE
  );

  if (!hasPair(num, previous)) {
    found = true;
    value = num;
  }
}

let weakness = findWeakness(value, input);

console.log(`number is ${value}`);
console.log(`weakness is ${weakness}`);
