#!/usr/local/bin/node

const fs = require('fs');

const CUSTOMS_DATAFILE = './data/day6.txt';

function countResponses (group) {
  let answers = group.reduce((h1, person) => {
    return person.split('').reduce((h2, a) => {
      if (!h2[a]) {
        h2[a] = 0;
      }

      h2[a]++;

      return h2;
    }, h1);
  }, {});

  // only answers that are valid are the ones for
  // which everyone answered "yes"
  let valids = Object.keys(answers).filter(key => {
    return answers[key] === group.length;
  })

  return Object.keys(valids).length;
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
