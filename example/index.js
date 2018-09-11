const dice = document.querySelector('rpg-die');
document.querySelector('#die-expression').addEventListener('change', ({target: {value}}) => {
  dice.setAttribute('dice-string', value); 
});
