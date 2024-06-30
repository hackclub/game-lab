/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sprig Clicker
@author: xriiitox (Josh Baron)
@tags: []
@addedOn: 2024-06-29
*/

const player = "p"
const bg = "b"
const sprig = "s"
const calmSoil = "c"
const fert = "f"
const scythe = "y"
const mult = "m"

let clickCounter = 0
let sprigTeleportLimit = 10
let sprigsPerClick = 1
let additionalSpc = 1
let sprigs = 200
let multiplier = 1
let nextMult = 0.1

//upgrade levels 
let soilLv = 0
let fertLv = 0
let scytheLv = 0
let multLv = 0

let soilCost = 10
let fertCost = 2
let scytheCost = 100
let multCost = 200
  
setLegend(
  [ bg, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ player, bitmap`
4444........4444
444..........444
44............44
4..............4
................
................
................
................
................
................
................
................
4..............4
44............44
444..........444
4444........4444` ],
  [ sprig, bitmap`
................
................
......DDDD......
......D..D......
DD.DD.D..D.DD.DD
D.DD.DDDDDD.DD.D
.D..DDDDDDDD..D.
..DDDDDDDDDDDD..
....DDDDDDDD....
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......` ],
  [ calmSoil, bitmap`
CCCC......CCCC..
CCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.C22C222C2CC222C
.C2CC2C2C2CC2C2C
.C2CC222C2CC2C2C
.C22C2C2C22C2C2C
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCC.......CCCCC` ],
  [ fert, bitmap`
DDDD......DDDD..
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
D222D222D222D222
D2DDD2DDD2D2DD2D
D222D222D222DD2D
D2DDD2DDD22DDD2D
D2DDD2DDD2D2DD2D
D2DDD222D2D2DD2D
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDD.......DDDDD` ],
  [ scythe, bitmap`
................
.....1111111....
..111111111111L.
1111111111111LL.
1111111111111LL.
.1111......LLL..
..........LLL...
.........LLL....
........LLL.....
......LLLL......
.....LLLL.......
....LLL.........
...LLL..........
..LLL...........
.LLL............
LLL.............` ],
  [ mult, bitmap`
................
.222........222.
.2222......2222.
.22222....22222.
..22222..22222..
...2222222222...
....22222222....
.....222222.....
.....222222.....
....22222222....
...2222222222...
..22222..22222..
.22222....22222.
.2222......2222.
.222........222.
................` ]
)
setSolids([])

setBackground(bg)

