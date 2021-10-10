
// state.board is listing the ROWs
let state = {}

//resetState should be appended to a NEW GAME button once built. This will reset the board to a blank state, so all colors OFF, and it should also reset PLAYER NAME
function resetState() {
    state = {
    board: [],
    players: ['',''],
    getCurrentPlayer: function() {
        return this.players[state.currentPlayerIndex];
    }
}  
player1 = 'blue';
player2 = 'red';
state.board = [column1, column2, column3, column4, column5, column6, column7];
//figure out which column was click >> push that into the correct. 
// need dataset to build this
//renderboard

state.columnLength = 6;
state.players = ['','']; 
state.currentPlayerIndex = 0 ;
render()
} 


// remember that a row is an array that we can use to call the column by calling the index. e.g. row1[0] = row 1, column 1. Any of these columns should ultimately be clickable to 
let column1 = [ ];
let column2 = [ ];
let column3 = [ ];
let column4 = [ ];
let column5 = [ ];
let column6 = [ ];
let column7 = [ ];

// *********** DOM SELECTORS ***********
const boardElement = document.getElementById('board');
const playerTurn = document.getElementsByTagName('h2')[0];
const resetButton = document.getElementById('resetButton');


// *********** DOM MANIPULATION ***********

// create the board in renderBoard and store the arrays
//NOTE: THIS IS RENDERING TOP DOWN, LEFT TO RIGHT
function resetBoard() {
    resetState()
    renderBoard()
};
// function renderBoard() {
//         //this stops the board from adding rows and columns
//         boardElement.innerHTML = ''
//         //adds a row
//         for(let i=0; i < 6; i++) {
//             let row = state.board[i];
//             //put each row in a div
//             let rowElement = document.createElement('div');
//             //use console.log to check if the divs were made
//             // console.log(rowElement)
//             // add the value of the cell, in our case use this to check the coordinate of the cells
//             // how to add class..?
//             rowElement.classList.add('cell');
//             // rowElement.innerText = coordinate;
    
//             //attach (append) the div to the board for the divs to show up and then call renderBoard
//             boardElement.appendChild(rowElement);
    
//             for (let j=0; j < 6; j++) {         
//                 let column = [j];
//                 let columnElement = document.createElement('div');
//                 columnElement.classList.add('cell');
//                 // console.log(columnElement)
//                 boardElement.appendChild(columnElement);
//             }
//         }    
// };
function renderBoard() {
    boardElement.innerHTML = ''
    for(let i =0; i <state.board.length; i++) {
        let columnElement = document.createElement('div');
        // fill as many empty spaces available
        const emptySlots = state.columnLength - state.board[i].length
        // console.log(emptySlots) to check how many slots are available to drop a token into 
        // fill as many colored spaces 
        for (let j = 0; j < emptySlots; j++) {  
            let rowElement = document.createElement('div');
            rowElement.classList.add('cell');
            columnElement.appendChild(rowElement)
        }
        // starting at the end and going backwards
        for(let k = state.board[i].length -1; k >= 0; k--) {
            let rowElement = document.createElement('div');
            rowElement.classList.add('cell');
            rowElement.classList.add(state.board[i][k])
            console.log(state.board[i][k])
            columnElement.appendChild(rowElement)

        }
        boardElement.appendChild(columnElement)
    }
}

// *********** GAME LOGIC HELPER FUNCTIONS ***********
function renderPlayer(){
    console.log('in renderPlayer')
    let text;
    if (!state.players[0] || !state.players[1]){
      text = `
        <input name="player1" placeholder="Enter Player 1">
        <input name="player2" placeholder="Enter Player 2">
        <button class="start">Start Game</button>
      `
    } else {
      text = `${state.getCurrentPlayer()} place a token!`
    }
    playerTurn.innerHTML= text;
  }
//Maybe use a toggle to switch classes to off
  function colorize(event) {
    if (state.currentPlayerIndex === 0) {
        let target = event.target;
        console.log(target)
        console.log(target.className)
        if(!target.className.includes('blue')){
        target.className = 'cell blue'
        }    
        console.log('colorize triggered by player 1')
    } else if (state.currentPlayerIndex === 1) {
        let target = event.target;
        console.log(target)
        if(!target.className.includes('red')){
        target.className = 'cell red'
        }    
        console.log('colorize triggered by player 2')
    }
   
}
function switchPlayerTurn() {
    state.currentPlayerIndex = (state.currentPlayerIndex === 1) ? 0 : 1  
    console.log('player switched')
  }

function dropToken (event) {
    // for(let i = 0; i < state.board.length; i++) {
    let target = event.click;
    const columnIndex = state.board.indexOf(target);
    console.log(columnIndex);

    state.players[0] = 'player1'
    state.players[1] = 'player2'
    state.board[columnIndex].push(state.getCurrentPlayer)
    // }


};

function render() {
      renderPlayer()
      renderBoard()
      
  }
// *********** EVENT LISENTERS ***********
playerTurn.addEventListener('click', function(event){
    if (event.target.className === 'start') {
      const player1Input = document.querySelector('input[name=player1]')
      const player2Input = document.querySelector('input[name=player2]')
      const player1Value = player1Input.value
      const player2Value = player2Input.value
      state.players = [player1Value, player2Value]
      console.log(state.getCurrentPlayer())
      //add a render after each event listener
      render()

    }

  }); 
// boardElement.addEventListener('click', function(event){
    
//     let index = event.target.dataset.index
//     let playerToken = state.board[index]
//     console.log(event.target)

// })
boardElement.addEventListener('click', function(event){
    dropToken(event)
    colorize(event)
    switchPlayerTurn()
    render()
  })
resetButton.addEventListener('click', resetBoard);
// *********** BOOTSTRAPPING ***********
resetState()
render()
