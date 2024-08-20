/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: skibidi-toilet-game
@author: spedward
@tags: ['skibidi', 'skibidi-toilet']
@addedOn: 2024-08-15

*/

async function toiletBehaviour(x, y, spriteList, s) {
  while (true) {
    if (gameOver == true) {
      addText('game over', options = { x: 6, y: 6, color: color`3` })
      break
    } else {

      if (toiletState[s] == 'toilet') {
        await new Promise(r => setTimeout(r, waitTime));
        clearTile(x, y)
        random = Math.random()
        if (random <= skibidiThreshold) {
          toiletState[s] = 'skibidi'
          addSprite(x, y, spriteList[1])
        } else {
          toiletState[s] = 'bomb'
          addSprite(x, y, spriteList[2])
        }
      } else if (toiletState[s] == 'skibidi') {
        await new Promise(r => setTimeout(r, skibidiTime));
        if (beenShot[s] == false) {
          gameOver = true;
          bg.end()
          const dieSound = playTune(die)
        } else {
          beenShot[s] = false
        }
        toiletState[s] = 'toilet'
        clearTile(x, y)
        addSprite(x, y, spriteList[0])
      } else {
        await new Promise(r => setTimeout(r, bombTime));
        toiletState[s] = 'toilet'
        clearTile(x, y)
        addSprite(x, y, spriteList[0])
      }
    }
  }
}

function cameraBehaviour(x, y, s) {
  if (gameOver == false) {
    const skibidiSound = playTune(gainPoint)
    clearTile(3, 2)
    addSprite(3, 2, cameras[s])
    if (toiletState[s] == 'skibidi') {
      clearTile(x, y)
      addSprite(x, y, toilets[s])
      toiletState[s] = 'toilet'
      beenShot[s] = true
      score += 1;
      waitTime -= 20 * (waitTime >= 200)
      skibidiTime -= 20 * (skibidiTime >= 200)
      console.log(toiletState[s])
    } else if (toiletState[s] == 'bomb') {
      clearTile(x, y)
      addSprite(x, y, toilets[s])
      gameOver = true;
      addText('game over', options = { x: 6, y: 6, color: color`3` })
      bg.end()
      const dieSound = playTune(die)
    }
  }
}

const cameraRight = "p"
const cameraLeft = "a"
const cameraUp = "b"
const cameraDown = "c"
const cameras = [cameraUp, cameraRight, cameraDown, cameraLeft]

const skibidiUp = "d"
const skibidiDown = "e"
const skibidiLeft = "f"
const skibidiRight = "g"

const toiletUp = "h"
const toiletDown = "i"
const toiletRight = "j"
const toiletLeft = "k"
const toilets = [toiletDown, toiletLeft, toiletUp, toiletRight]

const bombUp = "l"
const bombDown = "m"
const bombLeft = "n"
const bombRight = "o"

