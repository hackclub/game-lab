
/* 
@title: The_Story_of_Grass
@description: "The Story of Grass" is a puzzle game that takes the player on a transformative journey starting as a lawnmower and progressing through unique roles: a cow, a car, a milk carton, and finally a shopping cart. Each level presents a unique challenge: mow grass without touching flowers, eat grass and flowers as a cow, transport milk to market, navigate a storage room, and finally purchase with a shopping cart.
@author: Sarah Wang / Sarinara
@tags: ['puzzle']
@addedOn: 2023-05-28
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/


//https://sprig.hackclub.com/share/QBNhznQnTRQhILdABGw5

const unmowed = "u"
const mowed = "m"
const road = "r"
const endroad = "e"
const lawnmower = "l"
const tulips = "t"
const cow = "c"
const dirt = "d"
const roads = "s"
const farmer = "f"
const store = "z"
const worker = "w"
const boxes = "b"
const carton = "a"
const fcart = "q"
const cart = "h"
const lanes = "p"
const brocoli = "i"
const carrot = "g"
const t = "j"
const h = "k"
const a = "n"
const n = "o"
const k = "7"
const s = "v"
const four = "1"
const p = "2"
const l = "3"
const y = "4"
const i = "5"
const g = "6"
const heart = "8"
let unmowedCounter = 0
let lawnTile = 0
let totalGrass = 53
let stepCounter = 0
let fakeTotalGrass = 54
setLegend(
  [ lawnmower, bitmap`
..........1.....
.......0.1.1...1
.....3331...1.1.
..00.03330...1..
.L00033333001...
..L130003331....
..0300L003330...
.0330LLL03330...
033300L0033300..
.03330003330L0..
..03333333.000..
...0333000......
....0330L0......
.....00000......
................
................`],
  [ cow, bitmap`
................
...0....0.......
..060..060......
..06000060......
..01112220......
...102020.......
..01122220......
..08080820......
...0888801000...
...00000112210..
...022211222220.
...022222222210.
...011122222210.
...01000020020..
...00....00.00..
................`],
  [ unmowed, bitmap`
D4444D4D44D44D44
44D44444444444D4
4D44444D444444D4
4D444D44D44D4444
4444D444D4D44D44
4D44D44444D444D4
44D444D44444D4D4
44D44D44D44D4444
D4444D444D4D44D4
444D44444D444D44
44D444D444444D4D
44D4444D44D44444
4444D44D444D444D
4D444D44444D44D4
D4444D444D4444D4
D4D4444D4444D444`],
  [ mowed, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ road, bitmap`
4444444444444444
4D4D4D4D4D4D4D4D
DDDDDDDDDDDDDDDD
6666666666666666
66666666666F6666
666666666666F666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
DDDDDDDDDDDDDDDD
4D4D4D4D4D4D4D4D`],
  [ endroad, bitmap`
4444444444444444
4D4D4D4D4D4D4D44
DDDDDDDDDDDDDDDD
666666666666666D
66666666666F666D
666666666666F66D
666666666666666D
666666666666666D
666666666666666D
666666666666666D
666666666666666D
666666666666666D
666666666666666D
666666666666666D
DDDDDDDDDDDDDDDD
4D4D4D4D4D4D4D44`],
  [ dirt, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCLC
CCLCCCCCCLCCCCCC
CCCCCCLCCCCCCLCC
CCCCCCLCCCCLCCCC
CCCLCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCLLCCCCCCCCC
CCCCCCCCCCLLCCCC
CLLCCCCCCCCCCCCC
CCCCCCCCCCCCCCLC
CCCCCCCCCCCCCCCC
CCCCCLCCLCCCCCCC
CCCCCCCCLCCCCCLC
CCLCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ tulips, bitmap`
4444444444444444
4444444444444444
44D4444444444444
44D4444444444444
4444488844444444
4444888884444444
444488888444DD44
4444488844444444
4444448444444444
44DDD4D44D4D4444
444DDDD4DDDDD444
4444DDDDDDDD4444
44444DDDD4D44444
444444DD44444444
44444444444444D4
4444444444444444`],
  [ farmer, bitmap`
................
................
................
................
................
.........0000...
........0LLLL0..
........0LL1123.
.03333333333333.
..0333333333333.
..03333333333336
..03333333333333
.63300033330003.
...0LLL0..0LLL0.
....000....000..
................`],
  [ store, bitmap`
................
..FFFFFFFFFFFF..
FF66666666666FFF
6FFFFFFFFFFFFFF6
6FH747H747H747F6
6F49H949H949H9F6
6F343434343434F6
6FFFFFFFFFFFFFF6
6666666666666666
6666666666666666
6FF66F666F66FF66
6F66F6F6F6F6F6F6
6FF6F6F6F6F6F6F6
6F66F6F6F6F6F6F6
6F666F666F66FF66
6666666666666666`],
  [ roads, bitmap`
6666666666666666
F6F6F6F6F6F6F6F6
6666666666666666
F6F6F6F6F6F6F6F6
6666666666666666
F6F6F6F6F6F6F6F6
6666666666666666
F6F6F6F6F6F6F6F6
6666666666666666
F6F6F6F6F6F6F6F6
6666666666666666
F6F6F6F6F6F6F6F6
6666666666666666
F6F6F6F6F6F6F6F6
6666666666666666
F6F6F6F6F6F6F6F6`],
  [ worker, bitmap`
................
................
................
......33........
.....3333.......
..33333333......
....C6060C......
....C6666C......
....C0000C......
....036630......
...06333360.....
...06333360.....
...06333360.....
....033330......
.....3333.......
.....3333.......`],
  [ boxes, bitmap`
................
................
......000.......
...000FFF000....
..0FFFFFLLF000..
.00FFFLLFFFFF0..
.0600LLFFFFF00..
.0666000FFF0F0..
.0666666000FF0..
.066666660FFF0..
.006666660FFF0..
...0066660FF0...
.....00660F0....
.......0000.....
................
................`],
  [ carton, bitmap`
................
...LLLLLLLL.....
...L777777L.....
...LLLLL7LLL....
..L22222L222L...
.L222222L2LL2L..
.LLLLLLLLL22LL..
.L222222L2LL7L..
.LLLLLLLLL777L..
.L777777L7777L..
.L777777L7777L..
.L777777L7LLLL..
.LLLLLLLLL222L..
.L222222L2222L..
.LLLLLLLLLLLL...
................`],
  [ fcart, bitmap`
................
..36666666663...
..3.........3...
...3LLLLLLL3....
...L2222222L....
...L2LLLLL2L....
....L2L2L2L.....
....L2L2L2L.....
....L2L2L2L.....
....L2L2L2L.....
.....L2L2L......
.....32223......
......LLL.......
................
................
................`],
  [ cart, bitmap`
................
..36666666663...
..3.........3...
...3LLLLLLL3....
...L2222222L....
...L2LLLLL2L....
....L2L2L2L.....
....L2L2L2L.....
....L2L2L2L.....
....L2L2L2L.....
.....L2L2L......
.....32223......
......LLL.......
................
................
................`],
  [ brocoli, bitmap`
.......D........
....4.444.......
..4D44D444......
.D44D44D44D.....
.444D44D4444....
..4D444D4D44D...
.D4D4444D444....
.D44DD444D4.....
..44DDD4D44D....
...4.DDDD44.....
.....DDD.D......
.....DDD........
.....DDD........
.....DDD........
......DD........
................`],
  [ carrot, bitmap`
................
.....D4..D......
...DDDDDDDDD....
.....99DD9......
.....9999L......
.....99999......
.....LL999......
.....99999......
......999.......
.....99999......
.....99LLL......
......999.......
......999.......
.......9........
................
................`],
  [ lanes, bitmap`
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFF2F6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6
6FFFFFFFFFFFFFF6`],
  [ t, bitmap`
................
................
.88888888888888.
.88888888888888.
.......88.......
.......88.......
.......88.......
.......88.......
.......88.......
.......88.......
.......88.......
.......88.......
.......88.......
.......88.......
................
................`],
  [ h, bitmap`
................
.9999.....9999..
.9999.....9999..
.9999.....9999..
.9999.....9999..
.9999.....9999..
.9999.....9999..
.9999999999999..
.9999.....9999..
.9999.....9999..
.9999.....9999..
.9999.....9999..
.9999.....9999..
.9999.....9999..
.9999.....9999..
................`],
  [ a, bitmap`
................
................
......666.......
.....6666.......
....66...6......
....6.....6.....
....6.....6.....
....6.....6.....
....6666666.....
....6.....6.....
....6.....6.....
....6.....6.....
....6.....6.....
...66.....66....
................
................`],
  [ n, bitmap`
................
................
.HH........HH...
.HHH.......HH...
.HH.H......HH...
.HH.HH.....HH...
.HH..H.....HH...
.HH...HH...HH...
.HH....H...HH...
.HH....HH..HH...
.HH.....H..HH...
.HH......H.HH...
.HH.......HHH...
.HH.......HHH...
.HH........HH...
................`],
  [ k, bitmap`
................
.DD.....DD......
.DD....D........
.DD...D.........
.DD..D..........
.DD.D...........
.DDD............
.DDD............
.DD.D...........
.DD..D..........
.DD...D.........
.DD....D........
.DD.....D.......
.DD.....DD......
.DD.......D.....
................`],
  [ s, bitmap`
................
................
.......777......
......77.777....
.....77....7....
.....77....7....
......777.......
.........77.....
...........7....
....7......7....
....7......7....
....7......7....
....777..777....
......7777......
................
................`],
  [ four, bitmap`
................
................
......5.........
.....55.........
.....5..........
....5..5........
...55..5........
..55...5........
..5555555555....
.......5........
.......5........
.......5........
.......5........
.......5........
................
................`],
  [ p, bitmap`
................
................
....HHHHHH......
....HH...HH.....
....HH....H.....
....HH....H.....
....HH....H.....
....HH..HHH.....
....HHHHH.......
....HH..........
....HH..........
....HH..........
....HH..........
....HH..........
................
................`],
  [ l, bitmap`
................
................
......88........
......88........
......88........
......88........
......88........
......88........
......88........
......88........
......88........
......88........
......88........
......88........
......8888888...
................`],
  [ y, bitmap`
................
................
...........5....
...55.....55....
....5.....5.....
.....5...5......
.....55.5.......
......55........
.......5........
.......5........
.......5........
.......5........
.......5........
.......5........
................
................`],
  [ i, bitmap`
................
................
................
..33333333333...
..33333333333...
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......
..33333333333...
..33333333333...
................
................`],
  [ g, bitmap`
................
................
................
.....55555......
....55....55....
...555.....5....
...5.......5....
...5.......5....
..55............
..5....55555....
..55......55....
...55.....55....
....555..55.....
......5555......
................
................`],
  [ heart, bitmap`
................
................
................
....000.000.....
...033303330....
..03333331230...
.0333333333330..
.0333333333330..
.0333333333330..
..03333333330...
...033333330....
....0333330.....
.....03330......
......030.......
.......0........
................`]
)

setSolids([farmer, roads, boxes, lanes, carton, brocoli, carrot, cart])

setPushables({
  [cart] : [ carrot, brocoli]
})

setBackground(mowed)




onInput("s", () => {
  if(level==0) {
    if(tilesWith(unmowed).length >= 1) {
      getFirst(lawnmower).y += 1
    }
    else {
      getFirst(cow).y += 1
    }
  }
  else if(level==1) {
    getFirst(farmer).y += 1
  }
  else if (level==2) {
    getFirst(carton).y += 1
  }
  else if (level==3) {
    getFirst(cart).y += 1
  }
  else {
    
  }
  stepCounter += 1
})
  
onInput("w", () => {
  if(level==0) {
    if(tilesWith(unmowed).length >= 1) {
      getFirst(lawnmower).y -= 1
    }
    else {
      getFirst(cow).y -= 1
    }
  }
  else if(level==1) {
    getFirst(farmer).y -= 1
  }
  else if (level==2) {
    getFirst(carton).y -= 1
  }
  else if (level==3) {
    getFirst(cart).y -= 1
  }
  else {
    
  }
  stepCounter += 1
})
onInput("a", () => {
  if(level==0) {
    if(tilesWith(unmowed).length >= 1) {
      getFirst(lawnmower).x -= 1
    }
    else {
      getFirst(cow).x -= 1
    }
  }
  else if(level==1) {
    getFirst(farmer).x -= 1
  }
  else if (level==2) {
    getFirst(carton).x -= 1
  }
  else if (level==3) {
    getFirst(cart).x -= 1
  }
  else {
    
  }
  stepCounter += 1
})
onInput("d", () => {
  if(level==0) {
    if(tilesWith(unmowed).length >= 1) {
      getFirst(lawnmower).x += 1
    }
    else {
      getFirst(cow).x += 1
    }
  }
  else if(level==1) {
    getFirst(farmer).x += 1
  }
  else if (level==2) {
    getFirst(carton).x += 1
  }
  else if (level==3) {
    getFirst(cart).x += 1
  }
  else {
    
  }
  stepCounter += 1
})




let level = 0
const levels = [ map`
lttmmuuuuumtmuu
mmmmtmmmtmmtuuu
uuuummmmmmmmuuu
mtummtmmuummmmm
mmmmmmmuuuuumtt
tmmuummmuuummmm
mmuuuummuummmmu
mmmuummtmmmmmuu
ummmmmuummtmuuu
uumtmuuuumtmmmm`,
  map `
f.s.........sss
..s.........s..
s.s.sssssss.s.s
..........s.s.s
sssss..ss.s....
.......ss..ssss
..ssss.ss......
....s..sssss.ss
...s....s....s.
.sss.s.sss....z`,
  map`
a.b.b.bbb..b
b.bb.b..bb.b
....b..b.b.b
bb...b.b..bb
.b.b..b....b
.bb.b....b..
b.b.bbb.bb.q`,
  map `
h.p.g...p..i..p..g..p
..p.i...p..g..p..i..p
..p..p..p..p..p..p..p
..p..p..p..p..p..p..p
..p..p..p..p..p..pg.p
..p..p..p..p..p..p..p
..p..p..p..p..p..p..p
..p..p..p..p..p..p..p
..p..p..p..p..p..p.gp
..p..p..p..p..p..p..p
..p..p..p..p..p..p...
.g...p..i..p..g..p.pw`,
                map `
............
...jkno7v...
.8...1....8.
..23n45o6...
w..........c`
]

setMap(levels[level])
afterInput(() => {
  addText("score:" + unmowedCounter.toString() + " steps:" + stepCounter.toString()), {
      x:1,
      y:1,
      color: color`3`
    }


  
  if (level == 0) {
    if(unmowedCounter >= totalGrass) {
      const cowPlacement = tilesWith(cow)
      // console.log(cowPlacement)
      addSprite(cowPlacement[0][0]._x, cowPlacement[0][0]._y, mowed)
      addSprite(cowPlacement[0][0]._x, cowPlacement[0][0]._y, cow)
      unmowedCounter += 1
      const grassEating = tilesWith(cow, mowed).length //cow dirt lvl 2
      if (grassEating > 0) {
        const tile = tilesWith(cow, mowed)
        // console.log(tile)
        clearTile(tile[0][0]._x, tile[0][0]._y)
        addSprite(tile[0][0]._x, tile[0][0]._y, cow)
        addSprite(tile[0][0]._x, tile[0][0]._y, dirt)
        if (tilesWith(dirt).length == 150) {
          level += 1
          setMap(levels[level])
          playTune(nextLevel)
        }
      }
    }
    const flowerEating = tilesWith(cow, tulips).length // cow flower lvl 2
    if (flowerEating > 0) {
      unmowedCounter = 0
      stepCounter = 0
      getFirst(cow).x = 0
      getFirst(cow).y = 0
      setMap(levels[level])
      playTune(death)
    }
    const flowerMowing = tilesWith(lawnmower, tulips).length // cow flower lvl 1
    if (flowerMowing > 0) {
      unmowedCounter = 0
      stepCounter = 0
      getFirst(lawnmower).x = 0
      getFirst(lawnmower).y = 0
      setMap(levels[level])
      playTune(death)
    }
     else {
      const mowingGrass = tilesWith(lawnmower, unmowed).length
      if (mowingGrass > 0) {
        const tile = tilesWith(lawnmower, unmowed)
        // console.log(tile[0][0]._x)
        clearTile(tile[0][0]._x, tile[0][0]._y)
        addSprite(tile[0][0]._x, tile[0][0]._y, mowed)
        addSprite(tile[0][0]._x, tile[0][0]._y, lawnmower)
        unmowedCounter += 1
        playTune(mowing)
      }
    }
    if (unmowedCounter == totalGrass) {
          lawnTile = tilesWith(lawnmower)
          clearTile(lawnTile[0][0]._x, lawnTile[0][0]._y)
          addSprite(lawnTile[0][0]._x, lawnTile[0][0]._y, cow)
          // fakeTotalGrass = 55
    }
  }








  
  //LEVEL 1!!!!!!
  const farmerArrives = tilesWith(farmer, store).length
  if (farmerArrives > 0) {
    level += 1
    setMap(levels[level])
    playTune(nextLevel)
  }
  //LEVEL 2!!!
  const milkDelivery = tilesWith(carton, fcart).length
  if (milkDelivery > 0) {
    level += 1
    setMap(levels[level])
    playTune(nextLevel)
  }
  const checkout = tilesWith(cart, worker).length
  if (checkout > 0) {
    level += 1
    setMap(levels[level])
    
    playTune(nextLevel)
  }
  
})

const melody = tune`
150.7537688442211,
150.7537688442211: A5^150.7537688442211 + C5/150.7537688442211,
150.7537688442211,
150.7537688442211: D4~150.7537688442211 + F4-150.7537688442211 + A4/150.7537688442211 + A5^150.7537688442211,
150.7537688442211: G4-150.7537688442211,
150.7537688442211: F4~150.7537688442211 + A4-150.7537688442211 + D5/150.7537688442211 + A5^150.7537688442211,
150.7537688442211: D5-150.7537688442211 + A5^150.7537688442211,
150.7537688442211: A4~150.7537688442211 + A5^150.7537688442211,
150.7537688442211: D5-150.7537688442211,
150.7537688442211: D5~150.7537688442211 + A4-150.7537688442211 + A5^150.7537688442211,
150.7537688442211: F4-150.7537688442211,
150.7537688442211: D4-150.7537688442211 + A4/150.7537688442211 + A5^150.7537688442211,
150.7537688442211: D5~150.7537688442211 + F4-150.7537688442211,
150.7537688442211: A4-150.7537688442211 + D5/150.7537688442211 + A5^150.7537688442211,
150.7537688442211: A4~150.7537688442211 + D5-150.7537688442211 + A5^150.7537688442211,
150.7537688442211: A4/150.7537688442211 + A5^150.7537688442211,
150.7537688442211: F4~150.7537688442211 + D5-150.7537688442211,
150.7537688442211: A4-150.7537688442211 + D5/150.7537688442211 + A5^150.7537688442211,
150.7537688442211: D4~150.7537688442211 + F4-150.7537688442211,
150.7537688442211: D4-150.7537688442211 + A4/150.7537688442211 + A5^150.7537688442211,
150.7537688442211: F4~150.7537688442211 + A4-150.7537688442211,
150.7537688442211: D5/150.7537688442211 + A5^150.7537688442211,
150.7537688442211: A4~150.7537688442211 + D5-150.7537688442211 + A5^150.7537688442211,
150.7537688442211: A4/150.7537688442211 + A5^150.7537688442211,
150.7537688442211: D5~150.7537688442211,
150.7537688442211: A4-150.7537688442211 + D5/150.7537688442211 + A5^150.7537688442211,
150.7537688442211: D5~150.7537688442211,
150.7537688442211: F4-150.7537688442211 + A4/150.7537688442211 + A5^150.7537688442211,
150.7537688442211: A4~150.7537688442211,
150.7537688442211: D5/150.7537688442211 + A5^150.7537688442211,
150.7537688442211: F4~150.7537688442211 + A5^150.7537688442211,
150.7537688442211: D4~150.7537688442211 + A4/150.7537688442211 + A5^150.7537688442211`

const death = tune`
66.07929515418502,
66.07929515418502: D5-66.07929515418502 + F5~66.07929515418502,
66.07929515418502: E5^66.07929515418502,
66.07929515418502: C5-66.07929515418502 + A4~66.07929515418502,
66.07929515418502: D5^66.07929515418502,
66.07929515418502: B4-66.07929515418502 + D5~66.07929515418502,
66.07929515418502: C5^66.07929515418502,
66.07929515418502: A4-66.07929515418502 + F4~66.07929515418502,
66.07929515418502: G4^66.07929515418502,
66.07929515418502: G4-66.07929515418502 + B4~66.07929515418502,
66.07929515418502: A4^66.07929515418502,
66.07929515418502: E4-66.07929515418502 + C4~66.07929515418502,
66.07929515418502: D4^66.07929515418502,
66.07929515418502: C4-66.07929515418502 + E4~66.07929515418502,
66.07929515418502: D4^66.07929515418502,
1123.3480176211453`

const nextLevel = tune`
162.16216216216216,
162.16216216216216: F4-162.16216216216216 + A4~162.16216216216216,
162.16216216216216: D4/162.16216216216216,
162.16216216216216: A4-162.16216216216216 + C5~162.16216216216216,
162.16216216216216: F4/162.16216216216216,
162.16216216216216: C5-162.16216216216216 + E5~162.16216216216216,
162.16216216216216: A4/162.16216216216216,
162.16216216216216,
162.16216216216216: F5-162.16216216216216 + A5~162.16216216216216,
162.16216216216216: F5-162.16216216216216 + A5~162.16216216216216,
162.16216216216216: D5/162.16216216216216,
162.16216216216216,
162.16216216216216: F4-162.16216216216216 + A4-162.16216216216216 + C5-162.16216216216216 + F5-162.16216216216216 + A5~162.16216216216216,
162.16216216216216,
162.16216216216216: D4/162.16216216216216,
2756.7567567567567`

const mowing = tune`
107.52688172043011: E4/107.52688172043011 + C4^107.52688172043011 + A4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: C4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4/107.52688172043011 + F4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4/107.52688172043011 + F4/107.52688172043011 + C4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4^107.52688172043011 + C4/107.52688172043011 + F4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4^107.52688172043011 + C4/107.52688172043011 + F4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4^107.52688172043011 + F4/107.52688172043011 + C4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4^107.52688172043011 + F4/107.52688172043011 + C4^107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4/107.52688172043011 + C4^107.52688172043011 + A4^107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4/107.52688172043011 + C4^107.52688172043011 + A4^107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4/107.52688172043011 + C4^107.52688172043011 + A4^107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4^107.52688172043011 + F4^107.52688172043011 + C4^107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4/107.52688172043011 + F4^107.52688172043011 + C4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4/107.52688172043011 + F4^107.52688172043011 + C4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4/107.52688172043011 + F4^107.52688172043011 + C4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4/107.52688172043011 + F4^107.52688172043011 + C4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4^107.52688172043011 + C4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4^107.52688172043011 + C4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4/107.52688172043011 + C4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4/107.52688172043011 + C4/107.52688172043011 + A4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4/107.52688172043011 + C4/107.52688172043011 + A4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4/107.52688172043011 + C4/107.52688172043011 + A4^107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4/107.52688172043011 + C4/107.52688172043011 + A4^107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4/107.52688172043011 + C4/107.52688172043011 + A4^107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4/107.52688172043011 + C4/107.52688172043011 + A4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4/107.52688172043011 + C4/107.52688172043011 + A4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: F4/107.52688172043011 + C4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: C4/107.52688172043011 + A4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: C4/107.52688172043011 + A4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: C4/107.52688172043011 + A4/107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4^107.52688172043011 + C5^107.52688172043011,
107.52688172043011: A4^107.52688172043011 + E4/107.52688172043011 + C5^107.52688172043011`


const playback = playTune(melody, 1000)








