/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: The Sequence
@author: liaa-dev 
@tags: []
@addedOn: 2024-08-28
*/

const unrevealed = "b";
const happy = "h";
const sad = "s";
const tile = "t";
const highlighted_tile = "g";
const selected_tile = "k";
const play = "d";
const melody_40bpm = tune`
769.2307692307693: B5/769.2307692307693,
769.2307692307693: E4^769.2307692307693 + E5/769.2307692307693,
1538.4615384615386,
769.2307692307693: D4/769.2307692307693 + B4/769.2307692307693 + G4-769.2307692307693,
769.2307692307693: A4-769.2307692307693,
769.2307692307693: G4-769.2307692307693,
769.2307692307693,
769.2307692307693: E4-769.2307692307693 + C5^769.2307692307693,
769.2307692307693,
769.2307692307693: A4-769.2307692307693,
769.2307692307693: B4-769.2307692307693,
769.2307692307693: G4-769.2307692307693,
769.2307692307693: E4-769.2307692307693,
769.2307692307693,
769.2307692307693: B5/769.2307692307693,
769.2307692307693: E4~769.2307692307693 + E5^769.2307692307693,
769.2307692307693,
769.2307692307693: B4^769.2307692307693 + G4~769.2307692307693,
769.2307692307693: A4~769.2307692307693,
769.2307692307693: G4~769.2307692307693,
769.2307692307693,
769.2307692307693: E4~769.2307692307693 + C5^769.2307692307693,
769.2307692307693,
769.2307692307693: A4~769.2307692307693,
769.2307692307693: B4~769.2307692307693,
769.2307692307693: G4~769.2307692307693,
769.2307692307693: E4~769.2307692307693,
769.2307692307693: F4~769.2307692307693 + D5/769.2307692307693,
769.2307692307693: G4~769.2307692307693 + E5/769.2307692307693,
769.2307692307693: G5/769.2307692307693 + C5^769.2307692307693 + G4^769.2307692307693,
769.2307692307693`
const melody_60bpm = tune`
508.47457627118644: B5/508.47457627118644,
508.47457627118644: E4^508.47457627118644 + E5/508.47457627118644,
1016.9491525423729,
508.47457627118644: D4/508.47457627118644 + B4/508.47457627118644 + G4-508.47457627118644,
508.47457627118644: A4-508.47457627118644,
508.47457627118644: G4-508.47457627118644,
508.47457627118644,
508.47457627118644: E4-508.47457627118644 + C5^508.47457627118644,
508.47457627118644,
508.47457627118644: A4-508.47457627118644,
508.47457627118644: B4-508.47457627118644,
508.47457627118644: G4-508.47457627118644,
508.47457627118644: E4-508.47457627118644,
508.47457627118644,
508.47457627118644: B5/508.47457627118644,
508.47457627118644: E4~508.47457627118644 + E5^508.47457627118644,
508.47457627118644,
508.47457627118644: B4^508.47457627118644 + G4~508.47457627118644,
508.47457627118644: A4~508.47457627118644,
508.47457627118644: G4~508.47457627118644,
508.47457627118644,
508.47457627118644: E4~508.47457627118644 + C5^508.47457627118644,
508.47457627118644,
508.47457627118644: A4~508.47457627118644,
508.47457627118644: B4~508.47457627118644,
508.47457627118644: G4~508.47457627118644,
508.47457627118644: E4~508.47457627118644,
508.47457627118644: F4~508.47457627118644 + D5/508.47457627118644,
508.47457627118644: G4~508.47457627118644 + E5/508.47457627118644,
508.47457627118644: G5/508.47457627118644 + C5^508.47457627118644 + G4^508.47457627118644,
508.47457627118644`
const melody_70bpm = tune`
428.57142857142856: B5/428.57142857142856,
428.57142857142856: E4^428.57142857142856 + E5/428.57142857142856,
857.1428571428571,
428.57142857142856: D4/428.57142857142856 + B4/428.57142857142856 + G4-428.57142857142856,
428.57142857142856: A4-428.57142857142856,
428.57142857142856: G4-428.57142857142856,
428.57142857142856,
428.57142857142856: E4-428.57142857142856 + C5^428.57142857142856,
428.57142857142856,
428.57142857142856: A4-428.57142857142856,
428.57142857142856: B4-428.57142857142856,
428.57142857142856: G4-428.57142857142856,
428.57142857142856: E4-428.57142857142856,
428.57142857142856,
428.57142857142856: B5/428.57142857142856,
428.57142857142856: E4~428.57142857142856 + E5^428.57142857142856,
428.57142857142856,
428.57142857142856: B4^428.57142857142856 + G4~428.57142857142856,
428.57142857142856: A4~428.57142857142856,
428.57142857142856: G4~428.57142857142856,
428.57142857142856,
428.57142857142856: E4~428.57142857142856 + C5^428.57142857142856,
428.57142857142856,
428.57142857142856: A4~428.57142857142856,
428.57142857142856: B4~428.57142857142856,
428.57142857142856: G4~428.57142857142856,
428.57142857142856: E4~428.57142857142856,
428.57142857142856: F4~428.57142857142856 + D5/428.57142857142856,
428.57142857142856: G4~428.57142857142856 + E5/428.57142857142856,
428.57142857142856: G5/428.57142857142856 + C5^428.57142857142856 + G4^428.57142857142856,
428.57142857142856`
const melody_80bpm = tune`
379.746835443038: B5/379.746835443038,
379.746835443038: E4^379.746835443038 + E5/379.746835443038,
759.493670886076,
379.746835443038: D4/379.746835443038 + B4/379.746835443038 + G4-379.746835443038,
379.746835443038: A4-379.746835443038,
379.746835443038: G4-379.746835443038,
379.746835443038,
379.746835443038: E4-379.746835443038 + C5^379.746835443038,
379.746835443038,
379.746835443038: A4-379.746835443038,
379.746835443038: B4-379.746835443038,
379.746835443038: G4-379.746835443038,
379.746835443038: E4-379.746835443038,
379.746835443038,
379.746835443038: B5/379.746835443038,
379.746835443038: E4~379.746835443038 + E5^379.746835443038,
379.746835443038,
379.746835443038: B4^379.746835443038 + G4~379.746835443038,
379.746835443038: A4~379.746835443038,
379.746835443038: G4~379.746835443038,
379.746835443038,
379.746835443038: E4~379.746835443038 + C5^379.746835443038,
379.746835443038,
379.746835443038: A4~379.746835443038,
379.746835443038: B4~379.746835443038,
379.746835443038: G4~379.746835443038,
379.746835443038: E4~379.746835443038,
379.746835443038: F4~379.746835443038 + D5/379.746835443038,
379.746835443038: G4~379.746835443038 + E5/379.746835443038,
379.746835443038: G5/379.746835443038 + C5^379.746835443038 + G4^379.746835443038,
379.746835443038`
const melody_90bpm = tune`
333.3333333333333: B5/333.3333333333333,
333.3333333333333: E4^333.3333333333333 + E5/333.3333333333333,
666.6666666666666,
333.3333333333333: D4/333.3333333333333 + B4/333.3333333333333 + G4-333.3333333333333,
333.3333333333333: A4-333.3333333333333,
333.3333333333333: G4-333.3333333333333,
333.3333333333333,
333.3333333333333: E4-333.3333333333333 + C5^333.3333333333333,
333.3333333333333,
333.3333333333333: A4-333.3333333333333,
333.3333333333333: B4-333.3333333333333,
333.3333333333333: G4-333.3333333333333,
333.3333333333333: E4-333.3333333333333,
333.3333333333333,
333.3333333333333: B5/333.3333333333333,
333.3333333333333: E4~333.3333333333333 + E5^333.3333333333333,
333.3333333333333,
333.3333333333333: B4^333.3333333333333 + G4~333.3333333333333,
333.3333333333333: A4~333.3333333333333,
333.3333333333333: G4~333.3333333333333,
333.3333333333333,
333.3333333333333: E4~333.3333333333333 + C5^333.3333333333333,
333.3333333333333,
333.3333333333333: A4~333.3333333333333,
333.3333333333333: B4~333.3333333333333,
333.3333333333333: G4~333.3333333333333,
333.3333333333333: E4~333.3333333333333,
333.3333333333333: F4~333.3333333333333 + D5/333.3333333333333,
333.3333333333333: G4~333.3333333333333 + E5/333.3333333333333,
333.3333333333333: G5/333.3333333333333 + C5^333.3333333333333 + G4^333.3333333333333,
333.3333333333333`
const melody_100bpm = tune`
294.11764705882354: B5/294.11764705882354,
294.11764705882354: E4^294.11764705882354 + E5/294.11764705882354,
588.2352941176471,
294.11764705882354: D4/294.11764705882354 + B4/294.11764705882354 + G4-294.11764705882354,
294.11764705882354: A4-294.11764705882354,
294.11764705882354: G4-294.11764705882354,
294.11764705882354,
294.11764705882354: E4-294.11764705882354 + C5^294.11764705882354,
294.11764705882354,
294.11764705882354: A4-294.11764705882354,
294.11764705882354: B4-294.11764705882354,
294.11764705882354: G4-294.11764705882354,
294.11764705882354: E4-294.11764705882354,
294.11764705882354,
294.11764705882354: B5/294.11764705882354,
294.11764705882354: E4~294.11764705882354 + E5^294.11764705882354,
294.11764705882354,
294.11764705882354: B4^294.11764705882354 + G4~294.11764705882354,
294.11764705882354: A4~294.11764705882354,
294.11764705882354: G4~294.11764705882354,
294.11764705882354,
294.11764705882354: E4~294.11764705882354 + C5^294.11764705882354,
294.11764705882354,
294.11764705882354: A4~294.11764705882354,
294.11764705882354: B4~294.11764705882354,
294.11764705882354: G4~294.11764705882354,
294.11764705882354: E4~294.11764705882354,
294.11764705882354: F4~294.11764705882354 + D5/294.11764705882354,
294.11764705882354: G4~294.11764705882354 + E5/294.11764705882354,
294.11764705882354: G5/294.11764705882354 + C5^294.11764705882354 + G4^294.11764705882354,
294.11764705882354`
const melody_110bpm = tune`
272.72727272727275: B5/272.72727272727275,
272.72727272727275: E4^272.72727272727275 + E5/272.72727272727275,
545.4545454545455,
272.72727272727275: D4/272.72727272727275 + B4/272.72727272727275 + G4-272.72727272727275,
272.72727272727275: A4-272.72727272727275,
272.72727272727275: G4-272.72727272727275,
272.72727272727275,
272.72727272727275: E4-272.72727272727275 + C5^272.72727272727275,
272.72727272727275,
272.72727272727275: A4-272.72727272727275,
272.72727272727275: B4-272.72727272727275,
272.72727272727275: G4-272.72727272727275,
272.72727272727275: E4-272.72727272727275,
272.72727272727275,
272.72727272727275: B5/272.72727272727275,
272.72727272727275: E4~272.72727272727275 + E5^272.72727272727275,
272.72727272727275,
272.72727272727275: B4^272.72727272727275 + G4~272.72727272727275,
272.72727272727275: A4~272.72727272727275,
272.72727272727275: G4~272.72727272727275,
272.72727272727275,
272.72727272727275: E4~272.72727272727275 + C5^272.72727272727275,
272.72727272727275,
272.72727272727275: A4~272.72727272727275,
272.72727272727275: B4~272.72727272727275,
272.72727272727275: G4~272.72727272727275,
272.72727272727275: E4~272.72727272727275,
272.72727272727275: F4~272.72727272727275 + D5/272.72727272727275,
272.72727272727275: G4~272.72727272727275 + E5/272.72727272727275,
272.72727272727275: G5/272.72727272727275 + C5^272.72727272727275 + G4^272.72727272727275,
272.72727272727275`
const melody_120bpm = tune`
245.9016393442623: B5/245.9016393442623,
245.9016393442623: E4^245.9016393442623 + E5/245.9016393442623,
491.8032786885246,
245.9016393442623: D4/245.9016393442623 + B4/245.9016393442623 + G4-245.9016393442623,
245.9016393442623: A4-245.9016393442623,
245.9016393442623: G4-245.9016393442623,
245.9016393442623,
245.9016393442623: E4-245.9016393442623 + C5^245.9016393442623,
245.9016393442623,
245.9016393442623: A4-245.9016393442623,
245.9016393442623: B4-245.9016393442623,
245.9016393442623: G4-245.9016393442623,
245.9016393442623: E4-245.9016393442623,
245.9016393442623,
245.9016393442623: B5/245.9016393442623,
245.9016393442623: E4~245.9016393442623 + E5^245.9016393442623,
245.9016393442623,
245.9016393442623: B4^245.9016393442623 + G4~245.9016393442623,
245.9016393442623: A4~245.9016393442623,
245.9016393442623: G4~245.9016393442623,
245.9016393442623,
245.9016393442623: E4~245.9016393442623 + C5^245.9016393442623,
245.9016393442623,
245.9016393442623: A4~245.9016393442623,
245.9016393442623: B4~245.9016393442623,
245.9016393442623: G4~245.9016393442623,
245.9016393442623: E4~245.9016393442623,
245.9016393442623: F4~245.9016393442623 + D5/245.9016393442623,
245.9016393442623: G4~245.9016393442623 + E5/245.9016393442623,
245.9016393442623: G5/245.9016393442623 + C5^245.9016393442623 + G4^245.9016393442623,
245.9016393442623`
const hurray = tune`
379.746835443038: B5-379.746835443038 + A5-379.746835443038 + G5-379.746835443038 + C5-379.746835443038 + A4/379.746835443038,
379.746835443038: B5-379.746835443038 + D5/379.746835443038 + E5/379.746835443038 + C5^379.746835443038,
11392.405063291139`
const bub = tune `
500: E4-500,
15500`

