const die = document.querySelector('rpg-die');
const expression = document.querySelector('#die-expression');
expression.addEventListener('change', ({target: {value}}) => {
  die.setAttribute('dice-string', value); 
});

function constructListItem() {
  const container = document.createElement('div');
  container.classList.add('list-item');
  const sumHeader = document.createElement('div');
  sumHeader.classList.add('list-item-header');
  const fullRoll = document.createElement('div');
  fullRoll.classList.add('roll-text');
  container.append(sumHeader);
  container.append(fullRoll);
  container.addEventListener('click', function() { 
    expression.value = this.dieExpression;
    die.setAttribute('dice-string', this.dieExpression);
  });
  return container;
}

function fillListItem(listItem, text) {
  listItem.querySelector('.list-item-header').innerText = expression.value;
  listItem.querySelector('.roll-text').innerText = text;
  listItem.dieExpression = expression.value;
  return listItem;
}

const listItems = [];
const list = document.querySelector('#list');
die.addEventListener('roll', ({detail: {dice, text, sum}}) => {
  let listItem = listItems[9];
  if (!listItem) {
    listItem = constructListItem();
    listItems.push(listItem);
  } else {
    listItem.remove();
  }

  list.prepend(fillListItem(listItem, text, sum));
});
