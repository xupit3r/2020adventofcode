#!/usr/local/bin/node

const data = require('./data/day1.js');

const lookup = data.reduce((h, num) => {
  return h[num] = num, h;
}, {});

let numbers = [];
let found = false;

for (let i = 0; i < data.length && !found; i++) {
  for (let j = 0; j < data.slice(i).length && !found; j++) {
    let diff = 2020 - (data[i] + data[j]);

    if (lookup[diff]) {
      console.log(`one/two/three -> ${data[i]}/${data[j]}/${lookup[diff]}`);
      console.log(data[i] * data[j] * lookup[diff]);
      found = true;
    }
  }
}
