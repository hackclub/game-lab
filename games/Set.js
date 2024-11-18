/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Set
@author: 
@tags: []
@addedOn: 2024-07-23
*/

// Naming: rgp - cdq - 123 - ehs

const bitmaps = {
  'pce1': `
................
................
................
................
................
.......HH.......
......H..H......
......H..H......
......H..H......
......H..H......
......H..H......
.......HH.......
................
................
................
................`,
  'pce2': `
................
................
................
................
........88......
......HH..8.....
.....H..H.8.....
.....H..H.8.....
.....H..H.8.....
.....H..H.8.....
.....H..H8......
......HH........
................
................
................
................`,
  'pce3': `
................
................
................
................
.........HH.....
.......88..H....
.....HH..8.H....
....H..H.8.H....
....H..H.8.H....
....H..H.8.H....
....H..H.8H.....
....H..H8.......
.....HH.........
................
................
................`,
  'pch1': `
................
................
................
................
................
.......HH.......
......H..H......
......HHHH......
......H..H......
......HHHH......
......H..H......
.......HH.......
................
................
................
................`,
  'pch2': `
................
................
................
................
........88......
......HH..8.....
.....H..H88.....
.....HHHH.8.....
.....H..H88.....
.....HHHH.8.....
.....H..H8......
......HH........
................
................
................
................`,
  'pch3': `
................
................
................
................
.........HH.....
.......88..H....
.....HH..8HH....
....H..H88.H....
....HHHH.8HH....
....H..H88.H....
....HHHH.8H.....
....H..H8.......
.....HH.........
................
................
................`,
  'pcs1': `
................
................
................
................
................
.......HH.......
......HHHH......
......HHHH......
......HHHH......
......HHHH......
......HHHH......
.......HH.......
................
................
................
................`,
  'pcs2': `
................
................
................
................
........88......
......HH888.....
.....HHHH88.....
.....HHHH88.....
.....HHHH88.....
.....HHHH88.....
.....HHHH8......
......HH........
................
................
................
................`,
  'pcs3': `
................
................
................
................
.........HH.....
.......88HHH....
.....HH888HH....
....HHHH88HH....
....HHHH88HH....
....HHHH88HH....
....HHHH88H.....
....HHHH8.......
.....HH.........
................
................
................`,
  
  'pde1': `
................
................
................
................
................
......HH........
......H.H.......
......H..H......
......H..H......
......H..H......
.......H.H......
........HH......
................
................
................
................`,
  'pde2': `
................
................
................
................
.......88.......
.....HH8.8......
.....H.H..8.....
.....H..H.8.....
.....H..H.8.....
.....H..H.8.....
......H.H88.....
.......HH.......
................
................
................
................`,
  'pde3': `
................
................
................
................
........HH......
......88H.H.....
....HH8.8..H....
....H.H..8.H....
....H..H.8.H....
....H..H.8.H....
....H..H.8HH....
.....H.H88......
......HH........
................
................
................`,
  'pdh1': `
................
................
................
................
................
......HH........
......H.H.......
......HHHH......
......H..H......
......HHHH......
.......H.H......
........HH......
................
................
................
................`,
  'pdh2': `
................
................
................
................
.......88.......
.....HH8.8......
.....H.H888.....
.....HHHH.8.....
.....H..H88.....
.....HHHH.8.....
......H.H88.....
.......HH.......
................
................
................
................`,
  'pdh3': `
................
................
................
................
........HH......
......88H.H.....
....HH8.8HHH....
....H.H888.H....
....HHHH.8HH....
....H..H88.H....
....HHHH.8HH....
.....H.H88......
......HH........
................
................
................`,
  'pds1': `
................
................
................
................
................
......HH........
......HHH.......
......HHHH......
......HHHH......
......HHHH......
.......HHH......
........HH......
................
................
................
................`,
  'pds2': `
................
................
................
................
.......88.......
.....HH888......
.....HHH888.....
.....HHHH88.....
.....HHHH88.....
.....HHHH88.....
......HHH88.....
.......HH.......
................
................
................
................`,
  'pds3': `
................
................
................
................
........HH......
......88HHH.....
....HH888HHH....
....HHH888HH....
....HHHH88HH....
....HHHH88HH....
....HHHH88HH....
.....HHH88......
......HH........
................
................
................`,
  
  'pqe1': `
................
................
................
................
................
......HHH.......
......H..H......
.......H.H......
......H..H......
......H.H.......
......H..H......
.......HHH......
................
................
................
................`,
  'pqe2': `
................
................
................
................
.......888......
.....HHH..8.....
.....H..H.8.....
......H.H.8.....
.....H..H8......
.....H.H..8.....
.....H..H88.....
......HHH.......
................
................
................
................`,
  'pqe3': `
................
................
................
................
........HHH.....
......888..H....
....HHH..8.H....
....H..H.8.H....
.....H.H.8H.....
....H..H8..H....
....H.H..8HH....
....H..H88......
.....HHH........
................
................
................`,
  'pqh1': `
................
................
................
................
................
......HHH.......
......H..H......
.......HHH......
......H..H......
......HHH.......
......H..H......
.......HHH......
................
................
................
................`,
  'pqh2': `
................
................
................
................
.......888......
.....HHH..8.....
.....H..H88.....
......HHH.8.....
.....H..H8......
.....HHH..8.....
.....H..H88.....
......HHH.......
................
................
................
................`,
  'pqh3': `
................
................
................
................
........HHH.....
......888..H....
....HHH..8HH....
....H..H88.H....
.....HHH.8H.....
....H..H8..H....
....HHH..8HH....
....H..H88......
.....HHH........
................
................
................`,
  'pqs1': `
................
................
................
................
................
......HHH.......
......HHHH......
.......HHH......
......HHHH......
......HHH.......
......HHHH......
.......HHH......
................
................
................
................`,
  'pqs2': `
................
................
................
................
.......888......
.....HHH888.....
.....HHHH88.....
......HHH88.....
.....HHHH8......
.....HHH888.....
.....HHHH88.....
......HHH.......
................
................
................
................`,
  'pqs3': `
................
................
................
................
........HHH.....
......888HHH....
....HHH888HH....
....HHHH88HH....
.....HHH88H.....
....HHHH8HHH....
....HHH888HH....
....HHHH88......
.....HHH........
................
................
................`,
};

