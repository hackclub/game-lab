/*
@title: Travelling Courier
@description: Travelling Courier is a game where you navigate through mazes collecting parcels and delivering them to the exit.
@author: Lukáš Nagy
@tags: ['adventure']
@addedOn: 2024-11-23
*/

const player = "p";
const parcel = "x";
const exit = "e";
const obstacle_v = "v";
const obstacle_h = "h";

setLegend(
  [player, bitmap`
................
................
....00000000....
...0222222220...
..022222222220..
..022202220220..
..022202220220..
...0222222220...
....00000000....
....02222220....
....02222220....
....02222220....
....02220220....
....02220220....
....02220220....
....00000000....`],
  [parcel, bitmap`
................
................
................
.....LLLLLL.....
....LLLLLLLL....
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
...LLLLLLLLLL...
....LLLLLLLL....
.....LLLLLL.....
................
................
................`],
  [exit, bitmap`
................
................
......1111......
.....111111.....
....11111111....
....11111111....
....11111111....
.....111111.....
......1111......
.......11.......
.......11.......
......1111......
.....111111.....
....11111111....
................
................`],
  [obstacle_v, bitmap`
.....333333.....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
.....333333.....`],
  [obstacle_h, bitmap`
................
................
................
................
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
................
................
................
................`]
);

setSolids([player, obstacle_v, obstacle_h]);

let level = 0;
const levels = [
  map`
p......x
hh.v.vhh
xv.v.v.e
...v..x.`, map`
pvxv.vhh
.v.v.v.x
...v.v..
.....vh.
.e.x....`, map`
x..p....
hhvevhh.
.xhhhxv.
.hvxv.v.
........`, map`
p...x...
.vh.hhv.
.v...xv.
.v.hhhh.
xv.xve.x`, map`
xvx..veh
.vhh.v.x
.v..xv..
.v.hhvh.
....p...`, map`
xve.....x.......
.v..hhhhhhhhhhh.
.v..vxv.........
.v.hv.v.vhhhv.v.
.v.xv.v.v...v.v.
.vhhh.v.v.v.v.v.
.vp.....vxv.x.v.
.hhhhhhhhhhhhhh.
...............x`, map`
...v..hh
.vxv.xvx
.hhv.hh.
..pv.vx.
e..x....`, map`
p......x
xv.vhhv.
vh.vx.v.
...vh.v.
xvxve...`, map`
........ve
.hhhhhv.v.
...xvxv..x
.hhhv.vhhh
....v...vx
p.v...v...`, map`
..v.............
.pv..v...vhhhhh.
.hv..v.v.vxv....
.....vxv.v.v..v.
hhhhhvhhhv....v.
..vx..vevhhhhhh.
.xvhh.v.v...xv..
.hv...v...hhhvx.
..v.v.vhh....v..
h...v...........`, map`
.......
.......
...p...
.......
.......`
];

const walk = tune`
40.16064257028113: F4^40.16064257028113,
1244.9799196787149`;

setMap(levels[level]);

onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(walk);
});
onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(walk);
});
onInput("s", () => {
  getFirst(player).y += 1;
  playTune(walk);
});
onInput("d", () => {
  getFirst(player).x += 1;
  playTune(walk);
});

