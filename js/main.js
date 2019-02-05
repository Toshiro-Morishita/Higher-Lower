(function() {
  'use strict';

  let higher = document.getElementById('higher');
  let lower = document.getElementById('lower');
  let dealerCard = document.getElementById('dealer_card');
  let playerCard = document.getElementById('player_card');
  let wrapper = document.getElementById('wrapper');
  let result = document.getElementById('result');

  let dealerValue;
  let playerValue;

  function getRandom() {
    return Math.floor(Math.random() * 13 + 1);
  }

  function init() {
    dealerValue = getRandom();
    dealerCard.textContent = dealerValue;
    playerValue = getRandom();
    playerCard.textContent = playerValue;
    wrapper.removeEventListener('transitionend', init);
  }

  function check(guess) {
    let str;
    if (wrapper.classList.contains('open')) {
      return;
    }
    wrapper.classList.add('open');
    higher.classList.add('disabled');
    lower.classList.add('disabled');
    if (playerValue === dealerValue) {
      str = 'draw'
    } else {
      str = 'You ' + getResultStr(guess);
    }
    result.textContent = str;
    result.classList.remove('hidden')
  }

  function getResultStr(guess) {
    if (
      playerValue > dealerValue && guess === 'higher'
      || playerValue < dealerValue && guess === 'lower'
    ) {
      return 'win!';
    } else {
      return 'lose...'
    }
  }

  init();

  higher.addEventListener('click', function() {
    check('higher');
  });

  lower.addEventListener('click', function() {
    check('lower');
  });

  dealerCard.addEventListener('click', function() {
    if (result.classList.contains('hidden')) {
      return;
    }
    result.classList.add('hidden');
    wrapper.classList.remove('open');
    higher.classList.remove('disabled');
    lower.classList.remove('disabled');
    wrapper.addEventListener('transitionend', init);
  });
})();
