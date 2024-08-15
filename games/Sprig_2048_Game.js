/*
@title: 2048 - Better graphics and music
@tags: ['classic', 'updated', 'retro']
@addedOn: 2024-08-12
@author: linkai101; updates: Shahm
*/

const empty = "-"
const two = "a";
const four = "b";
const eight = "c";
const sixteen = "d";
const thirtytwo = "e";
const sixtyfour = "f";
const onetwentyeight = "g";
const twofiftysix = "h";
const fivetwelve = "i";
const tentwentyfour = "j";
const twentyfortyeight = "k";

const tileOrder = ["a","b","c","d","e","f","g","h","i","j","k"];

setLegend(
  [ empty, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1111111111111111`],
  [ two, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
1222221111222221
1222211211122221
1222212221122221
1222222221122221
1222222211122221
1222222111222221
1222221122222221
1222211111122221
1222222222222221
1222222222222221
1222222222222221
1111111111111111`],
  [ four, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
12222222LLL22221
1222222LLLL22221
122222LL2LL22221
12222LL22LL22221
12222LLLLLL22221
122222222LL22221
122222222LL22221
122222222LL22221
1222222222222221
1222222222222221
1222222222222221
1111111111111111`],
  [ eight, bitmap`
1111111111111111
1333333333333331
1333333333333331
1333333333333331
133333LLLL333331
13333LL33LL33331
13333LL33LL33331
133333LLLL333331
13333LL33LL33331
13333LL33LL33331
13333LL33LL33331
133333LLLL333331
1333333333333331
1333333333333331
1333333333333331
1111111111111111`],
  [ sixteen, bitmap`
1111111111111111
1333333333333331
1333333333333331
1333333333333331
1333313331133331
1333113313313331
1333313313333331
1333313313333331
1333313311133331
1333313313313331
1333313313313331
1333313313313331
1333111331133331
1333333333333331
1333333333333331
1111111111111111`],
  [ thirtytwo, bitmap`
1111111111111111
1333333333333331
1333333333333331
1333333333333331
1333333333333331
1333223332233331
1332332323323331
1333332333323331
1333223333233331
1333332332333331
1332332323333331
1333223322223331
1333333333333331
1333333333333331
1333333333333331
1111111111111111`],
  [ sixtyfour, bitmap`
1111111111111111
1333333333333331
1333333333333331
1333333333333331
1333333333333331
1333366363363331
1333633363363331
1333633363363331
1333666336663331
1333633633363331
1333633633363331
1333366333363331
1333333333333331
1333333333333331
1333333333333331
1111111111111111`],
  [ onetwentyeight, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666666666666661
1666666666666661
1666666666666661
16L666LL666LL661
1LL66L66L6L66L61
16L66666L6L66L61
16L6666L666LL661
16L666L666L66L61
16L66L6666L66L61
1LLL6LLLL66LL661
1666666666666661
1666666666666661
1111111111111111`],
  [ twofiftysix, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666666666666661
1666666666666661
1666666666666661
16LL666LLL66LL61
1L66L6L6666L6661
1666L6L6666L6661
166L66LLL66LLL61
16L666666L6L66L1
1L6666666L6L66L1
1LLLL6LLL666LL61
1666666666666661
1666666666666661
1111111111111111`],
  [ fivetwelve, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666666666666661
1666666666666661
1666666666666661
1655566566655661
1656665566566561
1655566566665661
1666566566656661
1666566566566661
1655665556555561
1666666666666661
1666666666666661
1666666666666661
1111111111111111`],
  [ tentwentyfour, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666666666666661
1633663666663631
1363636366663631
1363636366663631
1663636363366331
1663663636636631
1663666666366631
1663666663666631
1333336636666631
1666666633336661
1666666666666661
1666666666666661
1111111111111111`],
  [ twentyfortyeight, bitmap`
1111111111111111
1666666666666661
1666666666666661
1666666666666661
1666666666666661
1686666868668861
1868666868686681
1668666868686681
1686686888668861
1866868668686681
1866868668686681
1888686668668861
1666666666666661
1666666666666661
1666666666666661
1111111111111111`]
);

//setSolids([]);

let level = 0;
const levels = [
  map`
----
----
----
----`,
];

let isGameOver = false;
prepBoard();

// setPushables({
  // [ player ]: [],
// });

let boardChanged = false;
onInput("w", () => {
  if (isGameOver) return;

  for (let x=0; x<=3; x++) {
    let nextYToFill = 0;
    for (let y=1; y<=3; y++) {
      switch (getTile(x,y)[0].type) {
        case empty:
          break;
        case (getTile(x,nextYToFill)[0].type):
          clearTile(x,nextYToFill);
          addSprite(x,nextYToFill,tileOrder[tileOrder.indexOf(getTile(x,y)[0].type)+1]);
          clearTile(x,y);
          addSprite(x,y,empty);
          boardChanged = true;
          break;
        default:
          if (!(nextYToFill===0 && getTile(x,nextYToFill)[0].type===empty))
            nextYToFill++;
          let currentType = getTile(x,y)[0].type;
          clearTile(x,y);
          addSprite(x,y,empty);
          clearTile(x,nextYToFill);
          addSprite(x,nextYToFill,currentType);
          if (y !== nextYToFill) boardChanged = true;
          break;
      }
    }
  }
});

onInput("s", () => {
  if (isGameOver) return;

  for (let x=0; x<=3; x++) {
    let nextYToFill = 3;
    for (let y=2; y>=0; y--) {
      switch (getTile(x,y)[0].type) {
        case empty:
          break;
        case (getTile(x,nextYToFill)[0].type):
          clearTile(x,nextYToFill);
          addSprite(x,nextYToFill,tileOrder[tileOrder.indexOf(getTile(x,y)[0].type)+1]);
          clearTile(x,y);
          addSprite(x,y,empty);
          boardChanged = true;
          break;
        default:
          if (!(nextYToFill===3 && getTile(x,nextYToFill)[0].type===empty))
            nextYToFill--;
          let currentType = getTile(x,y)[0].type;
          clearTile(x,y);
          addSprite(x,y,empty);
          clearTile(x,nextYToFill);
          addSprite(x,nextYToFill,currentType)
          if (y !== nextYToFill) boardChanged = true;
          break;
      }
    }
  }
});

onInput("d", () => {
  if (isGameOver) return;

  for (let y=0; y<=3; y++) {
    let nextXToFill = 3;
    for (let x=2; x>=0; x--) {
      switch (getTile(x,y)[0].type) {
        case empty:
          break;
        case (getTile(nextXToFill,y)[0].type):
          clearTile(nextXToFill,y);
          addSprite(nextXToFill,y,tileOrder[tileOrder.indexOf(getTile(x,y)[0].type)+1]);
          clearTile(x,y);
          addSprite(x,y,empty);
          boardChanged = true;
          break;
        default:
          if (!(nextXToFill===3 && getTile(nextXToFill,y)[0].type===empty))
            nextXToFill--;
          let currentType = getTile(x,y)[0].type;
          clearTile(x,y);
          addSprite(x,y,empty);
          clearTile(nextXToFill,y);
          addSprite(nextXToFill,y,currentType)
          if (x !== nextXToFill) boardChanged = true;
          break;
      }
    }
  }
});

onInput("a", () => {
  if (isGameOver) return;

  for (let y=0; y<=3; y++) {
    let nextXToFill = 0;
    for (let x=1; x<=3; x++) {
      switch (getTile(x,y)[0].type) {
        case empty:
          break;
        case (getTile(nextXToFill,y)[0].type):
          clearTile(nextXToFill,y);
          addSprite(nextXToFill,y,tileOrder[tileOrder.indexOf(getTile(x,y)[0].type)+1]);
          clearTile(x,y);
          addSprite(x,y,empty);
          boardChanged = true;
          break;
        default:
          if (!(nextXToFill===0 && getTile(nextXToFill,y)[0].type===empty))
            nextXToFill++;
          let currentType = getTile(x,y)[0].type;
          clearTile(x,y);
          addSprite(x,y,empty);
          clearTile(nextXToFill,y);
          addSprite(nextXToFill,y,currentType)
          if (x !== nextXToFill) boardChanged = true;
          break;
      }
    }
  }
});

// RESTART
onInput("j", () => {
  isGameOver = true;
  prepBoard();
});


afterInput(() => {
  if (checkLoss()) {
    isGameOver = true;
    addText("You lost :(", { y: 4, color: color`0` });
    addText("Press j", { y: 8, color: color`0` });
    addText("to restart", { y: 9, color: color`0` });
    return;
  }

  if (getAll(twentyfortyeight).length >= 1) {
    isGameOver = true;
    addText("You win!", { y: 4, color: color`0` });
    addText("Press j", { y: 8, color: color`0` });
    addText("to restart", { y: 9, color: color`0` });
    return;
  }

  if (!isGameOver) {
    if (boardChanged) generateTile();
    boardChanged = false;
  }
});

function prepBoard() {
  isGameOver = false;
  clearText("");
  setMap(levels[level]);
  generateTile();
  generateTile();
}

function generateTile() {
  if (getAll(empty).length===0) return;

  let blankTiles = tilesWith(empty);
  let random = Math.floor(Math.random() * (blankTiles.length-1+1));
  clearTile(blankTiles[random][0].x,blankTiles[random][0].y);
  addSprite(blankTiles[random][0].x,blankTiles[random][0].y,"a");
}

function checkLoss() {
  if (getAll(empty).length>0) return false;

  for (let x=0; x<=3; x++) {
    for (let y=1; y<=3; y++) {
      if (getTile(x,y)[0].type === getTile(x,y-1)[0].type) return false;
    }
  }

  for (let y=0; y<=3; y++) {
    for (let x=1; x<=3; x++) {
      if (getTile(x,y)[0].type === getTile(x-1,y)[0].type) return false;
    }
  }

  return true;
}


let tracks = [
tune`
24000`,
tune`
0,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: B4^250,
250: A4^250,
500: C#5^500,
250: A4^250,
250: B4^250,
250: E5^250,
250: D#5^250,
250: E5^250,
250: F#5^250,
250: D#5^250,
250: B4^250,
250: F#5^250,
250: B4^250,
250: F#5^250,
250: B4^250,
250: F#5^250,
250: B4^250,
250: F#5^250,
250: A#4^250,
250: F#5^250,
250: A#4^250,
500: G5^500,
250: F#5^250,
250: D5^250,
250: F#5^250,
250: D5^250,
250: E5^250,
250: F#5^250,
500: E5^500,
500: D5^500,
500: C#5^500,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: B4^250,
250: A4^250,
500: C#5^500,
250: A4^250,
250: B4^250,
250: E5^250,
250: D#5^250,
250: E5^250,
250: F#5^250,
250: D#5^250,
250: B4^250,
250: F#5^250,
250: B4^250,
250: F#5^250,
250: B4^250,
250: F#5^250,
250: B4^250,
250: F#5^250,
250: A#4^250,
250: F#5^250,
250: A#4^250,
500: G5^500,
250: F#5^250,
250: D5^250,
250: F#5^250,
250: D5^250,
250: E5^250,
250: F#5^250,
500: E5^500,
500: D5^500,
500: C#5^500,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: F#5^250,
250: C#5^250,
250: B4^250,
250: A4^250,
500: C#5^500,
250: A4^250,
250: B4^250,
250: E5^250,
250: D#5^250,
250: E5^250,
250: F#5^250,
250: D#5^250,
250: B4^250,
250: F#5^250,
250: B4^250,
250: F#5^250,
250: B4^250,
250: F#5^250,
250: B4^250,
250: F#5^250,
250: A#4^250,
250: F#5^250,
250: A#4^250,
500: G5^500,
250: F#5^250,
250: D5^250,
250: F#5^250,
250: D5^250,
250: E5^250,
250: F#5^250,
500: E5^500,
500: D5^500,
500: C#5^500,
250: F#5^250,
250: A#4^250,
250: F#5^250,
250: A#4^250,
500: G5^500,
250: F#5^250,
250: D5^250,
250: F#5^250,
250: D5^250,
250: E5^250,
250: F#5^250,
500: C#5^500,
500: F#5^500,
500: C#5^500,
750: D5^750,
250: A4^250,
250: B4^250,
250: C#5^250,
500: D5^500,
500: C#5^500,
500: D5^500,
750: A4^750,
250: B4^250,
250: A4^250,
250: G4^250,
500: F#4^500,
500: F#5^500,
500: E5^500,
750: D5^750,
250: A4^250,
250: B4^250,
250: C#5^250,
500: D5^500,
500: C#5^500,
500: D5^500,
750: F#5^750,
250: G5^250,
250: F#5^250,
250: E5^250,
500: D5^500,
500: E5^500,
500: C#5^500,
750: D5^750,
250: A4^250,
250: B4^250,
250: C#5^250,
500: D5^500,
500: C#5^500,
500: D5^500,
750: A4^750,
250: B4^250,
250: A4^250,
250: G4^250,
500: F#4^500,
500: F#5^500,
500: E5^500,
750: D5^750,
250: A4^250,
250: B4^250,
250: C#5^250,
500: D5^500,
500: C#5^500,
500: D5^500,
250: F#5^250,
250: D5^250,
250: F#5^250,
250: D5^250,
250: E5^250,
250: F#5^250,
500: E5^500,
500: D5^500,
500: C#5^500,
750: A4^250,
750: A5^750,
1500: E5^1500,
750: D5^750,
750: A5^750,
1500: A4^1500,
750: A4^750,
750: D5^750,
1250: A5^1250,
250: B5^250,
750: A5^750,
750: E5^750,
1500: D5^1500,
750: A4^250,
750: A5^750,
1500: E5^1500,
750: D5^750,
750: A5^750,
1500: A4^1500,
750: A4^750,
750: D5^750,
1250: A5^1250,
250: B5^250,
750: A5^750,
750: E5^750,
2500: D5^1500,
750: A4^750,
500: A5^500,
1250: F#5^250,
500: E5^500,
250: D5^250,
500: C#5^500,
1250: D5^250,
750: E5^750,
93.75: B5^125,
218.75: C#6^250,
250: C6^250,
250: B5^250,
3500: A5^1500,
750: B4^750,
500: A5^500,
1250: F#5^250,
781.25: E5^750,
1718.75: D5^250,
750: C#5^750,
1750: E5^750,
500: E5^500,
250: D5^250,
500: C#5^500,
1250: D5^250,
750: A4^750,
500: A5^500,
1250: F#5^250,
500: E5^500,
250: D5^250,
500: C#5^500,
1250: D5^250,
750: E5^750,
93.75: B5^125,
218.75: C#6^250,
250: C6^250,
250: B5^250,
3500: A5^1500,
750: B4^750,
500: A5^500,
1250: F#5^250,
781.25: E5^750,
1718.75: D5^250,
750: C#5^750,
1750: E5^750,
500: E5^500,
250: D5^250,
500: C#5^500,
250: D5^250,
500: A4^500,
250: D4^250,
500: E4^500,
750: D4^250,
250: D4^250,
500: E4^500,
750: D4^250,
250: D4^250,
500: E4^500,
250: G4^250,
500: F#4^500,
250: E4^250,
500: D4^500,
250: A3^250,
500: A4^500,
250: D4^250,
500: E4^500,
750: D4^250,
250: D4^250,
500: E4^500,
750: D4^250,
250: D4^250,
500: E4^500,
250: G4^250,
500: F#4^500,
250: E4^250,
750: D4^500,
500: A4^500,
250: D4^250,
500: E4^500,
750: D4^250,
250: D4^250,
500: E4^500,
125: F#4^125,
125: E4^125,
143625: D4^1500,
`,
tune`
102812.5,
500: E5^500,
19562.5: F#5^250,
500: E5^500,
123375: F#5^250,
`,
tune`
0,
250: D4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: D4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: B3^250,
250: D#4^250,
250: F#4^250,
250: D#4^250,
250: F#4^250,
250: D#4^250,
250: B3^250,
250: D#4^250,
250: F#4^250,
250: D#4^250,
250: F#4^250,
250: D#4^250,
250: G3^250,
250: B3^250,
250: D4^250,
250: B3^250,
250: D4^250,
250: B3^250,
250: G3^250,
250: A#3^250,
250: D4^250,
250: A#3^250,
250: D4^250,
250: A#3^250,
250: D4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: C#4^250,
250: E4^250,
250: A4^250,
250: E4^250,
250: A4^250,
250: E4^250,
250: D4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: D4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: B3^250,
250: D#4^250,
250: F#4^250,
250: D#4^250,
250: F#4^250,
250: D#4^250,
250: B3^250,
250: D#4^250,
250: F#4^250,
250: D#4^250,
250: F#4^250,
250: D#4^250,
250: G3^250,
250: B3^250,
250: D4^250,
250: B3^250,
250: D4^250,
250: B3^250,
250: G3^250,
250: A#3^250,
250: D4^250,
250: A#3^250,
250: D4^250,
250: A#3^250,
250: D4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: C#4^250,
250: E4^250,
250: A4^250,
250: E4^250,
250: A4^250,
250: E4^250,
250: D4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: D4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: B3^250,
250: D#4^250,
250: F#4^250,
250: D#4^250,
250: F#4^250,
250: D#4^250,
250: B3^250,
250: D#4^250,
250: F#4^250,
250: D#4^250,
250: F#4^250,
250: D#4^250,
250: G3^250,
250: B3^250,
250: D4^250,
250: B3^250,
250: D4^250,
250: B3^250,
250: G3^250,
250: A#3^250,
250: D4^250,
250: A#3^250,
250: D4^250,
250: A#3^250,
250: D4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: C#4^250,
250: E4^250,
250: A4^250,
250: E4^250,
250: A4^250,
250: E4^250,
250: G3^250,
250: A#3^250,
250: D4^250,
250: A#3^250,
250: D4^250,
250: A#3^250,
250: D4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: D4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: A4^250,
250: F#4^250,
250: G4^250,
250: D4^250,
250: G4^250,
250: D4^250,
250: G4^250,
250: F#4^250,
250: E4^250,
250: C#4^250,
250: F#4^250,
250: A3^250,
250: B3^250,
250: C#4^250,
250: E4^250,
250: F#4^250,
250: C#4^250,
250: F#4^250,
250: C#4^250,
250: G3^250,
250: A3^250,
250: C#4^250,
250: A4^250,
250: D4^250,
250: G4^250,
250: F#4^250,
250: B3^250,
250: D4^250,
250: F#4^250,
250: D4^250,
250: F#4^250,
250: B3^250,
250: A3^250,
250: C#4^250,
250: E4^250,
250: C#4^250,
250: F#4^250,
250: A#4^250,
250: B4^250,
250: F#4^250,
250: E4^250,
250: B3^250,
250: D4^250,
250: G4^250,
250: A4^250,
250: F#4^250,
250: E4^250,
250: D4^250,
250: E4^250,
250: F#4^250,
250: G4^250,
250: D4^250,
250: G4^250,
250: D4^250,
250: G4^250,
250: F#4^250,
250: E4^250,
250: C#4^250,
250: F#4^250,
250: A3^250,
250: B3^250,
250: C#4^250,
250: E4^250,
250: F#4^250,
250: C#4^250,
250: F#4^250,
250: C#4^250,
250: G3^250,
250: A3^250,
250: C#4^250,
250: A4^250,
250: D4^250,
250: G4^250,
250: F#4^250,
250: B3^250,
250: D4^250,
250: F#4^250,
250: D4^250,
250: F#4^250,
250: B3^250,
250: A3^250,
250: C#4^250,
250: E4^250,
250: C#4^250,
250: F#4^250,
250: A#4^250,
250: B4^250,
250: F#4^250,
250: B4^250,
250: F#4^250,
250: B4^250,
250: F#4^250,
250: C#4^250,
250: E4^250,
250: A4^250,
250: E4^250,
250: A4^250,
250: E4^250,
250: D4^250,
0: A4^250,
250: F#4^250,
0: A4^250,
250: F#4^250,
250: D4^250,
0: A4^250,
250: F#4^250,
0: A4^250,
250: F#4^250,
250: C#4^250,
0: A4^250,
250: E4^250,
0: A4^250,
250: E4^250,
250: C#4^250,
0: A4^250,
250: E4^250,
0: A4^250,
250: E4^250,
250: B3^250,
0: F#4^250,
250: D4^250,
0: F#4^250,
250: D4^250,
250: B3^250,
0: F#4^250,
250: D4^250,
0: F#4^250,
250: D4^250,
250: A3^250,
0: E4^250,
250: C#4^250,
0: E4^250,
250: C#4^250,
250: A3^250,
0: E4^250,
250: C#4^250,
0: E4^250,
250: C#4^250,
250: G3^250,
0: D4^250,
250: B3^250,
0: D4^250,
250: B3^250,
250: G3^250,
0: D4^250,
250: B3^250,
0: D4^250,
250: B3^250,
250: F#3^250,
0: D4^250,
250: A3^250,
0: D4^250,
250: A3^250,
250: F#3^250,
0: D4^250,
250: A3^250,
0: D4^250,
250: A3^250,
250: E3^250,
0: B3^250,
250: G3^250,
0: B3^250,
250: G3^250,
250: E3^250,
0: B3^250,
250: G3^250,
0: B3^250,
250: G3^250,
250: A3^250,
0: E4^250,
250: C#4^250,
0: E4^250,
250: C#4^250,
250: A3^250,
0: E4^250,
250: C#4^250,
0: E4^250,
250: C#4^250,
250: D4^250,
0: A4^250,
250: F#4^250,
0: A4^250,
250: F#4^250,
250: D4^250,
0: A4^250,
250: F#4^250,
0: A4^250,
250: F#4^250,
250: C#4^250,
0: A4^250,
250: E4^250,
0: A4^250,
250: E4^250,
250: C#4^250,
0: A4^250,
250: E4^250,
0: A4^250,
250: E4^250,
250: B3^250,
0: F#4^250,
250: D4^250,
0: F#4^250,
250: D4^250,
250: B3^250,
0: F#4^250,
250: D4^250,
0: F#4^250,
250: D4^250,
250: A3^250,
0: E4^250,
250: C#4^250,
0: E4^250,
250: C#4^250,
250: A3^250,
0: E4^250,
250: C#4^250,
0: E4^250,
250: C#4^250,
250: G3^250,
0: D4^250,
250: B3^250,
0: D4^250,
250: B3^250,
250: G3^250,
0: D4^250,
250: B3^250,
0: D4^250,
250: B3^250,
250: F#3^250,
0: D4^250,
250: A3^250,
0: D4^250,
250: A3^250,
250: F#3^250,
0: D4^250,
250: A3^250,
0: D4^250,
250: A3^250,
250: E3^250,
0: B3^250,
250: G3^250,
0: B3^250,
250: G3^250,
250: E3^250,
0: B3^250,
250: G3^250,
0: B3^250,
250: G3^250,
250: A3^250,
0: E4^250,
250: C#4^250,
0: E4^250,
250: C#4^250,
250: A3^250,
0: E4^250,
250: C#4^250,
0: E4^250,
250: C#4^250,
250: G3^250,
0: D4^250,
250: B3^250,
0: D4^250,
1250: B3^250,
250: G3^250,
0: D4^250,
250: B3^250,
0: D4^250,
250: B3^250,
250: G3^250,
0: D4^250,
250: B3^250,
0: D4^250,
1250: B3^250,
250: G3^250,
0: D4^250,
250: B3^250,
0: D4^250,
250: B3^250,
250: F#3^250,
0: C#4^250,
250: A3^250,
0: C#4^250,
1250: A3^250,
250: F#3^250,
0: A3^250,
250: C#4^500,
312.5: A3^250,
250: F#3^250,
0: A3^250,
250: C#4^500,
1250: A3^250,
250: F#3^250,
0: A3^250,
250: C#4^500,
250: A3^250,
250: E3^250,
0: B3^250,
250: G3^250,
0: B3^250,
1250: G3^250,
250: E3^250,
0: B3^250,
250: G3^250,
0: B3^250,
250: G3^250,
250: A3^250,
0: C#4^250,
250: E4^500,
2000: C#4^250,
250: A#3^250,
0: E4^250,
250: C#4^250,
0: E4^250,
1250: C#4^250,
250: A#3^250,
0: E4^250,
250: C#4^250,
0: E4^250,
250: C#4^250,
250: B3^250,
0: F#4^250,
250: D4^250,
0: A4^250,
750: F#4^250,
250: A3^250,
0: E4^250,
250: C#4^250,
0: A4^250,
750: E4^250,
250: G3^250,
0: D4^250,
250: B3^250,
0: D4^250,
1250: B3^250,
250: G3^250,
0: D4^250,
250: B3^250,
0: D4^250,
250: B3^250,
250: G3^250,
0: D4^250,
250: B3^250,
0: D4^250,
1250: B3^250,
250: G3^250,
0: D4^250,
250: B3^250,
0: D4^250,
250: B3^250,
250: F#3^250,
0: C#4^250,
250: A3^250,
0: C#4^250,
1250: A3^250,
250: F#3^250,
0: A3^250,
250: C#4^500,
312.5: A3^250,
250: F#3^250,
0: A3^250,
250: C#4^500,
1250: A3^250,
250: F#3^250,
0: A3^250,
250: C#4^500,
250: A3^250,
250: E3^250,
0: B3^250,
250: G3^250,
0: B3^250,
1250: G3^250,
250: E3^250,
0: B3^250,
250: G3^250,
0: B3^250,
250: G3^250,
250: A3^250,
0: C#4^250,
250: E4^500,
2000: C#4^250,
250: A#3^250,
0: E4^250,
250: C#4^250,
0: E4^250,
1250: C#4^250,
250: A#3^250,
0: E4^250,
250: C#4^250,
0: E4^250,
250: C#4^250,
250: B3^250,
0: F#4^250,
250: D4^250,
0: A4^250,
750: F#4^250,
250: A3^250,
0: E4^250,
250: C#4^250,
0: A4^250,
750: E4^250,
1500: D3^1500,
1500: G#3^1500,
1500: G3^1500,
1500: D3^1500,
1500: D3^1500,
1500: G#3^1500,
1500: G3^1500,
1500: D3^1500,
1500: G3^1500,
1500: A3^1500,
143625: A3^1500,
`,
tune`
88500,
5000: G2^3500,
5062.5: F#2^3625,
2500: E2^1000,
1500: A2^1000,
0: C#4^250,
250: E4^750,
250: A3^250,
500: C#4^250,
2500: A#2^1000,
1250: B2^500,
1250: A2^500,
5000: G2^3500,
5062.5: F#2^3625,
2500: E2^1000,
1500: A2^1000,
0: C#4^250,
250: E4^750,
250: A3^250,
500: C#4^250,
2500: A#2^1000,
1250: B2^500,
127375: A2^500,
`,
];

tracks.forEach((e) => playTune(e));

