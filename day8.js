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
    line: 0,
    accumulator: 0,
    executed: {},
    instructions: str.trim().split('\n').map(parseLine),
    mutated: [],
    mutatedLine: 0,
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
    reset () {
      this.line = 0;
      this.accumulator = 0;
      this.executed = {};
    },
    getAccumulator () {
      return this.accumulator;
    },
    getNextInstruction (useMutate) {
      if (useMutate) {
        return this.mutated[this.line];
      } else {
        return this.instructions[this.line];
      }
    },
    mutate () {
      let found = false;

      this.reset();

      this.mutated = this.instructions.slice().map((ins, idx) => {
        let cmd = ins.command;

        if ((ins.command === 'nop' || ins.command === 'jmp') &&
            idx > this.mutatedLine &&
            !found) {
          found = true;
          this.mutatedLine = idx;

          return {
            ...ins,
            command: (ins.command === 'nop'
              ? 'jmp'
              : 'nop'
            )
          };
        } else {
          return ins;
        }
      });
    },
    exec (instruction) {
      // run the command
      this.commands[instruction.command].apply(this, instruction.args);

      // mark the command as executed
      this.executed[instruction.lineNumber] = true;
    },
    hasNextInstruction () {
      return !!this.getNextInstruction();
    },
    alreadyExecuted () {
      return this.executed[this.line];
    },
    run (useMutate) {
      // return console.log(this.instructions);
      while (this.hasNextInstruction() && !this.alreadyExecuted()) {
        let instruction = this.getNextInstruction(useMutate);

        console.log(`${instruction.lineNumber}. ${instruction.str}`);
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

  while (program.hasNextInstruction()) {
    program.mutate();
    program.run(true);
  }

  console.log(`FINAL accumulator value ${program.getAccumulator()}`);
});
