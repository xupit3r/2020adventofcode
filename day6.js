#!/usr/local/bin/node

const fs = require('fs');

const CUSTOMS_DATAFILE = './data/day6.txt';

function countResponses (group) {
  let answers = group.reduce((h1, person) => {
    return person.split('').reduce((h2, a) => {
      return h2[a] = true, h2;
    }, h1);
  }, {});

  return Object.keys(answers).length;
}

fs.readFile(CUSTOMS_DATAFILE, 'utf-8', (err, lines) => {
  let responses = [], group = [];

  if (err) {
    return console.error(err);
  }

  lines.split('\n').forEach((line, idx) => {
    if (idx && !line.trim().length) {
      responses.push(
        countResponses(group)
      );
      group = [];
    } else {
      group.push(line);
    }
  });

  let sum = responses.reduce((s, v) => {
    return s + v;
  }, 0);

  console.log(`sum of yes ${sum}`);
});