const diss_list = [
    "Not Even\nClose.",
    "Seriously?\nThat Was It?",
    "Away from\nbrain?",
    "Is That\nYour Best?",
    "You Forgot\nAlready?",
    "That Was\nJust Sad.",
    "Too Slow,\nTry Again.",
    "Memory Not\nIncluded.",
    "Total Fail.",
    "Do Better\nNext Time.",
    "You Blew it.",
    "Really?\nThats All?",
    "Think harder.",
    "Give Up\nAlready?",
    "Embarrassing\nAttempt.",
    "Did You\nEven Try?",
    "Hopeless,\nJust Hopeless.",
    "This Is\nGetting Sad.",
    "You Call\nThat Trying?",
    "Wow...\nJust Wow."
];



let playback;
let isDead = false;
let score = 0;
let highscore = 0;
let lockCursor = true;
let round = 1;
let speed = 1;
var tiles_chosen = 0;
var inSequence = true;
var frequence = 2;
var sequence = [];
let cursor_pos = {
  x: 1,
  y: 1
};

setLegend(
  [happy, bitmap`
................
......00000.....
....000...000...
...00.......00..
...0.........0..
..00...4.4...00.
..0....4.4....0.
..0....D.D....0.
..0...........0.
..00..4...4..00.
...0...444...0..
...00.......00..
....000...000...
......00000.....
................
................`],
  [sad, bitmap`
................
......00000.....
....000...000...
...00.......00..
...0.........0..
..00...3.3...00.
..0....3.3....0.
..0....3.3....0.
..0...........0.
..00...333...00.
...0..3...3..0..
...00.......00..
....000...000...
......00000.....
................
................`],
  [tile, bitmap`
FFFFFFFFFFFFFFFF
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
FFFFFFFFFFFFFFFF`],
  [highlighted_tile, bitmap`
CCCCCCCCCCCCCCCC
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
CCCCCCCCCCCCCCCC`],
  [selected_tile, bitmap`
0000000000000000
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0000000000000000`],
  [play, bitmap`
DDDDDDDDDDDDDDDD
D44444444444444D
D44444444444444D
D44444444444444D
D44444LL4444444D
D44444L2LL44444D
D44444L22L44444D
D44444L222L4444D
D44444L22L44444D
D44444L2LL44444D
D44444LL4444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
DDDDDDDDDDDDDDDD`],
)

