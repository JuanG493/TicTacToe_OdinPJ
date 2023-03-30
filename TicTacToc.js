let players = [];

function setDefaultPj() {
   let defUser1 = createPerson('User One');
   players.push(defUser1)
   let defUser2 = createPerson('User Two');
   players.push(defUser2)
}
setDefaultPj()


const gameBoard = (() => {
   const gridBoard = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
   let callDomy = () => {
      let boardTarget = document.querySelector('#board');
      for (let elm of gridBoard) {
         let divElment = document.createElement('div');
         divElment.setAttribute('data-key', `${[elm]}`);
         divElment.classList.add('zone');
         boardTarget.appendChild(divElment);
      }
   }
   return { gridBoard, callDomy }
})();


function createPerson(name, pointer, type = 'person') {
   return {
      name,
      ubications: [],
      points: 0,
      pointer: pointer,
      type: type
   }
}


function makingPersons(num, ind) {
   for (let a = 1; a <= num; a++) {
      let selection = ['X', 'O']
      let partial = createPerson(prompt(`player${a}`), selection[a - 1]);
      players.push(partial)
   }
   if (ind == 'pc') {
      let partial = createPerson('PC-DEXTRO', '$', 'PC')
      players.push(partial)

   }
}

const deletePlayers = (() => {
   let combDeath = () => {
      deletePlayers.deleteDiv();
      deletePlayers.deleteboard();
      setNamePoints.drawPlayerName();
   }
   let delContentPj = () => {
      players[0].ubications.length = 0;
      players[1].ubications.length = 0;
   }
   let deleteboard = () => {
      let allDivs = document.querySelectorAll('.zone');
      allDivs.forEach((item) => {
         item.innerHTML = ''
      })
   }
   let deleteDiv = (() => {
      let boardTarget = document.querySelector('#board');
      boardTarget.innerHTML = ''
   })
   return { delContentPj, deleteboard, deleteDiv, combDeath }
})();


function starterGame() {
   gameBoard.callDomy()
   setNamePoints.drawPlayerName()
   ctrlFlow.zone();
}

const setNamePoints = (() => {
   const drawPlayerName = () => {
      let playerOne = players[0];
      let playerTwo = players[1];
      let elements = document.querySelectorAll('.pla');
      elements.forEach(element => {
         switch (element.id) {
            case 'playerone':
               element.innerHTML = playerOne.name
               break
            case 'onepoints':
               element.innerHTML = playerOne.points
               break;
            case 'playertwo':
               element.innerHTML = playerTwo.name
               break;
            case 'twopoints':
               element.innerHTML = playerTwo.points
         }
      })
   }
   return { drawPlayerName }

})();

/*let to call the function when the page is load */
setNamePoints.drawPlayerName();
gameBoard.callDomy();

const selectorEvents = (() => {
   let oneVsOne = document.querySelector('#onevsone');
   oneVsOne.addEventListener('click', (event) => {
      if (players[0].name != 'User One') {
         event.preventDefault();
      } else {
         deletePlayers.deleteboard()
         makingPersons(2);
      }
   })

   let oneVsPc = document.querySelector('#onevspc');
   oneVsPc.addEventListener('click', (event) => {
      if (players[0].name != 'User One') {
         event.preventDefault();
      } else {
         deletePlayers.deleteboard()
         makingPersons(1, 'pc');
      }
   })

   let reset = document.querySelector('#reset')
   reset.addEventListener('click', () => {
      if (players.length >= 2) {
         splicePlayers();
         setDefaultPj();
         deletePlayers.combDeath();
         gameBoard.callDomy();
      }
   });

   let restar = document.querySelector('#restar');
   restar.addEventListener('click', () => {
      players[0].points = 0;
      players[1].points = 0;
      deletePlayers.deleteDiv;
      deletePlayers.deleteboard;
      setNamePoints.drawPlayerName();
   })

   let play = document.querySelector('#play')
   play.addEventListener('click', (event) => {

      if (players[0].name != 'User One') {
         event.preventDefault();
      }
      else if (players.length >= 3) {
         deletePlayers.deleteDiv();
         splicePlayers();
         starterGame();
      }
      else {
         alert('select a mode please')
      }
   })
   
   // because I have to delete the two Object by default
   function splicePlayers() {
      players.splice(0, 2)
   }

})();

function makeResult(msj) {
   let results = document.querySelector('.results');
   results.classList.add('show');
   results.innerHTML = `${msj}`;
   setTimeout(() => {
      results.classList.remove('show');
      results.innerHTML = ''

   }, 2000);
}

// here because I nedd to elminate the function that handle the events

function clickDivElm() {
   let element = this
   let coordinate = this.dataset.key;
   ctrlFlow.assignTurn(coordinate, element)
}


