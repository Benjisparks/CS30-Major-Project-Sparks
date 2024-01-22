// Major Project Tetris Clone
// Benjamin Sparks
// 1/21/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let holdGrid;  //declare grid variables
let nextGrid;
let theGame;    
let music1;    //declare sound variables
let clearSound;
let HOLD_OFFSET;    
let GRID_HEIGHT = 20;
let GRID_WIDTH = 10;
let HOLD_GRID_H =  3;
let HOLD_GRID_W = 4;   //Define constant grid sizes
let NEXT_GRID_H = 3;
let NEXT_GRID_W = 4;
let cellSize;
let mainFont, gameFont;  //Declare font variables

let I_TEMPLATE = [[1,1,1,1]]; 
let O_TEMPLATE = [[1,1],[1,1]];
let T_TEMPLATE = [[0,1,0],[1,1,1]];
let Z_TEMPLATE = [[1,1,0],[0,1,1]];
let S_TEMPLATE = [[0,1,1],[1,1,0]];   //Create basic templates for all pieces
let L_TEMPLATE = [[0,0,1],[1,1,1]]; 
let J_TEMPLATE = [[1,0,0],[1,1,1]]; 

let I_ROTATED = [[1],[1],[1],[1]];
let T_ROTATE_1 = [[1,0], [1,1], [1,0]];
let T_ROTATE_2 = [[1,1,1],[0,1,0]];
let T_ROTATE_3 = [[0,1], [1,1], [0,1]];
let Z_ROTATED = [[0,1],[1,1],[1,0]];
let S_ROTATED = [[1,0],[1,1],[0,1]];  //Create rotated templates for all pieces
let L_ROTATE_1 = [[1],[1],[1,1]] ;
let L_ROTATE_2 = [[1,1,1], [1]];
let L_ROTATE_3 = [[1,1], [0,1], [0,1]];
let J_ROTATE_1 = [[1,1], [1], [1]];
let J_ROTATE_2 = [[1,1,1],[0,0,1]];
let J_ROTATE_3 = [[0,1], [0,1], [1,1]];


function preload(){
  mainFont = loadFont("Tetris.ttf");
  gameFont = loadFont("Retro Gaming.ttf");
  music1 = loadSound("TetrisTheme1.mp3");  //Preload fonts and sfx
  clearSound = loadSound("cleared.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (height > width) {
    cellSize = width/GRID_HEIGHT;  //Setting sizes based on window
  }
  else {
    cellSize = height/GRID_HEIGHT;
  }
  HOLD_OFFSET = windowWidth/3.5;
  theGame = new Tetris();
  theGame.setOrder();
  grid = theGame.createGrid();
  holdGrid = theGame.holdPieceGrid();
  nextGrid = theGame.nextPiecesGrid();
  theGame.pieceArray[theGame.currentPiece].insert(theGame.pieceArray[theGame.currentPiece].rotations[theGame.pieceArray[theGame.currentPiece].currentRotation], theGame.pieceArray[theGame.currentPiece].color); /// fix 
  theGame.nextPiece();
  setInterval(() => theGame.dropPiece(), 1000);
}

function draw() {
  background(220);
  theGame.displayGrid();
  theGame.displayHeld();
  theGame.displayNext();
  theGame.scoreCounter();
  //theGame.runGame();
}

class Tetris{  //Main game class
  constructor(){
    this.screen = "menu";
    this.score = 0;
    //this.timer = millis();
    this.level = 1;
    this.pieceOrder = [];
    this.pieceArray =[];
    this.currentPiece = 0;
    this.heldPiece = [];
    this.music1 = music1;
    this.sfx = clearSound;
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
    else if(this.screen === "game"){  
      background(220);
      theGame.displayGrid();
      theGame.displayHeld();
      theGame.displayNext();
      theGame.scoreCounter();
    }
    else if(this.screen === "lose"){
      theGame.lose();
    }
  }
  
  mainMenu(){
    background("grey");
    textFont(mainFont);
    textSize(width/16);
    textAlign("center");
    text("k T h",width/2,height/2);
  }

  lose(){
    noLoop();
    textFont(gameFont);
    textSize(width/16);
    textAlign("center");
    fill("black");
    text("GAME OVER", width/2, height/2);
  }

