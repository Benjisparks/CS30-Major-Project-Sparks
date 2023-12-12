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
let mainFont, gameFont;
let temp; 

let I_TEMPLATE = [1,1,1,1];
let O_TEMPLATE = [[1,1],[1,1]];
let T_TEMPLATE = [[0,1,0],[1,1,1]];
let Z_TEMPLATE = [[0,1,1,0],[0,0,1,1]];
let S_TEMPLATE = [[0,0,1,1],[0,1,1,0]];
let L_TEMPLATE = [[1,0],[1,0],[1,1]];
let J_TEMPLATE = [[1,1,],[1,0],[1,0]];

function preload(){
  mainFont = loadFont("Tetris.ttf");
  gameFont = loadFont("Retro Gaming.ttf");
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
  temp = new Tetromino(1,3,I_TEMPLATE);
  grid = theGame.createGrid();
  temp.tempInsert();
}

function draw() {
  background(220);
  theGame.displayGrid();
  //theGame.runGame();
}

class Tetris{
  constructor(){
    this.screen = "menu";
    this.score = 0;
    this.level = 1;
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
    for ( let cols = 0; cols < GRID_HEIGHT; cols++){
      for(let rows = 0; rows < GRID_WIDTH; rows ++){
        if(grid[cols][rows] === 0){
          fill("grey");
          rect(rows*cellSize,cols*cellSize,cellSize,cellSize);
        }
        else if( grid[cols][rows] === 1){
          fill("cyan");
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
    background("grey");
    textFont(mainFont);
    textSize(width/16);
    textAlign("center");
    text("k T h",width/2,height/2);
  }

  
}

class Tetromino {
  constructor(gridY,gridX){
    this.y = gridY;
    this.x = gridX;
  }

  tempInsert(){
    for(let cols = 0; cols <= I_TEMPLATE.length; cols++){
      if(grid[cols][3] === 0 && I_TEMPLATE[cols] === 1){
        grid[cols][3] = 1;
      }
    }
  }

  update(){

  }
}

class I_piece extends Tetromino {
  constructor(x,y,){
    super(x,y);
    this.template = I_TEMPLATE;
    this.color = "cyan";
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
    this.color = "gold";
  }
}

class T_piece extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = T_TEMPLATE;
    this.color = "purple";
  }
}

class Z_piece extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = Z_TEMPLATE;
    this.color = "red";
  }
}

class S_piece extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = S_TEMPLATE;
    this.color = "lime";
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