// MADE BY ITZHEX

const player = "p"

const ground = "g"

const sky = "s"

const moblin = "r"

const lynel = "l"

var gameRunning = false;

var titlescreen = true;

var score = 0;

var isReady = false;

var isJumping = false;

var animCount = 0;

var speed = 1;

var multiplier = 1;

var canJump = true;

var inAir = false;

setLegend(
  [ player, bitmap`
....00000.......
...04442400.....
..0442240220....
.0440440224000..
0440200224000...
04402404000.....
.040220020200...
..00220220220...
...042022240....
...00404440.....
...04000000.....
..044022040.....
..044022020.....
..000000040.....
...02222000.....
..0000000000....` ],
  [ ground, bitmap`
CCC09009CC0090CC
CCCC009CCCCC0009
CCCC009CCCCC00C0
9CCC009CCCCCC0C0
9CCC09CCCCCCC0C0
CCCC09CCCCCCCCC0
CCCC09CCCCC99009
CCCC09CCCC9CCC09
CCC009CCCC9CCCC0
CCC009CCCC9CCCC0
9C00090CC09CCC00
9C099900C09CCC09
C09CCCCC009CCC09
C09CCCC0009CCC09
C9CCCCCC000CC000
09C9CC9090099009`],
  [ sky, bitmap`
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
7777777777777777`],
  [ moblin, bitmap`
.....99999......
...939999.......
..9329993333....
.332299993333...
.9999999933333..
33929999333333..
993299939993333.
999939939993332.
.99999333999223.
.99999339999333.
..9222229992222.
..9933333993333.
....333333333399
....3333339993..
..999333999999..
...9999..99999..`],
  [ lynel, bitmap`
.....33339333...
....3233993.....
....92939933....
....999393......
....3999933.....
.222239999.....3
22222399993...33
.222239993333333
....33333333333.
....33333333333.
...33333333333..
..3333333333333.
..33333333333333
...333222222333.
....3........3..
................`],
)

setSolids([player, ground])

