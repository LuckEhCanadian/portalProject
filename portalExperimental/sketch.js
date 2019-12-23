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
let playerY = 7;
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
let portalSound;
let awnswer;
let lazerUp;
let equ;
let ballX;
let ballY;
let ballDX = 1;
let ballDY = 0;
let ballSpeed;
let lastMove = 0; 
let moveTime = 50;

function preload(){
  portalSound = loadSound("assets/portalGun.mp3");
  buttonSound = loadSound("assets/portalButton.mp3");
}

//Setup loop where i make the game not explode when it opens
function setup() {
  if (windowHeight > windowWidth){
    createCanvas(windowWidth, windowWidth);
    cellSize = height/cols;
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  state = "chamber5"
  grid = createRoom();
  grid[playerY][playerX] = 1;
  portalColor = 1;
  inventory = [];
}
//calling my display function
function draw() {
  displayGrid(grid, rows, cols);
  if (state === "chamber7" || state === "chamber0.5"){
    if(millis() > lastMove + moveTime){
      ballMove();
      lastMove = millis();
    }
  }
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
      else if(grid[y][x] === "plate"){
        if(state === "chamber5"){
          fill(255);
        }
        else{
          fill(0,200,100);
        }
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
      else if(grid[y][x] === "countem"){
        fill("YELLOW");
      }
      else if(grid[y][x] === "box"){
        fill("green");
      }
      else if(grid[y][x] === "lazer"){
        fill(154,0,255);
      }
      else if(grid[y][x] === "ball"){
        fill("orange");
      }
      else if(grid[y][x] === "power"){
        fill(200,124,17);
      }
      else if(grid[y][x] === "door"){
        if (pressed === false){
          fill(50);
        }
        else if(pressed === true){
          fill(100);
        }
      }
      else{
        fill(0);
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function door(){
  orangeX = 1;
  orangeY = 1;
  blueX = 1;
  blueY = 1;
  if(state === "chamber0.5"){
    state = "chamber1"
    grid = createRoom();
  }
  else if (state === "chamber1"){
    state = "chamber2";
    grid = createRoom();
  }
  else if(state === 'chamber2'){
    console.log("going to three");
    state = "chamber3";
    grid = createRoom();
  }
  else if(state === 'chamber3'){
    state = "chamber4";
    playerY = 4;
    playerX = 6;
    grid = createRoom();
  }
  else if(state === "chamber4"){
    console.log("going to five");
    state = "chamber5";
    grid = createRoom();
  }
  else if(state === "chamber5"){
    state = "chamber6";
    grid = createRoom();
  }
  else if(state === "chamber6"){
    state = "chamber7";
    grid = createRoom();
  }
  else if(state === "chamber7"){
    state = "chamber 8";
    grid = createRoom();
  }
}


function ballMove(){
  grid[ballY][ballX] = 0;
  if (ballDX != 0){
    if(grid[ballY][ballX + ballDX] === "power"){
      pressed = true;
      return;
    }
    if (grid[ballY][ballX + ballDX] === 0){
      ballX += ballDX;
    }
    else if(grid[ballY][ballX + ballDX] === 1){
      ballDY = ballDX;
      ballDX = 0;
    }
    else if(grid[ballY][ballX + ballDX] === "portalB"){
      if(grid[orangeY][orangeX-1] === "wall"){
        ballY = orangeY;
        ballX = orangeX+1;
        ballDY = 0;
        ballDX = 1;
      }
      else if(grid[orangeY][orangeX+1] === "wall"){
        ballY = orangeY;
        ballX = orangeX-1;
        ballDY = 0;
        ballDX = -1;
      }
      else if(grid[orangeY-1][orangeX] === "wall"){
        ballY = orangeY + 1;
        ballX = orangeX;
        ballDY = 1;
        ballDX = 0;
      }
      else if(grid[orangeY+1][orangeX] === "wall"){
        ballY = orangeY - 1;
        ballX = orangeX;
        ballDY = -1;
        ballDX = 0;
      }
    }
    else if(grid[ballY][ballX + ballDX] === "portalO"){
      if(grid[blueY][blueX-1] === "wall"){
        ballY = blueY;
        ballX = blueX+1;
        ballDY = 0;
        ballDX = 1;
      }
      else if(grid[blueY][blueX+1] === "wall"){
        ballY = blueY;
        ballX = blueX-1;
        ballDY = 0;
        ballDX = -1;
      }
      else if(grid[blueY-1][blueX] === "wall"){
        ballY = blueY + 1;
        ballX = blueX;
        ballDY = 1;
        ballDX = 0;
      }
      else if(grid[blueY+1][blueX] === "wall"){
        ballY = blueY - 1;
        ballX = blueX;
        ballDY = -1;
        ballDX = 0;
      }
    }
    else{
      ballDX *= -1;
    }
  }
  else if (ballDY != 0){
    if(grid[ballY + ballDY][ballX] === "power"){
      pressed = true;
      return;
    }
    if (grid[ballY + ballDY][ballX] === 0){
      ballY += ballDY;
    }
    else if(grid[ballY + ballDY][ballX] === 1){
      ballDX = ballDY;
      ballDY = 0;
    }
    else if(grid[ballY + ballDY][ballX] === "portalB"){
      if(grid[orangeY][orangeX-1] === "wall"){
        ballY = orangeY;
        ballX = orangeX+1;
        ballDY = 0;
        ballDX = 1;
      }
      else if(grid[orangeY][orangeX+1] === "wall"){
        ballY = orangeY;
        ballX = orangeX-1;
        ballDY = 0;
        ballDX = -1;
      }
      else if(grid[orangeY-1][orangeX] === "wall"){
        ballY = orangeY + 1;
        ballX = orangeX;
        ballDY = 1;
        ballDX = 0;
      }
      else if(grid[orangeY+1][orangeX] === "wall"){
        ballY = orangeY - 1;
        ballX = orangeX;
        ballDY = -1;
        ballDX = 0;
      }
    }
    else if(grid[ballY + ballDY][ballX] === "portalO"){
      if(grid[blueY][blueX-1] === "wall"){
        ballY = blueY;
        ballX = blueX+1;
        ballDY = 0;
        ballDX = 1;
      }
      else if(grid[blueY][blueX+1] === "wall"){
        ballY = blueY;
        ballX = blueX-1;
        ballDY = 0;
        ballDX = -1;
      }
      else if(grid[blueY-1][blueX] === "wall"){
        ballY = blueY + 1;
        ballX = blueX;
        ballDY = 1;
        ballDX = 0;
      }
      else if(grid[blueY+1][blueX] === "wall"){
        ballY = blueY - 1;
        ballX = blueX;
        ballDY = -1;
        ballDX = 0;
      }
    }
    else{
      ballDY *= -1;
    }
  }
  grid[ballY][ballX] = "ball";
}
//this is checking when keys are pressed in each room to move or open buttons
function keyPressed(){
  if(key === "q"){
    portalColor = 1;
  }
  if(key === "e"){
    portalColor = 0;
  }
  if(key === "Shift"){
    if(grid[playerY-1][playerX] === 0 || grid[playerY-1][playerX] === "plate"){
      if(inventory[0] === "box"){
        if (grid[playerY-1][playerX] === "plate"){
          if (state === "chamber5" && equ != 3){
            equ += 1;
          }
          else{
            pressed = true;
          }
        }
        boxY = playerY-1;
        boxX = playerX;
        grid[boxY][boxX] = "box";
        inventory.pop();
      }
    }
  }
  if(key === " "){
    if(grid[playerY-1][playerX] === "box" || grid[playerY+1][playerX] === "box" || grid[playerY][playerX-1] === "box"|| grid[playerY][playerX+1] === "box"){
      if (grid[playerY-1][playerX] === "box"){
        grid[playerY-1][playerX] = 0;
      }
      else if(grid[playerY+1][playerX] === "box"){
        grid[playerY+1][playerX] = 0;
      }
      else if(grid[playerY][playerX-1] === "box"){
        grid[playerY][playerX-1] =0
      }
      else if(grid[playerY][playerX+1] === "box"){
        grid[playerY][playerX+1] = 0;
      }

      inventory.push("box");
    }
  }
  if (key === 'f'){
    if(grid[playerY-1][playerX] === "button" || grid[playerY+1][playerX] === "button" || grid[playerY][playerX-1] === "button"|| grid[playerY][playerX+1] === "button"){
      buttonSound.play();
      if(state === "chamber1"){
        if(pressed === false){
          grid[11][6] = "wall";
          grid[17][10] = 0;
          grid[15][15] = "wall";
          pressed = true;
        }
        else{
          grid[11][6] = 0;
          grid[17][10] = "wall"
          grid[15][15] = 0;
          pressed = false;
        }
      }
      else if (state === "chamber2"){
        answer = prompt("input 3 digit security code");
        if (answer === "857"){
          pressed = true;
        }
      }
      else if(state === "chamber4"){
        lazerUp = !lazerUp;
        grid[10][9] = "lazer";
        grid[10][4] = "lazer";
        if(lazerUp === true){
          for(let x = 0; x < grid.length; x++){
            if(grid[x][9] != "wall"){
              if(x < 15){
                grid[x][9] = "lazer";
              }
              else{
                grid[x][9] = 0;
              }
            }
            if(grid[x][4] != "wall"){
              if(x < 15){
                grid[x][4] = "lazer";
              }
              else{
                grid[x][4] = 0;
              }
            }
          }
        }
        else if(lazerUp === false){
          for(let x = 0; x < grid.length; x++){
            if(grid[x][9] != "wall"){
              if(x < 15){
                grid[x][9] = 0;
              }
              else{
                grid[x][9] = "lazer";
              }
            }
            if(grid[x][4] != "wall"){
              if(x < 15){
                grid[x][4] = 0;
              }
              else{
                grid[x][4] = "lazer";
              }
            }
          }
        }
        grid[10][9] = "lazer";
        grid[10][4] = "lazer";
      }
      else if(state === "chamber5"){
        if(equ === 1){
          window.alert("y = -(12/8)x + 0");
          window.alert("Ignore walls in the equation. Just use floor pannels to locate the pressure plate");
        }
        else if(equ === 2){
          window.alert("y = -(6/2)x + 0");
          window.alert("Once again, ignore walls in the equation. Just use floor pannels to locate the pressure plate");
        }
        else if(equ === 3){
          window.alert("y = -(10/8)x + 0");
        }
      }
      else if (state === "chamber6"){
        answer = prompt("input 3 digit security code");
        if (answer === "667"){
          pressed = true;
        }
      }
      else if (state === "chamber7"){
        window.alert("this button doesn't really do anything so... Congrats you pressed a button")
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
        pressed = false;
        door();
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
        door();
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
        door();
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
        door();
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
    portalSound.play();
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
    portalSound.play();
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
    portalSound.play();
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
    portalSound.play();
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
    playerX = 5;
    playerY = 5;
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
    playerY = 10;
    playerX = 12;
    for (let x = 0; x < cols; x++){
      room.push([]);
      for(let y = 0; y < rows; y++){
        if (x === 0 || y === 0 || x === cols-1 || y === cols-1 || y === 6 || (y < 6 && x === 6)||(y < 6 && x === 12) || (y < 6 && x === cols-2)){
          room[x].push("wall");
        }
        else if(y === 11 && x === 8){
          room[x].push("button");
        }
        else if(y === 1 &&(x === 1 || x === 3 || x === 5 || x === 8 || x === 10 || x === 15)){
          room[x].push("countem");
        }
        else if(y === 3 &&(x === 7 || x === 13 || x === 5 || x === 2 || x === 17 || x === 15)){
          room[x].push("countem");
        }
        else if(y === 5 &&(x === 1 || x === 3 || x === 5 || x === 9 || x === 11 || x === 15 || x === 17 || x === 13)){
          room[x].push("countem");
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
    playerY = 3;
    playerX = 3;
    boxY = 7;
    boxX = 10;
    for (let x = 0; x < cols; x++){
      room.push([]);
      for(let y = 0; y < rows; y++){
        if (x === 0 || y === 0 || x === cols-1 || y === cols-1 || (x === 15 && y <= 15)){
          room[x].push("wall");
        }
        else if(y === cols-2 && (x === 5 || x === 6)){
          room[x].push("door");
        }
        else if(y === 15 && x === 10){
          room[x].push("plate");
        }
        else if(y === boxY && x === boxX){
          room[x].push("box");
        }
        else if (y === 9 && x != "wall"){
          room[x].push("lazer");
        }
        else if (x === 8 && (y != "wall" && y != "door")){
          room[x].push("lazer");
        }
        else{
          room[x].push(0);
        }
      }
    }
  }
  else if(state === "chamber4"){
    lazerUp = true;
    for (let x = 0; x < cols; x++){
      room.push([]);
      for(let y = 0; y < rows; y++){
        if (x === 0 || y === 0 || x === cols-1 || y === cols-1 || (x === 15 && y <= 15)){
          room[x].push("wall");
        }
        else if(x === 8 && y === 7){
          room[x].push("wall");
        }
        else if(y === 7 && x === 5){
          room[x].push("button");
        }
        else if(y === cols-2 && (x === 5 || x === 6)){
          room[x].push("door");
        }
        else if(y === cols/4 && x === cols-3){
          room[x].push("box");
        }
        else if(y === 9 && x != "wall" && x < 15){
          room[x].push("lazer");
        }
        else if(y === 4 && x != "wall" && x < 15){
          room[x].push("lazer");
        }
        else if(y != "wall" && x === 10){
          room[x].push("lazer");
        }
        else if(y === 17 & x === 8){
          room[x].push("plate");
        }
        else{
          room[x].push(0);
        }
      }
    }
  }
  else if(state === "chamber5"){
    equ = 1;
    playerY = 4;
    playerX = 3;
    for (let x = 0; x < cols; x++){
      room.push([]);
      for(let y = 0; y < rows; y++){
        if (x === 0 || y === 0 || x === cols-1 || y === cols-1 || (x === 15 && y <= 15)){
          room[x].push("wall");
        }
        else if(y === 7 && x === 5){
          room[x].push("button");
        }
        else if(y === cols-2 && (x === 5 || x === 6)){
          room[x].push("door");
        }
        else if(y === cols/4 && x === cols-3){
          room[x].push("box");
        }
        else if((y === 9 && x === 13)||(y === 3 && x === 7)||(y === 9 && x === 11)){
          room[x].push("plate");
        }
        else{
          room[x].push(0);
        }
      }
    }
  }
  else if (state === "chamber6"){
    playerY = 7;
    playerX = 12;
    for (let x = 0; x < cols; x++){
      room.push([]);
      for(let y = 0; y < rows; y++){
        if (x === 0 || y === 0 || x === cols-1 || y === cols-1 || y === 6 || (y < 6 && x === 6)||(y < 6 && x === 12) || (y < 6 && x === cols-2)){
          room[x].push("wall");
        }
        else if(y === 11 && x === 8){
          room[x].push("button");
        }
        else if(y === 1 &&(x === 7 || x === 17 || x === 5 || x === 1 || x === 9|| x === 15)){
          room[x].push("countem");
        }
        else if(y === 3 &&(x === 7 || x === 9 ||x === 13 || x === 5 || x === 2 || x === 17)){
          room[x].push("countem");
        }
        else if(y === 5 &&(x === 2 || x === 4 || x === 8 || x === 10 || x === 15 || x === 17 || x === 13)){
          room[x].push("countem");
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
  else if (state === "chamber7"){
    playerY = 7;
    playerX = 12;
    ballX = cols/2;
    ballY = cols/2;
    for (let x = 0; x < cols; x++){
      room.push([]);
      for(let y = 0; y < rows; y++){
        if (x === 0 || y === 0 || x === cols-1 || y === cols-1){
          room[x].push("wall");
        }
        else if(y === 11 && x === 8){
          room[x].push("button");
        }
        else if(y === cols-2 && (x === 12 || x === 13)){
          room[x].push("door");
        }
        else if(y === ballY && x === ballX){
          room[x].push("ball");
        }
        else if(y === cols/2 && x === 1){
          room[x].push("power");
        }
        else if(x === 5){
          room[x].push("lazer");
        }
        else{
          room[x].push(0);
        }
      }
    }
  }
  else if (state === "chamber0.5"){
    playerY = 3;
    playerX = 3;
    ballX = cols/2;
    ballY = cols/2;
    for (let x = 0; x < cols; x++){
      room.push([]);
      for(let y = 0; y < rows; y++){
        if (x === 0 || y === 0 || x === cols-1 || y === cols-1){
          room[x].push("wall");
        }
        else if(y === 5 && x === 4){
          room[x].push("button");
        }
        else if((x === cols/2 - 2) && (y > cols/2 - 5 && y < cols/2 + 5)){
          room[x].push("wall");
        }
        else if((x === cols/2 + 2) && (y > cols/2 - 5 && y < cols/2 + 5)){
          room[x].push("wall");
        }
        else if((y === cols/2 - 5) && (x > cols/2 - 3 && x < cols/2 + 3)){
          room[x].push("wall");
        }
        else if((y === cols/2 + 5) && (x > cols/2 - 3 && x < cols/2 + 3)){
          room[x].push("wall");
        }
        else if(x === cols-2 && (y === 12 || y === 13)){
          room[x].push("door");
        }
        else if(y === ballY && x === ballX){
          room[x].push("ball");
        }
        else if(y === cols/2 && x === 1){
          room[x].push("power");
        }
        else if(x === 5 && (y > 7 && y < 10)){
          room[x].push("lazer");
        }
        else if(y === 14 && x === 7){
          room[x].push("box");
        }
        else if(x === 14 && y === 7){
          room[x].push("plate");
        }
        else if(x === 1 && y <= 3 && y >= 1){
          room[x].push("countem");
        }
        else{
          room[x].push(0);
        }
      }
    }
  }
  return room;
}