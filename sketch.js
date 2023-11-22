// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid;
let GRID_HEIGHT = 20;
let GRID_WIDTH = 10;
let cellSize;
let I_PIECE, T_PIECE, L_PIECE, J_PIECE, S_PIECE, Z_PIECE, O_PIECE;


function setup() {
  createCanvas(windowWidth, windowHeight);
  if (height > width) {
    cellSize = width/GRID_HEIGHT;  //Setting sizes based on window
  }
  else {
    cellSize = height/GRID_HEIGHT;
  }
  grid = createGrid();
}

function draw() {
  background(220);
  displayGrid();
}

function createGrid(){
  let theGrid = [];
  for(let cols = 0; cols < GRID_HEIGHT; cols ++){
    theGrid.push([]);
    for(let rows = 0; rows < GRID_WIDTH; rows ++){
      theGrid[cols].push(0);
    }
  }
  return theGrid;
}

function displayGrid(){
  for ( let cols = 0; cols <= GRID_HEIGHT; cols++){
    for(let rows = 0; rows <= GRID_WIDTH; rows ++){
      if(grid[cols][rows] === 0){
        fill("grey");
        rect(rows*cellSize,cols*cellSize,cellSize,cellSize);
      }
    }
  }
}