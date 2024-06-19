/*

@title: The Labyrinth
@author: Ashpashnodash 
@tags: [Puzzle]
@addedOn: 2024-19-06
*/

const player = "p"
const boundary1 = "a"
const boundary2 = "A"
const boundary3 = "b"
const boundary4 = "B"
const boundary5 = "c"
const boundary6 = "C"
const boundaryconnector1 = "d"
const boundaryconnector2 = "D"
const boundaryconnector3 = "e"
const boundaryconnector4 = "E"
const boundaryconnector5 = "f"
const goal = "g"
const myTune = tune`
500: B5~500 + G5^500,
500: F5~500,
500: G5~500,
500: A5~500,
500: D5~500,
500: E5~500,
500: F5~500,
500: B4~500,
500: C5~500,
500: B5-500,
500: D5~500,
500: E5~500,
500: F5~500,
500: G5~500,
500: A5~500,
500: B5~500,
500: B5^500 + G5~500,
500: A5^500 + E5~500,
500: G5^500 + D5~500,
500: F5^500 + C5~500,
500: F5-500 + C5^500,
500: G5-500 + D5^500,
500: A5-500 + E5^500,
500: B5-500 + F5^500,
500: A5~500,
500: F5~500,
500: A5~500,
500: E5~500,
500: G5~500,
500: E5^500 + C5^500,
500: E5~500,
500: D5~500`;
const victorytheme = tune`
500,
500: C5~500,
500: D5~500,
500: E5~500,
500: F5~500,
500: G5~500,
500: D5^500,
500: E5^500,
500: F5^500,
500: G5^500,
500: A5^500,
500: B4~500,
500: C5~500,
500: D5~500,
500: E5~500,
500: F5~500,
500: E5^500,
500: F5^500,
500: G5^500,
500: A5^500,
500: B5^500,
500: A4~500,
500: B4~500,
500: C5~500,
500: D5~500,
500: E5~500,
500: D5~500,
500: C5~500,
500: B4~500,
500: A4~500,
500: A4~500,
500: A4~500`;
const playback = playTune(myTune, Infinity)


setLegend(
  [player, bitmap`
................
.00000000000000.
.0HHHHHHHHHHHH0.
.0H0000HH0000H0.
.0H02H0HH02H0H0.
.0H0HH0HH0HH0H0.
.0H0000HH0000H0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HH22222222HH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.00000000000000.
................` ],
  [boundary1, bitmap`
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......` ],
  [boundary2, bitmap`
................
................
................
................
................
................
......0000000000
......0202020202
......0020202020
......0200000000
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......` ],
  [boundary3, bitmap`
................
................
................
................
................
................
0000000000000000
0202020202020202
2020202020202020
0000000000000000
................
................
................
................
................
................` ],
  [boundary4, bitmap`
................
................
................
................
................
................
0000000000......
0202020200...2..
2020202020......
0000000200......
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......` ],
  [boundary5, bitmap`
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......
......0020000000
......0202020202
......0020202020
......0000000000
................
................
................
................
................
................` ],
  [boundary6, bitmap`
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......
0000000020......
0202020200......
2020202020......
0000000000......
................
................
................
................
................
................` ],
  [boundaryconnector1, bitmap`
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......
0000000020000000
0202020202020202
2020202020202020
0000000000000000
................
................
................
................
................
................` ],
  [boundaryconnector2, bitmap`
................
................
................
................
................
................
0000000000000000
0202020202020202
2020202020202020
0000000200000000
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......` ],
  [boundaryconnector3, bitmap`
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......
......0020000000
......0202020202
......0020202020
......0200000000
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......` ],
  [boundaryconnector4, bitmap`
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......
0000000020......
0202020200......
2020202020......
0000000200......
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......` ],
  [boundaryconnector5, bitmap`
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......
0000000020000000
0202020202020202
2020202020202020
0000000200000000
......0020......
......0200......
......0020......
......0200......
......0020......
......0200......` ],
  [goal, bitmap`
0000000000000000
0333333333333330
0302020202020230
0320202020202030
0302020202020230
0320202020202030
0302020202020230
0320202020202030
0302020202020230
0320202020202030
0302020202020230
0320202020202030
0302020202020230
0320202020202030
0333333333333330
0000000000000000` ],
)

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y += -1; // positive y is downwards
});