const gainPoint = tune`
105.26315789473684,
105.26315789473684: A4/105.26315789473684,
3157.894736842105`
const bgMusic = tune`
70.58823529411765: A4^70.58823529411765 + B4^70.58823529411765,
70.58823529411765: E4^70.58823529411765 + F4-70.58823529411765 + G4-70.58823529411765 + C5^70.58823529411765,
70.58823529411765: F4~70.58823529411765 + G4~70.58823529411765 + A4~70.58823529411765 + B4~70.58823529411765 + C5~70.58823529411765,
70.58823529411765: E4~70.58823529411765 + F5~70.58823529411765 + F4^70.58823529411765 + D5^70.58823529411765 + D4-70.58823529411765,
70.58823529411765: E4~70.58823529411765 + G5~70.58823529411765 + B4^70.58823529411765 + C5^70.58823529411765 + D5^70.58823529411765,
70.58823529411765: F5~70.58823529411765 + G5~70.58823529411765 + E4~70.58823529411765 + A5~70.58823529411765 + B4^70.58823529411765,
70.58823529411765: G5~70.58823529411765 + E4~70.58823529411765 + A5~70.58823529411765 + B4^70.58823529411765 + E5^70.58823529411765,
70.58823529411765: G5~70.58823529411765 + F5~70.58823529411765 + E4~70.58823529411765 + B5~70.58823529411765 + F4^70.58823529411765,
70.58823529411765: F5~70.58823529411765 + F4^70.58823529411765 + A5~70.58823529411765 + E4^70.58823529411765 + A4^70.58823529411765,
70.58823529411765: F5~70.58823529411765 + E5~70.58823529411765 + A4~70.58823529411765 + G4~70.58823529411765 + A5~70.58823529411765,
70.58823529411765: E5~70.58823529411765 + D5~70.58823529411765 + C5~70.58823529411765 + B4~70.58823529411765 + G5~70.58823529411765,
70.58823529411765: F5~70.58823529411765 + C4^70.58823529411765 + C5^70.58823529411765 + A4^70.58823529411765 + A5^70.58823529411765,
70.58823529411765: E5~70.58823529411765 + C4^70.58823529411765 + C5^70.58823529411765 + A4^70.58823529411765 + A5^70.58823529411765,
70.58823529411765: D5~70.58823529411765 + C5^70.58823529411765 + F5~70.58823529411765 + C4^70.58823529411765 + A4^70.58823529411765,
70.58823529411765: B4~70.58823529411765 + A4~70.58823529411765 + F5~70.58823529411765 + E5~70.58823529411765 + E4^70.58823529411765,
70.58823529411765: G4~70.58823529411765 + F4~70.58823529411765 + E4~70.58823529411765 + G5~70.58823529411765 + D5~70.58823529411765,
70.58823529411765: E4~70.58823529411765 + G5~70.58823529411765 + D5~70.58823529411765 + G4^70.58823529411765 + C5^70.58823529411765,
70.58823529411765: F4~70.58823529411765 + G5~70.58823529411765 + C5~70.58823529411765 + B4~70.58823529411765,
70.58823529411765: G4~70.58823529411765 + B4~70.58823529411765 + A4~70.58823529411765 + D4~70.58823529411765 + C4~70.58823529411765,
70.58823529411765: B4~70.58823529411765 + D5~70.58823529411765 + C4~70.58823529411765,
70.58823529411765: C5~70.58823529411765 + F5~70.58823529411765 + E5~70.58823529411765 + C4~70.58823529411765 + G5~70.58823529411765,
70.58823529411765: D5~70.58823529411765 + E5~70.58823529411765 + G5~70.58823529411765 + A5~70.58823529411765 + F4/70.58823529411765,
70.58823529411765: F5~70.58823529411765 + G5~70.58823529411765 + A5~70.58823529411765 + E4~70.58823529411765 + D4~70.58823529411765,
70.58823529411765: G5~70.58823529411765 + A5~70.58823529411765 + E4~70.58823529411765 + C4~70.58823529411765 + A4^70.58823529411765,
70.58823529411765: F4~70.58823529411765 + A5~70.58823529411765 + G4^70.58823529411765 + G5^70.58823529411765 + D5^70.58823529411765,
70.58823529411765: G4~70.58823529411765 + A5~70.58823529411765 + F4^70.58823529411765 + G5^70.58823529411765 + F5^70.58823529411765,
70.58823529411765: A4~70.58823529411765 + A5~70.58823529411765 + E4^70.58823529411765 + B4-70.58823529411765 + D4/70.58823529411765,
70.58823529411765: B4~70.58823529411765 + C5~70.58823529411765 + D5~70.58823529411765 + E5~70.58823529411765 + F5~70.58823529411765,
70.58823529411765: E5~70.58823529411765 + A5~70.58823529411765 + D4^70.58823529411765 + G4-70.58823529411765 + A4-70.58823529411765,
70.58823529411765: D5~70.58823529411765 + C5~70.58823529411765 + B4~70.58823529411765 + A4~70.58823529411765 + G4~70.58823529411765,
141.1764705882353`
const die = tune`
37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5,
37.5: B4/37.5`

const bg = playTune(bgMusic, Infinity)

let waitTime = 1500;
let skibidiTime = 1000;
let bombTime = 500;
let skibidiThreshold = 0.8;
let bombThreshold = 0.2;

let toiletState = ['toilet', 'toilet', 'toilet', 'toilet']
let beenShot = [false, false, false, false];

let gameOver = false;
let score = 0;

toiletBehaviour(1, 2, [toiletRight, skibidiRight, bombRight], 3)
toiletBehaviour(5, 2, [toiletLeft, skibidiLeft, bombLeft], 1)
toiletBehaviour(3, 0, [toiletDown, skibidiDown, bombDown], 0)
toiletBehaviour(3, 4, [toiletUp, skibidiUp, bombUp], 2)



