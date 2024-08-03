/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Hue Domination
@author: Gus Ruben
@tags: [2-Player, Multiplayer, PVP]
@addedOn: 2024-00-00
*/

const playerRedUp = "1"
const playerRedDown = "2"
const playerRedLeft = "3"
const playerRedRight = "4"
const playerBlueUp = "5"
const playerBlueDown = "6"
const playerBlueLeft = "7"
const playerBlueRight = "8"
const paintBlue = "b"
const paintRed = "r"
const background = "g"

setLegend(
  [playerRedUp, bitmap`
................
..000000000000..
..066663666360..
..063333333330..
..06333333333000
..033333333330.0
..000000000000.0
...............0
.......000000000
.......0........
......0000......
......0660......
......0630......
......0330......
......0330......
......0000......` ],
  [playerRedDown, bitmap`
......0000......
......0660......
......0630......
......0330......
......0330......
......0000......
.......0........
.......000000000
...............0
..000000000000.0
..066663666360.0
..06333333333000
..063333333330..
..033333333330..
..000000000000..
................` ],
  [playerRedLeft, bitmap`
................
................
.000000.........
.066630.........
.063330.........
.063330.........
.063330...000000
.033330.00066630
.063330.0.063330
.063330.0.000000
.033330.0.......
.033330.0.......
.033330.0.......
.000000.0.......
....0...0.......
....00000.......` ],
  [playerRedRight, bitmap`
.......00000....
.......0...0....
.......0.000000.
.......0.066630.
.......0.063330.
.......0.063330.
000000.0.063330.
066630.0.033330.
06333000.063330.
000000...063330.
.........033330.
.........033330.
.........033330.
.........000000.
................
................` ],
  [playerBlueUp, bitmap`
................
..000000000000..
..077775777570..
..075555555550..
..07555555555000
..055555555550.0
..000000000000.0
...............0
.......000000000
.......0........
......0000......
......0770......
......0750......
......0550......
......0550......
......0000......` ],
  [playerBlueDown, bitmap`
......0000......
......0770......
......0750......
......0550......
......0550......
......0000......
.......0........
.......000000000
...............0
..000000000000.0
..077775777570.0
..07555555555000
..075555555550..
..055555555550..
..000000000000..
................` ],
  [playerBlueLeft, bitmap`
................
................
.000000.........
.077750.........
.075550.........
.075550.........
.075550...000000
.055550.00077750
.075550.0.075550
.075550.0.000000
.055550.0.......
.055550.0.......
.055550.0.......
.000000.0.......
....0...0.......
....00000.......` ],
  [playerBlueRight, bitmap`
.......00000....
.......0...0....
.......0.000000.
.......0.077750.
.......0.075550.
.......0.075550.
000000.0.075550.
077750.0.055550.
07555000.075550.
000000...075550.
.........055550.
.........055550.
.........055550.
.........000000.
................
................` ],
  [background, bitmap`
2121212122222222
1212121222222222
2121212122222222
1212121222222222
2121212122222222
1212121222222222
2121212122222222
1212121222222222
2222222212121212
2222222221212121
2222222212121212
2222222221212121
2222222212121212
2222222221212121
2222222212121212
2222222221212121` ],
  [paintRed, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ],
  [paintBlue, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],
)


let level = 0
const levels = [
  map`
.........6
..........
..........
..........
..........
..........
..........
1.........`
]

setBackground(background)
setMap(levels[level])

// Create an array the size of the game board, to keep track of paint
let canvas = []
for (let i = 0; i < 10; i++) {
  canvas.push(Array(8).fill(""))
}

// the canvas should start off painted where the players spawn
canvas[9][0] = "b"
canvas[0][7] = "r"
addSprite(9, 0, "b")
addSprite(0, 7, "r")


const spritesRed = ["1", "2", "3", "4"]
const controlsRed = {
  "w": {
    func: p => p.y -= 1,
    type: "1",
  },
  "s": {
    func: p => p.y += 1,
    type: "2",
  },
  "a": {
    func: p => p.x -= 1,
    type: "3",
  },
  "d": {
    func: p => p.x += 1,
    type: "4",
  },
}

const spritesBlue = ["5", "6", "7", "8"]
const controlsBlue = {
  "i": {
    func: p => p.y -= 1,
    type: "5",
  },
  "k": {
    func: p => p.y += 1,
    type: "6",
  },
  "j": {
    func: p => p.x -= 1,
    type: "7",
  },
  "l": {
    func: p => p.x += 1,
    type: "8",
  },
}

setSolids([...spritesRed, ...spritesBlue]);

[[spritesBlue, controlsBlue, "b"], [spritesRed, controlsRed, "r"]].forEach(data => {
  const [sprites, controls, paintColor] = data;

  Object.keys(controls).forEach(key => {
    onInput(key, () => {
      let player;
      // find the player, regardless of what directional sprite is in use right now
      for (const sprite of sprites) {
        console.log(sprite)
        player = getFirst(sprite);
        if (player) break;
      }

      // move the player
      controls[key].func(player);
      player.type = controls[key].type;

      // color the canvas at that spot
      let currentColor = canvas[player.x][player.y]
      if (currentColor == "") {
        addSprite(player.x, player.y, paintColor)
      } else if (currentColor != paintColor) {
        for (let sprite of getTile(player.x, player.y)) {
          if (sprite.type == currentColor) {
            sprite.type = paintColor
          }
        }
      }
      canvas[player.x][player.y] = paintColor
    })
  })
})