let level = 1
const levels = [
  map`
..........
..........
..........
..........
..........
..........
.p.......r
gggggggggg`,
  map`
..........
..........
..........
..........
..........
..........
..........
gggggggggg`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

setBackground(sky)

function hitCheck(somePlayer) {
  if (somePlayer.y >= 7) {
    somePlayer.remove();
  } else if (speed == 1) {
    if (somePlayer.y == getFirst(moblin).y && somePlayer.x == getFirst(moblin).x) {
      somePlayer.remove();
    }
  } else if (speed == 3) {
    if (somePlayer.y == getFirst(lynel).y && somePlayer.x == getFirst(lynel).x) {
      somePlayer.remove();
    }
  }
}

onInput("k", () => {
  if (gameRunning && getFirst(player).y == 6 && canJump) {
    canJump = false;
    inAir = true;
    setTimeout(function(){ inAir = false }, 500)
    setTimeout(function(){ canJump = true }, 500)
  } else if (titlescreen) {
    titlescreen = false;
    setMap(levels[0]);
    score = 0;
    isReady = false;
    isJumping = false;
    animCount = 0;
    speed = 1;
    multiplier = 1;
    gameRunning = true;
  }
})

afterInput(() => {
  
})

onInput("j", () => {
  if (gameRunning != true && titlescreen != true) {
    setMap(levels[1]);
    titlescreen = true;
  }
})

afterInput(() => {
  
})

function moblinUpdate(somemoblin) {
  if (somemoblin != null) {
    if (gameRunning == true) {
      somemoblin.x -= 1;
      if (somemoblin.x == 0 && isReady) {
        isReady = false;
        score += 1;
        somemoblin.x += 9;
        if(Math.floor(Math.random() * 10) <= 2) {
          somemoblin.type = lynel;
          speed = 3;
        } else {
          somemoblin.type = moblin;
          speed = 1;
        }
      } else if (somemoblin.x == 0) {
        isReady = true
      }
    } else {
      somemoblin.remove();
    }
  }
}

var gameLoop = setInterval(() => {
  if (titlescreen) {
    clearText();
    score=0;
    addText("The Legend", {
      x: 5,
      y: 6,
      color: color`0`
    });
    addText("of Zelda:", {
      x: 6,
      y: 7,
      color: color`0`
    });
    addText("Link's Escape", {
      x: 4,
      y: 8,
      color: color`D`
    });
    addText("Press K to begin!", {
      x: 2,
      y: 12,
      color: color`3`
    });
  } else if (getAll(player).length < 1) {
    gameRunning = false;
    if (getFirst(player) != null) {
      getFirst(player).remove();
    }
    clearText();
    addText("Game Over!\nScore: " + score, {
      x: 5,
      y: 6,
      color: color`3`
    });
    addText("Press J to\nrestart!", {
      x: 5,
      y: 10,
      color: color`0`
    });
  } else if (gameRunning) {
    const p = getFirst(player);
    hitCheck(p);
    clearText();
    if (inAir) {
      p.y = 5;
    } else {
      p.y = 6;
    }
    addText("Score: "+score, {
      x: 0,
      y: 0,
      color: color`0`
    });
    if (speed == 1) {
    moblinUpdate(getFirst(moblin));
  } else if (speed == 3) {
    moblinUpdate(getFirst(lynel));
  }
  if ((animCount % 2) == 0 && gameRunning) {
    setLegend([ player, bitmap`
....00000.......
...04442400.....
..0442240220....
.0440440224000..
0440200224000...
04402404000.....
.040220020200...
..00220220220...
...042022240....
...00404440.....
...04000000.....
..044022040.....
..044022020.....
..000000040.....
...02222000.....
..0000000000....` ],
              [ moblin, bitmap`
.....99999......
...939999.......
..9329993333....
.332299993333...
.9999999933333..
33929999333333..
993299939993333.
999939939993332.
.99999333999223.
.99999339999333.
..9222229992222.
..9933333993333.
....333333333399
....3333339993..
..999333999999..
...9999..99999..`],
              [ lynel, bitmap`
.....33339333...
....3233993.....
....92939933....
....999393......
....3999933.....
.222239999.....3
22222399993...33
.222239993333333
....33333333333.
....33333333333.
...33333333333..
..3333333333333.
..33333333333333
...333222222333.
....3........3..
................`],
              [ ground, bitmap`
CCC09009CC0090CC
CCCC009CCCCC0009
CCCC009CCCCC00C0
9CCC009CCCCCC0C0
9CCC09CCCCCCC0C0
CCCC09CCCCCCCCC0
CCCC09CCCCC99009
CCCC09CCCC9CCC09
CCC009CCCC9CCCC0
CCC009CCCC9CCCC0
9C00090CC09CCC00
9C099900C09CCC09
C09CCCCC009CCC09
C09CCCC0009CCC09
C9CCCCCC000CC000
09C9CC9090099009`],)
  } else if (gameRunning) {
    setLegend([ player, bitmap`
................
....000000......
..0044422400.0..
.0444224402200..
.0444044022400..
.044020022400...
..0402404000....
..040220020200..
...00220220220..
....042022240...
....00000000....
...00440220.....
..020440220.....
..0200440000....
..02200022220...
.000000000000...` ],
              [ moblin, bitmap`
................
.....99999......
...939999.......
..9329993333....
.332299993333...
.9999999933333..
33929999333333..
993299933993333.
999939939993332.
.99999399993223.
.99999999933333.
222229999222233.
..9939993333333.
....333999333399
....3999999333..
.....299999.....`],
              [ lynel, bitmap`
................
....33339333....
...3233993......
..992939933.....
...999393.......
...3999933......
.222239999......
22222399993....3
.222239993333333
....333333333333
....33333333333.
....3333333333..
....3333333333..
.....33333333...
.....33332333...
......333.333...`],
              [ ground, bitmap`
CC0090CCCCCC009C
CCCC0009CCCC009C
CCCC00C0CCC09009
CCCCC0C09CCC009C
CCCCC0C09CCC09CC
CCCCCCC0CCCC09CC
CCC99009CCCC09CC
CC9CCC09CCCC09CC
CC9CCCC0CCC009CC
CC9CCCC0CCC009CC
C09CCC009C00090C
C09CCC099C099900
009CCC09C09CCCCC
009CCC09C09CCCC0
000CC000C9CCCCCC
9009900909C9CC90`],)
  }
  animCount++
  multiplier *= 1.5;
  }
}, (500/(speed*multiplier)));