setLegend(
  [cameraUp, bitmap`
................
................
................
......000.......
.....00000......
....0000000.....
...00.000.00....
..00..000..00...
.000..000...00..
......000....0..
......000.......
......000.......
......000.......
......000.......
................
................`],
  [cameraRight, bitmap`
................
................
................
................
.1111111111111..
.1111111111111..
..LLLLLLLLLLL3..
..LLLLLLLLLLL...
...LLLLLL.......
....LLLLL.......
...LLLLL........
..LLLLL.........
..LLLL..........
................
................
................`],
  [cameraDown, bitmap`
................
................
................
................
.....111111.....
.....00LL00.....
.....0LLLL0.....
.....LL33LL.....
.....0LLLL0.....
.....00LL00.....
......1111......
.......11.......
.......11.......
................
................
................`],
  [cameraLeft, bitmap`
................
................
................
................
..1111111111111.
..1111111111111.
..3LLLLLLLLLLL..
...LLLLLLLLLLL..
.......LLLLLL...
.......LLLLL....
........LLLLL...
.........LLLLL..
..........LLLL..
................
................
................`],
  [toiletUp, bitmap`
................
................
.......1111.....
......11111.....
......11111.....
....LLLLLLLLL...
....LLLLLLLLL...
....LLLLLLLLL...
....LLLLLLLLL...
....LLLLLLLLL...
.....1111111....
.....1111111....
......11111.....
......1L1L1.....
.....LL11LL.....
....LL.111LL....`],
  [toiletRight, bitmap`
LLL111L.........
L111L1L.........
L1LLL11L........
11LLL11LL.......
1LLLLLL1LL......
1LLL11111LL.....
1LLL177111LL....
11L11777711L....
L1L17777771L....
L1117777771L....
LL111777711L....
.LLL117711LL....
...LL1111LL.....
....LLLLLL......
................
................`],
  [toiletDown, bitmap`
....00111100....
...0001221000...
...0LL1221LL0...
...0L112211L0...
...0L112221L0...
...0L112221L0...
...0L11111110...
..001177777100..
..011777777110..
..011777771110..
..001177711100..
...0011111100...
....00111100....
....01111110....
....00000000....
................`],
  [toiletLeft, bitmap`
.........L111LLL
.........L1L111L
........L11LLL1L
.......LL11LLL11
......LL1LLLLLL1
.....LL11111LLL1
....LL111771LLL1
....L11777711L11
....L17777771L1L
....L1777777111L
....L117777111LL
....LL117711LLL.
.....LL1111LL...
......LLLLLL....
................
................`],
  [skibidiUp, bitmap`
.....6FFFFFF6...
.....66FFFF66...
......66CC66....
......11CC1.....
......11CC1.....
....LLLLLLLLL...
....LLLLLLLLL...
....LLLLLLLLL...
....LLLLLLLLL...
....LLLLLLLLL...
.....1111111....
.....1111111....
......11111.....
......1L1L1.....
.....LL11LL.....
....LL.111LL....`],
  [skibidiRight, bitmap`
LLL111L666666...
L111L1L6F3FF66..
L1LLL116FFF3F6..
11LLL116FLLFF6..
1LLLLLL6FFLL66..
1LLL1166CF6666..
1LLL176CC66L....
11L1166CC61L....
L1L176CC661L....
L11176CC671L....
LL111666611L....
.LLL117711LL....
...LL1111LL.....
....LLLLLL......
................
................`],
  [skibidiDown, bitmap`
...660FFFF06....
...6FF3FF3F66...
..66FFFFFFFF6...
..66FF000FFF6...
...660FFF0F66...
...0666666660...
...0L11CC1110...
..00117CC77100..
..0117CCC77110..
..0117CCCC1110..
..001177711100..
...0011111100...
....00111100....
....01111110....
....00000000....
................`],
  [skibidiLeft, bitmap`
...666666L111LLL
..66FF3F6L1L111L
..6F3FFF611LLL1L
..6FFLLF611LLL11
..66LLFF6LLLLLL1
..6666FC6611LLL1
....L66CC671LLL1
....L16CC6611L11
....L166CC671L1L
....L176CC67111L
....L116666111LL
....LL117711LLL.
.....LL1111LL...
......LLLLLL....
................
................`],
  [bombUp, bitmap`
....00000.999...
...0000009F09...
..000000FF000...
.000300FF003000.
0000000F00000000
0000000000000000
0000000000000000
0000000000000003
0000000000000003
3300000000000030
0033300000003300
0000333333333000
0000000000000000
..0000000000000.
...0000000000...
.....000000.....`],
  [bombRight, bitmap`
LLL111L....3....
L111L1L.FFF.....
L1LLL1FFF..3....
11LLLFFLL.......
1LLLFLL1LL......
1LLLF0001LL.....
1LLL0099000L....
11L00099011L....
L1L10999071L....
L1110990771L....
LL110900711L....
.LLL100711LL....
...LL1111LL.....
....LLLLLL......
................
................`],
  [bombDown, bitmap`
....001111009...
...00012210FF9..
...0LL122FFF0...
...0L112FF1L0...
...0L112F21L0...
...0L100001L0...
...0L00000010...
..000033330100..
..000333033010..
..000003333010..
..001100000100..
...0011111100...
....00111100....
....01111110....
....00000000....
................`],
  [bombLeft, bitmap`
......3..L111LLL
.....3F..L1L111L
......FFF11LLL1L
.......LF11LLL11
......LL000LLLL1
.....L000000LLL1
....L00090900LL1
....L00009900L11
....L10990990L1L
....L1700000111L
....L117777111LL
....LL117711LLL.
.....LL1111LL...
......LLLLLL....
................
................`],
)
setSolids([])

let level = 0
const levels = [
  map`
...i...
.......
.j.p.k.
.......
...h...`
]

setMap(levels[level])

onInput("a", () => {
  cameraBehaviour(1, 2, 3)
})

onInput("d", () => {
  cameraBehaviour(5, 2, 1)
})

onInput("w", () => {
  cameraBehaviour(3, 0, 0)
})

onInput("s", () => {
  cameraBehaviour(3, 4, 2)
})

afterInput(() => {
  addText('score: ' + score, options = { x: 6, y: 5, color: color`9` })
})

