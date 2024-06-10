{}
/*
@title: 1930
@tags: ['strategy']
@addedOn: 2023-01-16
@author: tejasag (@tej on slack)
Keys: 
- W to jump
- A to move left
- D to move right
Objective: 
- Kill all the Java aliens (squares) and send the Blobs (circles) to the 
  next level.
- Moving or jumping happens for all Java(s) and Blob(s) at the same time.
- There are spikes in your way which can kill both Java(s) and Blob(s)
  when they come in contact.
- The portal to the next level only unlocks when all the Java(s) have been
  killed
*/

const blob = "a";
const java = "b";
const spike = "c";
const grass1 = "d";
const grass2 = "e";
const gateC = "f";
const gateO1 = "g";
const gateO2 = "h";
const gateO3 = "i";
const land = "j";
const sky = "k";
const burst1 = "l";
const burst2 = "m";
const burst3 = "n";
const blobLeft = "o";
const star = "z";

setLegend(
  [
    blob,
    bitmap`
................
................
................
................
...0000000000...
..011111111110..
.0L111111111110.
0LL1111021102110
0LL1111001100110
0LL1111001100110
0LL1111111111110
0LLL111111111110
0LLL111111111110
0LLLLL1111111110
0LLLLLLLLLL11110
.00000000000000.`,
  ],
  [
    blobLeft,
    bitmap`
................
................
................
................
...0000000000...
..011111111110..
.0L111111111110.
0LL1201120111110
0LL1001100111110
0LL1001100111110
0LL1111111111110
0LLL111111111110
0LLL111111111110
0LLLLL1111111110
0LLLLLLLLLL11110
.00000000000000.`,
  ],
  [
    java,
    bitmap`
................
.00000000000000.
0LL1111111111110
0L11111111111110
0L11001111001110
0L10220110220110
0000220000220000
0L10220110220110
0L11001111001110
0L11111111111110
0L11111111111110
0L11111111111110
0LL1111111111110
0LLLL11111111110
0LLLLLL111111110
.00000000000000.`,
  ],
  [
    spike,
    bitmap`
................
................
................
................
................
........0.......
........0.......
.......00D......
.......0LD......
.......DL0......
......000L0.....
......0D000.....
......LD0LL.....
......0D00D.....
....DL0000DDD...
....L0L00000L...`,
  ],
  [
    grass1,
    bitmap`
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
......0..0.0....
..00..0..000.0..
...000.....000..
....00.....0....
0000000000000000`,
  ],
  [
    grass2,
    bitmap`
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
....0...........
...00.0.0...0...
...0000.000.0...
...0......000...
...00.....00....
000000000000000.`,
  ],
  [
    gateC,
    bitmap`
......0000......
.....00LL00.....
.....0LLLL0.....
....00000000....
...0000000000...
...0300000030...
...0030000300...
...0003003000...
...0003003000...
...0000330000...
...0000330000...
...0003003000...
...0003003000...
...0030000300...
...0300000030...
...0000000000...`,
  ],
  [
    gateO1,
    bitmap`
......0000......
.....00LL00.....
.....0LLLL0.....
....00000000....
...00088HHH00...
...00H8000H80...
...00H0000HH0...
...00H0HH00H0...
...00H0H8H0H0...
...0HH0H800H0...
...0H80H00880...
...0H80HHH800...
...0H80000000...
...00H00000H0...
...00HHHHHH80...
...0000000000...`,
  ],
  [
    gateO2,
    bitmap`
......0000......
.....00LL00.....
.....0LLLL0.....
....00000000....
...000HHH8800...
...00HHH00HH0...
...00H0000HH0...
...0080HH0080...
...0080HH8080...
...0H80HH0080...
...0H80H00HH0...
...0HH0888H00...
...0HH0000000...
...00H00000H0...
...00HH888HH0...
...0000000000...`,
  ],
  [
    gateO3,
    bitmap`
......0000......
.....00LL00.....
.....0LLLL0.....
....00000000....
...0008HHH800...
...0088H00H80...
...00H0000H80...
...00H08800H0...
...00H08HH0H0...
...0HH08H0080...
...0HH0H00H80...
...0H80HHH800...
...0H80000000...
...00800000H0...
...0088HHHHH0...
...0000000000...`,
  ],
  [
    star,
    bitmap`
................
................
................
................
................
................
.......2........
......222.......
.......2........
................
................
................
................
................
................
................`,
  ],
  [
    land,
    bitmap`
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
0000000000000000`,
  ],
  [
    burst1,
    bitmap`
................
................
................
....9999999.....
...996666699....
..99662226699...
..99622662669...
..96226662269...
..96266222269...
..96262226269...
..96262226269...
..96222222269...
..96622222669...
..99962222699...
....9962269.....
.....962269.....`,
  ],
  [
    burst2,
    bitmap`
................
................
................
................
................
................
................
......992.......
.....9922999....
...9962226299...
..992622262699..
..962222222699..
..9662222266699.
..9662222269699.
..9662622699699.
.99662622666669.`,
  ],
  [
    burst3,
    bitmap`
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
.....9..........
.....99.....9...
..9999999999999.
..9962222269699.
.99662622699699.
9996626226666699`,
  ],
  [
    sky,
    bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`,
  ]
);

setBackground(sky);

setSolids([land, java]);

let level = 0;
const levels = [
  map`
.z....z...z....
...z....z..zz..
.......z.......
dadddbdcdddddfd
jjjjjjjjjjjjjjj`,
  map`
............
..z......z.z
z..z.z.z.z..
dbedddddcccd
jjjjjjjjjjjj
............
....z....z.z
.z..z.z.....
eaeceedccedf
jjjjjjjjjjjj`,
  map`
................z
.z.z.....z..z....
.z...z...zz.....z
.................
dbdccddaddccdbddf
jjjjjjjjjjjjjjjjj`,
  map`
................
..z......z.z....
z..z.z.z.z......
deeddddbdddcccdd
jjjjjjjjjjjjjjjj
................
....z....z.z....
.z..z.z.........
dadddccdadccddfd
jjjjjjjjjjjjjjjj`,
  map`
..................z......
..z...z.z.........z....z.
..............z........z.
.........................
eebeaeeccebeaebeccebeaeef
jjjjjjjjjjjjjjjjjjjjjjjjj`,
];

let play;
let javas;
let blobs;
let door_status = false;
let jumps = 2;
let success = false;

const bye_java = async (jav) => {
  javas--;
  if (javas === 0) {
    door_status = true;
    let door = getFirst("f");
    door.type = "g";
  }

  if (jav) jav.type = "l";
};

const checkDeath = () => {
  let blobs = getAll(blob);
  let javas = getAll(java);

  blobs.forEach((x) => {
    let block = getTile(x.x, x.y);
    if (
      block.find(
        (y) => y.type === gateO1 || y.type === gateO2 || y.type === gateO3
      ) &&
      door_status
    ) {
      if (blobs > 0) {
        x.remove();
      } else return levelComplete();
    }
    if (block.find((y) => y.type === spike)) end(x);
  });

  javas.forEach((x) => {
    let block = getTile(x.x, x.y);
    if (block.find((y) => y.type === spike)) bye_java(x);
  });
};

onInput("d", () => {
  if (!play) return;
  getAll(blob).forEach((x) => {
    x.x += 1;
    checkDeath();
  });
  getAll(java).forEach((x) => {
    x.x += 1;
    checkDeath();
  });
});

onInput("a", () => {
  if (!play) return;
  getAll(blob).forEach((x) => {
    x.x -= 1;
    checkDeath();
  });
  getAll(java).forEach((x) => {
    x.x -= 1;
    checkDeath();
  });
});

onInput("w", () => {
  if (!play) return;

  if (jumps > 0) {
    jumps--;
    getAll(blob).forEach((x) => {
      x && (x.y -= 2);
      checkDeath();
    });
    getAll(java).forEach((x) => {
      x && (x.y -= 2);
      checkDeath();
    });
  }
});

onInput("i", () => {
  if (!play) {
    // level--;
    // play = true;
    start();
  }
  if (success) {
    level++;
    play = false;
    success = false;
    start();
  }
});

const levelComplete = () => {
  addText(`Level ${level + 1} complete!\nPress "i"`, {
    x: 1,
    y: 2,
    color: color`2`,
  });
  play = true;
  success = true;
};

const tick = () => {
  let doors = ["g", "h", "i"];
  let bursts = ["m", "n"];
  let i = 0;
  let ref = setInterval(() => {
    let g1 = getAll(grass1);
    let g2 = getAll(grass2);
    g1.forEach(x => x.type = grass2);
    g2.forEach(x => x.type = grass1);

    let door = getFirst("g") || getFirst("h") || getFirst("i");
    // console.log(i);
    if (door && door_status) door.type = doors[i % 3];
    // console.log(door);

    let jv = getFirst("l") || getFirst("m") || getFirst("n");
    if (jv) {
      if (jv.type === "l") jv.type = "m";
      if (jv.type === "m") jv.type = "n";
      else jv.remove();
    }

    i++;

    if (!play) {
      clearInterval(ref);
    }
    
    // Gravity
    let b = getFirst(blob);
    if (!b) return;
    let below = getTile(b.x, b.y + 1);
    if (below.filter((x) => x.type === land).length > 0) return (jumps = 2);

    getAll(blob).forEach((x) => x && (x.y += 1) && checkDeath());
    getAll(java).forEach((x) => x && (x.y += 1) && checkDeath());
  }, 250);
};

const end = (b) => {
  addText('GAME OVER\n Press "i"', {
    x: 5,
    y: 2,
    color: color`2`,
  });
  play = false;
  if (b) b.type = "l";
};

const start = () => {
  play = true;
  level = level % 5;
  javas = levels[level].split("").filter((x) => x === java).length;
  blobs = levels[level].split("").filter((x) => x === blob).length;
  setMap(levels[level]);
  clearText();
  tick();
};

start();
