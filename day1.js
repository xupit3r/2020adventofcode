#!/usr/local/bin/node

const data = require('./data/day1.js');

const lookup = data.reduce((h, num) => {
  return h[num] = num, h;
}, {})

for (let i = 0; i < data.length; i++) {
  let diff = 2020 - data[i];

  if (lookup[diff]) {
    console.log(`one/two -> ${data[i]}/${lookup[diff]}`);
    console.log(data[i] * lookup[diff]);
    break;
  }
}