  setOrder(){
    for(let i = 0; i < 100; i++){
      this.pieceOrder.push(floor(random(1,8)));
    }
    for(let i of this.pieceOrder){
      if(i === 1){
        let him = new PieceI(0,1);
        this.pieceArray.push(him);
      }
      else if(i === 2){
        let him = new PieceO(0,1);
        this.pieceArray.push(him);
      }
      else if(i === 3){
        let him = new PieceT(0,1);
        this.pieceArray.push(him);
      }
      else if(i === 4){
        let him = new PieceZ(0,1);
        this.pieceArray.push(him);
      }
      else if(i === 5){
        let him = new PieceS(0,1);
        this.pieceArray.push(him);
      }
      else if(i === 6){
        let him = new PieceL(0,1);
        this.pieceArray.push(him);
      }
      else if(i === 7){
        let him = new PieceJ(0,1);
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

  playMusic(){
    this.music1.loop();
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

  nextPiecesGrid(){
    let thisGrid = [];
    for(let cols = 0; cols < NEXT_GRID_H; cols ++){
      thisGrid.push([]);
      for(let rows = 0; rows < NEXT_GRID_W; rows++){
        thisGrid[cols].push(0);
      }
    }
    return thisGrid;
  }

  scoreCounter(){
    textFont(gameFont);
    textAlign(RIGHT);
    fill("black");
    text("SCORE:" + this.score, width /1.5, height/ 4);
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

  displayNext(){
    for(let cols = 0; cols < NEXT_GRID_H; cols ++){
      for(let rows = 0; rows < NEXT_GRID_W; rows++){
        if(nextGrid[cols][rows] === 0){
          fill("grey");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize + HOLD_OFFSET/2,cellSize,cellSize);
        }
        else if( nextGrid[cols][rows] === 1){
          fill("cyan");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize + HOLD_OFFSET/2,cellSize,cellSize);
        }
        else if( nextGrid[cols][rows] === 2){
          fill("gold");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize + HOLD_OFFSET/2,cellSize,cellSize);
        }
        else if( nextGrid[cols][rows] ===3){
          fill("purple");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize + HOLD_OFFSET/2,cellSize,cellSize);
        }
        else if( nextGrid[cols][rows] === 4){
          fill("red");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize + HOLD_OFFSET/2,cellSize,cellSize);
        }
        else if( nextGrid[cols][rows] === 5){
          fill("lime");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize + HOLD_OFFSET/2,cellSize,cellSize);
        }
        else if( nextGrid[cols][rows] === 6){
          fill("orange");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize + HOLD_OFFSET/2,cellSize,cellSize);
        }
        else if( nextGrid[cols][rows] === 7){
          fill("blue");
          rect(rows*cellSize + HOLD_OFFSET,cols*cellSize + HOLD_OFFSET/2,cellSize,cellSize);
        }
      }
    }
  }

  clearNext(){
    for(let col = 0; col < NEXT_GRID_H; col ++){
      for(let row = 0; row < NEXT_GRID_W; row ++){
        if( nextGrid[col][row] !== 0){
          nextGrid[col][row] = 0;
        }
      }
    }
  }

  clearHeld(){
    for (let col = 0; col < HOLD_GRID_H; col ++){
      for (let row = 0; row < HOLD_GRID_W; row ++){
        if(holdGrid[col][row] !== 0 ){
          holdGrid[col][row] = 0;
        }
      }
    }
  }

  dropPiece(){
    if(this.isValidMove(0,1)) {
      this.pieceArray[this.currentPiece].clear();

      this.pieceArray[this.currentPiece].y++;

      this.pieceArray[this.currentPiece].insert(this.pieceArray[this.currentPiece].rotations[this.pieceArray[this.currentPiece].currentRotation], this.pieceArray[this.currentPiece].color);

      this.displayGrid();

    }
    else{      
      this.checkForGameOver();
      this.checkForClear();
      this.currentPiece += 1;
      this.pieceArray[this.currentPiece].insert(this.pieceArray[this.currentPiece].rotations[this.pieceArray[this.currentPiece].currentRotation], this.pieceArray[this.currentPiece].color);
      this.clearNext();
      this.pieceArray[this.currentPiece + 1].showNext(this.pieceArray[this.currentPiece + 1].rotations[0], this.pieceArray[this.currentPiece + 1].color);
      this.score += 36;

    }
  }

  leftMove(){
    if(this.isValidMove(-1,0)){
      this.pieceArray[this.currentPiece].clear();

      this.pieceArray[this.currentPiece].x--;

      this.pieceArray[this.currentPiece].insert(this.pieceArray[this.currentPiece].rotations[this.pieceArray[this.currentPiece].currentRotation], this.pieceArray[this.currentPiece].color);

      this.displayGrid();
    }
  }

  rightMove(){
    if(this.isValidMove(1,0)){
      this.pieceArray[this.currentPiece].clear();

      this.pieceArray[this.currentPiece].x++;

      this.pieceArray[this.currentPiece].insert(this.pieceArray[this.currentPiece].rotations[this.pieceArray[this.currentPiece].currentRotation], this.pieceArray[this.currentPiece].color);

      this.displayGrid();
    }
  }

  isValidMove(dx, dy){
    let thePiece = this.pieceArray[this.currentPiece];
    let theTemplate = thePiece.rotations[thePiece.currentRotation];

    let newY = thePiece.y + dy;
    let newX = thePiece.x + dx;

    if (newY < 0 || newY + theTemplate.length > GRID_HEIGHT || newX < 0 || newX + theTemplate[0].length > GRID_WIDTH){
      return false;
    }
    
    if(dx === 0){
      for (let col = 0; col < theTemplate.length; col++) {
        for (let row = 0; row < theTemplate[col].length; row++) {
          if (grid[newY + theTemplate.length -1][newX + theTemplate[col].length - 1] !== 0) {   //FIIIXIXIXIXXIIXX
            return false;
          }
        }
      }
    }

    else if(dx === 1){
      for (let col = 0; col < theTemplate.length; col ++){
        if(theTemplate[col][theTemplate[col].length-1] === 1 && grid[newY + col][newX + theTemplate[col].length - 1] !== 0){
          return false;
        }
      }
    }

    else if( dx === -1){
      for(let col = 0; col < theTemplate.length; col ++){
        if(theTemplate[col][0] === 1 && grid[newY + col][newX] !== 0 || (theTemplate[col][0] === 0 && theTemplate[col][1] === 1 && grid[newY+col][thePiece.x] !== 0) ){
          return false;
        }
      }
    }
    return true;

  }

  holdPiece(){
    this.pieceArray[this.currentPiece].clear();
    this.pieceArray[this.currentPiece].hold();
    this.currentPiece += 1;
  }

  nextPiece(){
    this.pieceArray[this.currentPiece + 1].showNext();
    if(this.currentPiece + 1 === (this.pieceArray.length -1)){
      this.setOrder();
    }
  }

  checkForClear(){
    for(let cols = 0; cols < GRID_HEIGHT; cols ++){
      if(! grid[cols].includes(0)){
        this.clearLine();
      }
    }
  }

  checkForGameOver(){
    for(let cell of grid[1]){
      if(cell !== 0){
        this.clearGrid();
        this.screen = "lose";
      }
    }
  }

  clearLine(){
    // this.clearGrid();
    let clearedRow = -1;

    for (let row = GRID_HEIGHT - 1; row >= 0; row--) {
      if (!grid[row].includes(0)) {
        clearedRow = row;
        break;
      }
    }

    if (clearedRow !== -1) {
      grid.splice(clearedRow, 1);
      grid.unshift(new Array(GRID_WIDTH).fill(0));
      for (let row = clearedRow - 1; row >= 0; row--) {
        grid[row + 1] = [...grid[row]];
      }
      this.sfx.play();
      this.score += 100;
    }
  }

}

