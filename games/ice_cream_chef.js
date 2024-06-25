/*
Select the correct ingredients to match the ice cream sundae order
Finish orders to increase your score
If you run out of time or select the wrong topping you lose a life and have to start the order over
@title: Ice Cream Chef
@author: sophia
@tags: []
@addedOn: 2024-06-24
*/
const cursor = "c";
const bowl = "b";
const cone = "n"
const cherry = "h";
const sprinkles = "s";
const syrup = "y";
const cream = "w";
const background = "g";
const flavor0 = "v";
const flavor1 = "o";
const flavor2 = "t";
const caramel = "a";
const flavor3 = "m";
const side = "d";
const up = "u";
const life = "l";
const empty = "q";
const corner1 = "1";
const corner2 = "2";
const corner3 = "3";
const corner4 = "4";
const correct = tune`
73.17073170731707: G5~73.17073170731707,
73.17073170731707: A5~73.17073170731707,
73.17073170731707: B5~73.17073170731707,
2121.951219512195`
const wrong = tune `
73.17073170731707: B4-73.17073170731707,
73.17073170731707: A4-73.17073170731707,
73.17073170731707: F4-73.17073170731707,
2121.951219512195`
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
let times = 5;
let toppingslist = [cherry, sprinkles, syrup, caramel, cream];
let order = [];
let index = 0;
let countdown = null;
let icecream = randomIntegerInRange(0, 3);
let toppingsnumber = randomIntegerInRange(0, 4)
let conebowl = Math.round(Math.random());
let lives = 3;
let score = 0;
let scores = [];

