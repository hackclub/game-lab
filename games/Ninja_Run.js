/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Ninja Run
@author: Acidicts
@tags: ["ninja"]
@addedOn: 2024-00-00
*/

const left_wall = "l"
const right_wall = "r"
const mid_wall = "m"
const left = "L"
const mid = "M"
const right = "R"

const bomb = "b"


setLegend(
  [ left_wall, bitmap`
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0
...............0` ],
  [ right_wall, bitmap`
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............
0...............` ],
  [ mid_wall, bitmap`
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0` ],
  [ left, bitmap`
...............0
...............0
...............0
...............0
..........LL...0
.........L03LLL0
.........L23L..0
..........LLL..0
............L..0
............LL.0
.............L.0
..............L0
...............0
...............0
...............0
...............0` ],
  [ mid, bitmap`
0..............0
0..............0
0......LL......0
0.L...L33L...L.0
0..L..0220..L..0
0...LL.LL.LL...0
0......LL......0
0......LL......0
0......LL......0
0......LL......0
0......LL......0
0.....L..L.....0
0....L....L....0
0...L......L...0
0...L......L...0
0..............0` ],
  [ right, bitmap`
0...............
0...............
0...............
0...............
0...LL..........
0LLL30L.........
0..L32L.........
0..LLL..........
0..L............
0.LL............
0.L.............
0L..............
0...............
0...............
0...............
0...............`],
  [ bomb, bitmap`
................
................
................
................
.......6.6......
.........C......
........C..3....
.......C..6.....
......0000......
.....000000.....
.....000000.....
.....000000.....
.....000000.....
......0000......
................
................`],
)

let level = 0
const levels = [map`
lmr
lmr
lmr
lmr
Lmr`,
                map`
lmr
lmr
lmr
lmr
lMr`,
                map`
lmr
lmr
lmr
lmr
lmR`,
                map`
.`
               ]

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setMap(levels[level])

setSolids([])

let score = 0
let alive = true
const melody = tune`
214.28571428571428,
214.28571428571428: B5~214.28571428571428,
214.28571428571428: A5~214.28571428571428,
214.28571428571428: G5~214.28571428571428,
214.28571428571428: F5~214.28571428571428,
214.28571428571428: E5~214.28571428571428,
214.28571428571428: E5~214.28571428571428,
214.28571428571428: F5~214.28571428571428,
214.28571428571428: E5~214.28571428571428,
214.28571428571428: D5~214.28571428571428,
214.28571428571428: D5~214.28571428571428,
214.28571428571428: E5~214.28571428571428,
214.28571428571428: D5~214.28571428571428,
214.28571428571428: C5~214.28571428571428,
214.28571428571428: C5~214.28571428571428,
214.28571428571428: D5~214.28571428571428,
214.28571428571428: C5~214.28571428571428,
214.28571428571428: B4~214.28571428571428,
214.28571428571428: B4~214.28571428571428,
214.28571428571428: C5~214.28571428571428,
214.28571428571428: B4~214.28571428571428,
214.28571428571428: A4~214.28571428571428,
214.28571428571428: A4~214.28571428571428,
214.28571428571428: B4~214.28571428571428,
214.28571428571428: C5~214.28571428571428,
214.28571428571428: D5~214.28571428571428,
214.28571428571428: E5~214.28571428571428,
214.28571428571428: F5~214.28571428571428,
214.28571428571428: G5~214.28571428571428,
214.28571428571428: F5~214.28571428571428,
214.28571428571428: F5~214.28571428571428,
214.28571428571428: G5~214.28571428571428` 

const bomb1 = 0
const bomb2 = 0
const bomb3 = 0

const bombs = [
  {id:0, active:false, y:0},
  {id:1, active:false, y:0},
  {id:2, active:false, y:0},
]

const playback = playTune(melody, Infinity)

onInput("a", () => {
  if (alive) {
    if (level >= 1) {
      level -= 1
    }
    setMap(levels[level])
  }
})

onInput("d", () => {
  if (alive) {
    if (level <= 1) {
      level += 1
    }
    setMap(levels[level])
  }
})

afterInput(() => {
  if (alive) {
    const rand = getRandInt(0, 2)
    text = "Score: " + String(score)
    if (rand === 0) {
      bombs[0].active = true
    }
    if (rand === 1) {
      bombs[1].active = true
    }
    if (rand === 2) {
      bombs[2].active = true
    }
    for (let i=0; i<bombs.length; i++) {
      if (bombs[i].y >= 4) {
        bombs[i].y = 0
        bombs[i].active = false
        score += 1
      }
      if (bombs[i].active && alive){
        addSprite(i, bombs[i].y, bomb)
        bombs[i].y += 1
        
        if (i === level) {
          if (bombs[i].y === 4){
            playback.end()
            alive = false
            setMap(levels[3])
          }
        }
      }
    }
    addText("Score ", { 
      x: 0,
      y: 1,
      color: color`3`
    })
  
    addText(String(score), {
      x: 0,
      y: 3,
      color: color`3`
    })
  }
  else {
    clearText()
    addText("Game Over", {x:5, y:5, color:color`3`})
    addText("Score: " + String(score), {x:6, y:7, color:color`7`})
  }
})
