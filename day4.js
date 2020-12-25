#!/usr/local/bin/node

const fs = require('fs');

const PASSPORT_DATAFILE = './data/day4.txt';

function parsePassportLine (line) {
  let tokens = line.split(' ');

  return tokens.reduce((obj, item) => {
    let [ key, value ] = item.split(':');

    obj[key] = value;

    return obj
  }, {});
}

function isValid (passport) {
  return (
    passport.byr &&
    passport.iyr &&
    passport.eyr &&
    passport.hgt &&
    passport.hcl &&
    passport.ecl &&
    passport.pid
  );
}

fs.readFile(PASSPORT_DATAFILE, 'utf-8', (err, lines) => {
  let passports = [], passportLines = [];

  if (err) {
    return console.error(err);
  }

  lines.split('\n').forEach((line, idx) => {
    if (idx && !line.trim().length) {
      passports.push(
        parsePassportLine(passportLines.join(' '))
      );
      passportLines = [];
    } else {
      passportLines.push(line);
    }
  });

  let valids = passports.filter(isValid);

  console.log(`number of valid passports is ${valids.length}`);
});
