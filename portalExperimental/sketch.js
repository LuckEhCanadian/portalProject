// Portal
// Aiden Jorgensen
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//This is where i declare all of my global variables
let cols = 20;
let rows = 20;
let grid;
let chamber;
let playerX = 5;
let playerY = 5;
let orangeX=2;
let orangeY=2;
let blueX=2;
let blueY=2;
let cellSize;
let portalColor = 0;
let pressed = false;
let inventory;
let boxX = 9;
let boxY = 9;

//Setup loop where i make the game not explode when it opens
function setup() {
  if (windowHeight > windowWidth){
    createCanvas(windowWidth, windowWidth);
    cellSize = height/cols;
    state = "chamber1"
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  state = "chamber2"
  grid = createRoom();
  grid[playerX][playerY] = 1;
  portalColor = 1;
  inventory = [];
}
//calling my display function
function draw() {
  displayGrid(grid, rows, cols);
}
//displaying all the different parts of the grid
function displayGrid(grid, rows, cols) {
  let cellSize = width / cols;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill(255);
      }
      else if(grid[y][x] === "wall"){
        fill(125);
      }
      else if(grid[y][x] === "box"){
        fill(0,200,100);
      }
      else if(grid[y][x] === "portalO"){
        fill(255,119,0);
      }
      else if(grid[y][x] === "portalB"){
        fill(0,177,255);
      }
      else if(grid[y][x] === "button"){
        fill(255,0,0);
      }
      else if(grid[y][x] === "door"){
        if (pressed === false){
          fill(50);
        }
        else if(pressed === true){
          fill(100);
        }
      }
      else {
        fill(0);
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}
//this is checking when keys are pressed in each room to move or open buttons
function keyPressed(){
  if(key === "q"){
    portalColor = 1;
  }
  if(key === "Shift"){
    if(inventory[0] === "box"){
      boxY = playerY-1;
      boxX = playerX;
      grid[boxY][boxX] = "box";
      inventory.pop();
    }
  }
  if(key === " "){
    if(grid[playerY-1][playerX] === "box" || grid[playerY+1][playerX] === "box" || grid[playerY][playerX-1] === "box"|| grid[playerY][playerX+1] === "box"){
      inventory.push("box");
      grid[boxY][boxX] = 0;
    }
  }
  if(key === "e"){
    portalColor = 0;
  }
  if (key === 'f'){
    if(grid[playerY-1][playerX] === "button" || grid[playerY+1][playerX] === "button" || grid[playerY][playerX-1] === "button"|| grid[playerY][playerX+1] === "button"){
      if(pressed === false){
        if(state === "chamber1"){
          grid[11][6] = "wall";
          grid[17][10] = 0;
          grid[15][15] = "wall";
        }
        pressed = true;
      }
      else{
        if(state === "chamber1"){
          grid[11][6] = 0;
          grid[17][10] = "wall"
          grid[15][15] = 0;
        }
        pressed = false;
      }
    }
  }
  
  if(key === 'w'){
    if(grid[playerY-1][playerX] === 0){
      grid[playerY][playerX] = 0;
      playerY -= 1;
    }
    else if(grid[playerY-1][playerX] === "door"){
      if (pressed === true){
        state = "chamber2"
        grid = createRoom();
        pressed = false;
      }
      else{
      }
    }
    else if(grid[playerY-1][playerX] === grid[blueY][blueX]){
      grid[playerY][playerX] = 0;
      if(grid[orangeY][orangeX-1] === "wall"){
        playerY = orangeY;
        playerX = orangeX+1;
      }
      else if(grid[orangeY][orangeX+1] === "wall"){
        playerY = orangeY;
        playerX = orangeX-1;
      }
      else if(grid[orangeY-1][orangeX] === "wall"){
        playerY = orangeY+1;
        playerX = orangeX;
      }
      else if(grid[orangeY+1][orangeX] === "wall"){
        playerY = orangeY-1;
        playerX = orangeX;
      }
    }
    else if(grid[playerY-1][playerX] === grid[orangeY][orangeX]){
      grid[playerY][playerX] = 0;
      if(grid[blueY][blueX-1] === "wall"){
        playerY = blueY;
        playerX = blueX+1;
      }
      else if(grid[blueY][blueX+1] === "wall"){
        playerY = blueY;
        playerX = blueX-1;
      }
      else if(grid[blueY-1][blueX] === "wall"){
        playerY = blueY+1;
        playerX = blueX;
      }
      else if(grid[blueY+1][blueX] === "wall"){
        playerY = blueY-1;
        playerX = blueX;
      }
    }
  }
  if (key === 's'){
    if(grid[playerY+1][playerX] === 0){
      grid[playerY][playerX] = 0;
      playerY += 1;
    }
    else if(grid[playerY+1][playerX] === "door"){
      if (pressed === true){
        state = "chamber2"
        grid = createRoom();
        pressed = false;
      }
      else{
      }
    }
    else if(grid[playerY+1][playerX] === grid[blueY][blueX]){
      grid[playerY][playerX] = 0;
      if(grid[orangeY][orangeX-1] === "wall"){
        playerY = orangeY;
        playerX = orangeX+1;
      }
      else if(grid[orangeY][orangeX+1] === "wall"){
        playerY = orangeY;
        playerX = orangeX-1;
      }
      else if(grid[orangeY-1][orangeX] === "wall"){
        playerY = orangeY+1;
        playerX = orangeX;
      }
      else if(grid[orangeY+1][orangeX] === "wall"){
        playerY = orangeY-1;
        playerX = orangeX;
      }
    }
    else if(grid[playerY+1][playerX] === grid[orangeY][orangeX]){
      grid[playerY][playerX] = 0;
      if(grid[blueY][blueX-1] === "wall"){
        playerY = blueY;
        playerX = blueX+1;
      }
      else if(grid[blueY][blueX+1] === "wall"){
        playerY = blueY;
        playerX = blueX-1;
      }
      else if(grid[blueY-1][blueX] === "wall"){
        playerY = blueY+1;
        playerX = blueX;
      }
      else if(grid[blueY+1][blueX] === "wall"){
        playerY = blueY-1;
        playerX = blueX;
      }
    }
  }
  if(key === 'd'){
    if(grid[playerY][playerX+1] === 0){
      grid[playerY][playerX] = 0;
      playerX += 1;
    }
    else if(grid[playerY][playerX+1] === "door"){
      if (pressed === true){
        state = "chamber2"
        grid = createRoom();
        pressed = false;
      }
      else{
      }
    }
    else if(grid[playerY][playerX+1] === grid[blueY][blueX]){
      grid[playerY][playerX] = 0;
      if(grid[orangeY][orangeX-1] === "wall"){
        playerY = orangeY;
        playerX = orangeX+1;
      }
      else if(grid[orangeY][orangeX+1] === "wall"){
        playerY = orangeY;
        playerX = orangeX-1;
      }
      else if(grid[orangeY-1][orangeX] === "wall"){
        playerY = orangeY+1;
        playerX = orangeX;
      }
      else if(grid[orangeY+1][orangeX] === "wall"){
        playerY = orangeY-1;
        playerX = orangeX;
      }
    }
    else if(grid[playerY][playerX+1] === grid[orangeY][orangeX]){
      grid[playerY][playerX] = 0;
      if(grid[blueY][blueX-1] === "wall"){
        playerY = blueY;
        playerX = blueX+1;
      }
      else if(grid[blueY][blueX+1] === "wall"){
        playerY = blueY;
        playerX = blueX-1;
      }
      else if(grid[blueY-1][blueX] === "wall"){
        playerY = blueY+1;
        playerX = blueX;
      }
      else if(grid[blueY+1][blueX] === "wall"){
        playerY = blueY-1;
        playerX = blueX;
      }
    }
  }
  if(key === 'a'){
    if(grid[playerY][playerX-1] === 0){
      grid[playerY][playerX] = 0;
      playerX -= 1;
    }
    else if(grid[playerY][playerX-1] === "door"){
      if (pressed === true){
        state = "chamber2"
        grid = createRoom();
        pressed = false;
      }
      else{
      }
    }
    else if(grid[playerY][playerX-1] === grid[blueY][blueX]){
      grid[playerY][playerX] = 0;
      if(grid[orangeY][orangeX+1] === "wall"){
        playerY = orangeY;
        playerX = orangeX-1;
      }
      if(grid[orangeY][orangeX-1] === "wall"){
        playerY = orangeY;
        playerX = orangeX-1;
      }
      else if(grid[orangeY-1][orangeX] === "wall"){
        playerY = orangeY+1;
        playerX = orangeX;
      }
      else if(grid[orangeY+1][orangeX] === "wall"){
        playerY = orangeY-1;
        playerX = orangeX;
      }
    }
    else if(grid[playerY][playerX-1] === grid[orangeY][orangeX]){
      grid[playerY][playerX] = 0;
      if(grid[blueY][blueX+1] === "wall"){
        playerY = blueY;
        playerX = blueX-1;
      }
      else if(grid[blueY][blueX-1] === "wall"){
        playerY = blueY;
        playerX = blueX+1;
      }
      else if(grid[blueY+1][blueX] === "wall"){
        playerY = blueY-1;
        playerX = blueX;
      }
      else if(grid[blueY-1][blueX] === "wall"){
        playerY = blueY+1;
        playerX = blueX;
      }
    }
  }
  grid[playerY][playerX] = 1;

  //this is where portals are made
  if(key === "ArrowRight"){
    if (portalColor === 0){
      grid[blueY][blueX] = 0;
      blueX = playerX;
      blueY = playerY;
      while(grid[blueY][blueX+1] != "wall" && grid[blueY][blueX+1] != "door"){
        blueX += 1;
      }
      grid[blueY][blueX] = "portalB";
    }
    else{
      grid[orangeY][orangeX] = 0;
      orangeX = playerX;
      orangeY = playerY;
      while(grid[orangeY][orangeX+1] != "wall" && grid[orangeY][orangeX+1] != "door"){
        orangeX += 1;
      }
      grid[orangeY][orangeX] = "portalO";
    }
  }
  if(key === "ArrowLeft"){
    if (portalColor === 0){
      grid[blueY][blueX] = 0;
      blueX = playerX;
      blueY = playerY;
      while(grid[blueY][blueX-1] != "wall" && grid[blueY][blueX+1] != "door"){
        blueX -= 1;
      }
      grid[blueY][blueX] = "portalB";
    }
    else{
      grid[orangeY][orangeX] = 0;
      orangeX = playerX;
      orangeY = playerY;
      while(grid[orangeY][orangeX-1] != "wall" && grid[orangeY][orangeX+1] != "door"){
        orangeX -= 1;
      }
      grid[orangeY][orangeX] = "portalO";
    }
  }
  if(key === "ArrowUp"){
    if (portalColor === 0){
      grid[blueY][blueX] = 0;
      blueX = playerX;
      blueY = playerY;
      while(grid[blueY-1][blueX] != "wall" && grid[blueY][blueX+1] != "door"){
        blueY -= 1;
      }
      grid[blueY][blueX] = "portalB";
    }
    else{
      grid[orangeY][orangeX] = 0;
      orangeX = playerX;
      orangeY = playerY;
      while(grid[orangeY-1][orangeX] != "wall" && grid[orangeY][orangeX+1] != "door"){
        orangeY -= 1;
      }
      grid[orangeY][orangeX] = "portalO";
    }
  }
  if(key === "ArrowDown"){
    if (portalColor === 0){
      grid[blueY][blueX] = 0;
      blueX = playerX;
      blueY = playerY;
      while(grid[blueY+1][blueX] != "wall" && grid[blueY][blueX+1] != "door"){
        blueY += 1;
      }
      grid[blueY][blueX] = "portalB";
    }
    else{
      grid[orangeY][orangeX] = 0;
      orangeX = playerX;
      orangeY = playerY;
      while(grid[orangeY+1][orangeX] != "wall" && grid[orangeY][orangeX+1] != "door"){
        orangeY += 1;
      }
      grid[orangeY][orangeX] = "portalO";
    }
  }
}

//this is where i make each different room
function createRoom(){
  let room = [];
  if (state === "chamber1"){
    for (let x = 0; x < cols; x++){
      room.push([]);
      for(let y = 0; y < rows; y++){
        if (x === 0 || y === 0 || x === cols-1 || y === cols-1 || (y === 10)|| (x === 15 && y >= 10 || (x === 11 && y <= 10))){
          room[x].push("wall");
        }
        else if(x === 7 && y === 7){
          room[x].push("button");
        }
        else if(y === cols-2 && (x === 5 || x === 6)){
          room[x].push("door");
        }
        else if(y === boxY && x === boxX){
          room[x].push("box");
        }
        else{
          room[x].push(0);
        }
      }
    }
  }
  else if (state === "chamber2"){
    playerY = 12;
    playerX = 9;
    for (let x = 0; x < cols; x++){
      room.push([]);
      for(let y = 0; y < rows; y++){
        if (x === 0 || y === 0 || x === cols-1 || y === cols-1 || y === 6 || (y < 6 && x === 6)||(y < 6 && x === 12) || (y < 6 && x === cols-2)){
          room[x].push("wall");
        }
        else if(y === cols-2 && (x === 5 || x === 6)){
          room[x].push("door");
        }
        else{
          room[x].push(0);
        }
      }
    }
  }
  else if(state === "chamber3"){
    playerY = 5;
    playerX = 5;
    for (let x = 0; x < cols; x++){
      room.push([]);
      for(let y = 0; y < rows; y++){
        if (x === 0 || y === 0 || x === cols-1 || y === cols-1 || (x === 15 && y <= 15)){
          room[x].push("wall");
        }
        else if(x === 7 && y === 7){
          room[x].push("button");
        }
        else if(y === cols-2 && (x === 5 || x === 6)){
          room[x].push("door");
        }
        else{
          room[x].push(0);
        }
      }
    }
  }
  return room;
}