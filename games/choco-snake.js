const player = "p";
const wall = "w";
const gamebg = "g";
const food = "f";
const body = "b";


//Player Design
/*[ player, bitmap`
0000000000000000
0DDDDDDDDD0DDDD0
0DDDDD000D0DDDD0
0DDDDD040D0DDDD0
0DDDDD040D0DDDD0
0DDDDD000D0DDD33
0DDDDDDDDDD0D333
0DDDDDDDDDD033DD
0DDDDDDDDDD033DD
0DDDDDDDDDD0D333
0DDDDD000D0DDD33
0DDDDD040D0DDDD0
0DDDDD040D0DDDD0
0DDDDD000D0DDDD0
0DDDDDDDDD0DDDD0
0000000000000000`]*/

//Player Alternate Design
/*[ player, bitmap`
0000000000000000
0DD44DD44DD44DD0
0DD44DD44DD44DD0
044DD44DD44DD440
044DD44DD44DD440
0DD44DD44DD44DD0
0DD44DD44DD44DD0
044DD44DD44DD440
044DD44DD44DD440
0DD44DD44DD44DD0
0DD44DD44DD44DD0
044DD44DD44DD440
044DD44DD44DD440
0DD44DD44DD44DD0
0DD44DD44DD44DD0
0000000000000000`]*/

