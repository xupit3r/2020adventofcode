#!/usr/local/bin/node

const fs = require('fs');

const PASSPORT_DATAFILE = './data/day4.txt';

const UNITS_CENTIMETERS = 'cm';
const UNITS_INCHES = 'in';

const EYE_COLORS = [
  'amb',
  'blu',
  'brn',
  'gry',
  'grn',
  'hzl',
  'oth'
].reduce((h, c) => { return h[c] = true, h }, {});

const REGEX_MEASUREMENT = /(^[0-9]*)(in|cm)$/;
const REGEX_HAIR_COLOR = /^#[0-9a-f]{6}$/;
const REGEX_PASSPORT_ID = /^[0-9]{9}$/;
const REGEX_FOUR_DIGIT = /^[0-9]{4}$/;

function parsePassportLine (line) {
  let tokens = line.split(' ');

  return tokens.reduce((obj, item) => {
    let [ key, value ] = item.split(':');

    obj[key] = value;

    return obj
  }, {});
}

function checkMeasurement ({ hgt }) {
  if (!hgt) {
    return false;
  }

  let results = hgt.match(REGEX_MEASUREMENT);

  if (results && results[0]) {
    let digits = results[1];
    let units = results[2];

    if (units === UNITS_CENTIMETERS) {
      return (
        +digits >= 150 &&
        +digits <= 193
      );
    } else if (units === UNITS_INCHES) {
      return (
        +digits >= 59 &&
        +digits <= 76
      );
    } else {
      return false;
    }
  } else {
    return false;
  }

}

function checkHairColor ({ hcl }) {
  if (!hcl) {
    return false;
  }

  return REGEX_HAIR_COLOR.test(hcl);
}

function checkEyeColor ({ ecl }) {
  if (!ecl) {
    return false;
  }

  return EYE_COLORS[ecl];
}

function checkPassportId ({ pid }) {
  if (!pid) {
    return false;
  }

  return REGEX_PASSPORT_ID.test(pid);
}

function isFourDigits (str) {
  if (!str) {
    return false;
  }

  return REGEX_FOUR_DIGIT.test(str);
}

function checkYears ({ byr, iyr, eyr }) {
  return (
    isFourDigits(byr) &&
    isFourDigits(iyr) &&
    isFourDigits(eyr) &&
    +byr >= 1920 &&
    +byr <= 2002 &&
    +iyr >= 2010 &&
    +iyr <= 2020 &&
    +eyr >= 2020 &&
    +eyr <= 2030
  );
}

function isValid (passport) {
  return (
    checkYears(passport) &&
    checkMeasurement(passport) &&
    checkHairColor(passport) &&
    checkEyeColor(passport) &&
    checkPassportId(passport)
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