setSolids([])

let level = 0
const levels = [
  map`
...
.d.
...`,
  map`
ttt
ttt
ttt`,
  map`
...
...
...`,
]
setMap(levels[level])

addText("H-Score: " + highscore, { x: 5, y: 2, color: color`0` });

onInput("j", () => {
  if(isDead) return;
  clearText();
  
  if(level == 0) {
    level = 1;
    setMap(levels[level]);
    startSequence();
    playback = playTune(melody_40bpm, Infinity);
  }else if(level == 2) {
    clearText();
    level = 0;
    setMap(levels[level]);
    isDead = false;
    addText("H-Score: " + highscore, { x: 5, y: 2, color: color`0` });
  }
  
  if (!inSequence) {
    if (cursor_pos.x == sequence[tiles_chosen].x && cursor_pos.y == sequence[tiles_chosen].y) {
      tiles_chosen += 1;
      setTileFor(cursor_pos.x, cursor_pos.y, happy, 1000/speed);
      lockCursor = true;
      setTimeout(() => lockCursor = false, (1000/speed));
      if(tiles_chosen == sequence.length) startNewRound();
    }else {
      isDead = true;
      playback.end();
      setTileFor(cursor_pos.x, cursor_pos.y, sad, 1000);
      setTimeout(() => {
        resetVars();
        level = 2;
        setMap(levels[2]);
        playTune(bub);
        addText(diss_list[Math.floor(Math.random() * diss_list.length)], { x: 5, y: 3, color: color`0` });
        setTimeout(() => {
          playTune(bub);
          addText("Score: " + score, { x: 6, y: 6, color: color`0` });
          setTimeout(() => {
            playTune(bub);
            addText("H-Score: " + highscore, { x: 5, y: 8, color: color`3` });
          }, 1000);
    
          setTimeout(() => {
            playTune(bub);
            addText("Press j... ", { x: 5, y: 13, color: color`9` });
            isDead = false;
          }, 2000);
        }, 1000);
      }, 1000);
    }
    return;
  }
})