onInput("a", () => {
  getFirst(player).x += -1; // positive y is downwards
});


setSolids([boundary1, boundary2, boundary3, boundary4, boundary5, boundary6, boundaryconnector1, boundaryconnector2, boundaryconnector3, boundaryconnector4, boundaryconnector5, player])

let level = 0
const levels = [
  map`
AbbbbbbbbbbbbbB
ap............a
eDDDDDB.ADDDB.a
efffffE.efffE.a
efffffE.efffE.a
efffffE.efffE.a
efffffE.cdddC.a
efffffE......ga
cddddddbbbbbbbC`,
  map`
AbbbbbbbbbbbbbbbbbB
ap................a
eDDDDDDDDDDDDDDDB.a
edddddddddddddddC.a
a.................a
a.ADDDDDDDDDDDDDDDE
a.cdddddddddddddddE
a.................a
eDDDDDDDDDDDDDDDB.a
cddddddddddddddddgC`,
  map`
apaAbDbbbbbbbbbbbbB
a.cC.a............a
a....a.ebbbbbbbbB.a
ebbE.a..........a.a
a....a.ebbB..D..a.a
a.D..a....a..a..a.a
a.a.edbB..a.efE.a.a
a.a....ebbC..a..a.a
a.ebDE.a.....eE.a.a
a.d.d..cbbbE.a..a.a
a............a..a.a
cbbbbbbbbbbbbdbbdgC`,
  map`
AbpAbbbDbbbbDbbbbbB
a..a...a....a.....a
a.eC.D.a.eB.a.AbE.a
a....a....a.a.a...a
ebbbbdbbB.a.d.a.bbE
a.......a.a...a...a
a.AbbbB.cbdbbbE.D.a
a.a...d.......a.a.a
a.cbB...AbDbE.cbC.a
a...cbbDC.d.......a
a.D....a....AbbbB.a
a.cbDE.ebbbDC...a.a
a...a..a...a..D.a.a
ebE.a.eC.D.a.edbdbC
a...a....a.a......g
a.AbdbbbbC.cbB.AE.D
a.a..........a.a..a
a.a.ebbbbbbbbC.cbbE
a.a...............a
cbdbbbbbbbbbbbbbbbC`,
  map`
apcbbbbbbbbbbbbbDbbbDbbbbbB
a...............a...a.....a
a.AbbbDb.AbE.eB.a.D.a.ebB.a
a.d...a..a....a.a.a.a...a.a
a...D.a.edbbB.cbE.a.cbE.a.a
ebbbC.a.....a...a.a.....a.a
a.....ebbbB.cbB.d.ebDbbbE.a
a.AbE.a...a...a...a.a...a.a
a.a...a.D.a.D.ebbbC.a.D.cbE
a.a.ebC.ebC.a.a.....a.a...a
a.a.....a...a.ebbbE.a.a.D.a
a.cbbbbbfbbbC.a.....a.a.a.a
a.......a.....a.AbbbC.a.a.a
ebbbE.D.a.ebbbC.d.....a.a.a
a.....a.a..........D..a.a.a
a.AbbbdbdbDbbbE.AbbdbbC.a.a
a.a.......a.....a.......ebE
a.d.ebbbbbdbbbE.a.ebbbbbC.a
a...............a.........a
cbbbbbbbbbbbbbbbdbbbbbbbBga`,
  map`
dpd..
.ggg.
.ggg.
.ggg.
.....`,
  
]

setMap(levels[level])

afterInput(() => {
  
  const targetNumber = goal.length;
  
 
  const numberCovered = tilesWith(goal, player).length;

 
  if (numberCovered === targetNumber) {
  
    level = level + 1;

    const currentLevel = levels[level];

  
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("You Have Escaped ", { y: 4, color: color`4` });
      playback.end();
      playTune(victorytheme)
    }
  }
});



