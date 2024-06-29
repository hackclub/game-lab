/*
@title: Fight against COVID
@author: Swaraj Singh
*/

const player = "p";
const covid = "c";
const bullet = "b";
const berserk = "k";

setLegend(
  [ player, bitmap`
................
................
...000..........
...060..........
..0660..........
..06660.........
..03630.........
..06660055557...
..03630.55557...
..03330055......
.066660.55......
.06660..........
..000...........
..0.0...........
.00.00..........
................` ],
  [ covid, bitmap`
................
................
................
.D4....4D...D4..
..DD...D4..4D...
..4D4..DD.4D....
...D4D.D.4D..4..
...4.DDDDDD4DDD4
..DD4D4DD4DD4...
.4D..DD4DDD.....
D4...DDDD.DD4...
....4D.4D4.DD4..
...4DD.4DD..4D..
..4DD....D...D4.
..D4....4D......
................`],
  [ bullet, bitmap`
................
................
................
................
................
.......7........
...777777.......
...7333337......
...73444337.....
...7333337......
...777777.......
.......7........
................
................
................
................`],
  [ berserk, bitmap`
................
................
...3333333333...
...3999999993...
...3999969993...
...3999669993...
...3996699993...
...3996666993...
...3999966993...
...3999969993...
...3999669993...
...3999699993...
...3999999993...
...3333333333...
................
................`]
);

setSolids([covid, berserk])

let level = 0
const levels = [
  map`
........
........
p.......
........
........`
]

setMap(levels[level])

setPushables({
  [covid]: [berserk]
})

var gameRunning = true;
var bulletsLeft = 10;
var score = 0;
var haveBerserk = false;
var berserkLength = 50;

function SpawnBullet() {
  let x = 0;
  let y = getFirst(player).y;
  addSprite(x, y, bullet);
}

function SpawnCovid() {
  let x = 7;
  let y = Math.floor(Math.random() * 5);
  let spawn = Math.floor(Math.random() * 4);
  if (spawn == 1) {
    addSprite(x, y, covid);
  }
}

function SpawnBerserk() {
  let x = 7;
  let y = Math.floor(Math.random() * 5);
  let spawn = Math.floor(Math.random() * 20);
  if (spawn == 1) {
    addSprite(x, y, berserk);
  }
}

function RemoveCovid() {
  let covids = getAll(covid);
  for (let i = 0; i < covids.length; i++){
    if (covids[i].x == 0) {
      covids[i].remove();
      }
  }
}

function RemoveBerserk() {
  let berserks = getAll(berserk);
  for (let i = 0; i < berserks.length; i++){
    if (berserks[i].x == 0) {
      berserks[i].remove();
      }
  }
}

function RemoveBullet() {
  let bullets = getAll(bullet);
  for (let i = 0; i < bullets.length; i++){
    if (bullets[i].x == 7) {
      bullets[i].remove();
      }
  }
}

function KillCovid() {
  let bullets = getAll(bullet);
  let covids = getAll(covid);
  for (let i = 0; i < bullets.length; i++){
    for (let j = 0; j < covids.length; j++){
      if (bullets[i].x == covids[j].x && bullets[i].y == covids[j].y){
        clearTile(bullets[i].x, bullets[i].y);
        score += 1;
      }
      
    }
    
  }
}

function CheckBerserk() {
  let berserks = getAll(berserk);
  let playerSprite = getFirst(player);

  for (let i = 0; i < berserks.length; i++){
    if (playerSprite.x === berserks[i].x && playerSprite.y === berserks[i].y){
      haveBerserk = true;
    }
  }
}

function MoveBullets() {
  let bullets = getAll(bullet);
  for (let i = 0; i < bullets.length; i++){
    bullets[i].x += 1;
  }
}

function MoveCovids() {
  let covids = getAll(covid);
  for (let i = 0; i < covids.length; i++){
    covids[i].x -= 1;
  }
}

function MoveBerserks() {
  let berserks = getAll(berserk);
  for (let i = 0; i < berserks.length; i++){
    berserks[i].x -= 1;
  }
}