setLegend(
  [cursor, bitmap`
................
................
.....000000000..
....0022222220..
.....002222220..
......00222220..
.......0222220..
......00022220..
.....002000220..
....00200.0020..
...00200...000..
...0200.....0...
...000..........
................
................
................`],
  [bowl, bitmap`
................
................
................
................
................
.77777777777777.
.77777777777777.
..727777777777..
..727777777777..
..727777777777..
..772777777777..
...7277777777...
...7727777777...
....77777777....
......7777......
................`],
  [cone, bitmap`
................
................
................
................
................
................
...666666666....
...662666666....
....6266666.....
....6626666.....
.....66266......
......626.......
......666.......
.......6........
................
................`],
  [cherry, bitmap`
................
................
........D.......
.......D.D......
.......D.D......
......D...D.....
.....D....D.....
....D......D....
....D......3....
...DD.....3333..
...33....32333..
..3333...32333..
..32333...333...
..32333.........
...333..........
................`],
  [sprinkles, bitmap`
................
.33....H.....7..
........H..3....
....7...........
.4..7.....4..D..
.......6.4...D..
................
..8............5
.8...66...9...5.
..3.....7.9.....
................
.....4.....HH.6.
...5............
....5...33......
..6..........D..
...........7..D.`],
  [syrup, bitmap`
................
................
....CCCCCCCC....
...CCCCCCCCCC...
..CC2CCCCCCCCC..
..C2CCCCCCCCCC..
..C2CCCCCCCCCC..
..C2CCCCCCCCCC..
..C2CCCCCCCCCC..
..CCCCCCCCCCCC..
..CCC..CCC..CC..
..CC...CCC..CC..
........C....C..
................
................
................`],
  [caramel, bitmap`
................
................
....66666666....
...6666666666...
..662666666666..
..626666666666..
..626666666666..
..626666666666..
..626666666666..
..666666666666..
..666..666..66..
..66...666..66..
........6....6..
................
................
................`],
  [cream, bitmap`
................
................
................
................
................
......222.......
......2122......
......2222......
....22222222....
...2212222222...
....22222222....
..222222222222..
..2122222222222.
..2122222222222.
...2222222222...
................`],
  [flavor1, bitmap`
................
................
.....CCCCCC.....
....CC2CCCCC....
....CC2CCCCC....
....C2CCCCCC....
....C2CCCCCC....
..CCCC2CCCCCCC..
.CCCCCCCCC2CCCC.
.C2CCCCCC2CCCCC.
.C2CCCCCC2CCCCC.
.C22CCCCCC2CCCC.
.CCCCCCCCCCCCCC.
..CCCCC..CCCCC..
................
................`],
  [flavor2, bitmap`
................
................
.....888888.....
....88288888....
....88288888....
....82888888....
....82888888....
..888828888888..
.88888888828888.
.82888888288888.
.82888888288888.
.82288888828888.
.88888888888888.
..88888..88888..
................
................`],
  [flavor3, bitmap`
................
................
.....444444.....
....44244444....
....44244444....
....42444444....
....42444444....
..444424444444..
.44444444424444.
.42444444244444.
.42444444244444.
.42244444424444.
.44444444444444.
..44444..44444..
................
................`],
  [flavor0, bitmap`
................
................
.....222222.....
....22222222....
....22222222....
....22222222....
....22222222....
..222222222222..
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
..22222..22222..
................
................`],
  [up, bitmap`
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......`],
  [side, bitmap`
................
................
................
................
................
................
2222222222222222
2222222222222222
2222222222222222
2222222222222222
................
................
................
................
................
................`],
  [life, bitmap`
................
................
................
................
....3......3....
...333....333...
..33333..33333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
....33333333....
......3333......
.......33.......
................`],
  [empty, bitmap`
................
................
................
................
....3......3....
...333....333...
..33.33..33.33..
..3...3333...3..
..3..........3..
..3..........3..
..33........33..
...33......33...
....333..333....
......3333......
.......33.......
................`],
  [corner1, bitmap`
................
................
................
................
................
................
......2222222222
......2222222222
......2222222222
......2222222222
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......`],
  [corner2, bitmap`
................
................
................
................
................
................
2222222222......
2222222222......
2222222222......
2222222222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......`],
  [corner3, bitmap`
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
2222222222......
2222222222......
2222222222......
2222222222......
................
................
................
................
................
................`],
  [corner4, bitmap`
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222222222
......2222222222
......2222222222
......2222222222
................
................
................
................
................
................`],
  [corner2, bitmap`
................
................
................
................
................
................
2222222222......
2222222222......
2222222222......
2222222222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......`],
  [corner3, bitmap`
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
2222222222......
2222222222......
2222222222......
2222222222......
................
................
................
................
................
................`],
  [corner4, bitmap`
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222222222
......2222222222
......2222222222
......2222222222
................
................
................
................
................
................`],
  [background, bitmap`
HHHHHHHHHHHHHHHH
8888888H8888888H
8888888H8888888H
8888888H8888888H
HHHHHHHHHHHHHHHH
888H8888888H8888
888H8888888H8888
888H8888888H8888
HHHHHHHHHHHHHHHH
8888888H8888888H
8888888H8888888H
8888888H8888888H
HHHHHHHHHHHHHHHH
888H8888888H8888
888H8888888H8888
888H8888888H8888`],
)
setBackground(background);
setSolids([bowl, cone, cherry, sprinkles, syrup, caramel, cream, flavor0, flavor1, flavor2, flavor3])

const levels = [
  map`
.........lll
............
............
............
............
............
............
............
cbyhmo......
wnasvt......`,
  map`
............
t.........l.
............
............
.h..........
............
............
...........b
.o..........
............`
]
let level = 1;
setMap(levels[1])

setPushables({})

//initial screen
addText("Ice Cream Chef", { y: 3, color: color`2` });
addText("WASD - Move", { y: 6, color: color`2` });
addText("J - Play", { y: 9, color: color`2` });
addText("I - Select", { y: 12, color: color`2` });

//movement
onInput("w", () => {
  if (level == 0 && getFirst(cursor).y != height() - 2) {
    getFirst(cursor).y -= 1
  }
})
onInput("a", () => {
  if (level == 0) {
    getFirst(cursor).x -= 1
  }
})
onInput("s", () => {
  if (level == 0) {
    getFirst(cursor).y += 1
  }
})
onInput("d", () => {
  if (level == 0 && getFirst(cursor).x != width() - 7) {
    getFirst(cursor).x += 1
  }
})

