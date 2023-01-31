let players = []


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
      ubications : [],
      points: 0,
      pointer : pointer
   }
}


function makingPersons(num,ind){
   for(let a = 1; a <= num; a++){
      let selection = ['X', 'O']
      let partial = createPerson(prompt(`player${a}`), selection[a-1]);
       players.push(partial)
   }
   if(ind == 'pc'){
      let partial = createPerson('PC-DEXTRO', '@')
      players.push(partial)
      
   }
}

function deletePlayers(){
   players.length = 0;
}

function letStart (){
   if(players.length >= 1){
      gameBoard.callDomy()
      setNamePoints.drawPlayerName()
      ctrlFlow.zone()

   }else{
      alert('please select a mode')
   }

}

const setNamePoints = (() => {
   const drawPlayerName = () => {
      const [player1, player2] = players;
   
      let elements = document.querySelectorAll('.pla');
      elements.forEach( element => {
   
         switch (element.id) {
            case 'playerone':
               element.innerHTML = player1.name
               break;
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
   return {drawPlayerName}

})()


const ctrEvents = (() => {
   let oneVsOne = document.querySelector('#onevsone');
   oneVsOne.addEventListener('click', () => {
      deletePlayers()
      makingPersons(2);
   })
   
   let OneVsPc = document.querySelector('#onevspc');
   OneVsPc.addEventListener('click', () => {
      deletePlayers()
      makingPersons(1,'pc');
   })

   let restar = document.querySelector('#restar')
   restar.addEventListener('click', () => {
      deletePlayers()
   })

   let play = document.querySelector('#play')
   play.addEventListener('click', () => {
      letStart()
   })

   
   
   
})();
//is here becouse I nedd to operate after the button play is clicked//
const ctrlFlow = (() => {
   const zone = () =>{
      let grid = document.querySelectorAll('.zone');
   grid.forEach((element) => {
      element.addEventListener('click', () =>{

         let coordination = element.getAttribute("data-key");



         
         assignTurn(coordination, element)



      })
   })
}
   return {zone}
})();



function assignTurn (ubication, divElm ){
   const [player1, player2] = players;

   
   if(player1.ubications.length == player2.ubications.length ){

      player1.ubications.push(ubication)
      divElm.innerHTML = player1.pointer
   }else{
      player2.ubications.push(ubication);
      divElm.innerHTML = player2.pointer
   }
// enviar solo si el length del jugador uno es mayor a 3
// tambien se podria pensar en separar para enviar despues de cada jugador realice
// un movmiento

   checkWinner(player1.ubications, player2.ubications)
}


function checkWinner (choosePjOne, choosepjTwo){
   console.log(choosePjOne)
   
// comprobar horizaontalmente

   



}



