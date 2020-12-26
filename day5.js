#!/usr/local/bin/node
const passes = require('./data/day5');

const ROW_UPPER = 'B';
const COL_UPPER = 'R';

function hone (moves, range, upperChar) {
  // if we are down to the last
  if (moves.length === 1) {
    if (moves.charAt(0) === upperChar) {
      return range[1]
    } else {
      return range[0]
    }
  }

  // upper or lower half?
  if (moves.charAt(0) === upperChar) {
    range[0] = range[0] + Math.ceil((range[1] - range[0]) / 2);
  } else {
    range[1] = range[1] - Math.ceil((range[1] - range[0]) / 2);

  }

  return hone(moves.slice(1), range, upperChar);
}


function findSeat (pass) {
  let row = hone(pass.slice(0, 7), [0, 127], ROW_UPPER);
  let column = hone(pass.slice(7), [0, 7], COL_UPPER);

  return {
    pass: pass,
    row: row,
    column: column,
    seatId: (row * 8) + column
  };
}

const results = passes.map(findSeat).sort((a, b) => b.seatId - a.seatId);

console.log(`highest seat id is ${results[0].seatId}`);
