const human="h";
const hooman="x";
const ball="b";
const dash_h="d";
const dash_h2="z";

setLegend(
  [human,bitmap`
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
.....55555......
.....55555......
.....55555......
.......5........
.......5........` ],
  [hooman,bitmap`
.......3........
.......3........
.......3........
.....33333......
.....33333......
.....33333......
................
................
................
................
................
................
................
................
................
................`],
  [ball, bitmap`
................
................
................
................
................
................
......3333......
......3333......
......3333......
......3333......
................
................
................
................
................
................`],
  );

let level=0;
const levels=[
  map `
....x....
.........
.........
.........
....b....
.........
.........
.........
....h....`
  
  ]