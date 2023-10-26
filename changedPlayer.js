// let players = []
// let [player1, player2] = players;

const dicPlayers = (()=> {
   let pjs = [];

   let players = (pj) => {
      pjs.push(pj)
   }

   let desplayers = () => {
      if( pjs.length >= 1){
         let [player1,player2] = pjs
         return {player1, player2}
      }
   }

   return {players, pjs, desplayers }

})() 

let players = dicPlayers.pjs
let player1 = dicPlayers.desplayers.player1;
let player2 = dicPlayers.desplayers.player2;

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
      dicPlayers.players(partial)
   }
   if (ind == 'pc') {
      let partial = createPerson('PC-DEXTRO', '@')
      dicPlayers.players(partial);
      // players.push(partial)

   }
}

const deletePlayers = (() => {
   let deleteContentPlayers = () =>{
      players.length = 0;
   }
   let deleteboard = () => {
      let allDivs = document.querySelectorAll('.zone');
      allDivs.forEach((item) => {
         item.innerHTML = ''
      })
   }
   // setNamePoints.drawPlayerName();
   return {deleteContentPlayers, deleteboard}
})();


function starterGame() {
   if (players.length >= 1) {
      gameBoard.callDomy()
      setNamePoints.drawPlayerName()
      ctrlFlow.zone()

   } else {
      alert('please select a mode')
   }

}

const setNamePoints = (() => {
   const drawPlayerName = () => {
      // let [player1, player2] = players;


      if (players.length < 1) {
         player1 = {
            name : 'player one',
            points : 0,
         }
         player2 = {
            name : 'player two',
            points : 0,
         }
      }

      let elements = document.querySelectorAll('.pla');
      elements.forEach(element => {

         switch (element.id) {
            case 'playerone':
               element.innerHTML = player1.name
               break
            case 'onepoints':
               element.innerHTML = player1.points
               break;
            case 'playertwo':
               element.innerHTML = player2.name
               break;
            case 'twopoints':
               element.innerHTML = player2.points
         }
      })
   }
   return { drawPlayerName }

})()
/*let to call the function when the page is load */
setNamePoints.drawPlayerName()

const ctrEvents = (() => {
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
      deletePlayers.deleteContentPlayers();
      deletePlayers.deleteboard()
      setNamePoints.drawPlayerName();

   })

   let play = document.querySelector('#play')
   play.addEventListener('click', () => {
      starterGame()
   })




})();
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


function assignTurn(positionG, divElm) {
   // let [player1, player2] = players;
   //  let player1 = dicPlayers.desplayers.player1
   //  let player2 = dicPlayers.desplayers.player2

   // let whereInsert;
   // console.log(typeof(ubication))
   // if(ubication.includes('A')){
   //    whereInsert = ubications.a
   // }
   if (player1.ubications.length == player2.ubications.length) {
      // console.log(player1.ubication)

      player1.ubications.push(positionG)
      divElm.innerHTML = player1.pointer
      
      // si lenght mayor de tres enviar
      if (player1.ubications.length >= 3) {
         checkWinner(player1.ubications, player1)
      }
   } else {
      player2.ubications.push(positionG);
      divElm.innerHTML = player2.pointer
      // si lenght mayor de tres enviar
      if (player2.ubications.length >= 3) {
         checkWinner(player2.ubications, player2)
      }
   }
   // tambien se podria pensar en separar para enviar despues de cada jugador realice
   // un movmiento
   // checkWinner(player1.ubications, player2.ubications)
   function checkWinner(choosePj, pj) {
      // console.log(pointsPj)
      let sorting = choosePj.sort().join('');
      let cheker = new RegExp(/([A][1-3]){3}|([B][1-3]){3}|([c][1-3]){3}|(?:[a-c]1\w*?){3}|(?:[a-c]2\w*?){3}|(?:[a-c]3\w*?){3}|a1\w*?b2\w*?c3|a3\w*?b2\w*?c1/, 'gi')
      let winner = cheker.test(sorting);
      if (winner) {
         // mostrar en un div***
         alert('TIC-TAC-TOE')
         // console.log(pj.points);
         pj.points += 1
         setNamePoints.drawPlayerName()
         player1.ubications = [];
         player2.ubications = [];
         deletePlayers.deleteboard();
         ctrlFlow.zone()
         // console.log(player1.ubications)
         // console.log(player2.ubications)

         // optimizar esto 
         // let allDivs = document.querySelectorAll('.zone');
         // allDivs.forEach((item) => {
         //    item.innerHTML = ''

         // })
         // console.log(zone)
         // ctrlFlow.zone()

      }
   }
}