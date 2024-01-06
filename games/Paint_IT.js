/*
@title: Paint_IT
@tags: ['sandbox']
@img: ""
@addedOn: 2022-09-14
@author: N Rizwan
*/

/*
Hey there guys!
Objective : Paint 'em
Black ⚫ > Red 🔴 > Blue 🔵 > Yellow 🟡
SCREENSHOT YOUR BEST ART AND SEND IT TO StuntStorm#7231 ON DISCORD
*/
//================================
const player = "p";
const wall = "m";
const black = "a";
const red = "b";
const blue = "c";
const yellow = "d";
const s = tune`
166.66666666666666,
166.66666666666666: c4^166.66666666666666,
5000`;
const w = tune`
166.66666666666666,
166.66666666666666: d4^166.66666666666666,
5000`;
const a = tune`
166.66666666666666,
166.66666666666666: e4^166.66666666666666,
5000`;
const d = tune`
166.66666666666666,
166.66666666666666: f4^166.66666666666666,
5000`;
//================================
setLegend(
  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ player, bitmap`
................
..00.....000....
.0220..001220...
.0222001201220..
.0122220122220..
..012222222L220.
...012222L22L20.
...0012222L2220.
...0LL122222220.
...0L11222222020
....011222222220
.....0111102210.
......00001210..
........0L110...
........0LL0....
.........00.....`],
  [ black, bitmap`
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
0000000000000000`],
  [ red, bitmap`
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
  [ blue, bitmap`
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
  [ yellow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`]
);
//================================
let ax = 1;
let ay = 1;
let bx = 1;
let by = 1;
let cx = 1;
let cy = 1;
let dx = 1;
let dy = 1;
//================================
setSolids([ax,bx,cx,dx,ay,by,cy,dy]);
//================================
const Canvas = map`
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
mp.............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
m..............................................................................m
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm`;
setMap(Canvas)
//================================
onInput("i", () => {
  ax = Math.min(width()-1, ax);
  ax = Math.max(0, ax);
  ay = Math.min(height()-1, ay);
  ay = Math.max(0, ay);
  addSprite(ax, ay, black);
  playTune(w);
});

onInput("j", () => {
  bx = Math.min(width()-1, bx);
  bx = Math.max(0, bx);
  by = Math.min(height()-1, by);
  by = Math.max(0, by);
  addSprite(bx, by, red);
  playTune(s);
});

onInput("k", () => {
  cx = Math.min(width()-1, cx);
  cx = Math.max(0, cx);
  cy = Math.min(height()-1, cy);
  cy = Math.max(0, cy);
  addSprite(cx, cy, blue);
  playTune(d);
});

onInput("l", () => {
  dx = Math.min(width()-1, dx);
  dx = Math.max(0, dx);
  dy = Math.min(height()-1, dy);
  dy = Math.max(0, dy);
  addSprite(dx, dy, yellow);
  playTune(a);
});

//================================
onInput("w", () => {ay--});
onInput("a", () => {ax--});
onInput("s", () => {ay++});
onInput("d", () => {ax++});
//================================
onInput("w", () => {by--});
onInput("a", () => {bx--});
onInput("s", () => {by++});
onInput("d", () => {bx++});
//================================
onInput("w", () => {cy--});
onInput("a", () => {cx--});
onInput("s", () => {cy++});
onInput("d", () => {cx++});
//================================
onInput("w", () => {dy--});
onInput("a", () => {dx--});
onInput("s", () => {dy++});
onInput("d", () => {dx++});
//================================
onInput("s", () => {getFirst(player).y += 1});
onInput("w", () => {getFirst(player).y -= 1;});
onInput("d", () => {getFirst(player).x += 1});
onInput("a", () => {getFirst(player).x -= 1});
//================================
afterInput(() => {
  //======================HEADER============================
  addText("-Paint IT!-",{ color: color`8` });
  //======================FOOTER============================
  addText("-StuntStorm-", { y:15, color: color`8` });
  //========================================================
});
//================================
//Created by N Rizwan - StuntStorm Production - StuntStorm#7231
