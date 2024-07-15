/*
@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const enemy = "e"
const pellet = "ijkl"
const wall = "w"
const col = tune`
500: C4^500,
15500`
const death = tune`
1200: B5~1200,
37200`
setLegend(
  [player, bitmap`
................
................
................
................
................
................
...00......00...
.....0....0.....
....00000000....
....04444440....
....044D44D0....
....04444440....
....04444440....
....00000000....
.....0....0.....
.....0....0.....`],
  [enemy, bitmap`
................
................
................
................
................
................
.....00..00.....
....0......0....
....00000000....
....03333330....
....033C33C0....
....03333330....
....03333330....
....00000000....
.....0....0.....
.....0....0.....`],
  [pellet[0], bitmap`
................
................
................
................
................
................
................
................
......666F......
................
................
................
................
................
................
................`],
  [pellet[1], bitmap`
................
................
................
................
................
................
.......6........
.......6........
.......6........
.......F........
................
................
................
................
................
................`],
  [pellet[2], bitmap`
................
................
................
................
................
................
................
......F666......
................
................
................
................
................
................
................
................`],
  [pellet[3], bitmap`
................
................
................
................
................
................
........F.......
........6.......
........6.......
........6.......
................
................
................
................
................
................`],
  [wall, bitmap`
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
3333333333333333`],




)
setSolids([player, wall])
let time = 0
let points = 0
let level = 0
let reload = 0
let alive = 1
const levels = [
  map`
wwwwwwwwwww
we.......ew
w.........w
w.........w
w....p....w
w.........w
w.........w
we.......ew
wwwwwwwwwww`
]

setMap(levels[level])

setPushables({
  [player]: []
})



onInput("w", () => {
  if (alive === 1) {
    getFirst(player).y -= 1
  }

})
onInput("s", () => {
  if (alive === 1) {
    getFirst(player).y += 1
  }
})
onInput("a", () => {
  if (alive === 1) {
    getFirst(player).x -= 1
  }
})
onInput("d", () => {
  if (alive === 1) {
    getFirst(player).x += 1
  }
})

onInput("i", () => {
  if (reload <= 0 && alive === 1) {
    addSprite(getFirst(player).x, getFirst(player).y, pellet[3])
    reload = 15
  }
})
onInput("k", () => {
  if (reload <= 0 && alive === 1) {
    addSprite(getFirst(player).x, getFirst(player).y, pellet[1])
    reload = 15
  }
})
onInput("j", () => {
  if (reload <= 0 && alive === 1) {
    addSprite(getFirst(player).x, getFirst(player).y, pellet[2])
    reload = 15
  }
})
onInput("l", () => {
  if (reload <= 0 && alive === 1) {
    addSprite(getFirst(player).x, getFirst(player).y, pellet[0])
    reload = 15
  }
})


let interval = setInterval(() => {
  time++
  reload--
  const playerSprite = getFirst(player);
  const pellets = getAll(pellet[0]).concat(getAll(pellet[1])).concat(getAll(pellet[2])).concat(getAll(pellet[3]));
  const enemies = getAll(enemy);
  const walls = getAll(wall);
  if (tilesWith(enemy, player).length >= 1) {
    alive = 0;
    getFirst(player).remove();
    playTune(death);
    addText(`YOU LOST!`, {
      x: 6,
      y: 7,
      color: color`3`
    })
  }
  pellets.forEach(pellet => {
    walls.forEach(wall => {
      if (pellet.x === wall.x && pellet.y === wall.y) {
        pellet.remove();
      }
    });
    enemies.forEach(enemy => {

      if (pellet.x === enemy.x && pellet.y === enemy.y) {
        pellet.remove();
        playTune(col);
        points++
        let randomNumberz = Math.random()
        if (randomNumberz <= 0.5) { enemy.x = 0;
          enemy.y = Math.round(Math.random() * 8 + 1) }
        if (randomNumberz > 0.5) { enemy.y = 0;
          enemy.x = Math.round(Math.random() * 10 + 1) }
      }
    });
  });
  if (time % 6 === 0 && Math.random() * points > points * 0.85) {
    enemies.forEach(enemy => {
      if (playerSprite.length = 1) {
        const dx = playerSprite.x - enemy.x;
        const dy = playerSprite.y - enemy.y;
        if (Math.abs(dx) > Math.abs(dy)) {
          enemy.x += Math.sign(dx);
        } else {
          enemy.y += Math.sign(dy);
        }
      }

    });
  }
  getAll(pellet[0]).forEach(pellet => { pellet.x += 1 })
  getAll(pellet[1]).forEach(pellet => { pellet.y += 1 })
  getAll(pellet[2]).forEach(pellet => { pellet.x -= 1 })
  getAll(pellet[3]).forEach(pellet => { pellet.y -= 1 })

  addText(`${points}`, {
    x: 0,
    y: 0,
    color: color`2`
  })

})