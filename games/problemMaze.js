/*
@title: maze
@author:  Gramgra07
@tags: [maze]
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const goal = "g"
const trigger = "t"
const movingWall = "m"
const portal = "o"
const portal2 = "i"
const key = "k"
const door = "d"
const trigger2 = "j"
const movingWall2="e"
triggerPressedOnce = false

setLegend(
  [player, bitmap`
................
................
.......8........
......888.......
.....88088......
....8800088.....
....8880888.....
....8888888.....
....8888888.....
....8880888.....
.....88088......
....8888888.....
...88.888.88....
..888..8..888...
..88.......88...
..8.........8...`],
  [wall, bitmap`
................
...LLLLLLLLLL...
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
.LLL11111LLLLLL.
.LLL11111LLLL1L.
.LLLLLLLLLLLLLL.
..LLLLLLLLLLLL..
...LLLLLL1LLL...
................
..L........LLLL.
.LLL......LLLLLL
LLL1L.....LLLL1L
.LLL......LLLLLL
..L.......LL1LLL
...........LLLL.`],
  [goal, bitmap`
................
....LLLLLLLL....
...LLLLLLLLLL...
..L11LLLL11LLL..
.LLLLLLLLL440LL.
.LLLLLLLLL440LL.
.LLLLLLLL1LL0LL.
.LLLLLLLLLLL0LL.
.LLL1LLLLLLLLLL.
.LLL1LLLLLLL11L.
.LLLLLLLLLLL11L.
.LLLLLLL1LLLLLL.
..LLLLLLLLLLLL..
...LLLLLLLLLL...
....LLLL1LLL....
................`],
  [trigger, bitmap`
...LLLLLLLLLL...
..LLLLLLLLLLLL..
.LLLL333333LLLL.
LLL3333333333LLL
LLL3333333333LLL
LL333333333333LL
LL333333333333LL
LL333333333333LL
LL333333333333LL
LL333333333333LL
LL333333333333LL
LLL3333333333LLL
LLL3333333333LLL
.LLLL333333LLLL.
..LLLLLLLLLLLL..
...LLLLLLLLLL...`],
  [trigger2, bitmap`
................
....LLLLLLLL....
...LLLLLLLLLL...
..LLL666666LLL..
.LLL66666666LLL.
.LL6666666666LL.
.LL6666666666LL.
.LL6666666666LL.
.LL6666666666LL.
.LL6666666666LL.
.LL6666666666LL.
.LLL66666666LLL.
..LLL666666LLL..
...LLLLLLLLLL...
....LLLLLLLL....
................`],
  [movingWall, bitmap`
................
................
................
................
................
....3LLLLLLL....
..333LLLLLLL.L..
.33LLLL1LLL..LL.
.3LLLLLLLLLLLLL.
.3LLLLLLLLLLLLL.
.3LLLLLLLLLL1LL.
.33LLLLLLLLLLLL.
..333L1LLLLLLL..
....3LLLLLLL....
................
................`],
  [movingWall2, bitmap`
................
................
................
................
................
....LLLLLLL6....
..L.LLLLLLL666..
.LL..LLL1LLLL66.
.LLLLLLLLLLLLL6.
.LLLLLLLLLLLLL6.
.LL1LLLLLLLLLL6.
.LLLLLLLLLLLL66.
..LLLLLLL1L666..
....LLLLLLL6....
................
................`],
  [portal, bitmap`
................
.....HHHHH......
...HHHHHHHHH....
...HH88888HH....
..HH8888888HH...
..HH8888888HH...
..HH8888888HH...
..HH8888888HH...
..HH8888888HH...
..HH8888888HH...
..HH8888888HH...
..HH8888888HH...
...HH88888HH....
...HHHHHHHHH....
.....HHHHH......
................`],
  [portal2, bitmap`
................
.....55555......
...555555555....
...557777755....
..55777777755...
..55777777755...
..55777777755...
..55777777755...
..55777777755...
..55777777755...
..55777777755...
..55777777755...
...557777755....
...555555555....
.....55555......
................`],
  [key,bitmap`
................
................
................
................
..66666.........
.6666666........
.6666666FFFFFFFF
.6666666FFFFFFFF
.6666666...FF.FF
.6666666...FF.FF
.6666666........
..66666.........
................
................
................
................`],
  [door,bitmap`
................
................
................
................
.....CCCCCC.....
....CCC000CC....
....CCC000CC....
....0CC000CC....
....CCC000CC....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCLC....
....CCCCCCCC....
....0CCCCCCC....
....CCCCCCCC....
....CCCCCCCC....`],
)

setSolids([wall, player, movingWall,movingWall2,door])

let level = 0
const levels = [
  map`
...w.w..
ww.w..w.
w...w..w
..w...w.
.w..w..w
.pw.ww.g`,
  map`
.....w..
ww.w..w.
..m.w...
.ww..ww.
..tw....
pwwgm..w`,
  map`
..gw.wwt
..w.....
w.wm.w.w
..w.ww..
.wwm..w.
..m..wwp`,
  map`
pww..wwg
..tw....
.ww..ww.
.wow...w
..m..wm.
w.w..wow`,
  map`
pwwm.wwg
..tw....
.ww..ww.
.wow...w
..mm.wm.
wmwm.wow`,
  map`
pm.....g
.w.w.ww.
tw.w.ww.
w..w.w..
ow.w...m
...w..mo`,
  map`
g.w.....
.dw.....
wm..m...
.kwmm...
www..www
piw..t.i`,
  map`
k.....dg
.m.ww.ow
.mw.tw.w
omwipw.w
wwwwwwm.
i.......`,
  map`
....w.............
.ww.ww.wwwwwwww...
.w..ww.w......w..w
.w..ww........w.wo
.w..wwww.wwwwww.w.
.w..w....w......w.
.w..w.g.ww.wwwwww.
dw..w...w..w..eeee
kw..w...w..wmmmm..
.w..wwwww..w..eeee
.w.........wmmmm..
ow.........w..eeee
wwwwwwwwwwwwww....
p....jt...........`,
]

setMap(levels[level])

setPushables({
  [player]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
afterInput(() => {
  if (tilesWith(key, player).length > 0) {
    const doors = getAll(door);
    for (let i = 0; i < doors.length; i++) {
      doors[i].remove();
    }
    const keys = getAll(key);
    
    for (let i = 0; i < keys.length; i++) {
      keys[i].remove();
    }
  }
  if (tilesWith(trigger, player).length > 0) {
    const movingWalls = getAll(movingWall);
    for (let i = 0; i < movingWalls.length; i++) {
      movingWalls[i].x += 1;
    }
  }
  if (tilesWith(trigger2, player).length > 0) {
    const movingWalls2 = getAll(movingWall2);
    for (let i = 0; i < movingWalls2.length; i++) {
      movingWalls2[i].x -= 1;
    }
  }
  if (tilesWith(portal, player).length > 0) {
    let number = tilesWith(portal,player).length
      nextX = getAll(portal)[number].x;
      nextY = getAll(portal)[number].y;
    if (nextX === getFirst(player).x && nextY === getFirst(player).y){
      nextX = getAll(portal)[0].x;
      nextY = getAll(portal)[0].y;
    }
      getFirst(player).x = nextX;
      getFirst(player).y = nextY;
  }
  if (tilesWith(portal2, player).length > 0) {
    let number = tilesWith(portal2,player).length
      nextX = getAll(portal2)[number].x;
      nextY = getAll(portal2)[number].y;
    if (nextX === getFirst(player).x && nextY === getFirst(player).y){
      nextX = getAll(portal2)[0].x;
      nextY = getAll(portal2)[0].y;
    }
      getFirst(player).x = nextX;
      getFirst(player).y = nextY;
  }
  const numberCovered = tilesWith(goal, player).length;
  if (numberCovered === 1) {
    level = level + 1;

    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`H` });
    }
  }
})