class Tetromino {  //Starting class for all pieces 
  constructor(){
    this.y = 1;
    this.x = 0;
  }

  insert(template, color){ //insert the piece into the grid 
    for(let col = 0; col < template.length; col ++){
      for(let row = 0; row < template[col].length; row++){
        if(template[col][row] === 1){
          grid[this.y+col][this.x+row] = color;
        }
      }
    }
  }


  showNext(template, color){ //Insert a piece into the next up grid
    for(let col = 0; col < template.length; col ++){
      for(let row = 0; row < template[col].length; row++){
        if(template[col][row] === 1){
          nextGrid[this.y+col][this.x+row] = color;
        }
      }
    }
  }

  clear(){ //remove a piece from the grid 
    let thePiece = theGame.pieceArray[theGame.currentPiece];
    let template = thePiece.rotations[thePiece.currentRotation];

    for (let col = 0; col < template.length; col++) {
      for (let row = 0; row < template[col].length; row++) {
        if (template[col][row] === 1) {
          grid[thePiece.y + col][thePiece.x + row] = 0;
        }
      }
    }
  }
 
  hold(){ //hold current piece and put it in held grid
    theGame.clearHeld();
    let thePiece = theGame.pieceArray[theGame.currentPiece];
    let theHeld;
    let template = thePiece.template;

    for (let col = 0; col < template.length; col++) {
      for (let row = 0; row < template[col].length; row++) {  ////FIX THIS
        if (template[col][row] === 1) {
          holdGrid[col][row] = thePiece.color;
        }
      }
    }

    theGame.pieceArray[theGame.currentPiece].clear();
    if (theGame.heldPiece.length === 0){
      theGame.heldPiece.push(thePiece);
      theGame.currentPiece += 1;      
    }
    else{
      theHeld = theGame.heldPiece[0];
      theGame.pieceArray[theGame.currentPiece] = theHeld;
      theGame.heldPiece.length = 0;
      theGame.heldPiece.push(thePiece);
      theHeld.x = 0;
      theHeld.y = 1;
      theHeld.insert(theHeld.rotations[theHeld.currentRotation], theHeld.color);
    }
  }
  

}