//checks if they chose the right thing based on the list and their cursor
onInput("i", () => {
  if (level != 0) { return; }
  let cursorSprite = getFirst(cursor);
  let currentTileSprites = getTile(cursorSprite.x, cursorSprite.y);
  //if the current tile has the same sprite as the next item in the order
  if (currentTileSprites.some(sprite => sprite.type === order[index])) {
    playTune(correct);
    index++;
  } else {
    playTune(wrong);
    index = 0;
    lives--;
    clearTile(9 + lives, 0);
    addSprite(9 + lives, 0, empty);
  }
  //if they finished everything
  if (index >= order.length) {
    score++;
    addText(`Score:${score}`, { x: 11, y: 15, color: color`2` });
    gameplay();
  }
})
//reset everything and add the border
onInput("j", () => {
  if (level == 0) { return; }
  level = 0;
  setMap(levels[0]);
  score = 0;
  lives = 3;
  for (var i = 1; i <= 6; i++) {
    addSprite(1, i, up);
    addSprite(3, i, up);
  }
  clearText();
  addSprite(1, 0, corner1);
  addSprite(1, 7, corner4);
  addSprite(3, 0, corner2);
  addSprite(3, 7, corner3);
  addSprite(2, 0, side);
  addSprite(2, 7, side);

  addText("Click the", { x: 8, y: 2, color: color`2` });
  addText("right choice", { x: 7, y: 4, color: color`2` });
  addText("for the", { x: 9, y: 6, color: color`2` });
  addText("order from", { x: 8, y: 8, color: color`2` });
  addText("the cone/cup", { x: 7, y: 10, color: color`2` });
  addText("to toppings", { x: 7, y: 12, color: color`2` });
  gameplay();
})

//a round of the game
function gameplay() {
  //resets order, toppings, index, cursor; everything needed for gameplay
  order = [];
  times = 5;
  index = 0;
  getFirst(cursor).remove();
  addSprite(0, 8, cursor);
  //resets time
  clearInterval(countdown);
  // 1/4 chance for each flavor, up to 4 toppings (1/5 chance to have none)
  icecream = randomIntegerInRange(0, 3);
  toppingsnumber = randomIntegerInRange(0, 4)
  conebowl = Math.round(Math.random());
  for (var j = 1; j <= 6; j++) {
    clearTile(2, j);
  }
  //sets the first 2 images to the cone/bowl and the type of ice cream
  if (conebowl == 0) {
    addSprite(2, 6, bowl);
    order.push(bowl);
  } else {
    addSprite(2, 6, cone);
    order.push(cone);
  }
  addSprite(2, 5, eval("flavor" + icecream));
  order.push(eval("flavor" + icecream));
  //chance to have no toppings; adds all the toppings to a list
  if (toppingsnumber == 0) {
    for (var j = 1; j <= 4; j++) {
      clearTile(2, j);
    }
  } else {
    for (var i = 0; i < toppingsnumber; i++) {
      //random topping from the list
      let temp = toppingslist[Math.floor(Math.random() * toppingslist.length)]
      addSprite(2, 4 - i, temp);
      //adds topping to order list
      order.push(temp);
    }
  }
  //changes number every 1 sec
  countdown = setInterval(timer, 1000);
}

//timed function
function timer() {
  //if lives run out, game over screen
  if (lives <= 0) {
    level = 1;
    setMap(levels[1]);
    scores.push(score);
    clearText();
    //finds the high score
    let maxScore = scores[0];
    for (let i = 1; i < scores.length; i++) {
      if (scores[i] > maxScore) {
        maxScore = scores[i];
      }
    }
    addText("Game Over", { y: 2, color: color`2` });
    addText(`Score: ${score}`, { y: 6, color: color`2` });
    addText(`High Score: ${maxScore}`, { y: 8, color: color`2` });
    addText("Play Again - 'J'", { y: 12, color: color`2` });
    clearInterval(countdown);
    return;
  }
  //if time runs out, lose a life
  if (times == 0) {
    clearInterval(countdown);
    lives--;
    clearTile(9 + lives, 0);
    addSprite(9 + lives, 0, empty);
    playTune(wrong);
    gameplay();
  }
  //sets the time in the corner
  addText(JSON.stringify(times), { x: 1, y: 1, color: color`2` });
  times--;
}
