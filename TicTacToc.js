let players = [];
let playerOne = players[2];
let playerTwo = players[3];
// const [player1, player2] = players;

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
   // let deleteContentPlayers = () => {
   //    players[2].length = 0;
   //    players[3].length = 0;
   // }
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
   return {deleteboard, deleteDiv }
})();


function starterGame() {
   if (players.length >= 3) {
      gameBoard.callDomy()
      setNamePoints.drawPlayerName()
      ctrlFlow.zone();

   } else {
      alert('please select a mode')
   }

}

const setNamePoints = (() => {
   const drawPlayerName = () => {
      let clave1;
      let clave2;
      if (players.length <= 2) {
         clave1 = 0
         clave2 = 1
         // return clave1, clave2
      } else {
         clave1 = 2
         clave2 = 3

      }

      let elements = document.querySelectorAll('.pla');
      elements.forEach(element => {

         switch (element.id) {
            case 'playerone':
               element.innerHTML = players[clave1].name
               break
            case 'onepoints':
               element.innerHTML = players[clave1].points
               break;
            case 'playertwo':
               element.innerHTML = players[clave2].name
               break;
            case 'twopoints':
               element.innerHTML = players[clave2].points
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

   let OneVsPc = document.querySelector('#onevspc');
   OneVsPc.addEventListener('click', () => {
      deletePlayers.deleteboard()
      makingPersons(1, 'pc');
   })

   let restar = document.querySelector('#restar')
   restar.addEventListener('click', () => {
      if(players.length >= 3){
         // delaLL();
         console.log('sfsdfsdf')
         // deletePlayers.deleteContentPlayers();
         players.splice(2,2)
         deletePlayers.deleteDiv();
         // deletePlayers.deleteboard()
         setNamePoints.drawPlayerName();

      }
   })
   
   let play = document.querySelector('#play')
   play.addEventListener('click', () => {
      starterGame()
   })
   
})()

function makeResult (msj){
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
         },{once : true})
      })
   }
   return { zone }


})();





function assignTurn(ubication, divElm) {
   if (players[2].ubications.length == players[3].ubications.length) {

      players[2].ubications.push(ubication)
      divElm.innerHTML = players[2].pointer

      // si lenght mayor de tres enviar
      if (players[2].ubications.length >= 3) {
         checkWinner(players[2].ubications, players[2])
      }
      
   } else {
      players[3].ubications.push(ubication);
      divElm.innerHTML = players[3].pointer
      // si lenght mayor de tres enviar
      if (players[3].ubications.length >= 3) {
         checkWinner(players[3].ubications, players[3])
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
         players[2].ubications = [];
         players[3].ubications = [];
         deletePlayers.deleteDiv();
      }
      if( !winner && choosePj.length == 5){
         makeResult('TIE')
         
      }
   }
}




let testinsg = document.querySelector('div')




