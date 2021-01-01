#!/usr/local/bin/node

const fs = require('fs');

const BOOT_CODE = './data/day8.txt';

function parseLine (str, idx) {
  let [ command, amount ] = str.split(' ');

  return {
    lineNumber: idx,
    str: str,
    command: command,
    args: [ Number(amount) ]
  };
}

function getProgram (str) {
  return {
    running: false,
    line: 0,
    accumulator: 0,
    visited: {},
    instructions: str.split('\n').map(parseLine),
    commands: {
      nop () {
        this.line = this.line + 1;
      },
      acc (amount) {
        this.accumulator = this.accumulator + amount;
        this.line = this.line + 1;
      },
      jmp (amount) {
        this.line = this.line + amount;
      }
    },
    getAccumulator () {
      return this.accumulator;
    },
    getNextInstruction () {
      return this.instructions[this.line]
    },
    exec (instruction) {
      // run the command
      this.commands[instruction.command].apply(this, instruction.args);

      // mark the command as visited
      this.visited[instruction.lineNumber] = true;
    },
    shouldContinue () {
      return !this.visited[this.line];
    },
    run () {
      // return console.log(this.instructions);
      while (this.shouldContinue()) {
        let instruction = this.getNextInstruction();

        console.log(instruction.str);
        this.exec(instruction);
      }
    }
  }
}

fs.readFile(BOOT_CODE, 'utf-8', (err, str) => {
  if (err) {
    return console.error(err);
  }

  let program = getProgram(str);

  program.run();

  console.log(program.getAccumulator());
});