onInput("w", () => {
  if (inSequence || level == 2) return;
  moveCursor(cursor_pos.x, cursor_pos.y - 1);
})

onInput("a", () => {
  if (inSequence || level == 2) return;
  moveCursor(cursor_pos.x - 1, cursor_pos.y);
})

onInput("s", () => {
  if (inSequence || level == 2) return;
  moveCursor(cursor_pos.x, cursor_pos.y + 1);
})

onInput("d", () => {
  if (inSequence || level == 2) return;
  moveCursor(cursor_pos.x + 1, cursor_pos.y);
})

afterInput(() => {
  console.log("length:" + sequence.length);
})

function startNewRound() {
  playback.end();
  playTune(hurray);
  if(speed <= 4) speed += 0.2;
  sequence = [];
  tiles_chosen = 0;
  setAllTilesFor(happy, 2000);
  score++;
  inSequence = true;
  lockCursor = true;
  setTimeout(() => {
    setMap(levels[1]);
    startSequence();
    if(speed >= 0.5) playback = playTune(melody_60bpm, Infinity);
    else if(speed >= 1) playback = playTune(melody_70bpm, Infinity);
    else if(speed >= 1.5) playback = playTune(melody_80bpm, Infinity);
    else if(speed >= 2) playback = playTune(melody_100bpm, Infinity);
    else if(speed >= 3.5) playback = playTune(melody_110bpm, Infinity);
    else if(speed >= 4) playback = playTune(melody_120bpm, Infinity);
    else playback = playTune(melody_40bpm, Infinity);
  }, 1500);
}

