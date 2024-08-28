/*
@title: Falling coin
@author: Praveenkushinpi
@tags: []
@addedOn: 2024-08-28
*/

const player = "p";
const fallingObject = "o";
const ground = "g";

setLegend(
  [player, bitmap`
............
....0000....
...000000...
....0000....
.....00.....
....0000....
....0000....
....0000....
....0..0....
...0....0...
..0......0..
..0......0..
............
............
............
............`],
  [fallingObject, bitmap`
....0000....
...000000...
...066660...
...066660...
...066660...
...000000...
...000000...
....0000....
............
............
............
............
............
............
............
............`],
  [ground, bitmap`
000000000000
000000000000
000000000000
000000000000
000000000000
000000000000
000000000000
000000000000
000000000000
000000000000
000000000000
000000000000
000000000000
000000000000
000000000000
000000000000`]
);

setSolids([player, ground]);

let level = 0;
const levels = [
  map`
............
............
............
............
............
............
............
............
............
............
............
gggggggggggg`,
];

setMap(levels[level]);

let score = 0;

addText("Score: " + score);

const playerX = 6;
let playerY = 10;

setPushables({
  [player]: []
});

setInterval(() => {
  let objectX = Math.floor(Math.random() * 12);
  addSprite(objectX, 0, fallingObject);
}, 1000);

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

afterInput(() => {
  const player = getFirst(player);
  const objects = getAll(fallingObject);

  objects.forEach(obj => {
    if (obj.y === player.y && obj.x === player.x) {
      obj.remove();
      score += 1;
      clearText();
      addText("Score: " + score);
    } else if (obj.y > player.y) {
      obj.remove();
    } else {
      obj.y += 1;
    }
  });
});