afterInput(() => {
  const playerPos = getFirst(player);
  const parcels = getAll(parcel);
  const exits = getAll(exit);

  const collectedParcel = tune`
52.17391304347826: G4^52.17391304347826 + A4^52.17391304347826,
52.17391304347826: A4^52.17391304347826 + B4^52.17391304347826,
52.17391304347826: B4^52.17391304347826 + C5^52.17391304347826,
52.17391304347826: C5^52.17391304347826 + D5^52.17391304347826,
52.17391304347826: D5^52.17391304347826 + E5^52.17391304347826,
52.17391304347826: F5^52.17391304347826 + E5^52.17391304347826,
52.17391304347826: F5^52.17391304347826 + G5^52.17391304347826,
52.17391304347826: G5^52.17391304347826 + A5^52.17391304347826,
52.17391304347826: A5^52.17391304347826 + B5^52.17391304347826,
52.17391304347826: B5^52.17391304347826,
1147.8260869565217`;
  const levelCompletion = tune`
60.483870967741936: E4^60.483870967741936,
60.483870967741936: F4^60.483870967741936,
60.483870967741936: F4^60.483870967741936 + G4^60.483870967741936,
60.483870967741936: G4^60.483870967741936,
60.483870967741936: A4^60.483870967741936,
60.483870967741936: B4^60.483870967741936,
60.483870967741936: C5^60.483870967741936,
60.483870967741936: D5^60.483870967741936,
60.483870967741936: E5^60.483870967741936,
60.483870967741936: F5^60.483870967741936,
60.483870967741936: F5^60.483870967741936,
60.483870967741936: G5^60.483870967741936,
60.483870967741936: G5^60.483870967741936,
60.483870967741936: A5^60.483870967741936 + G5^60.483870967741936,
60.483870967741936: B5^60.483870967741936 + A5^60.483870967741936,
1028.225806451613`;
  const win = tune`
198.67549668874173: G4^198.67549668874173 + A4^198.67549668874173,
198.67549668874173: A4^198.67549668874173 + B4^198.67549668874173,
198.67549668874173: B4^198.67549668874173 + C5^198.67549668874173,
198.67549668874173: C5^198.67549668874173 + D5^198.67549668874173,
198.67549668874173: D5^198.67549668874173,
198.67549668874173: D5^198.67549668874173 + E5^198.67549668874173,
198.67549668874173: E5^198.67549668874173,
198.67549668874173: E5^198.67549668874173,
198.67549668874173: E5^198.67549668874173,
198.67549668874173: E5^198.67549668874173 + D5^198.67549668874173,
198.67549668874173: D5^198.67549668874173 + C5^198.67549668874173,
198.67549668874173: C5^198.67549668874173,
198.67549668874173: B4^198.67549668874173,
198.67549668874173: B4^198.67549668874173,
198.67549668874173: B4^198.67549668874173,
198.67549668874173: B4^198.67549668874173 + C5^198.67549668874173,
198.67549668874173: C5^198.67549668874173 + D5^198.67549668874173,
198.67549668874173: D5^198.67549668874173 + E5^198.67549668874173,
198.67549668874173: E5^198.67549668874173,
198.67549668874173: E5^198.67549668874173 + D5^198.67549668874173,
198.67549668874173: D5^198.67549668874173,
198.67549668874173: D5^198.67549668874173 + C5^198.67549668874173,
198.67549668874173: C5^198.67549668874173 + B4^198.67549668874173,
198.67549668874173: B4^198.67549668874173,
198.67549668874173: A4^198.67549668874173,
198.67549668874173: A4^198.67549668874173,
198.67549668874173: G4^198.67549668874173,
198.67549668874173: G4^198.67549668874173,
198.67549668874173: G4^198.67549668874173,
198.67549668874173: G4^198.67549668874173 + A4^198.67549668874173,
198.67549668874173: A4^198.67549668874173 + B4^198.67549668874173,
198.67549668874173: B4^198.67549668874173 + C5^198.67549668874173`;

  if (level < levels.length - 1) {
    clearText();
  }

  parcels.forEach((p) => {
    if (p.x === playerPos.x && p.y === playerPos.y) {
      clearTile(p.x, p.y);
      addSprite(p.x, p.y, player);
      playTune(collectedParcel)
    }
  });

  if (exits.some((e) => e.x === playerPos.x && e.y === playerPos.y)) {
    if (parcels.length === 0) {
      level += 1;

      if (level < levels.length - 1) {
        setMap(levels[level]);
        addText("Level Complete!", { x: 4, y: 4, color: color`L` });
        playTune(levelCompletion)
      } else {
        setMap(levels[level]);
        addText("You Win!", { x: 4, y: 4, color: color`L` });
        playTune(win, 2)
      }
    } else {
      addText("Collect parcels!", { x: 4, y: 4, color: color`L` });
    }
  }
});