async function startSequence() {
  await sleep(1000/speed);
  for (let i = 1; i <= frequence; i++) {
    let randomX = Math.floor(Math.random() * 2);
    let randomY = Math.floor(Math.random() * 2);
    setTile(randomX, randomY, highlighted_tile);
    storeSequenceCoord(randomX, randomY);
    await sleep(1000/speed);
    setTile(randomX, randomY, tile);
    await sleep(1000/speed);
  }
  frequence += 1;
  lockCursor = false;
  inSequence = false;
  moveCursor(1, 1);
}

function moveCursor(x, y) {
  if(lockCursor) return;
  
  if (x > width() - 1 || x < 0 || y > height() - 1 || y < 0) return;

  setTile(cursor_pos.x, cursor_pos.y, tile);

  cursor_pos.x = x;
  cursor_pos.y = y;

  setTile(x, y, selected_tile);
}

function setTile(x, y, spriteType) {
  clearTile(x, y);
  addSprite(x, y, spriteType);
}

function setAllTilesFor(spriteType, ms) {
  let oldTileTypes = [];
  setTimeout(() => {
    for(let x = 0; x <= 2; x++) {
      for(let y = 0; y <= 2; y++) {
        setTile(x, y, tile);
      }
    }
  }, 1000);
  for(let x = 0; x <= 2; x++) {
    for(let y = 0; y <= 2; y++) {
      oldTileTypes.push(getTile(x, y)[0].type);
      setTile(x, y, spriteType);
    }
  }
}

function setTileFor(x, y, spriteType, ms) {
  let tile = getTile(x, y)[0];
  let oldTileType = tile.type;

  setTile(x, y, spriteType);

  setTimeout(() => setTile(x, y, oldTileType), ms);
}

function storeSequenceCoord(xVal, yVal) {
  sequence.push({ x: xVal, y: yVal });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function resetVars() {
  if(score > highscore) {
    highscore = score;
  }

  speed = 1;
  round = 1;
  tiles_chosen = 0;
  inSequence = true;
  frequence = 2;
  sequence = [];
  cursor_pos = {
    x: 1,
    y: 1
  };
}

