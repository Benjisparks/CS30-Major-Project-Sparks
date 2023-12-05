// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid;
let theGame;
let GRID_HEIGHT = 20;
let GRID_WIDTH = 10;
let cellSize;

let I_TEMPLATE = [1,1,1,1];
let O_TEMPLATE = [[1,1],[1,1]];
let T_TEMPLATE = [[0,1,0],[1,1,1]];
let Z_TEMPLATE = [[0,1,1,0],[0,0,1,1]];
let S_TEMPLATE = [[0,0,1,1],[0,1,1,0]];
let L_TEMPLATE = [[1,0],[1,0],[1,1]];
let J_TEMPLATE = [[1,1,],[1,0],[1,0]];

function preload(){

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (height > width) {
    cellSize = width/GRID_HEIGHT;  //Setting sizes based on window
  }
  else {
    cellSize = height/GRID_HEIGHT;
  }
  theGame = new Tetris();
  grid = theGame.createGrid();
}

function draw() {
  background(220);
  theGame.displayGrid();
}

class Tetris{
  constructor(){
    this.screen = "menu";
  }
  createGrid(){
    let theGrid = [];
    for(let cols = 0; cols < GRID_HEIGHT; cols ++){
      theGrid.push([]);
      for(let rows = 0; rows < GRID_WIDTH; rows ++){
        theGrid[cols].push(0);
      }
    }
    return theGrid;
  }

  displayGrid(){
    for ( let cols = 0; cols <= GRID_HEIGHT; cols++){
      for(let rows = 0; rows <= GRID_WIDTH; rows ++){
        if(grid[cols][rows] === 0){
          fill("grey");
          rect(rows*cellSize,cols*cellSize,cellSize,cellSize);
        }
      }
    }
  }
  runGame(){
    if (this.screen === "menu"){
      this.mainMenu();
    } 
  }
  
  mainMenu(){

  }

  
}

class Tetromino {
  constructor(gridY,gridX, template){
    this.y = gridY;
    this.x = gridX;
    this.template = template;
  }

  update(){

  }

  // rotateCw(){
    
  // }

  // rotateCcw(){

  // }

  display(){
  }
}

class I_piece extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = I_TEMPLATE;
  }
  update(){
    super.update();
  }

  // rotateCw(){
  //   super.rotateCw();
  // }

  // rotateCcw(){
  //   super.rotateCcw();
  // }

  display(){
    super.display();
  }
}

class O_piece extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = O_TEMPLATE;
  }
}




// function createGrid(){
//   let theGrid = [];
//   for(let cols = 0; cols < GRID_HEIGHT; cols ++){
//     theGrid.push([]);
//     for(let rows = 0; rows < GRID_WIDTH; rows ++){
//       theGrid[cols].push(0);
//     }
//   }
//   return theGrid;
// }

// function displayGrid(){
//   for ( let cols = 0; cols <= GRID_HEIGHT; cols++){
//     for(let rows = 0; rows <= GRID_WIDTH; rows ++){
//       if(grid[cols][rows] === 0){
//         fill("grey");
//         rect(rows*cellSize,cols*cellSize,cellSize,cellSize);
//       }
//     }
//   }
// }