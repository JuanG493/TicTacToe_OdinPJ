let players = [];

function setDefaultPj() {
   let defUser1 = createPerson('user One');
   players.push(defUser1)
   let defUser2 = createPerson('user Two');

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
   return { callDomy }
})();


function createPerson(name, pointer) {
   return {
      name,
      ubications: [],
      points: 0,
      pointer: pointer
   }
}


function makingPersons(num, ind) {
   for (let a = 1; a <= num; a++) {
      let selection = ['X', 'O']
      let partial = createPerson(prompt(`player${a}`), selection[a - 1]);
      players.push(partial)
   }
   if (ind == 'pc') {
      let partial = createPerson('PC-DEXTRO', '@')
      players.push(partial)

   }
}

const deletePlayers = (() => {
   let delContentPj = () => {
      players[0].ubications = [];
      players[1].ubications = [];
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
      gameBoard.callDomy();
      ctrlFlow.zone();
   })
   // setNamePoints.drawPlayerName();
   return {delContentPj, deleteboard, deleteDiv }
})();


function starterGame() {
   if (players.length >= 2) {
      gameBoard.callDomy()
      setNamePoints.drawPlayerName()
      ctrlFlow.zone();

   } else {
      alert('please select a mode')
   }

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

})()
/*let to call the function when the page is load */
setNamePoints.drawPlayerName()

const selectorEvents = (() => {
   let oneVsOne = document.querySelector('#onevsone');
   oneVsOne.addEventListener('click', () => {
      deletePlayers.deleteboard()
      makingPersons(2);
   })

   let oneVsPc = document.querySelector('#onevspc');
   oneVsPc.addEventListener('click', () => {
      deletePlayers.deleteboard()
      makingPersons(1, 'pc');
   })

   let restar = document.querySelector('#restar')
   restar.addEventListener('click', () => {
      if (players.length >= 2) {
         players.splice(0, 2)
         setDefaultPj()
         deletePlayers.deleteDiv();
         setNamePoints.drawPlayerName();
      }
   })

   let play = document.querySelector('#play')
   play.addEventListener('click', () => {
      // becouse I have to delete the two Object by default
      players.splice(0, 2)
      starterGame()
   })

})()

function makeResult(msj) {
   let results = document.querySelector('#results');
   results.innerHTML = `${msj}`;
   setTimeout(() => {
      results.innerHTML = ''

   }, 2000);
}


//is here becouse I nedd to operate after the button play is clicked//
const ctrlFlow = (() => {
   const zone = () => {
      let grid = document.querySelectorAll('.zone');
      grid.forEach((element) => {
         // element.innerHTML = '';
         element.addEventListener('click', () => {
            // event.stopPropagation()
            let coordinate = element.getAttribute("data-key");
            assignTurn(coordinate, element)
         }, { once: true })
      })
   }
   return { zone }


   function assignTurn(ubication, divElm) {
      let selctPj1 = players[0].ubications;
      let selctPj2 = players[1].ubications;

      if (selctPj1.length == selctPj2.length) {
         selctPj1.push(ubication)
         divElm.innerHTML = players[0].pointer
         // si lenght mayor de tres enviar
         if (selctPj1.length >= 3) {
            checkWinner(selctPj1, players[0])
         }

      } else {
         selctPj2.push(ubication);
         divElm.innerHTML = players[1].pointer
         // si lenght mayor de tres enviar
         if (selctPj2.length >= 3) {
            checkWinner(selctPj2, players[1])
         }
      }

      function checkWinner(choosePj, pj) {

         let sorting = choosePj.sort().join('');
         let cheker = new RegExp(/([A][1-3]){3}|([B][1-3]){3}|([c][1-3]){3}|(?:[a-c]1\w*?){3}|(?:[a-c]2\w*?){3}|(?:[a-c]3\w*?){3}|a1\w*?b2\w*?c3|a3\w*?b2\w*?c1/, 'gi')
         let winner = cheker.test(sorting);
         if (winner) {
            makeResult(`WINNER ${pj.name}`)

            pj.points += 1
            setNamePoints.drawPlayerName()
            deletePlayers.delContentPj();
            deletePlayers.deleteDiv();
         }
         if (!winner && choosePj.length == 5) {
            makeResult('TIE');
            deletePlayers.delContentPj();
            deletePlayers.deleteDiv();


         }
      }
   }
})();