for (let i = Object.keys(bitmaps).length-1; i >= 0; --i) {
  for (let [c, f, b] of [['r', '3', '9'], ['g', 'D', '4']]) {
    let oldKey = Object.keys(bitmaps)[i];
    bitmaps[c+oldKey.substring(1)] = bitmaps[oldKey].replaceAll('H', f).replaceAll('8', b);
  }
}

function getIndex(bitmapName) {
  return (
    "prg".indexOf(bitmapName[0]) * 27 +
    "cdq".indexOf(bitmapName[1]) * 9 +
    "ehs".indexOf(bitmapName[2]) * 3 +
    "123".indexOf(bitmapName[3])
  )
}

function toPlayerChar(bitmapName) {
  return String.fromCharCode("ÿ".charCodeAt(0) - getIndex(bitmapName));
}

function getBitmapNameFromIndex(index) {
  let key = ["prg", "cdq", "ehs", "123"];
  let res = "";
  for (let i = 0; i < 4; i++) {
    res = key[key.length-1-i][index%3] + res;
    index = index/3 | 0;
  }
  return res;
}

function toBitmapName(playerChar) {
  let index = "ÿ".charCodeAt(0) - playerChar.charCodeAt(0);
  return getBitmapNameFromIndex(index);
}

function getComplement(bitmapName1, bitmapName2) {
  let index1 = getIndex(bitmapName1), index2 = getIndex(bitmapName2);
  let index3 = 0;
  for (let i = 0; i < 4; i++) {
    index3 += 3**i * (index1%3 == index2%3 ? index1%3 : 3 - index1%3 - index2%3);
    index1 = index1/3 | 0;
    index2 = index2/3 | 0;
  }
  return getBitmapNameFromIndex(index3);
}