function Infected() {
  let covids = getAll(covid);
  let playerSprite = getFirst(player);
  
  for (let i = 0; i < covids.length; i++){
    if (playerSprite.x === covids[i].x && playerSprite.y === covids[i].y){
      gameRunning = false;
    }
  }
}

// function ActivateBerserk() {
//   bulletsLeft = 1000;
//   getFirst(player).bitmap = berserked;
// }

function ActivateBerserk() {
  // Change the bitmap image of the player sprite to berserker mode
  setLegend(
  [player, bitmap`
................
..66.....66.....
.66.....66......
..66.000.66.....
.66..03066......
.6..03306.......
...603330.......
..6606360.......
.66.03330055557.
..6606660.55557.
.66.03330055....
.6.033330.55....
...03330........
....000.........
....0.0.........
...00.00........`],
  [ covid, bitmap`
................
................
................
.D4....4D...D4..
..DD...D4..4D...
..4D4..DD.4D....
...D4D.D.4D..4..
...4.DDDDDD4DDD4
..DD4D4DD4DD4...
.4D..DD4DDD.....
D4...DDDD.DD4...
....4D.4D4.DD4..
...4DD.4DD..4D..
..4DD....D...D4.
..D4....4D......
................`],
  [ bullet, bitmap`
................
................
................
................
................
.......7........
...777777.......
...7333337......
...73444337.....
...7333337......
...777777.......
.......7........
................
................
................
................`],
  [ berserk, bitmap`
................
................
...3333333333...
...3999999993...
...3999969993...
...3999669993...
...3996699993...
...3996666993...
...3999966993...
...3999969993...
...3999669993...
...3999699993...
...3999999993...
...3333333333...
................
................`]
);
  bulletsLeft = 1000; // Set the bullets count to 1000
}

function DeactivateBerserk() {
  if (haveBerserk && berserkLength > 0) {
    berserkLength -= 1;
  } else if (haveBerserk && berserkLength == 0) {
      //bulletsLeft = 10; //needed or not???
      haveBerserk = false;
      setLegend(
  [ player, bitmap`
................
................
...000..........
...060..........
..0660..........
..06660.........
..03630.........
..06660055557...
..03630.55557...
..03330055......
.066660.55......
.06660..........
..000...........
..0.0...........
.00.00..........
................` ],
  [ covid, bitmap`
................
................
................
.D4....4D...D4..
..DD...D4..4D...
..4D4..DD.4D....
...D4D.D.4D..4..
...4.DDDDDD4DDD4
..DD4D4DD4DD4...
.4D..DD4DDD.....
D4...DDDD.DD4...
....4D.4D4.DD4..
...4DD.4DD..4D..
..4DD....D...D4.
..D4....4D......
................`],
  [ bullet, bitmap`
................
................
................
................
................
.......7........
...777777.......
...7333337......
...73444337.....
...7333337......
...777777.......
.......7........
................
................
................
................`],
  [ berserk, bitmap`
................
................
...3333333333...
...3999999993...
...3999969993...
...3999669993...
...3996699993...
...3996666993...
...3999966993...
...3999969993...
...3999669993...
...3999699993...
...3999999993...
...3333333333...
................
................`]
);
      berserkLength = 50;
      bulletsLeft = 10;
  } else {
    //pass
  }
}

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("i", () => {
  if (bulletsLeft > 0) {
    SpawnBullet()
    bulletsLeft -= 1
  }
})

onInput("l", () => {
  if (haveBerserk == true) {
    ActivateBerserk()
  }
})

afterInput(() => {
  
})

var gameLoop = setInterval(() => {
  // Step 4 - Add all game functions
  DeactivateBerserk()
  Infected()
  CheckBerserk()
  SpawnCovid()
  SpawnBerserk()
  RemoveCovid()
  RemoveBullet()
  RemoveBerserk()
  KillCovid()
  clearText()
  addText("Score: " + score,{
    x: 1,
    y: 2,
    color: color`0`
  } )
  addText("B: " + bulletsLeft, {
  x: 10,
  y: 2,
  color: color`0`
  })
  MoveCovids()
  MoveBullets()
  MoveBerserks()

  if (gameRunning == false) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }

}, 200);


