
window.addEventListener('DOMContentLoaded', () => {
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const playerDisplay = document.querySelector('.display-player');            
  const resetButton = document.querySelector('#reset');
  const announcer = document.querySelector('.announcer');

  let board = ['', '', '', '', '', '', '', '',''];
  let currentPlayer = '8';
  let isGameActive = true;
                                             
                  
  const PLAYER8_WON = 'PLAYER8_WIN';
  const PLAYER6_WON = 'PLAYER6_WIN';
  const TIE='TIE';

/*
  Indexes within the board
  [0] [1] [2]
  [3] [4] [5]
  [6] [7] [8]
*/

  const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [3, 1, 5], //on lisatud veel viise võitmiseks lisaks tavalistele
      [6, 4, 8]
  ];

  function handleResultValidation() {
      let roundWon = false;
      for(let i = 0;i<=7;i++){
          const winCondition=winningConditions[i];
          const a = board[winCondition[0]];
          const b = board[winCondition[1]];
          const c = board[winCondition[2]];
      if (a === '' || b === '' || c === ''){
          continue;
      }
      if(a === b && b === c) {
          roundWon = true;
          break;
      }
    }
  if(roundWon){
          announce(currentPlayer ==='8' ? PLAYER8_WON : PLAYER6_WON);
          isGameActive = false;
          return;
      }
  if(!board.includes(''))
      announce(TIE);
  }

  const announce = (type) => {
    switch(type){
        case PLAYER6_WON:
            announcer.innerHTML = 'Mängija <span class="player6"> 6 </span> võitis!';
            break;
        case PLAYER8_WON:
            announcer.innerHTML = 'Mängija <span class="player8"> 8 </span> võitis!';
            break;
        case TIE:
            announcer.innerText='Viiki jäite!';
    }
    announcer.classList.remove('hide');
  };

  const isValidAction = (tile) => {
    if (tile.innerText === '8' || tile.innerText === '6'){
      return false;
    }
      return true;
  };

  const updateBoard = (index) => {
      board[index]=currentPlayer;
  }

  const changePlayer = () => {
      playerDisplay.classList.remove('player${currentPlayer}');
      currentPlayer = currentPlayer === '8' ? '6' : '8';          
      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add('player${currentPlayer}');                           
  }

  const userAction = (tile, index) => {
    if(isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add('player${currentPlayer}');
        updateBoard(index);
        handleResultValidation();
        changePlayer();
      }
  }

  const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
      isGameActive = true;
      announcer.classList.add('hide');

      if (currentPlayer === '6') {
          changePlayer();
      }
      tiles.forEach(tile => {
      tile.innerText = '';
      tile.classList.remove('player8');
      tile.classList.remove('player6');
      });
  }

  tiles.forEach( (tile, index) =>{
    tile.addEventListener('click', () => userAction (tile, index));
  });


  resetButton.addEventListener ('click', resetBoard);
});
