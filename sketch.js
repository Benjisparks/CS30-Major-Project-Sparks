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

let I_TEMPLATE = [[1,1,1,1]];
let O_TEMPLATE = [[1,1],[1,1]];
let T_TEMPLATE = [[0,1,0],[1,1,1]];
let Z_TEMPLATE = [[0,1,1,0],[0,0,1,1]];
let S_TEMPLATE = [[0,0,1,1],[0,1,1,0]];
let L_TEMPLATE = [[1,0],[1,0],[1,1]];
let J_TEMPLATE = [[1,1,],[1,0],[1,0]]; // Change these to be horizontal

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
  temp = new PieceL(3,1);
  grid = theGame.createGrid();
  temp.insert();
  // temp.update();
}

function draw() {
  background(220);
  theGame.displayGrid();
  //theGame.runGame();
}

function keyPressed(){
  if(key === RIGHT_ARROW){
    temp.shift("right");
  }
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
  constructor(){
    this.y = 1;
    this.x = 3;
  }

  // tempInsert(){
  //   for(let rows = this.y; rows <= I_TEMPLATE.length; rows++){
  //     if(grid[1][rows] === 0 && I_TEMPLATE[rows] === 1){
  //       grid[1][rows] = 1;
  //     }
  //   }
  // }
  insert(template){
    for(let col = 0; col < template.length; col ++){
      for(let row = 0; row < template[col].length; row++){
        if(template[col][row] === 1){
          grid[this.y+col][this.x+row] = 1;
        }
      }
    }
  }

  update(){
    this.y += 1;
  }
}

class PieceI extends Tetromino {
  constructor(x,y){
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
  insert(){
    super.insert(I_TEMPLATE);

  }

  display(){
    super.display();
  }

  shift(direction){
    if(direction === "right"){
      for(let i = 0; i < I_TEMPLATE.length; i++){
        if(grid[1][i] === 1){
          grid[1][i+1] = 1;
        }
        if(i === 0 && grid[1][i] === 1){
          grid[1][i] = 0;
        }
      }
    }
  }
}

class PieceO extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = O_TEMPLATE;
    this.color = "gold";
  }

  insert(){
    super.insert(O_TEMPLATE);
  }
}

class PieceT extends Tetromino {
  constructor(x,y){
    super();
    this.x = x;
    this.y = y;
    this.template = T_TEMPLATE;
    this.color = "purple";
  }

  insert(){
    super.insert(T_TEMPLATE);
  }

  update(){
  }

}

class PieceZ extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = Z_TEMPLATE;
    this.color = "red";
  }

  insert(){
    super.insert(Z_TEMPLATE);
  }
}

class PieceS extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = S_TEMPLATE;
    this.color = "lime";
  }

  insert(){
    super.insert(S_TEMPLATE);
  }
}

class PieceL extends Tetromino {
  constructor(x,y){
    super();
    this.x = x;
    this.y =y;
    this.template = L_TEMPLATE;
  }

  insert(){
    super.insert(L_TEMPLATE);
  }
}

class PieceJ extends Tetromino {
  constructor(x,y){
    super();
    this.x = x;
    this.y =y;
    this.template = L_TEMPLATE;
  }

  insert(){
    super.insert(J_TEMPLATE);
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