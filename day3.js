#!/usr/local/bin/node

const data = require('./data/day3');

const TREE = '#';

let position = 0;
let treeCount = 0;

data.forEach((line, idx, arr) => {
  if (line.charAt(position) === TREE) {
    treeCount++;
  }

  if (arr[idx + 1]) {
    position = ((position + 3) > (arr[idx + 1].length - 1)
      ? (position + 3) - (arr[idx + 1].length)
      : (position + 3)
    );
  }
});

console.log(`encountered ${treeCount} trees.`);
