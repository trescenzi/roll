import Die from '../die/die';
import {parseDiceString, rollDice} from '../die/parse';

const styles = `
  :host {
    display: inline-block;
    font-family: sans;
  }

  #result {
    user-select: none;
    border: 3px solid white;
    border-radius: 3px;
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    padding: 0.5em;
    width: 3em;
    height: 2.25em;
    box-sizing: border-box;
    display: block;
    line-height: 1.25;
    border: 3px solid lightgrey;
    position: relative;
  }

  :host(.bad) #result {
    border: 3px solid tomato;
  }

  :host(.low) #result {
    border: 3px solid goldenrod;
  }

  :host(.ok) #result {
    border: 3px solid cadetblue;
  }

  :host(.great) #result {
    border: 3px solid mediumseagreen;
  }

  #roll {
    outline: none;
    margin-top: 1em;
    width: 100%;
    border: 1px solid lightgrey;
    font-size: 1rem;
    padding: 0.5em .25em;
  }

  #more-info {
    position: absolute;
    font-size: .25em;
    bottom: 10px;
    right: 10px;
  }

  #more-info:hover {
    color: cadetblue;
  }

  #dropdown {
    position: absolute;
    bottom: -1em;
    right: -1em;
    font-size: 0.25em;
    border: 1px solid lightgray;
    padding: 0.25em;
    background-color: white;
  }

  #dropdown.hidden {
    display: none;
  }
`;

const html = `
  <style>
    ${styles}
  </style>
  <div id="result">
    <span id="text-result">00</span>
    <span id="more-info">○○○</span>
    <div class="hidden" id="dropdown">
      See the Dice rolled here
    </div>
  </div>
  <button id="roll" type="button">
    Roll
  </button>
`;


const template = document.createRange().createContextualFragment(html);
export default class RpgDiceComponent extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'dice-string'];
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(template.cloneNode(true))

    this.resultsDiv = this.shadowRoot.querySelector('#result');
    this.resultsText = this.shadowRoot.querySelector('#text-result');
    this.rollButton = this.shadowRoot.querySelector('#roll');

    this.setupDropdown();
    this.rollButton.addEventListener('click', () => {
      const {sum, text} = this.roll();
      this.removeClasses();
      this.setResultClass(sum);
      this.resultsText.innerText = sum;
      this.shadowRoot.querySelector('#dropdown').innerText = text;
    });
  }

  setupDropdown() {
    const ellipsis = this.shadowRoot.querySelector('#more-info');
    const dropdown = this.shadowRoot.querySelector('#dropdown');
    const hideDropdown = ({target}) => {
      if (!this.contains(target)) {
        dropdown.classList.add('hidden');
        window.removeEventListener('click', hideDropdown);
        ellipsis.addEventListener('click', showDropdown, {once: true});
      }
    }
    const showDropdown = () => {
      dropdown.classList.remove('hidden');
      window.addEventListener('click', hideDropdown);
    }
    ellipsis.addEventListener('click', showDropdown, {once: true});
  }

  removeClasses() {
    this.classList.remove('bad');
    this.classList.remove('low');
    this.classList.remove('ok');
    this.classList.remove('great');
  }

  setResultClass(result) {
    if (result < 7) {
      this.classList.add('bad');
    } else if (result < 11) {
      this.classList.add('low');
    } else if (result < 15) {
      this.classList.add('ok');
    } else {
      this.classList.add('great');
    }
  }

	roll() {
    return rollDice(this.dice);
	}

  buildDice() {
    const randomPlus = this.getAttribute('type') === 'randomplus';
    this.dice = parseDiceString(this.getAttribute('dice-string').toLowerCase(), randomPlus);
  }

  attributeChangedCallback() {
    this.buildDice();
  }
}