function shuffleList(list) {
  for (let i = list.length-1; i >= 0; --i) {
    let j = Math.random(i+1) * (i+1) | 0;
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

console.log(getComplement("pqe3", "gdh3"));



// GAME

class SetGame {
  constructor() {
    this.deck = Object.keys(bitmaps);
    console.assert(this.deck.length == 81);
    shuffleList(this.deck);
    this.board = [];
    while (this.board.length < 12) {
      this.board.push(this.deck.pop());
    }
    while (!this.isPossible()) {
      for (let l = 0; l < 3; l++) {
        this.board.push(this.deck.pop());
      } 
    }
    console.log(JSON.stringify(this.board));
    console.log(this.isPossible());
  }

  isPossible() {
    let seen = {};
    for (let j = 0; j < this.board.length; j++) {
      if (this.board[j] == null) continue;
      for (let i = 0; i < j; i++) {
        if (this.board[i] == null) continue;
        if (seen[getComplement(this.board[i], this.board[j])]) {
          return true;
        }
      }
      seen[this.board[j]] = true;
    }
    return false;
  }

  tryMove(i, j, k) {
    // returns whether move was successful
    if (getComplement(this.board[i], this.board[j]) != this.board[k]) {
      console.log(`NO SET ${this.board[i]} ${this.board[j]} ${this.board[k]}`);
      return false;
    }
    console.log(`SET FOUND ${this.board[i]} ${this.board[j]} ${this.board[k]}`);
    this.board[i] = this.board[j] = this.board[k] = null;
    if (this.isPossible() || this.deck.length < 3) {
      let l = 0;
      for (let r = 0; r < this.board.length; r++) {
        if (this.board[r] != null) {
          this.board[l++] = this.board[r];
        }
      }
      this.board.splice(l);
      return true;
    }
    for (let l of [i, j, k]) {
      this.board[l] = this.deck.pop();
    }
    while (!this.isPossible() && this.deck.length >= 3) {
      for (let l = 0; l < 3; l++) {
        this.board.push(this.deck.pop());
      } 
    }
    return true;
  }

  gameOver() {
    return !this.isPossible() && this.deck.length < 3;
  }

  shuffleBoard() {
    shuffleList(this.board);
  }

  getLevel() {
    let res = [];
    for (let i = 0; i < this.board.length; i += 3) {
      let cur = "";
      for (let j = 0; j < 3; j++) {
        cur += toPlayerChar(this.board[i+j]);
      }
      res.push(cur);
    }
    return res.join('\n');
  }

}


// END GAME



// console.log(JSON.stringify(bitmaps['rqe1']));

// console.log(getIndex('rqe2'));
// console.log(toPlayerChar('rqe2'));
// console.log(toBitmapName(toPlayerChar('rqe2')));

let cardLegendArgs = [];
for (let bitmapName in bitmaps) {
  cardLegendArgs.push([toPlayerChar(bitmapName), bitmap([bitmaps[bitmapName]])]);
}

const player = 'p';
const selected = '!';

setLegend(
  [ player, bitmap`
0000000000000000
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
0000000000000000` ],
  ...cardLegendArgs,
  [ selected, bitmap`
................
.0000......0000.
.0............0.
.0............0.
.0............0.
................
................
................
................
................
................
.0............0.
.0............0.
.0............0.
.0000......0000.
................` ],
)

setSolids([]);

// setMap(levels[level])

let sg;
let t0;
let playerR, playerC, prevPlayerR, prevPlayerC;
let selectedRCs;
let gameOver;

function init() {
  clearText();
  sg = new SetGame('bob');
  t0 = new Date();
  playerR = playerC = prevPlayerR = prevPlayerC = 0;
  selectedRCs = [];
  gameOver = false;
  draw();
}
init();

function draw() {
  setMap(sg.getLevel());
  if (playerR < 0 || playerR >= Math.floor(sg.board.length/3) || playerC < 0 || playerC >= 3) {
    if (prevPlayerR < 0 || prevPlayerR >= Math.floor(sg.board.length/3) || prevPlayerC < 0 || prevPlayerC >= 3) {
      prevPlayerR = prevPlayerC = 0;
    }
    playerR = prevPlayerR;
    playerC = prevPlayerC;
  }
  prevPlayerR = playerR;
  prevPlayerC = playerC;
  addSprite(playerC, playerR, player);
  drawSelections();
}

draw();

function drawSelections() {
  for (const sprite of getAll(selected)) {
    sprite.remove();
  }
  getFirst(player).y = playerR;
  getFirst(player).x = playerC;
  // addSprite(playerR, playerC, player);
  for (let i = 0; i < selectedRCs.length; i++) {
    addSprite(selectedRCs[i]%3, selectedRCs[i]/3|0, selected);
  }
}

function toggleSelection() {
  if (gameOver) return;
  let r = playerR, c = playerC;
  for (let i = 0; i < selectedRCs.length; i++) {
    if (r*3+c == selectedRCs[i]) {
      selectedRCs.splice(i, 1);
      draw();
      return;
    }
  }
  selectedRCs.push(r*3+c);
  if (selectedRCs.length == 3) {
    let ok = sg.tryMove(...selectedRCs);
    selectedRCs = [];
    if (!ok) {
      playFailure();
      draw();
      return;
    }
    
    if (sg.gameOver()) {
      gameOver = true;
      selectedRCs = [];
      draw();
      getFirst(player).remove();
      let tf = new Date();
      let dt = (tf-t0)/1000|0;
      
      addText(`GAME\nCOMPLETE\n\n${dt/60|0}m ${dt%60}s\n\nPress L\nto play\nagain`, {
        x: 6,
        y: 1,
        color: color`0`,
      });

      playFinish();

      return;
    }

    playSuccess();
  }
  draw();
}

setPushables({
  [ player ]: []
})

onInput('s', () => {
  if (gameOver) return;
  playerR++;
  draw();
})
onInput('w', () => {
  if (gameOver) return;
  playerR--;
  draw();
})
onInput('d', () => {
  if (gameOver) return;
  playerC++;
  draw();
})
onInput('a', () => {
  if (gameOver) return;
  playerC--;
  draw();
})
onInput('j', toggleSelection)

onInput('l', () => {
  init();
})

afterInput(() => {
  
})



function playSuccess() {
  const melody = tune`
  50: E4~50,
  50: G4~50,
  50: C5~50,
  1450`
  
  // Play it:
  playTune(melody, 1);
}

function playFailure() {
  const melody = tune`
75: E4~75,
75: C4~75,
75: G5~75,
75: G5~75,
75: G5~75,
2025`
  
  // Play it:
  playTune(melody, 1);
}

function playFinish() {
  const melody = tune`
50: C4~50,
50: G4~50,
50: C5~50,
50: E5~50,
50: C5~50,
50: G4~50,
50: C4~50,
1250`
  
  // Play it:
  playTune(melody, 1);
}

playSuccess();