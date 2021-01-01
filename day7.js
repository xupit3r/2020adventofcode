#!/usr/local/bin/node

const fs = require('fs');

const BAG_RULES = './data/day7.txt';

const SHINY_GOLD = 'shiny gold';

const MAIN_REGEX = /(.*) bags contain (.*)\./;
const CONTAINS_REGEX = /([0-9]*) (.*) (bags|bag)/;

function parseContains (str) {
  let matched = str.trim().match(CONTAINS_REGEX);
  let quantity = +matched[1];
  let type = matched[2].trim();

  if (!quantity) {
    return;
  }

  return {
    type: matched[2].trim(),
    quantity: +matched[1]
  };
}

function parseRule (str) {
  let matched = str.match(MAIN_REGEX);

  return {
    type: matched[1].trim(),
    contains: matched[2].split(',').map(parseContains).filter(c => c)
  }
}

fs.readFile(BAG_RULES, 'utf-8', (err, str) => {
  if (err) {
    return console.error(err);
  }

  // build a lookup
  let lookup = str.split('\n')
                  .filter(s => s.trim().length > 0)
                  .map(parseRule)
                  .reduce((h, bag) => {
                    return h[bag.type] = bag, h;
                  }, {});

  // check if a bag can eventually contain a certain type of bag
  function eventuallyContains (bag, type = SHINY_GOLD, canContain = false) {
    if (!bag.contains.length) {
      return false;
    } else if (bag.contains.find(b => b.type === type)) {
      return true;
    }

    return canContain || bag.contains.reduce((flag, b) => {
      return flag || eventuallyContains(lookup[b.type], type, canContain);
    }, false);
  }

  let containsShinyGold = Object.values(lookup).map(bag => {
    return {
      type: bag.type,
      canContain: eventuallyContains(bag)
    }
  }).filter(bag => bag.canContain);

  console.log(`there are ${containsShinyGold.length} bags.`);
});
