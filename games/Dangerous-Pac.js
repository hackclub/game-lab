/*
@title: Dangerous Pac
@author: MananCoder
@tags: ['survival']
@addedOn: 2024-11-6
*/
const player = "p";
const ghost = "g";
const wall1 = "w";
const wall2 = "W";
const door = "d";
const trophy = "t";
const diamond = "D";

setLegend(
  [player, bitmap`
................
................
................
................
................
......666.......
.....60206......
.....62226......
.....62326......
......666.......
................
................
................
................
................
................`],
  [ghost, bitmap`
................
................
................
................
................
......333.......
.....36063......
.....30003......
.....30503......
......333.......
................
................
................
................
................
................`],
  [wall1, bitmap`
................
................
................
................
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
................
................
................
................
................
................
................`],
  [wall2, bitmap`
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
  [door, bitmap`
................
................
................
................
................
......CCCCC.....
......CCFCC.....
......CCFCC.....
......CCCCC.....
......CCCC6.....
......CCCCC.....
......CCCCC.....
......CCCCC.....
................
................
................`],
  [trophy, bitmap`
................
................
................
...6........6...
...66......66...
....66666666....
.....666666.....
.....666666.....
.....666666.....
......6666......
.......66.......
.......66.......
.....666666.....
...6666666666...
................
................`],
  [diamond, bitmap`
................
................
................
.....777777.....
....77777777....
.....777777.....
......7777......
.......77.......
................
................
................
................
................
................
................
................`]
);

let level = 0;
let score = 0;
let hasTrophy = false;
let gameOver = false;

const levels = [
  map`
Wp...g..gw.wt.d
WwD..wD..D.....
WWWD....g.DgwDD`,
  map`
wwwwww.twwwwwww
wDDDDgg.DDgDDDD
WWWWWW..WWWWWWW
p.wgD.g..WDDDDD
W.D....g.DDDDDD
WWWWWWwwWWDDDDd`,
  map`
Wg.DwDDDDDDgDDDDDDDDDDD
W..DwDwwwwwwwwwwwwwwwwD
W..DpDDDDDDDDDDDDDDDdwg
W.gDwDwwwwwwwwwwwwwwwwD
tDWWwDDDDDDDDgDDDDDDDDD`
];

setMap(levels[level]);
setSolids([wall1, wall2, player]);

function updateScoreText() {
  clearText();
  addText(`Score: ${score}`, { y: 3, color: color`2` });
}

// Disable input if gameOver is true
function handleInput(key, action) {
  if (!gameOver) {
    action();
  }
}

// Movement handlers with gameOver condition
onInput("w", () => handleInput("w", () => getFirst(player).y -= 1));
onInput("s", () => handleInput("s", () => getFirst(player).y += 1));
onInput("a", () => handleInput("a", () => getFirst(player).x -= 1));
onInput("d", () => handleInput("d", () => getFirst(player).x += 1));

function moveGhostsRandomly() {
  if (gameOver) return;

  const ghosts = getAll(ghost);
  const directions = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 }
  ];

  ghosts.forEach(g => {
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const newX = g.x + direction.x;
    const newY = g.y + direction.y;

    if (!getTile(newX, newY).isSolid) {
      g.x = newX;
      g.y = newY;
    }
  });
}

// Main game logic
afterInput(() => {
  if (gameOver) return;

  const playerPosition = getFirst(player);
  const ghosts = getAll(ghost);
  const trophyPosition = getFirst(trophy);
  const diamonds = getAll(diamond);
  const doorPosition = getFirst(door);

  // Check for ghost collision
  ghosts.forEach(g => {
    if (playerPosition && g.x === playerPosition.x && g.y === playerPosition.y) {
      gameOver = true;
      addText("Game Over!", { y: 1, color: color`3` });
      addText("Press 'l' to restart", { y: 12, color: color`3` });
    }
  });

  // Collect diamonds
  diamonds.forEach(d => {
    if (playerPosition && playerPosition.x === d.x && playerPosition.y === d.y) {
      score += 10;
      d.remove();
      updateScoreText();
    }
  });

  // Collect trophy
  if (playerPosition && trophyPosition && playerPosition.x === trophyPosition.x && playerPosition.y === trophyPosition.y) {
    hasTrophy = true;
    trophyPosition.remove();
  }

  // Move to next level or win
  if (playerPosition && doorPosition && playerPosition.x === doorPosition.x && playerPosition.y === doorPosition.y) {
    if (hasTrophy) {
      level += 1;
      if (level < levels.length) {
        setMap(levels[level]);
        hasTrophy = false;
        updateScoreText();
      } else {
        addText("You Win!", { y: 1, color: color`2` });
        gameOver = true;
      }
    } else {
      addText("Get the Trophy first!", { y: 12, color: color`3` });
    }
  }

  // Move ghosts if game is active
  if (!gameOver) {
    moveGhostsRandomly();
  }
});

// Restart game on 'l' input
onInput("l", () => {
  if (gameOver) {
    gameOver = false;
    level = 0;
    score = 0;
    hasTrophy = false;
    setMap(levels[level]);
    clearText();
    updateScoreText();
  }
});

updateScoreText();