setLegend(
  [ player, bitmap`
0000000000000000
0DD44DD44DD44DD0
0D000000000000D0
0400D402204D0040
040D40DDDD04D040
0D0404D44D4040D0
0D00DDD44DDD00D0
0402D444444D2040
0402D444444D2040
0D00DDD44DDD00D0
0D0404D44D4040D0
040D40DDDD04D040
0400D402204D0040
0D000000000000D0
0DD44DD44DD44DD0
0000000000000000`],
  [ body, bitmap`
0000000000000000
0DDDDDDDDDDDDDD0
0D444444444444D0
0D4DDDDDDDDDD4D0
0D4D44444444D4D0
0D4D4DDDDDD4D4D0
0D4D4D4444D4D4D0
0D4D4D4DD4D4D4D0
0D4D4D4DD4D4D4D0
0D4D4D4444D4D4D0
0D4D4DDDDDD4D4D0
0D4D44444444D4D0
0D4DDDDDDDDDD4D0
0D444444444444D0
0DDDDDDDDDDDDDD0
0000000000000000`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L912L912L912L92L
L991L991L991L99L
LLLLLLLLLLLLLLLL
LL912L912L912L2L
LL991L991L991L9L
LLLLLLLLLLLLLLLL
L92L9912L912L92L
L99L9991L991L99L
LLLLLLLLLLLLLLLL
LL912L9912L9912L
LL999L9991L9991L
LLLLLLLLLLLLLLLL
L999912L9912L92L
L999991L9991L99L
LLLLLLLLLLLLLLLL`],
  [ gamebg, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ food, bitmap`
......L.L.......
......LLLL......
......LLLL......
33333LLLLLCCCCCC
33333LLLLL00000C
333333LLLC0C0C0C
33333LLL0C0C0C0C
333333LL0C0C0C0C
333331LL0000000C
333333110C0C0C0C
333331110C0C0C0C
333333111C0C0C0C
333331111100000C
3333311111CCCCCC
......1111......
......1.1.......`]
);

const music = tune`
1764.7058823529412: A4-1764.7058823529412 + F4~1764.7058823529412 + A5/1764.7058823529412,
1764.7058823529412: G4~1764.7058823529412 + B4-1764.7058823529412 + G5/1764.7058823529412,
1764.7058823529412: A4-1764.7058823529412 + F4~1764.7058823529412,
1764.7058823529412: G4~1764.7058823529412 + B4-1764.7058823529412,
1764.7058823529412: A4-1764.7058823529412 + F4~1764.7058823529412,
1764.7058823529412: G4~1764.7058823529412 + B4-1764.7058823529412,
1764.7058823529412: A4-1764.7058823529412 + F4~1764.7058823529412,
1764.7058823529412: F4/1764.7058823529412 + D4^1764.7058823529412,
1764.7058823529412: G4/1764.7058823529412 + E4^1764.7058823529412,
1764.7058823529412: A4/1764.7058823529412 + F4^1764.7058823529412,
1764.7058823529412,
1764.7058823529412: G4/1764.7058823529412 + E4~1764.7058823529412 + C4-1764.7058823529412 + B4^1764.7058823529412,
1764.7058823529412: A4/1764.7058823529412 + F4~1764.7058823529412 + D4-1764.7058823529412 + C5^1764.7058823529412,
1764.7058823529412: B4/1764.7058823529412 + G4~1764.7058823529412 + E4-1764.7058823529412 + D5^1764.7058823529412,
1764.7058823529412,
1764.7058823529412: C5/1764.7058823529412 + E5-1764.7058823529412,
1764.7058823529412: B4/1764.7058823529412 + D5-1764.7058823529412,
1764.7058823529412: A4/1764.7058823529412 + C5-1764.7058823529412,
1764.7058823529412: G4/1764.7058823529412 + B4-1764.7058823529412,
1764.7058823529412: F4/1764.7058823529412 + A4-1764.7058823529412,
1764.7058823529412: E4^1764.7058823529412 + G4^1764.7058823529412,
1764.7058823529412: D4^1764.7058823529412 + F4^1764.7058823529412,
1764.7058823529412: C4^1764.7058823529412 + E4^1764.7058823529412,
1764.7058823529412: D4~1764.7058823529412 + F4/1764.7058823529412,
1764.7058823529412: E4~1764.7058823529412 + G4/1764.7058823529412 + C4/1764.7058823529412,
1764.7058823529412: F4~1764.7058823529412 + A4/1764.7058823529412 + D4/1764.7058823529412,
1764.7058823529412: G4~1764.7058823529412 + B4/1764.7058823529412 + E4/1764.7058823529412 + C4/1764.7058823529412,
1764.7058823529412: A4~1764.7058823529412 + C5/1764.7058823529412 + F4/1764.7058823529412 + D4/1764.7058823529412,
1764.7058823529412: B4~1764.7058823529412 + D5/1764.7058823529412 + G4/1764.7058823529412 + E4/1764.7058823529412 + C4/1764.7058823529412,
1764.7058823529412: C5~1764.7058823529412 + E5/1764.7058823529412 + A4/1764.7058823529412 + F4/1764.7058823529412 + D4/1764.7058823529412,
1764.7058823529412: D5~1764.7058823529412 + F5/1764.7058823529412 + C4/1764.7058823529412 + E4/1764.7058823529412 + G4/1764.7058823529412,
1764.7058823529412`;

let playback = playTune(music, Infinity)

let direction = "e";
let directionToSet = "e";
let score = 0;

setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);
setBackground(gamebg);

setSolids([ player, wall, body]);

let snake = [
  [0, 0]
]

function placeFood() {
    let position = [Math.floor(Math.random() * 9)+1, Math.floor(Math.random() * 7)+1];
  
  addSprite(position[0], position[1], food);

  
}

function addScore() {
  clearText();
  addText("C:/SCORE> " + score, {x: 1, y: 1, color:color`4`});
}

function gameOver() {
  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 7; y++) {
      addSprite(x, y, gamebg);
    }
  }
  clearText();
  addText("GAME OVER!", {x:5, y:4, color:color`2`});
  addText("C:/FINAL SCORE>" + score, {x: 1, y:6, color:color`2`});
  addText("Try again? Press I", {x: 1, y:13, color:color`2`});
  clearInterval(interval);
  if(playback) playback.end();
}

addScore();

onInput("s", () => {
  if (direction != "n") {
  directionToSet = "s";
  }
});

onInput("d", () => {
  if (direction != "w") {
  directionToSet = "e";
  }
});
onInput("a", () => {
  if (direction != "e") {
  directionToSet = "w";
  }
});
onInput("w", () => {
  if (direction != "s") {
  directionToSet = "n";
  }
});

onInput("i", () => {
  clearText();
  getAll().forEach(tile => {
    clearTile(tile.x, tile.y);
  });
  score = 0;
  direction = "e";
  directionToSet = "e";
  snake = [
  [0, 0]
];
  placeFood();
  clearInterval(interval);
  interval = setInterval(move, 400);
  addScore();

  if(playback) playback.end();
  playback = playTune(music, Infinity);
});

placeFood();

function move() {

  direction = directionToSet;
  
  if (tilesWith(food) == 0) {
    placeFood();
  }
  
  switch(direction) {
    case "n":
      snake.push([snake[snake.length-1][0], snake[snake.length-1][1]-1])
      break;
    case "s":
      snake.push([snake[snake.length-1][0], snake[snake.length-1][1]+1])
      break;
    case "e":
      snake.push([snake[snake.length-1][0]+1, snake[snake.length-1][1]])
      break;
    case "w":
      snake.push([snake[snake.length-1][0]-1, snake[snake.length-1][1]])
      break;
  }
  
  if (tilesWith(player, food).length != 0 || tilesWith(body, food).length != 0) {
    // console.log(tilesWith(player).length);
    placeFood();
    score += 1;
    clearTile(getFirst(food).x, getFirst(food).y);
    addScore();
    clearTile(snake[0][0], snake[0][1]);

    clearInterval(interval);
  interval = setInterval(move, 400 - (score*10));
  }
  else if (snake.length > 1) {
    
    let removed = snake.shift();
    clearTile(removed[0], removed[1]);
  }

  let i = 0;
  snake.forEach(el => {

    if (i+1 < snake.length) {
      clearTile(el[0], el[1]);
      addSprite(el[0], el[1], body);
  }
  else {
    if ((el[0] < 0 || el[0] > 9) || (el[1] < 0 || el[1] > 7)) {
      
      gameOver();
    } else {
    addSprite(el[0], el[1], player);
    }
  }
    if (tilesWith(player, body).length != 0) {
      gameOver();
    }
    i++;
  })
}

let interval = setInterval(move, 400);
