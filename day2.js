#!/usr/local/bin/node

const data = require('./data/day2.js');

function policy1 ({ policy, password }) {
  let numOccurances = password.split('').filter(c => c === policy.letter).length;

  return (
    numOccurances >= policy.low &&
    numOccurances <= policy.high
  );
}

function policy2 ({ policy, password }) {
  return (
    password[policy.low - 1] === policy.letter &&
    password[policy.high - 1] !== policy.letter
  ) || (
    password[policy.low - 1] !== policy.letter &&
    password[policy.high - 1] === policy.letter
  );
}


const validPasswords = data.map((str) => {
  let [ policy, password ] = str.split(':');
  let [ bounds, letter ] = policy.split(' ');
  let [low, high ] = bounds.split('-');

  return {
    password: password.trim().toLowerCase(),
    policy: {
      low: low,
      high: high,
      letter: letter
    }
  };
}).filter(policy2);


console.log(`${validPasswords.length} valid passwords.`);
