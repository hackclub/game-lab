/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Banana fuel
@author: Neon
@tags: ['banana', 'simple']
@addedOn: 2024-09-12
*/

const player = "p";
const player1 = "1";
const player2 = "2";
const player3 = "3";
const fruit = "f";
// to get the fruit from the block you must have x fruit & break the block
const fruitblock = "b";
let score = 0;
let playerStatus = 0;
let isDone = false;
const requiredBananasToWinLevel = 5;
setLegend(
  [
    player,
    bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.3...
....000H.H0.0...
....0.0...000...
....3.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`,
  ],
  [
    player1,
    bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.3...
....000H.H0.0...
....0.0...000...
....3.05550.....
......0...0.....
.....066660.....
.....06660......
......000.......
......0.0.......
.....00.00......
................`,
  ],
  [
    player2,
    bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.6...
....000H.H0.0...
....0.0...000...
....6.06660.....
......06660.....
.....066660.....
.....06660......
......000.......
......0.0.......
.....00.00......
................`,
  ],
  [
    player3,
    bitmap`
................
................
.......000......
.......060......
......0660......
......06660.6...
....0003630.0...
....0.0666000...
....6.06660.....
......06660.....
.....066660.....
.....06660......
......000.......
......0.0.......
.....00.00......
................`,
  ],
  [
    fruit,
    bitmap`
................
................
.......CCC......
.......C6C......
......C66C......
......C666C.....
......C666C.....
......C666C.....
......C666C.....
......C666C.....
.....C6666C.....
.....C666C......
......CCC.......
................
................
................`,
  ],
);

setSolids([player, player1, player2, player3, fruitblock]);

let level = 0;
const levels = [
  map`
.ff
p.f
...`,
  map`
..p
...
f..`,
  map`
.`, // you win map
];
setMap(levels[level]);
setPushables({
  [player]: [],
});

function getPlayerInstance() {
  switch (playerStatus) {
    case 0:
      return player;
      break;
    case 1:
      return player1;
      break;
    case 2:
      return player2;
      break;
    case 3:
      return player3;
      break;
    default:
      return player3; // if at the max then just show full charge
      break;
  }
}

function handleInputs() {
  onInput("w", () => {
    if (isDone) return;
    getFirst(getPlayerInstance()).y -= 1;
  });
  onInput("d", () => {
    if (isDone) return;

    getFirst(getPlayerInstance()).x += 1;
  });
  onInput("a", () => {
    if (isDone) return;

    getFirst(getPlayerInstance()).x -= 1;
  });
  onInput("s", () => {
    if (isDone) return;

    getFirst(getPlayerInstance()).y += 1;
  });
}

function playEatTune() {
  console.log("#eattune");
  playTune(tune`
500: B4/500,
15500`);
}

function playLevelUpTune() {
  playTune(tune`D`);
}
afterInput(() => {
  if (isDone) return;
  const pl = getFirst(getPlayerInstance());
  const hitFruit = getAll(fruit).find((f) => f._x == pl.x && f._y == pl.y);
  if (hitFruit) {
    console.log("#eat");
    playEatTune();
    clearTile(pl.x, pl.y);
    playerStatus++;
    addSprite(pl.x, pl.y, getPlayerInstance());
    score++;
  }
  if (getAll(fruit).length == 0) {
    level++;
    playerStatus = 0;
    playLevelUpTune();

    if (levels[level]) {
      try {
        setMap(levels[level]);
      } catch (e) {
        // broken level
        level++;
        setMap(levels[level]);
      }
    }
    if (level == levels.length - 1) {
      addText("You win ", { x: 7, y: 7, color: color`4` });
      addText("Score - " + score, { x: 6, y: 8, color: color`D` });
      isDone = true;
    }
  }
});
handleInputs();
