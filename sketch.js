// Major Project Tetris Clone
// Benjamin Sparks
// 1/21/2024
//
// Extra for Experts:
// The hardest parts of this project was the movement and collision detection of pieces, and clearing/shifting down lines which required research(see clearLine Function) The  
//Hold function was another that took some work. This project really helped expand my knowledge of OOP and Arrays in Javascript

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

let autoDrop;
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
  HOLD_OFFSET = cellSize *12;
  theGame = new Tetris();
  theGame.setOrder();
  grid = theGame.createGrid();        //Creating game object and grid, first piece in grid
  holdGrid = theGame.holdPieceGrid();
  nextGrid = theGame.nextPiecesGrid();
  theGame.pieceArray[theGame.currentPiece].insert(theGame.pieceArray[theGame.currentPiece].rotations[theGame.pieceArray[theGame.currentPiece].currentRotation], theGame.pieceArray[theGame.currentPiece].color); /// fix 
  theGame.nextPiece();
}

function draw() {
  theGame.runGame();  //p5Js draw loop
}

class Tetris{  //Main game class
  constructor(){
    this.screen = "menu";
    this.score = 0;
    this.level = 1;
    this.pieceOrder = [];
    this.pieceArray =[];
    this.currentPiece = 0;
    this.heldPiece = [];
    this.music1 = music1;
    this.sfx = clearSound;
  }
  createGrid(){
    let theGrid = [];       //Creates the game board
    for(let cols = 0; cols < GRID_HEIGHT; cols ++){
      theGrid.push([]);
      for(let rows = 0; rows < GRID_WIDTH; rows ++){
        theGrid[cols].push(0);
      }
    }
    return theGrid;
  }