let level = 0
const levels = [
  map`
.........
.........
....p....
....s....
.........
.........
.........
.........`, // main clicking screen
  map`
........p
.........
.........
........c
.........
........f
.........
.........`, // shop 1 (upgrades 1+2)
  map`
........p
........y
.........
.........
.........
.........
........m
.........`, // shop 2 (upgrades 3+4)
  map`
.........
.........
.........
.........
.........
.........
.........
.........`, // upgrade info screen (1+2)
  map`
.........
.........
.........
.........
.........
.........
.........
.........`, // upgrade info screen 2 (3+4)
  map`
.........
.........
.........
.........
.........
.........
.........
.........` // win screen after 2 million sprigs
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

addText("press i for shop", {

    x: 0,
    y: 14,
    color: color`2`
  
})

addText("press j for info", {
      x: 0,
      y: 15,
      color: color`2`})

addText("sprigs: " + sprigs, {
    x: 0,
    y: 0,
    color: color`2`
  })

// movement
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

//functional keys

onInput("i", () => {
  //open shop if main screen, else back to main screen
  level = level === 0 ? 1 : 
          level === 1 ? 2 :
          level === 2 ? 0 : 0
  setMap(levels[level])
  clearText()
  if (level === 0) {
    addText("press i for shop", {
      x: 0,
      y: 14,
      color: color`2`})
    addText("press j for info", {
      x: 0,
      y: 15,
      color: color`2`})
  }
  if (level === 1) {

    addText("press l on upgrade\nicon to buy", {
      x: 0,
      y: 14,
      color: color`2`})
    
    // add text for upgrades
    addText("\"calning\" soil\nmore clicks before\nsprig moves: lv " + soilLv + "\ncost: " + soilCost, {
      x: 0,
      y: 3,
      color: color`2`
    })
    addText("fertilizer: lv " + fertLv + "\nmore sprigs per\nclick\ncost: " + fertCost, {
      x: 0,
      y: 8,
      color: color`2`
    })
  }

  if (level === 2) {

    addText("press l on upgrade\nicon to buy", {
      x: 0,
      y: 14,
      color: color`2`})

    addText("scythe: lv " + scytheLv + "\nautoclicker\nsprig will not move\ncost: " + scytheCost, {
      x: 0,
      y: 3,
      color: color`2`
    })

    addText("multiplier: lv " + multLv + "\nflat multiplier to\nsprig per click gain\ncost: " + multCost, {
      x: 0,
      y: 8,
      color: color`2`
    })
    
  }
})

onInput("l", () => {
  if ( level === 0 && 
      getFirst(player).x === getFirst(sprig).x &&
       getFirst(player).y === getFirst(sprig).y ) {

    sprigs += Math.round(sprigsPerClick * multiplier)

    clickCounter++
    
    if (clickCounter === sprigTeleportLimit) {

      getFirst(sprig).x = Math.floor(Math.random() * 9);
      getFirst(sprig).y = Math.floor(Math.random() * 8);
      clickCounter = 0
      
    }
    
  }

  // upgrade purchase checking
  if (level === 1) {

    if (getFirst(player).x === getFirst(calmSoil).x &&
       getFirst(player).y === getFirst(calmSoil).y && sprigs >= soilCost) {

      soilLv++
      sprigs -= soilCost
      soilCost *= 1.15 // 15% more expensive after each upgrade
      soilCost = Math.floor(soilCost)

      sprigTeleportLimit += 5
      
    }
    else if (getFirst(player).x === getFirst(fert).x &&
       getFirst(player).y === getFirst(fert).y && sprigs >= fertCost) {

      fertLv++
      sprigs -= fertCost
      sprigsPerClick += additionalSpc
      additionalSpc += 1
      fertCost *= 1.75 // 75% increase for balancing purposes
      fertCost = Math.ceil(fertCost)
      
      
    }
    redrawSprigs()
    
  }

  if (level === 2) {

    if (getFirst(player).x === getFirst(scythe).x &&
       getFirst(player).y === getFirst(scythe).y && sprigs >= scytheCost) {

      scytheLv++
      sprigs -= scytheCost
      scytheCost *= 1.15
      scytheCost = Math.floor(scytheCost)
      
    }

    if (getFirst(player).x === getFirst(mult).x &&
       getFirst(player).y === getFirst(mult).y && sprigs >= multCost) {

      multLv++
      sprigs -= multCost
      multiplier += nextMult
      multCost *= 1.15
      multCost = Math.floor(multCost)
      
    }
    
  }
  
})

onInput("j", () => {

  level = level <= 2 ? 3 :
          level === 3 ? 4 : 0
  setMap(levels[level])

  if (level === 0) {
    clearText()
    addText("press i for shop", {
    x: 0,
    y: 14,
    color: color`2`})

    addText("press j for info", {
      x: 0,
      y: 15,
      color: color`2`})
  
  }

  if (level === 3) {

    clearText()
  
     addText("\"calning\" soil\nadds 5 clicks before\nsprig moves", {
      x: 0,
      y: 3,
      color: color`2`
    })

    addText(`fertilizer\nwill add '${additionalSpc}' to\nsprigs per click`, {
      x: 0,
      y: 8,
      color: color`2`
    })
  
  }

  if (level === 4) {
    
    clearText()
    addText("the scythe\nclicks for you\nevery second", {
      x: 0,
      y: 3,
      color: color`2`
    })

    addText(`multiplier\ncurrently multiplies\nyour sprigs by ${Math.round(multiplier * 10) / 10}\nand will increase by\n${nextMult} next level`, {
      x: 0,
      y: 8,
      color: color`2`
    })
  
  }
})

// go back to main screen
onInput("k", () => {

  level = 0
  setMap(levels[level])
  clearText()
  addText("press i for shop", {
      x: 0,
      y: 14,
      color: color`2`})
    addText("press j for info", {
      x: 0,
      y: 15,
      color: color`2`})
  
  
})

async function redrawSprigs() {

  addText("                    ", { // hacky ahh solution (overwrite text with nothing so that the old text is not shown)
    x: 0,
    y: 0,
    color: color`2`
  })

  addText("sprigs: " + sprigs, {
    x: 0,
    y: 0,
    color: color`2`
  })
  
}

async function scytheClicker() {
  sprigs += 0.5 * multiplier * scytheLv * sprigsPerClick
  sprigs = Math.ceil(sprigs)
}

setInterval( () => { scytheClicker() }, 1000)
setInterval( () => { redrawSprigs() }, 200)

afterInput(() => {
  addText("sprigs: " + sprigs, {
    x: 0,
    y: 0,
    color: color`2`
  })
  if (level === 1) {
    addText("\"calning\" soil\nmore clicks before\nsprig moves\ncost: " + soilCost, {
      x: 0,
      y: 3,
      color: color`2`
    })
    addText("fertilizer: lv " + fertLv + "\nmore sprigs per\nclick\ncost: " + fertCost, {
      x: 0,
      y: 8,
      color: color`2`
    })
  }
  if (level === 2) {
    addText("scythe: lv " + scytheLv + "\nautoclicker\nsprig will not move\ncost: " + scytheCost, {
      x: 0,
      y: 3,
      color: color`2`
    })

    addText("multiplier: lv " + multLv + "\nflat multiplier to\nsprig per click gain\ncost: " + multCost, {
      x: 0,
      y: 8,
      color: color`2`
    })
  }
})