//Subclasses of Tetromino for each piece 
class PieceI extends Tetromino {
  constructor(x,y){
    super();
    this.x = x;
    this.y = y;
    this.template = I_TEMPLATE;
    this.rotations = [I_TEMPLATE, I_ROTATED];
    this.currentRotation = 0;
    this.color = 1;
  }

  insert(){
    super.insert(this.rotations[this.currentRotation],this.color); ///ADD X Y 

  }

  showNext(){
    super.showNext(this.template, this.color);
  }
  
  hold(){
    super.hold();
  }
}

class PieceO extends Tetromino {
  constructor(x,y){
    super();
    this.x = x; 
    this.y = y;
    this.template = O_TEMPLATE;
    this.rotations = [O_TEMPLATE, O_TEMPLATE];
    this.color = 2;
    this.currentRotation = 0;
  }

  insert(){
    super.insert(this.rotations[this.currentRotation], this.color);
  }

  showNext(){
    super.showNext(this.template, this.color);
  }

  hold(){
    super.hold();
  }
}

class PieceT extends Tetromino {
  constructor(x,y){
    super();
    this.x = x;
    this.y = y;
    this.template = T_TEMPLATE;
    this.rotations = [T_TEMPLATE, T_ROTATE_1,T_ROTATE_2,T_ROTATE_3];
    this.currentRotation = 0;
    this.color = 3;
  }

  // insert(){
  //   super.insert(this.template, this.color);
  // }

  insert(){
    super.insert(this.rotations[this.currentRotation], this.color);
  }

  showNext(){
    super.showNext(this.template, this.color);
  }

  hold(){
    super.hold();
  }
}

class PieceZ extends Tetromino {
  constructor(x,y){
    super();
    this.x = x;
    this.y = y;
    this.template = Z_TEMPLATE;
    this.color = 4;
    this.rotated = Z_ROTATED;
    this.rotations = [Z_TEMPLATE, Z_ROTATED];
    this.currentRotation = 0;
  }

  insert(){
    super.insert(this.rotations[this.currentRotation], this.color);
  }

  showNext(){
    super.showNext(this.template, this.color);
  }

  hold(){
    super.hold();
  }
}

class PieceS extends Tetromino {
  constructor(x,y){
    super();
    this.x = x;
    this.y = y; 
    this.template = S_TEMPLATE;
    this.color = 5;
    this.rotated = S_ROTATED;
    this.rotations = [S_TEMPLATE, S_ROTATED];
    this.currentRotation = 0;
  }

  insert(){
    super.insert(this.rotations[this.currentRotation],this.color);
  }

  showNext(){
    super.showNext(this.template, this.color);
  }

  hold(){
    super.hold();
  }
}

class PieceL extends Tetromino {
  constructor(x,y){
    super();
    this.x = x;
    this.y = y;
    this.template = L_TEMPLATE;
    this.color = 6;
    this.rotations = [L_TEMPLATE, L_ROTATE_1, L_ROTATE_2, L_ROTATE_3];
    this.currentRotation = 0;
  }

  insert(){
    super.insert(this.rotations[this.currentRotation], this.color);
  }

  showNext(){
    super.showNext(this.template, this.color);
  }

  hold(){
    super.hold();
  }
}

class PieceJ extends Tetromino {
  constructor(x,y){
    super();
    this.x = x;
    this.y = y;
    this.template = J_TEMPLATE;
    this.color = 7;
    this.rotations = [J_TEMPLATE, J_ROTATE_1,J_ROTATE_2,J_ROTATE_3];
    this.currentRotation = 0;
  }

  insert(){
    super.insert(this.rotations[this.currentRotation], this.color);
  }

  showNext(){
    super.showNext(this.template, this.color);
  }

  hold(){
    super.hold();
  }
}

function keyTyped(){
  if(key === " "){
    if(theGame.screen === "menu"){
      theGame.screen = "game"; 
      theGame.playMusic();    
      // setInterval(() => theGame.dropPiece(), 1000);
    }
  }
  if(key === "c"){
    theGame.pieceArray[theGame.currentPiece].hold();
  }

  if(key === "d"){
    theGame.rightMove();
  }
  if(key === "s"){
    theGame.dropPiece();
  }
  if(key === "a"){
    theGame.leftMove();
  }
  if(key === "r"){
    theGame.pieceArray[theGame.currentPiece].clear();
    if(theGame.pieceArray[theGame.currentPiece] !== PieceO){
      if(theGame.pieceArray[theGame.currentPiece].currentRotation === theGame.pieceArray[theGame.currentPiece].rotations.length - 1){
        theGame.pieceArray[theGame.currentPiece].currentRotation = 0;
      }
      else {
        theGame.pieceArray[theGame.currentPiece].currentRotation += 1;
      }
    }
  }
}
