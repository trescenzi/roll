import Die from './die';
export const add = (x, y) => x + y;
export const subtract = (x, y) => x - y;

export function parseDiceString(diceString, randomPlus) {
  let tree = {
    operators: [],
    dice: [],
    operatorsText: [],
  }

  if (!diceString) {
    return tree;
  }

  tree = diceString.replace(/\s/, '')
    .split(/([\+-])/)
    .reduce((tree, curr) => {
      if (curr === '+') {
        tree.operators.push(add);
        tree.operatorsText.push('+');
      } else if (curr === '-') {
        tree.operators.push(subtract);
        tree.operatorsText.push('-');
      } else if (curr.indexOf('d') === -1 && parseInt(curr, 10)) {
        tree.dice.push(parseInt(curr, 10));
      } else if (curr.indexOf('d') !== 0) {
        const [numDice, sides] = curr.split('d');
        const operator = tree.operators[tree.operators.length - 1] || add;
        for (var i = 0; i<numDice; i++) {
          tree.dice.push(new Die(sides, randomPlus));
          if (i !== 0) {
            tree.operators.push(operator);
            tree.operatorsText.push(operator.name === 'add' ? '+' : '-');
          }
        }
      } else if (curr.indexOf('d') === 0) {
        tree.dice.push(new Die(curr.slice(1), randomPlus));
      } else {
        throw new Error(`BAD DICE STRING ${diceString} ${curr}`);
      }
      
      if (tree.operators.length < tree.dice.length) {
        tree.operators.push(add);
        tree.operatorsText.push('+');
      }

      return tree;
    }, tree);

  return tree; 
}

export function rollDice({dice, operators, operatorsText}) {
  let rollText = ''
  return dice
    .map((d) => d.roll ? d.roll() : d)
    .reduce(({sum, text}, roll, i) => {
      return {
        sum: operators[i](sum,roll),
        text: `${text} ${i === 0 ? '' : operatorsText[i]} ${roll}`
      }
    }, {sum: 0, text: ''});
}
