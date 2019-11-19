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
let playerPos;
let portalColor;
let pressed = false;

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
  state = "chamber1"
  grid = createRoom();
  grid[playerX][playerY] = 1;
  portalColor = 1;
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
  if (key === 'e'){
    if(grid[playerY-1][playerX] === "button" || grid[playerY+1][playerX] === "button" || grid[playerY][playerX-1] === "button"|| grid[playerY][playerX+1] === "button"){
      pressed = true;
    }
  }
  
  if(key === 'w'){
    if (grid[playerY-1][playerX] === "wall"||grid[playerY-1][playerX] === "button"){
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
    else{
      if(grid[playerY-1][playerX] === grid[blueY][blueX]){
        if (grid[orangeY-1][orangeX] === "wall"){
        }
        else{
          grid[playerY][playerX] = 0;
          playerY = orangeY-1;
          playerX = orangeX;
        }
      }
      else if(grid[playerY-1][playerX] === grid[orangeY][orangeX]){
        if (grid[blueY-1][blueX] === "wall"){
        }
        else{
          grid[playerY][playerX] = 0;
          playerY = blueY-1;
          playerX = blueX;
        }
      }
      else{
        grid[playerY][playerX] = 0;
        playerY -= 1;
      }
    }
  }
  if (key === 's'){
    if (grid[playerY+1][playerX] === "wall"||grid[playerY+1][playerX] === "button"){
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
    else{
      if(grid[playerY+1][playerX] === grid[blueY][blueX]){
        if (grid[orangeY+1][orangeX] === "wall"){
        }
        else{
          grid[playerY][playerX] = 0;
          playerY = orangeY+1;
          playerX = orangeX;
        }
      }
      else if(grid[playerY+1][playerX] === grid[orangeY][orangeX]){
        if (grid[blueY+1][blueX] === "wall"){
        }
        else{
          grid[playerY][playerX] = 0;
          playerY = blueY+1;
          playerX = blueX;
        }
      }
      else{
        grid[playerY][playerX] = 0;
        playerY += 1;
      }
    }
  }
  if(key === 'd'){
    if (grid[playerY][playerX+1] === "wall"||grid[playerY][playerX+1] === "button"){
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
    else{
      if(grid[playerY][playerX+1] === grid[blueY][blueX]){
        if (grid[orangeY][orangeX+1] === "wall"){
        }
        else{
          grid[playerY][playerX] = 0;
          playerY = orangeY;
          playerX = orangeX+1;
        }
      }
      else if(grid[playerY][playerX+1] === grid[orangeY][orangeX]){
        if (grid[blueY][blueX+1] === "wall"){
        }
        else{
          grid[playerY][playerX] = 0;
          playerY = blueY;
          playerX = blueX+1;
        }
      }
      else{
        grid[playerY][playerX] = 0;
        playerX += 1;
      }
    }
  }
  if(key === 'a'){
    if (grid[playerY][playerX-1] === "wall"||grid[playerY][playerX-1] === "button"){
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
    else{
      if(grid[playerY][playerX-1] === grid[blueY][blueX]){
        if (grid[orangeY][orangeX-1] === "wall"){
        }
        else{
          grid[playerY][playerX] = 0;
          playerY = orangeY;
          playerX = orangeX-1;
        }
      }
      else if(grid[playerY][playerX-1] === grid[orangeY][orangeX]){
        if (grid[blueY][blueX-1] === "wall"){
        }
        else{
          grid[playerY][playerX] = 0;
          playerY = blueY;
          playerX = blueX-1;
        }
      }
      else{
        grid[playerY][playerX] = 0;
        playerX -= 1;
      }
    }
  }
  grid[playerY][playerX] = 1;
}

//this is mostly placing portals although there will probably be more in the final project
function mousePressed(){
  let cellSize = width/cols;
  if(portalColor === 1){
    grid[orangeY][orangeX] = 0;
    orangeY = floor(mouseY / cellSize);
    orangeX = floor(mouseX / cellSize);
    if (grid[orangeY][orangeX] != "wall"&& grid[orangeY][orangeX] != "door" && grid[orangeY][orangeX] != "button"){
      grid[orangeY][orangeX] = "portalO";
      portalColor -= 1;
    }
    else if(grid[orangeY][orangeY] === "button"){
      grid[orangeY][orangeX] = "button";
      orangeY = 1;
      orangeX = 1;
    }
    else if(grid[orangeY][orangeY] === "door"){
      grid[orangeY][orangeX] = "door";
      orangeY = 1;
      orangeX = 1;
    }
    else{
      grid[orangeY][orangeX] = "wall";
      orangeY = 1;
      orangeX = 1;
      portalColor -= 1;
    }
  }
  else if (portalColor === 0){
    grid[blueY][blueX] = 0;
    blueY = floor(mouseY / cellSize);
    blueX = floor(mouseX / cellSize);
    if (grid[blueY][blueX] != "wall"&& grid[blueY][blueX] != "door" && grid[blueY][blueX] != "button"){
      grid[blueY][blueX] = "portalB";
      portalColor += 1;
    }
    else if(grid[blueY][blueY] === "button"){
      grid[blueY][blueX] = "button";
      blueY = 1;
      blueX = 1;
    }
    else if(grid[blueY][blueY] === "door"){
      grid[blueY][blueX] = "door";
      blueY = 1;
      blueX = 1;
    }
    else{
      grid[blueY][blueX] = "wall";
      blueY = 1;
      blueX = 1;
      portalColor += 1;
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
        else{
          room[x].push(0);
        }
      }
    }
  }
  else if (state === "chamber2"){
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