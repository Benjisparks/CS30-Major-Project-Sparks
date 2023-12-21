// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let i = 0;
let grid;
let holdGrid;
let theGame;
let HOLD_OFFSET;
let GRID_HEIGHT = 20;
let GRID_WIDTH = 10;
let HOLD_GRID_H =  3;
let HOLD_GRID_W = 4;
let cellSize;
let mainFont, gameFont;
let temp; 

let I_TEMPLATE = [[1,1,1,1]]; // [[1],[1],[1],[1]]];
let O_TEMPLATE = [[1,1],[1,1]];
let T_TEMPLATE = [[0,1,0],[1,1,1]];
let Z_TEMPLATE = [[0,1,1,0],[0,0,1,1]];
let S_TEMPLATE = [[0,0,1,1],[0,1,1,0]];
let L_TEMPLATE = [[0,0,1],[1,1,1]]; //[[1,0],[1,0],[1,1]];
let J_TEMPLATE = [[1,0,0],[1,1,1]]; 

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
  HOLD_OFFSET = 400;
  theGame = new Tetris();
  theGame.setOrder();
  grid = theGame.createGrid();
  holdGrid = theGame.holdPieceGrid();
  theGame.pieceArray[0].insert();
  //theGame.pieceArray[0].update();

}

function draw() {
  background(220);
  theGame.displayGrid();
  theGame.displayHeld();
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
    this.pieceOrder = [];
    this.pieceArray =[];
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
        else if( grid[cols][rows] === 2){
          fill("gold");
          rect(rows*cellSize,cols*cellSize,cellSize,cellSize);
        }
        else if( grid[cols][rows] ===3){
          fill("purple");
          rect(rows*cellSize,cols*cellSize,cellSize,cellSize);
        }
        else if( grid[cols][rows] === 4){
          fill("red");
          rect(rows*cellSize,cols*cellSize,cellSize,cellSize);
        }
        else if( grid[cols][rows] === 5){
          fill("lime");
          rect(rows*cellSize,cols*cellSize,cellSize,cellSize);
        }
        else if( grid[cols][rows] === 6){
          fill("orange");
          rect(rows*cellSize,cols*cellSize,cellSize,cellSize);
        }
        else if( grid[cols][rows] === 7){
          fill("blue");
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

  setOrder(){
    for(let i = 0; i < 10; i++){
      this.pieceOrder.push(floor(random(1,8)));
    }
    for(let i of this.pieceOrder){
      if(i === 1){
        let him = new PieceI();
        this.pieceArray.push(him);
      }
      else if(i === 2){
        let him = new PieceO();
        this.pieceArray.push(him);
      }
      else if(i === 3){
        let him = new PieceT();
        this.pieceArray.push(him);
      }
      else if(i === 4){
        let him = new PieceZ();
        this.pieceArray.push(him);
      }
      else if(i === 5){
        let him = new PieceS();
        this.pieceArray.push(him);
      }
      else if(i === 6){
        let him = new PieceL();
        this.pieceArray.push(him);
      }
      else if(i === 7){
        let him = new PieceJ();
        this.pieceArray.push(him);
      }
    }  
    return this.pieceArray , this.pieceOrder;
  }

  clearGrid(){
    for ( let cols = 0; cols < GRID_HEIGHT; cols++){
      for(let rows = 0; rows < GRID_WIDTH; rows ++){
        if(grid[cols][rows] !== 0){
          grid[cols][rows] = 0;
        }
      }
    }
  }

  holdPieceGrid(){
    let thisGrid = [];
    for(let cols = 0; cols < HOLD_GRID_H; cols ++){
      thisGrid.push([]);
      for(let rows = 0; rows < HOLD_GRID_W; rows ++){
        thisGrid[cols].push(0);
      }
    }
    return thisGrid;
  }

  displayHeld(){
    for(let cols = 0; cols < HOLD_GRID_H; cols ++){
      for(let rows = 0; rows < HOLD_GRID_W; rows++){
        if(holdGrid[cols][rows] === 0){
          fill("grey");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize,cellSize,cellSize);
        }
        else if( holdGrid[cols][rows] === 1){
          fill("cyan");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize,cellSize,cellSize);
        }
        else if( holdGrid[cols][rows] === 2){
          fill("gold");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize,cellSize,cellSize);
        }
        else if( holdGrid[cols][rows] ===3){
          fill("purple");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize,cellSize,cellSize);
        }
        else if( holdGrid[cols][rows] === 4){
          fill("red");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize,cellSize,cellSize);
        }
        else if( holdGrid[cols][rows] === 5){
          fill("lime");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize,cellSize,cellSize);
        }
        else if( holdGrid[cols][rows] === 6){
          fill("orange");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize,cellSize,cellSize);
        }
        else if( holdGrid[cols][rows] === 7){
          fill("blue");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize,cellSize,cellSize);
        }
      }
    }
  }

  holdPiece(){
    this.nextGrid(i);
  }

  nextPiece(){
    let nextGrid = [];
    nextGrid.push(); 
  } 

}

class Tetromino {
  constructor(){
    this.y = 1;
    this.x = 0;
  }

  insert(template, color){
    for(let col = 0; col < template.length; col ++){
      for(let row = 0; row < template[col].length; row++){
        if(template[col][row] === 1){
          grid[this.y+col][this.x+row] = color;
        }
      }
    }
  }

  // update(template,color){
  //   let trues = 0;
  //   for(let x = this.x; x < x + template.length; x++){
  //     if(grid[this.y+1][x] === 0){
  //       trues += 1;
  //     }
  //   }
  //   if(trues === template.length){
  //     for(let x = this.x; x < x + template.length; x++){
  //       grid[this.y][x] = 0;
  //     }
  //     for(let x = this.x; x < x + template.length; x++){
  //       grid[this.y+1][x] = color;
  //     }
  //   }
  // }  
}

class PieceI extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = I_TEMPLATE;
    this.color = 1;
  }
  update(){
    super.update(I_TEMPLATE, this.color);
  }

  insert(){
    super.insert(I_TEMPLATE,this.color);

  }
}

class PieceO extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = O_TEMPLATE;
    this.color = 2;
  }

  insert(){
    super.insert(O_TEMPLATE, this.color);
  }
}

class PieceT extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = T_TEMPLATE;
    this.color = 3;
  }

  insert(){
    super.insert(T_TEMPLATE, this.color);
  }

  update(){
  }

  rotate(){
    super.insert();
  }
}

class PieceZ extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = Z_TEMPLATE;
    this.color = 4;
  }

  insert(){
    super.insert(Z_TEMPLATE, this.color);
  }
}

class PieceS extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = S_TEMPLATE;
    this.color = 5;
  }

  insert(){
    super.insert(S_TEMPLATE,this.color);
  }

  update(){
    super.update(S_TEMPLATE);
  }
}

class PieceL extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = L_TEMPLATE;
    this.color = 6;
  }

  insert(){
    super.insert(L_TEMPLATE, this.color);
  }
}

class PieceJ extends Tetromino {
  constructor(x,y){
    super(x,y);
    this.template = J_TEMPLATE;
    this.color = 7;
  }

  insert(){
    super.insert(J_TEMPLATE, this.color);
  }
}

function keyTyped(){
  i += 1;
  if(key === " "){
    theGame.clearGrid();
    theGame.pieceArray[i].insert();
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