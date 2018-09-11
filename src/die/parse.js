import Die from './die';
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;

export default function parseDiceString(diceString, randomPlus) {
  let tree = {
    operators: [],
    dice: [],
  }

  if (!diceString) {
    return tree;
  }

  tree = diceString.replace(/\s/, '')
    .split(/([\+-])/)
    .reduce((tree, curr) => {
      if (curr === '+') {
        tree.operators.push(add);
      } else if (curr === '-') {
        tree.operators.push(subtract);
      } else if (curr.indexOf('d') === -1 && parseInt(curr, 10)) {
        tree.dice.push(parseInt(curr, 10));
      } else if (curr.indexOf('d') !== 0) {
        const [numDice, sides] = curr.split('d');
        for (var i = 0; i<numDice; i++) {
          tree.dice.push(new Die(sides, randomPlus));
          tree.operators.push(add);
        }
      } else if (curr.indexOf('d') === 0) {
        tree.dice.push(new Die(curr.slice(0), randomPlus));
      } else {
        throw new Error(`BAD DICE STRING ${diceString} ${curr}`);
      }
      
      if (tree.operators.length !== tree.dice.length) {
        tree.operators.push(add);
      }

      return tree;
    }, tree);

  return tree; 
}
