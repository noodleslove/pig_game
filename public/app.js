/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        // 1. random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. display result
        var diceDOM1 = document.getElementById('dice-0');
        var diceDOM2 = document.getElementById('dice-1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        // 3. update the round score if rolled number is not 1
        if (dice2 === 6 && dice1 === 6) {
            // clear entire score
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            // next player
            nextPlayer(1000);
        } else if (dice1 !== 1 && dice2 !== 1) {
            // add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer(1000);
        }
    }
  
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;

        // update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value

        if (!input) {
            input = 100;
        }

        // check if player won the game
        if (scores[activePlayer] >= input) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-0').style.display = 'none';
            document.getElementById('dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            //next player
            nextPlayer(100);
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(theTimeout) {
    // next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('dice-0').classList.remove('shake');
    document.getElementById('dice-1').classList.remove('shake');

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.add('active');
    // document.querySelector('.player-1-panel').classList.remove('active');

    // document.getElementById('dice-0').style.display = 'none';
    // document.getElementById('dice-1').style.display = 'none';

    var listAll = document.querySelectorAll('.dice');

	// Find the cubes with value of 1
    var listOnes = document.querySelectorAll("[src='dice-1.png']");
    var listSixs = document.querySelectorAll("[src='dice-6.png']");

	if(listOnes.length > 0){
		for (let i = 0; i < listOnes.length; i++ ) {
			// Forbid clicking on the button ROLL DICE while animating
			document.querySelector('.btn-roll').setAttribute('disabled','disabled');
            listOnes[i].classList.add('shake');
        }
    }

    if (listSixs.length === 2) {    
        for (let i = 0; i < listSixs.length; i++) {
            // Forbid clicking on the button ROLL DICE while animating
            document.querySelector('.btn-roll').setAttribute('disabled','disabled');
            listSixs[i].classList.add('shake');
        }
	}

	// hide the dices
	setTimeout(function(theTimeout){
		for (let i = 0; i < listAll.length; i++ ) {
			listAll[i].style.display = 'none';
			// if dice with one is on a table - shake it
			if (listOnes[i]) {
				listOnes[i].classList.remove('shake');
            }
            // if dice with six is on a table - shake it
            if (listSixs[i]) {
                listSixs[i].classList.remove('shake');
            }
			// make the ROLL DICE button working again
			document.querySelector('.btn-roll').removeAttribute('disabled');
        }
	}, theTimeout);
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // document.querySelector('#current-' + activePlayer).textContent = dice;
    // document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}