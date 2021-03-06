const GameState = [[0,0,0],
                   [0,0,0],
                   [0,0,0]]

const ThreeInRow = {
  cells: Array.from(document.querySelectorAll(".col")),

  humanPlay(){
    this.innerText = 'X'
    let cords = this.getAttribute('data-cel').split(':')
    ThreeInRow.updateState(cords ,'X')
    this.removeEventListener('click',ThreeInRow.humanPlay)
    ThreeInRow.cells.remove
    ThreeInRow.checkWin()
    ThreeInRow.machinePlay(ThreeInRow.cells)
  },

  machinePlay(cells){
    // Find a non played cell and mark it with 'O'
    ThreeInRow.findNotPlayedCel((cel)=>{
      cel.innerText = 'O'
      let cords = cel.getAttribute('data-cel').split(':')
      ThreeInRow.updateState(cords ,'O')
      cel.removeEventListener('click',ThreeInRow.humanPlay)
      ThreeInRow.checkWin()
    })
  },

  findNotPlayedCel(cb){
    let randomCel = Math.floor(Math.random() * ThreeInRow.cells.length);
    if(ThreeInRow.cells[randomCel].childNodes.length === 0){
      cb(ThreeInRow.cells[randomCel])
    }else{
      ThreeInRow.checkWin()
      ThreeInRow.findNotPlayedCel(cb)
    }
  },

  updateState(cords,sign){
    GameState[cords[0]][cords[1]] = sign
  },

  checkWin(){},

  init(){
    // Select all cells and add click listener
    ThreeInRow.cells.forEach((cel)=> cel.addEventListener('click', ThreeInRow.humanPlay))
    // If random_boolean is bigger than 0,5 the machine plays first
    const random_boolean = Math.random() < 0.5;
    if(random_boolean) ThreeInRow.machinePlay(ThreeInRow.cells) 
  }
}

document.addEventListener('DOMContentLoaded', () => ThreeInRow.init())