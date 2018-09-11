import Die from './die.js';
import {parseDiceString, rollDice, add, subtract} from './parse.js';

describe('parsing die strings', () => {
  describe('common 1 die dice strings', () => {
    it('works with 1d4', () => {
      expect(parseDiceString('1d4')).toEqual({
        operators: [add],
        dice: [new Die(4)],
        operatorsText: ['+'],
      });
    });

    it('works with 1d6', () => {
      expect(parseDiceString('1d6')).toEqual({
        operators: [add],
        dice: [new Die(6)],
        operatorsText: ['+'],
      });
    });

    it('works with 1d8', () => {
      expect(parseDiceString('1d8')).toEqual({
        operators: [add],
        dice: [new Die(8)],
        operatorsText: ['+'],
      });
    });

    it('works with 1d10', () => {
      expect(parseDiceString('1d10')).toEqual({
        operators: [add],
        dice: [new Die(10)],
        operatorsText: ['+'],
      });
    });

    it('works with 1d12', () => {
      expect(parseDiceString('1d12')).toEqual({
        operators: [add],
        dice: [new Die(12)],
        operatorsText: ['+'],
      });
    });

    it('works with 1d20', () => {
      expect(parseDiceString('1d20')).toEqual({
        operators: [add],
        dice: [new Die(20)],
        operatorsText: ['+'],
      });
    });

    it('works with 1d100', () => {
      expect(parseDiceString('1d100')).toEqual({
        operators: [add],
        dice: [new Die(100)],
        operatorsText: ['+'],
      });
    });

    it('works if theres no 1', () => {
      expect(parseDiceString('d100')).toEqual({
        operators: [add],
        dice: [new Die(100)],
        operatorsText: ['+'],
      });
    });

    describe('with simple modifiers', () => {
      it('handles simple positive modifiers', () => {
        const result = {
          operators: [add, add],
          dice: [new Die(20), 1],
          operatorsText: ['+', '+'],
        };
        expect(parseDiceString('1d20 + 1')).toEqual(result);
        expect(parseDiceString('1d20+1')).toEqual(result);
        expect(parseDiceString('1d20 +1')).toEqual(result);
        expect(parseDiceString('1d20+ 1')).toEqual(result);
      });

      it('handles simple negative modifiers', () => {
        const result = {
          operators: [add, subtract],
          dice: [new Die(20), 1],
          operatorsText: ['+', '-'],
        };
        expect(parseDiceString('1d20 - 1')).toEqual(result);
        expect(parseDiceString('1d20-1')).toEqual(result);
        expect(parseDiceString('1d20 -1')).toEqual(result);
        expect(parseDiceString('1d20- 1')).toEqual(result);
      });
    });
  });

  describe('complex die strings', () => {
    it('work with a single die multiple time', () => {
      expect(parseDiceString('4d6')).toEqual({
        operators: [add, add, add, add],
        dice: [new Die(6), new Die(6), new Die(6), new Die(6)],
        operatorsText: ['+', '+', '+', '+'],
      });
    });

    it('works with multiple dice multiple times', () => {
      expect(parseDiceString('2d4 + 3d6 - 2d8')).toEqual({
        operators: [add, add, add, add, add, subtract, subtract],
        dice: [new Die(4), new Die(4), new Die(6), new Die(6), new Die(6), new Die(8), new Die(8)],
        operatorsText: ['+', '+', '+', '+', '+', '-', '-'],
      });
    });
  });
});