  displayGrid(){  //displays the game board
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
  runGame(){  //Main game loop function
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
  
  mainMenu(){  //Main Menu text
    background("grey");
    textFont(mainFont);
    textSize(width/15);
    textAlign("center");
    text("k T h",width/2,height/2);
    textFont(gameFont);
    textSize(width/35);
    textAlign("center");
    text("Press a,s,d to move pieces, C to hold, and R to rotate", windowWidth/2, windowHeight - 100);
  }

  lose(){ //Game handling a loss, stopping draw loop and game and writing game over text
    noLoop();
    clearInterval(autoDrop);
    textFont(gameFont);
    textSize(width/15);
    textAlign("center");
    fill("black");
    text("GAME OVER", width/2, height/2);
  }

  setOrder(){ //setting the order of the pieces randomly
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

  clearGrid(){  //clear everything from the grid
    for ( let cols = 0; cols < GRID_HEIGHT; cols++){
      for(let rows = 0; rows < GRID_WIDTH; rows ++){
        if(grid[cols][rows] !== 0){
          grid[cols][rows] = 0;
        }
      }
    }
  }

  playMusic(){ //play music
    this.music1.loop();
  }

  holdPieceGrid(){ //creates the grid for showing a held piece
    let thisGrid = [];
    for(let cols = 0; cols < HOLD_GRID_H; cols ++){
      thisGrid.push([]);
      for(let rows = 0; rows < HOLD_GRID_W; rows ++){
        thisGrid[cols].push(0);
      }
    }
    return thisGrid;
  }

  nextPiecesGrid(){ //creates the grid for showing the next piece
    let thisGrid = [];
    for(let cols = 0; cols < NEXT_GRID_H; cols ++){
      thisGrid.push([]);
      for(let rows = 0; rows < NEXT_GRID_W; rows++){
        thisGrid[cols].push(0);
      }
    }
    return thisGrid;
  }

  scoreCounter(){ //draws the score counter to the screen
    textFont(gameFont);
    textAlign(RIGHT);
    textSize(width/18);
    fill("black");
    text("SCORE:" + this.score, width /1.5, height/ 4);
  }

  displayHeld(){ //shows the held piece grid
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

  displayNext(){ //shows the next piece up grid
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

  clearNext(){ //empties the next up grid
    for(let col = 0; col < NEXT_GRID_H; col ++){
      for(let row = 0; row < NEXT_GRID_W; row ++){
        if( nextGrid[col][row] !== 0){
          nextGrid[col][row] = 0;
        }
      }
    }
  }

  clearHeld(){ //empties the held piece grid
    for (let col = 0; col < HOLD_GRID_H; col ++){
      for (let row = 0; row < HOLD_GRID_W; row ++){
        if(holdGrid[col][row] !== 0 ){
          holdGrid[col][row] = 0;
        }
      }
    }
  }

  dropPiece(){ //checks if piece can move down, and moves piece accordingly
    if(this.isValidMove(0,1)) {
      this.pieceArray[this.currentPiece].clear();

      this.pieceArray[this.currentPiece].y++;

      this.pieceArray[this.currentPiece].insert(this.pieceArray[this.currentPiece].rotations[this.pieceArray[this.currentPiece].currentRotation], this.pieceArray[this.currentPiece].color);

      this.displayGrid();

    }
    else{      
      this.checkForGameOver(); //see if the player lost
      this.checkForClear(); // see if the player cleared a line
      this.checkForLevelUp();
      this.currentPiece += 1;
      this.pieceArray[this.currentPiece].insert(this.pieceArray[this.currentPiece].rotations[this.pieceArray[this.currentPiece].currentRotation], this.pieceArray[this.currentPiece].color);
      this.clearNext(); //moves to next piece
      this.pieceArray[this.currentPiece + 1].showNext(this.pieceArray[this.currentPiece + 1].rotations[0], this.pieceArray[this.currentPiece + 1].color);
      this.score += 36;

    }
  }

  leftMove(){ //moves piece left if possible
    if(this.isValidMove(-1,0)){
      this.pieceArray[this.currentPiece].clear();

      this.pieceArray[this.currentPiece].x--;

      this.pieceArray[this.currentPiece].insert(this.pieceArray[this.currentPiece].rotations[this.pieceArray[this.currentPiece].currentRotation], this.pieceArray[this.currentPiece].color);

      this.displayGrid();
    }
  }

  rightMove(){ //moves piece right if possible
    if(this.isValidMove(1,0)){
      this.pieceArray[this.currentPiece].clear();

      this.pieceArray[this.currentPiece].x++;

      this.pieceArray[this.currentPiece].insert(this.pieceArray[this.currentPiece].rotations[this.pieceArray[this.currentPiece].currentRotation], this.pieceArray[this.currentPiece].color);

      this.displayGrid();
    }
  }

  isValidMove(dx, dy){ //sees if a piece can move
    let thePiece = this.pieceArray[this.currentPiece];
    let theTemplate = thePiece.rotations[thePiece.currentRotation];

    let newY = thePiece.y + dy;
    let newX = thePiece.x + dx;

    if (newY < 0 || newY + theTemplate.length > GRID_HEIGHT || newX < 0 || newX + theTemplate[0].length > GRID_WIDTH){ //checks if piece is going out of bounds
      return false;
    }
    
    if(dx === 0){ //checks below the piece for downward movement
      for(let row = 0; row < theTemplate[theTemplate.length -1].length; row++){
        if(theTemplate[theTemplate.length -1][row] === 1 && grid[newY + theTemplate.length - 1][newX + row] !== 0){
          return false;
        }
      }
    }

    else if(dx === 1){ //checks to the right
      for (let col = 0; col < theTemplate.length; col ++){
        if(theTemplate[col][theTemplate[col].length-1] === 1 && grid[newY + col][newX + theTemplate[col].length - 1] !== 0){
          return false;
        }
      }
    }

    else if( dx === -1){ //checks to the left
      for(let col = 0; col < theTemplate.length; col ++){
        if(theTemplate[col][0] === 1 && grid[newY + col][newX] !== 0 || (theTemplate[col][0] === 0 && theTemplate[col][1] === 1 && grid[newY+col][thePiece.x] !== 0) ){
          return false;
        }
      }
    }
    return true;

  }

  holdPiece(){ //holds current piece
    this.pieceArray[this.currentPiece].clear();
    this.pieceArray[this.currentPiece].hold();
    this.currentPiece += 1;
  }

  nextPiece(){ //moves to next piece and refreshes order if needed
    this.pieceArray[this.currentPiece + 1].showNext();
    if(this.currentPiece + 1 === (this.pieceArray.length -1)){
      this.setOrder();
    }
  }

  checkForClear(){ //checks if all the tiles in a row are cleared
    for(let cols = 0; cols < GRID_HEIGHT; cols ++){
      if(! grid[cols].includes(0)){
        this.clearLine();
      }
    }
  }

  checkForGameOver(){ // sees if a piece is too high up
    for(let cell of grid[1]){
      if(cell !== 0){
        this.clearGrid();
        this.screen = "lose";
      }
    }
  }

  checkForLevelUp(){ // see if score is high enough to increase the speed of pieces
    if (this.score > 5000){
      clearInterval(autoDrop);
      autoDrop = setInterval(() => theGame.dropPiece(), 500);
    }
    else if (this.score > 4000){
      clearInterval(autoDrop);
      autoDrop = setInterval(() => theGame.dropPiece(), 600);
    }
    else if (this.score > 3000){
      clearInterval(autoDrop);
      autoDrop = setInterval(() => theGame.dropPiece(), 700);
    }
    else if (this.score > 2000){
      clearInterval(autoDrop);
      autoDrop = setInterval(() => theGame.dropPiece(), 800);
    }
    else if (this.score > 1000){
      clearInterval(autoDrop);
      autoDrop = setInterval(() => theGame.dropPiece(), 900);
    }
  }

  clearLine(){ // clears the full line and shifts other rows down
    let clearedRow = -1;

    for (let row = GRID_HEIGHT - 1; row >= 0; row--) {
      if (!grid[row].includes(0)) {
        clearedRow = row;
        break;  // had to research what the break function does in javascript
      }
    }

    if (clearedRow !== -1) {
      grid.splice(clearedRow, 1);
      grid.unshift(new Array(GRID_WIDTH).fill(0)); //required research of arrays past what we did in class Source: https://www.w3schools.com/js/js_arrays.asp
      for (let row = clearedRow - 1; row >= 0; row--) {
        grid[row + 1] = [...grid[row]];  // required research into spread syntax and shallow copies Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
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
    this.x = x; //X & Y
    this.y = y;
    this.template = I_TEMPLATE; // base template
    this.rotations = [I_TEMPLATE, I_ROTATED]; //array of all templates
    this.currentRotation = 0; //current rotation
    this.color = 1; //Number that gets set into grid to detemine color to fill
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

function keyTyped(){ //Handling Key events 
  if(key === " "){ //starts the game from the menu screen
    if(theGame.screen === "menu"){
      theGame.screen = "game";
      background(220);
      theGame.playMusic();    
      autoDrop = setInterval(() => theGame.dropPiece(), 1000);
    }

    else if(theGame.screen === "lose"){
      loop();
      theGame.music1.stop();
      theGame.screen = "menu";
      theGame.mainMenu();
      theGame.clearGrid();
      theGame.score = 0;
    }
  }
  if(key === "c"){ //holds current piece
    if(theGame.screen === "game"){
      theGame.pieceArray[theGame.currentPiece].hold();
    }
  }

  if(key === "d"){
    if(theGame.screen === "game"){
      theGame.rightMove(); //moves to right
    }
  }
  if(key === "s"){ //moves down
    if(theGame.screen === "game"){
      theGame.dropPiece();
    }
  }
  if(key === "a"){ //moves to left
    if(theGame.screen === "game"){
      theGame.leftMove();
    }
  }
  if(key === "r"){ //rotates current piece
    if(theGame.screen === "game"){
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
}