const ctrlFlow = (() => {

   const zone = () => {
      let grid = document.querySelectorAll('.zone');
      grid.forEach((element) => {
         element.addEventListener('click', clickDivElm, { once: true });
      })
   };

   const assignTurn = (ubication, divElm) => {
      let selctPj1 = players[0].ubications;
      let selctPc = players[1].ubications;

      if (players[1].type == 'PC') {
         selctPj1.push(ubication)
         divElm.innerHTML = players[0].pointer

         let testing = checkWinner(selctPj1, players[0])

         if (!testing) {
            let nextMove = calMinMax.transformBoard();
            selctPc.push(nextMove);
            let where = document.querySelector(`div[data-key="${nextMove}"]`);


            where.innerHTML = players[1].pointer;
            where.removeEventListener('click', clickDivElm, { once: true });
            if (selctPc.length >= 3) {
               checkWinner(selctPc, players[1])
            }
         }

      }
      else {

         if (selctPj1.length == selctPc.length) {
            selctPj1.push(ubication)
            divElm.innerHTML = players[0].pointer
            if (selctPj1.length >= 3) {
               checkWinner(selctPj1, players[0]);
            }
         }
         else {
            selctPc.push(ubication);
            divElm.innerHTML = players[1].pointer
            if (selctPc.length >= 3) {
               checkWinner(selctPc, players[1]);
            }
         }
      }
   }


   const checkWinner = (chooseOfPj, player) => {
      let winner = calMinMax.evaluate(chooseOfPj.sort(), [], true);
      if (winner[0] == -10) {
         let winnerMathc = winner[1].match(/[A-Z]\d/g);
         for (let i of winnerMathc) {
            let winDiv = document.querySelector(`div[data-key="${i}"`);
            winDiv.classList.add('winner')
         }
         setTimeout(() => {
            if (winner[0] == -10) {

               displayResult(`WINNER ${player.name}`)
               player.points += 1
               deletePlayers.combDeath();
               deletePlayers.delContentPj();
               gameBoard.callDomy();
               ctrlFlow.zone();
               return true
            }
         }, 900);
      }

      else if (winner == 0 && chooseOfPj.length == 5) {
         displayResult('TIE');
         deletePlayers.delContentPj();
         deletePlayers.deleteDiv();
         gameBoard.callDomy();
         ctrlFlow.zone();
         return true
      }
      else {
         return false
      }
   }
   return { zone, assignTurn, checkWinner }
})();



const calMinMax = (() => {

   function transformBoard() {
      let board = {}
      let allElments = document.querySelectorAll('.zone');
      allElments.forEach(elm => {
         let totem = elm.dataset.key
         if (elm.innerHTML == '') {
            board[totem] = '_';
         }
         else if (elm.innerHTML == '$') {
            board[totem] = players[1].pointer
         }
         else {
            board[totem] = players[0].pointer
         }
      })
      return intermediary(board);
   }
   // base on https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/

   function intermediary(board) {
      let bestVal = -1000
      let bestMove = '';

      for (let i in board) {
         if (board[i] == '_') {
            board[i] = players[1].pointer;
            let moveVal = minmaxT(board, 0, false);
            board[i] = '_'

            if (moveVal > bestVal) {
               bestMove = i;
               bestVal = moveVal
            }
         }
      }
      return bestMove
   };

   function minmaxT(board, depth, isMaxTurn) {
      let score = evaluation(board)
      if (score == 10) {
         return score;
      }
      if (score == -10) {
         return score;
      }
      if (movesleft(board) == false) {
         return 0
      }
      if (isMaxTurn) {
         let best = -1000

         for (let key in board) {
            if (board[key] == '_') {
               board[key] = players[1].pointer
               best = Math.max(best, minmaxT(board, depth + 1, !isMaxTurn));
               board[key] = '_'
            }
         }
         return best
      } else {
         let best = 1000;
         for (let key in board) {
            if (board[key] == '_') {
               board[key] = players[0].pointer
               best = Math.min(best, minmaxT(board, depth + 1, !isMaxTurn));
               board[key] = '_'
            }
         }
         return best
      }
   }

   function movesleft(board) {
      for (let key in board) {
         if (board[key] == '_') {
            return true
         }
      }
      return false
   }

   function evaluation(board) {
      let opponetTeam = [];
      let pcTeam = [];

      for (let key in board) {
         if (board[key] == 'X') {
            opponetTeam.push(key)
         }
         if (board[key] == '$') {
            pcTeam.push(key)
         }
      }

      if (opponetTeam.length >= 3 || pcTeam.length >= 3) {
         return evaluate(opponetTeam, pcTeam)

      } else {
         return 0
      }
   }
   function evaluate(teamX, teamPc, identifier = false) {

      let patterns = {
         rows: /((?:[A][1-3]){3}|(?:[B][1-3]){3}|(?:[c][1-3]){3})/gi,
         // columns patter withouth global flag becouse I nedd the capturing groups
         columns: /(a1).*?(b1).*?(c1)|(a2).*?(b2).*?(c2)|(a3).*?(b3).*?(c3)/i,
         diagonals: /(a1\w*?b2\w*?c3|a3\w*?b2\w*?c1)/gi

      }
      let strOponent = teamX.join('');
      let strPlayerPc = teamPc.join('');

      for (let key in patterns) {

         if (patterns[key].test(strOponent)) {
            if (identifier) {
               let returnMatch = strOponent.match(patterns[key]);
               // format the diagonales in the result
               if (key == 'diagonals') {
                  if (returnMatch[0][1] == 1) {
                     return [-10, 'A1B2C3']
                  } else {
                     return [-10, 'A3B2C1']
                  }
                  // if resturnMatch.length >=2 that means that pc make more than three moves and need tho format the columns
               } else if (returnMatch.length >= 2) {
                  let newM = [];
                  for (let i = 1; i <= returnMatch.length; i++) {
                     if (returnMatch[i] != undefined) {
                        newM.push(returnMatch[i])
                     }
                  }
                  return [-10, newM.join('')]
               }
               else {
                  return [-10, returnMatch.join('')]
               }
            }
            return -10
         }
         if (patterns[key].test(strPlayerPc)) {
            return 10
         }
      }
      return 0
   }
   return { transformBoard, evaluate }

})();








