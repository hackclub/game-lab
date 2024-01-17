/*
A Sprig recreaction(ish) of Dadish.
"He's a dad AND a radish! 
His kids have gone missing from the vegetable patch,
and he needs your help to find them."
*/

const player = "a"
const bg = "b"
const grass = "c"
const pinkchild = "d"
const block = "e"
const orangechild = "f"
const yellowchild = "g"
const purplechild = "h"
const longspikes = "j"
const platform = "k"
const fallingspike = "l"
const greenchild = "m"

setLegend(
  [ player, bitmap`
................
................
................
................
.....DD..DD.....
......DDDD......
.....333333.....
....33333333....
...3300330033...
...3300330033...
...3333333333...
...3333003333...
....33333333....
.....333333.....
......2222......
.......22.......` ],
  [bg, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [pinkchild, bitmap`
................
................
................
................
.....DD..DD.....
......DDDD......
.....8888888....
....88888888....
...8008800888...
...8008800888...
...8888888888...
...8888008888...
....88888888....
.....888888.....
......2222......
.......22.......`],
    [block, bitmap`
................
................
................
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....`],
  [orangechild, bitmap`
................
................
................
................
.....DD..DD.....
......DDDD......
.....9999999....
....99999999....
...9009900999...
...9009900999...
...9999999999...
...9999009999...
....99999999....
.....999999.....
......2222......
.......22.......`],
  [yellowchild, bitmap`
................
................
................
................
.....DD..DD.....
......DDDD......
.....6666666....
....66666666....
...6006600666...
...6006600666...
...6666666666...
...6666006666...
....66666666....
.....666666.....
......2222......
.......22.......`],
  [purplechild, bitmap`
................
................
................
................
.....DD..DD.....
......DDDD......
.....HHHHHHH....
....HHHHHHHH....
...H00HH00HHH...
...H00HH00HHH...
...HHHHHHHHHH...
...HHHH00HHHH...
....HHHHHHHH....
.....HHHHHH.....
......2222......
.......22.......`],
  [longspikes, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
.2.2.2.2.2.2.2..
222222222222222.`],
  [platform, bitmap`
9999999999999999
9999999999999999
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [fallingspike, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1LLLLLLLLLLLLLL1
11LLLLLLLLLLLL11
.11LLLLLLLLLL11.
..11LLLLLLLL11..
...1LLLLLLLL1...
...1LLLLLLLL1...
...11LLLLLL11...
....11LLLL11....
.....1LLLL1.....
.....1LLLL1.....
.....11LL11.....
......1LL1......
......1LL1......
......1111......`],
  [greenchild, bitmap`
................
................
................
................
.....DD..DD.....
......DDDD......
.....4444444....
....44444444....
...4004400444...
...4004400444...
...4444444444...
...4444004444...
....44444444....
.....444444.....
......2222......
.......22.......`] //looks like a little apple
)

setBackground(bg)

setSolids([block, player, grass, platform])

let level = 0
const levels = [
  map`
.......
.......
a..e..d
ccccccc`,
  map`
........
a.......
cc......
ccj.e..f
cccccccc`,
  map`
.............
.............
.............
............g
a.j..ccc.jkkk
ccccccccccccc`, 
  map`
..ll.....l.....
...............
..............h
............ccc
...........cccc
a....je..jccccc
ccccccccccccccc`,
  map`
.......l....l..
...............
ca.............
ccc............
ccc.j.j........
ccccccc.j.j.e.m
ccccccccccccccc`,
  map`
......
adfghm
cccccc
cccccc`
]
const levelTargets = [pinkchild,orangechild,yellowchild,purplechild,greenchild]

setMap(levels[level])

setPushables({
  [ player ]: [],
})

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("d", () => {
  getFirst(player).x += 1
});

const bringToGround = () => {
  //loop was being janky. yes i know this is bad.
    getFirst(player).y += 1
    getFirst(player).y += 1
    getFirst(player).y += 1
}

let jump = false;
onInput("w", () => {
  if (!jump) {
    getFirst(player).y -= 1
    jump = true
    setTimeout(() => {
      bringToGround();
      setTimeout(() => {
        jump = false;
        bringToGround();
      }, 100);
    }, 550);
  }
});

 const death = () => {
   const deathTune = tune`
500: C4-500,
15500`;
      playTune(deathTune)
      setTimeout(() => {
        setMap(levels[level])
      }, 250)
 } 

afterInput(() => {
  if (level == levels.length - 1) return
  if (!jump) bringToGround();

  
  const deathStuff = [];
    deathStuff.push(...getAll(longspikes))
  deathStuff.push(...getAll(fallingspike))
  for (const thing of deathStuff) {
    if (thing.x == getFirst(player).x && thing.y == getFirst(player).y) {
      death();
    }
  }
  
const fallTheSpike = (spike) => {
  if (getFirst(player).x == spike.x && getFirst(player).y == spike.y) {
    death()
  }
  if (spike.y < 5) {
    setTimeout(() => {
      spike.y += 1
      fallTheSpike(spike)
    }, 100);
  }
}
  
  for (const spike of getAll(fallingspike)) {
    if (spike.x == getFirst(player).x) {
        fallTheSpike(spike);
    }
  }
  
  const target = getFirst(levelTargets[level]);
  if (Math.abs(target.x - getFirst(player).x) <= 1 && target.y == getFirst(player).y) {
    level++
    setMap(levels[level])
    if (level == levels.length - 1) {
      addText('You found them!', {x: 1, y: 3, color: color`5`})
    }
  }
})
