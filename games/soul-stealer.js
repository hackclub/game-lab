/*
@title: SOUL STEALER: The Vengful Spirit
@description: SOUL STEALER: The Vengeful Spirit is a 2D horror game about a wealthy man named Darius, who must escape the clutches of an evil spirit after a fatal car crash. Navigate through eerie environments as you help Darius find his way to the afterlife.
@author: Gavin Jent
@tags: []
@addedOn: 2024-05-20
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""
*/

const player = "p"
const vengfulSpirit = "s"
const grass = "g"
const dark = "d"
const moon = "m"
const trees = "t"
const horoTrail = "h"
const diaTrail = "f"
const turnTrail = "q"
const diaTrailGoal = "a"
const treesLeave = "l"
const staircase = "1"
const door = "n"
const wall = "v"
const roof = "r"
const groundTrees = "8"
const groundTreesLeave = "9"
const building = "j"
const roof2 = "w"
const floor = "e"
const insideDoor = "5"
const floorDown = "z"
const keyTrap = "i"
const insideDoor2 = "7"
const fakeInsideDoor2 = "c"
const floorTrap = "!"
const jumpscareDoor = ")"
const screwDriver = "{"
const HUD = ";"
const inventory = ">"
const screwDriverHUD = "<"
const vent = "_"
const lockedVent = "-"
const ventWalls = "Z"
const bloodTrail = "P"
const staircaseB = "*"
const grassGoal = "A"
const horoTrailGoal = "O"
const playerB = "L"
const road = "K"
const tireMark = "V"
const gatesOfHeaven = "W"
const you = "I"
const will = "S"
const never = "B"
const never2 = "G"
const leave = "J"
const grassGoal2 = "X"

const winn = tune`
466.32124352331607,
155.44041450777203: F4-155.44041450777203 + E5-155.44041450777203 + D5~155.44041450777203 + E4~155.44041450777203,
155.44041450777203: F4-155.44041450777203 + E5-155.44041450777203 + D5~155.44041450777203 + E4~155.44041450777203,
155.44041450777203: F4-155.44041450777203 + E5-155.44041450777203 + D5~155.44041450777203 + E4~155.44041450777203,
155.44041450777203: G4-155.44041450777203 + F5-155.44041450777203 + E5~155.44041450777203 + F4~155.44041450777203,
155.44041450777203: G4-155.44041450777203 + F5-155.44041450777203 + E5~155.44041450777203 + F4~155.44041450777203,
155.44041450777203: G4-155.44041450777203 + F5-155.44041450777203 + E5~155.44041450777203 + F4~155.44041450777203,
155.44041450777203: G4^155.44041450777203 + F4^155.44041450777203 + F5-155.44041450777203 + E5-155.44041450777203 + D5~155.44041450777203,
310.88082901554407,
155.44041450777203: G4~155.44041450777203 + F5~155.44041450777203,
155.44041450777203: G4~155.44041450777203 + F5~155.44041450777203,
155.44041450777203: G4~155.44041450777203 + F4~155.44041450777203 + F5~155.44041450777203 + E5~155.44041450777203,
155.44041450777203: F4~155.44041450777203 + E5~155.44041450777203,
155.44041450777203: F4~155.44041450777203 + E4~155.44041450777203 + E5~155.44041450777203 + D5~155.44041450777203,
155.44041450777203: E4~155.44041450777203 + D4~155.44041450777203 + D5~155.44041450777203 + C5~155.44041450777203,
2176.1658031088086`;
const jumpscare = tune`
48.07692307692308: B5~48.07692307692308,
48.07692307692308: B5~48.07692307692308,
48.07692307692308: B5~48.07692307692308 + A5~48.07692307692308,
48.07692307692308: B5~48.07692307692308 + A5~48.07692307692308,
48.07692307692308: B5~48.07692307692308 + A5~48.07692307692308,
48.07692307692308: B5~48.07692307692308 + A5~48.07692307692308,
48.07692307692308: B5~48.07692307692308 + A5~48.07692307692308 + G5~48.07692307692308,
48.07692307692308: B5~48.07692307692308 + A5~48.07692307692308 + G5~48.07692307692308,
48.07692307692308: A5~48.07692307692308 + G5~48.07692307692308 + E5-48.07692307692308,
48.07692307692308: A5~48.07692307692308 + G5~48.07692307692308 + E5-48.07692307692308,
48.07692307692308: A5~48.07692307692308 + G5-48.07692307692308 + E5-48.07692307692308 + D5-48.07692307692308,
48.07692307692308: A5~48.07692307692308 + G5-48.07692307692308 + F5-48.07692307692308 + E5-48.07692307692308 + D5-48.07692307692308,
48.07692307692308: A5~48.07692307692308 + G5-48.07692307692308 + F5-48.07692307692308 + E5-48.07692307692308 + D5-48.07692307692308,
48.07692307692308: G5-48.07692307692308 + F5-48.07692307692308 + E5-48.07692307692308 + D5-48.07692307692308 + C5-48.07692307692308,
48.07692307692308: F5-48.07692307692308 + E5-48.07692307692308 + D5-48.07692307692308 + C5-48.07692307692308 + B4-48.07692307692308,
48.07692307692308: F5-48.07692307692308 + E5-48.07692307692308 + D5-48.07692307692308 + C5-48.07692307692308 + B4-48.07692307692308,
48.07692307692308: E5-48.07692307692308 + D5-48.07692307692308 + C5-48.07692307692308 + B4-48.07692307692308 + A4^48.07692307692308,
48.07692307692308: E5-48.07692307692308 + D5-48.07692307692308 + C5-48.07692307692308 + B4-48.07692307692308 + A4^48.07692307692308,
48.07692307692308: B4-48.07692307692308 + A4^48.07692307692308 + G4^48.07692307692308,
48.07692307692308: B4^48.07692307692308 + G4^48.07692307692308,
48.07692307692308: B4^48.07692307692308 + G4^48.07692307692308,
48.07692307692308: B4^48.07692307692308 + G4^48.07692307692308,
48.07692307692308: B4^48.07692307692308 + G4^48.07692307692308,
48.07692307692308: B4-48.07692307692308 + A4/48.07692307692308 + G4/48.07692307692308 + F4/48.07692307692308 + D4/48.07692307692308,
48.07692307692308: A4/48.07692307692308 + G4/48.07692307692308 + F4/48.07692307692308 + E4/48.07692307692308 + D4/48.07692307692308,
48.07692307692308: A4/48.07692307692308 + F4/48.07692307692308 + E4/48.07692307692308 + D4/48.07692307692308 + C4/48.07692307692308,
48.07692307692308: A4/48.07692307692308 + F4/48.07692307692308 + E4/48.07692307692308 + D4/48.07692307692308 + C4/48.07692307692308,
48.07692307692308: A4/48.07692307692308 + F4/48.07692307692308 + E4/48.07692307692308 + D4/48.07692307692308 + C4/48.07692307692308,
48.07692307692308: A4/48.07692307692308 + F4/48.07692307692308 + E4/48.07692307692308 + D4/48.07692307692308 + C4/48.07692307692308,
48.07692307692308: F4/48.07692307692308 + E4/48.07692307692308 + D4/48.07692307692308 + C4/48.07692307692308,
48.07692307692308: F4/48.07692307692308 + E4/48.07692307692308 + D4/48.07692307692308 + C4/48.07692307692308,
48.07692307692308: E4/48.07692307692308 + D4/48.07692307692308 + C4/48.07692307692308`;
const scaryMusic = tune`
294.11764705882354,
147.05882352941177: F4~147.05882352941177,
147.05882352941177: G4~147.05882352941177,
147.05882352941177: G4~147.05882352941177,
147.05882352941177: G4~147.05882352941177,
147.05882352941177: A4~147.05882352941177,
147.05882352941177: E5^147.05882352941177,
147.05882352941177: F4~147.05882352941177,
147.05882352941177: E4~147.05882352941177,
147.05882352941177: F5^147.05882352941177,
147.05882352941177: E4~147.05882352941177,
147.05882352941177: E5^147.05882352941177,
147.05882352941177: G4~147.05882352941177 + C5^147.05882352941177,
147.05882352941177: C5^147.05882352941177,
294.11764705882354,
147.05882352941177: A4^147.05882352941177,
147.05882352941177: F4^147.05882352941177,
147.05882352941177,
147.05882352941177: E4^147.05882352941177 + A4~147.05882352941177,
147.05882352941177: B4~147.05882352941177,
147.05882352941177: A4~147.05882352941177,
147.05882352941177: F4-147.05882352941177,
147.05882352941177,
147.05882352941177: B4^147.05882352941177,
147.05882352941177,
147.05882352941177: F4^147.05882352941177,
147.05882352941177: A4~147.05882352941177,
147.05882352941177: E5^147.05882352941177 + G4~147.05882352941177,
147.05882352941177,
147.05882352941177: A4^147.05882352941177`;
const doorSound = tune`
60.851926977687626: B5^60.851926977687626 + A5~60.851926977687626,
60.851926977687626: A5~60.851926977687626 + B5^60.851926977687626 + G5~60.851926977687626,
60.851926977687626: A5^60.851926977687626 + G5~60.851926977687626,
60.851926977687626: A5^60.851926977687626 + G5~60.851926977687626 + F5~60.851926977687626 + E5~60.851926977687626 + D5~60.851926977687626,
60.851926977687626: A5^60.851926977687626 + G5^60.851926977687626 + F5^60.851926977687626 + E5^60.851926977687626 + D5~60.851926977687626,
60.851926977687626: E5^60.851926977687626 + D5^60.851926977687626 + B4~60.851926977687626 + C5~60.851926977687626,
60.851926977687626: D5^60.851926977687626 + C5^60.851926977687626 + B4~60.851926977687626 + A4~60.851926977687626,
60.851926977687626: C5^60.851926977687626 + B4^60.851926977687626 + A4~60.851926977687626 + G4~60.851926977687626 + F4~60.851926977687626,
60.851926977687626: B4^60.851926977687626 + A4^60.851926977687626 + G4^60.851926977687626 + F4~60.851926977687626 + E4~60.851926977687626,
60.851926977687626: G4^60.851926977687626 + F4~60.851926977687626 + E4~60.851926977687626 + D4~60.851926977687626,
60.851926977687626: F4^60.851926977687626 + E4^60.851926977687626 + D4~60.851926977687626 + C4~60.851926977687626,
60.851926977687626: E4^60.851926977687626 + D4^60.851926977687626 + C4~60.851926977687626,
60.851926977687626: C4^60.851926977687626,
1156.1866125760648`;
const houseMusic = tune`
314.13612565445027,
157.06806282722513: E4~157.06806282722513,
157.06806282722513,
157.06806282722513: G4~157.06806282722513 + D4^157.06806282722513,
157.06806282722513: B4~157.06806282722513 + F4^157.06806282722513,
157.06806282722513: D5~157.06806282722513 + A4^157.06806282722513,
157.06806282722513: C5^157.06806282722513,
157.06806282722513: F5~157.06806282722513 + D5^157.06806282722513,
157.06806282722513: C5~157.06806282722513 + A4^157.06806282722513 + G4^157.06806282722513,
157.06806282722513: B4~157.06806282722513 + F4^157.06806282722513,
157.06806282722513: G4~157.06806282722513,
157.06806282722513,
157.06806282722513: C5~157.06806282722513,
157.06806282722513: C5~157.06806282722513 + B4~157.06806282722513,
157.06806282722513: G4~157.06806282722513,
157.06806282722513: G4~157.06806282722513 + F4~157.06806282722513,
157.06806282722513: C4~157.06806282722513,
2198.952879581152`;
const chaseMusic = tune`
452.2613065326633,
150.7537688442211: G4^150.7537688442211 + A4^150.7537688442211 + B4^150.7537688442211 + C5^150.7537688442211 + D5^150.7537688442211,
150.7537688442211: D5^150.7537688442211 + B4^150.7537688442211,
150.7537688442211: B4^150.7537688442211 + A4^150.7537688442211 + D5^150.7537688442211,
150.7537688442211: G4^150.7537688442211 + C5^150.7537688442211,
301.5075376884422,
150.7537688442211: C5^150.7537688442211 + B4^150.7537688442211 + A4^150.7537688442211,
150.7537688442211: G4^150.7537688442211,
150.7537688442211: G4^150.7537688442211,
150.7537688442211: A4^150.7537688442211 + B4^150.7537688442211 + C5^150.7537688442211,
301.5075376884422,
150.7537688442211: D5^150.7537688442211 + C5^150.7537688442211 + B4^150.7537688442211 + A4^150.7537688442211 + G4^150.7537688442211,
150.7537688442211: D5^150.7537688442211,
150.7537688442211: C5^150.7537688442211 + B4^150.7537688442211,
150.7537688442211: A4^150.7537688442211,
150.7537688442211: G4^150.7537688442211 + A4^150.7537688442211 + C5^150.7537688442211 + B4^150.7537688442211 + D5^150.7537688442211,
452.2613065326633,
150.7537688442211: D5~150.7537688442211 + C5~150.7537688442211 + B4~150.7537688442211 + A4~150.7537688442211 + F4~150.7537688442211,
301.5075376884422,
150.7537688442211: F4~150.7537688442211 + D5~150.7537688442211 + C5~150.7537688442211 + B4~150.7537688442211 + A4~150.7537688442211,
150.7537688442211,
150.7537688442211: F4~150.7537688442211 + D5~150.7537688442211 + B4~150.7537688442211 + A4~150.7537688442211 + C5~150.7537688442211,
452.2613065326633`;
const itemPickup = tune`
93.45794392523365,
93.45794392523365: E4~93.45794392523365 + F4~93.45794392523365,
93.45794392523365: F4~93.45794392523365 + G4~93.45794392523365 + A4~93.45794392523365,
93.45794392523365: A4~93.45794392523365 + B4~93.45794392523365,
93.45794392523365: C5~93.45794392523365,
93.45794392523365: D5^93.45794392523365,
93.45794392523365: E5^93.45794392523365,
93.45794392523365,
93.45794392523365: E5^93.45794392523365,
93.45794392523365,
93.45794392523365: E5^93.45794392523365,
93.45794392523365,
93.45794392523365: E5^93.45794392523365,
93.45794392523365,
93.45794392523365: E5^93.45794392523365,
1588.785046728972`;

const storySong = playTune(scaryMusic, Infinity)


setLegend(
  [ player, bitmap`
................
................
.....777777.....
....77777777....
....77775757....
....77777777....
....77777007....
....77777007....
...7277C77771...
.77277CCC7771...
7727777C277LLL..
7777772C77.L6L..
777772777..L6L..
7777777....LLL..
7777............
................` ],
  [ vengfulSpirit, bitmap`
................
................
......CCCCC.....
....CCCCCCCCC...
....CF222C222...
...CFF22CC222C..
...C33CCCCCC2C..
22.33CLLLLLCFC..
3C.3CL02002LFF..
.CCCCL03002LCFCC
.CCCCL33030LCCCC
..CCCL03003L3C.2
.33CCL23030LCC32
.3..CL20320LC...
.3..CCLLLLLCC.3.
33....CCCCC...33` ],
  [ grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD4DDDDDDDDDDDDD
D4D4DDDDDDDDDDDD
DDDDDD4DDDDDDDDD
DDDDD4D4DDD4DDDD
DDDDDDDDDD4D4DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
D4DDDDDDDDDDDDDD
4D4DDDDDDD4DDDDD
DDDDDDDDD4D4DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ dark, bitmap`
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
  [ moon, bitmap`
0007777777777777
0007557777775777
0007757777777777
0007777777777777
0000777777777777
0000777777775577
0000075577777777
0000077577777777
0000007777777777
0000000777757777
0000000777777757
0000000000077777
0000000000077777
0000000000000777
0000000000000000
0000000000000000`],
  [ trees, bitmap`
000CCCCCCCC50000
000CCCCCCCC50000
000CCCCCCCC50000
000CCCCCCCC50000
000CCCCCCCC50000
000CCCCCCC550000
000CCCCCCC550000
000CCCCCCC550000
000CCCCCCCC50000
000CCCCCCCC50000
000CCCCCCCC50000
00DCCCCCCCC50000
00DCCCCCCCC50000
00DCCCDDCDC5D000
DDDCCDDCCDC5DDD0
DDDDDDDDDDDDDDDD`],
  [ horoTrail, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDFDDDDDDDDDDDD
D5DFFF555FDDD5F5
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
FFFFFFFFFFFFFFFF
DFDFFDDDFFDDFFFF
DDDFDDDDDDDFFDDF
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ turnTrail, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
FDDFDFF55DDDDDDD
FFFFFFFFF5DDDDDD
CCCCCCCFFDDDDDDD
CCCCCCCFDDDDDDDD
FFFFFCCFDDDDDDDD
DDFDFCCFDDDDDDDD
DDDDFCCFFFDDDDDD
DDDDFCCFDFDDDDDD
DDDFFCCFFDDDDDDD
DDDFFCCFDDDDDDDD
DDDDFCCFDDDDDDDD`],
  [ diaTrail, bitmap`
DDDDFCCFFF5DDDDD
DDDFFCCFD55DDDDD
DDDFFCCFD5DDDDDD
DDDDFCCFDDDDDDDD
DDDDFCCFFDDDDDDD
DDDFFCCFFDDDDDDD
DDDDFCCFFDDDDDDD
DDDDFCCFDDDDDDDD
DDDFFCCFDDDDDDDD
DDDFFCCFDDDDDDDD
DDDDFCCFDDDDDDDD
DDDDFCCFFDDDDDDD
DDDDFCCFFFDDDDDD
DDFFFCCFDDDDDDDD
DDDDFCCFDDDDDDDD
DDDDFCCFFDDDDDDD`],
  [ diaTrailGoal, bitmap`
DDDDFCCFFF5DDDDD
DDDFFCCFD55DDDDD
DDDFFCCFD5DDDDDD
DDDDFCCFDDDDDDDD
DDDDFCCFFDDDDDDD
DDDFFCCFFDDDDDDD
DDDDFCCFFDDDDDDD
DDDDFCCFDDDDDDDD
DDDFFCCFDDDDDDDD
DDDFFCCFDDDDDDDD
DDDDFCCFDDDDDDDD
DDDDFCCFFDDDDDDD
DDDDFCCFFFDDDDDD
DDFFFCCFDDDDDDDD
DDDDFCCFDDDDDDDD
DDDDFCCFFDDDDDD9`],
  [ treesLeave, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000004000455000
0000444444445000
0004444444444500
0044444444444400
0444444444444400
0044444444444400
0444444444444440
4044444444444440
0444444444444400
0444444444444450
4444444444444550
044CC4C4CCC44500`],
  [ staircase, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDLLLLL
DDDDDDDDDDDLLLLL
DDDDDDDDDLLLLLLL
DDDDDDDDDLLLLLLL
DDDDDDLLLLLLLLLL
DDDDDDLLLLLLL0C0
DDDDLLLLC0CLL0C0
DDDDLLLLC0CLL0C0
DDDDLL00C0CLL0C0
DDLLLC00C0CLL0C0
DDLL0C00C0CLL0C0
DDLC0C00C0CLL0C0
LLLC0C00C0CLLLLL
LLLCCCCCCCCLLLLL`],
  [ door, bitmap`
L00LLLLLLL1L100L
00LLLLLLLLL1L100
0LLLLLLLLLLL1LL0
LLLLLLLLLLLLL111
LLLLCCCCCCLLL1LL
LLLLCCCCCCLLLL11
LLLLCCCCCCLLLLLL
LLLLCCCCCCLLLLLL
LLLLCCCCCCLLLLLL
LLLLC1CCCCLLLLLL
LLLLCCCCCCLLLL1L
LLLLCCCCCCLLL113
LLLLCCCCCCLL113L
LLLLCCCCCCLL01LL
LLLLLLLLLLL0LLLL
LL1111111111LLLL`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
0C0C0C0C0C00LLLL
0C0C0C0C0C00LLLL
0C0C0C0C0C00LLLL
0C0C0C0C0C00LLLL
0C0C0C0C0C00LLLL
0C0C0C0C0C00LLLL
0C0C0C0C0C0CLLLL
0C0C0C0C0CC0LLLL
0C0C0C0CCC00LLLL`],
  [ roof, bitmap`
DDDDDDDDDDDDDD00
DDDDDDDDDDDDD00C
DDDDDDDDDDDDD0CC
DDDDDDDDDDDD0CCC
DDDDDDDDDDD00CCC
DDDDDDDDDD00CCCL
DDDDDDDDD00CCCLL
DDDDDDDD00CCCLLL
DDDDDDD00CCCLLLL
DDDDDD00CCCLLLLL
DDDDD00CCCL00000
DDDD00CCCLL01110
DDD00CCCLLL01110
DD00CCCLLLL00000
000CCCLLLLL01110
0CCCCLLLLLL01110`],
  [ groundTreesLeave, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDD444DDD
DD4DDDDDDDDDDDDD
444DDDDDDDDDDDDD
DDDDDD4DDD455DDD
DDDD444444445DDD
DDD44444444445DD
DD444444444444DD
D4444444444444DD
DD444444444444DD
D44444444444444D
4D4444444444444D
D4444444444444DD
D44444444444445D
444444444444455D
D44CC4C4CCC445DD`],
  [ groundTrees, bitmap`
DDDCCCCCCCC5DDDD
DDDCCCCCCCC5DDDD
DDDCCCCCCCC5DD4D
DDDCCCCCCCC5DDDD
DDDCCCCCCCC5DDDD
DDDCCCCCCC55DD44
D4DCCCCCCC55D444
4DDCCCCCCC55D4DD
4DDCCCCCCCC5DDDD
DDDCCCCCCCC5DDDD
DDDCCCCCCCC5DDDD
DD4CCCCCCCC5DDDD
DD4CCCCCCCC5DDDD
DD4CCC44C4C54DDD
444CC44CC4C5444D
4444444444444444`],
  [ building, bitmap`
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0L333LL3L3L33LL3
0L3LL3L3L3L3L3L3
0L333LL3L3L3L3L3
0L3LL3LL3LL3L3LL
0LLLLLLLLLLLLLL3
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
000LLL0LLLLLLLLL
000LLLL0LLLLLL0L
0L00LLLLLLLLLLLL`],
  [ roof2, bitmap`
00DDDDDDDDDDDDDD
C00DDDDDDDDDDDDD
CC0DDDDDDDDDDDDD
CCC0DDDDDDDDDDDD
CCC00DDDDDDDDDDD
LCCC00DDDDDDDDDD
LLCCC00DDDDDDDDD
LLLCCC00DDDDDDDD
LLLLCCC00DDDDDDD
LLLLLCCC00DDDDDD
00000LCCC00DDDDD
01110LLCCC00DDDD
01110LLLCCC00DDD
00000LLLLCCC00DD
01110LLLLLCCC000
01110LLLLLLCCCC0`],
  [ floor, bitmap`
0000000000000000
0000000000000000
00C3CCDCDCC33C00
0F3FFDFFDFFF3FF0
FC3CCFCCCCCFC3CC
FFFFFFFFFFFFFFFF
CCCFCCCCCFCCCCCC
FFFFFFFFFFFFFFFF
CCCCCCFCCCCCCFCC
FFFFFFFFFFFFFFFF
CCCCCCCFCCCCFCCC
FFFFFFFFFFFFFFFF
0CCCCFCCCFCCCDF0
00DFFFFFFFFFFD00
0000000000000000
0000000000000000`],
  [ insideDoor, bitmap`
0000000000000000
0000000000000000
00C3CCDCDCC33C00
0F3FFDFFDFFCCCCC
FC3CCFCCCCCCCCCC
FFFFFFFFFFFCCCCC
CCCFCCCCCFCCCCCC
FFFFFFFFFFFCCCCC
CCCCCCFCCCCCCCCC
FFFFFFFFFFFC1CCC
CCCCCCCFCCCCCCCC
FFFFFFFFFFFCCCCC
0CCCCFCCCFCCCCCC
00DFFFFFFFFCCCCC
00000000000CCCCC
0000000000000000`],
  [ floorDown, bitmap`
0000FCFCFCFF0000
000CFCFCFCFCF000
00DCFCFCFCF33C00
00FCFCFCFFFCF300
00FCFCFCFCFCFC00
00FFFCFCFCFFDC00
00FCFCFFFCFCFD00
00FCFFFCFCFCFC00
00FCFCFCFCFCDD00
00FFFCFCFFFCFC00
00FCFCFCFCFCFC00
00FCFCFCFCFFF300
00FCFFFCFCFC3300
00DDFCFFFCF3FC00
000FFCFCFCFCF000
0000FCFCFCFC0000`],
  [ keyTrap, bitmap`
CCCFCC222CCFCCFC
CCFCC2LLL2FCCFCC
CFCC2L222L2CFCCF
FCCF2L2F2L2FCCFC
CCFCC2L2L2FCCFCC
CFCCFC2L2FCCFCCF
FCCFCC2C2CCFCCFC
CCFCCF2C2CFCCFCC
CFCCFC2C2FCCFCCF
FCCFCC2C2CCFCCFC
CCFCCF2C22FCCFCC
CFCCFC2LL2CCFCCF
FCCFCC2L2CCFCCFC
CCFCCF2L32FCCFCC
CFCCFCC22CCCFCCC
FCCFCCFCCCCFCCCC`],
  [ insideDoor2, bitmap`
0000000000000000
0000000000000000
00C3CCDCDCC33C00
0F3FFDFFDFFCCCCC
FC3CCFCCCCCCCCCC
FFFFFFFFFFFCCCCC
CCCFCCCCCFCCCCCC
FFFFFFFFFFFCCCCC
CCCCCCFCCCCCCCCC
FFFFFFFFFFFC1CCC
CCCCCCCFCCCCCCCC
FFFFFFFFFFFCCCCC
0CCCCFCCCFCCCCCC
00DFFFFFFFFCCCCC
00000000000CCCCC
0002000000200000`],
  [ fakeInsideDoor2, bitmap`
0000000000000000
0000000000000000
00C3CCDCDCC33C00
0F3FFDFFDFFCCCCC
FC3CCFCCCCCCCCCC
FFFFFFFFFFFCCCCC
CCCFCCCCCFCCCCCC
FFFFFFFFFFFCCCCC
CCCCCCFCCCCCCCCC
FFFFFFFFFFFC1CCC
CCCCCCCFCCCCCCCC
FFFFFFFFFFFCCCCC
0CCCCFCCCFCCCCCC
00DFFFFFFFFCCCCC
00000000000CCCCC
L002000000200000`],
  [ floorTrap, bitmap`
0000000000000000
0000000000000000
00C3CCDCDCC33C00
0F3FFDFFDFFF3FF0
FC3CCFCCCCCFC3CC
FFFFFFFFFFFFFFFF
CCCFCCCCCFCCCCCC
FFFFFFFFFFFFFFFF
CCCCCCFCCCCCCFCC
FFFFFFFFFFFFFFFF
CCCCCCCFCCCCFCCC
FFFFFFFFFFFFFFFF
0CCCCFCCCFCCCDF0
00DFFFFFFFFFFD00
0000000000000000
L000000000000000`],
  [ jumpscareDoor, bitmap`
L000000000000000
0000000000000000
00C3CCDCDCC33C00
0F3FFDFFDFFCCCCC
FC3CCFCCCCCCCCCC
FFFFFFFFFFFCCCCC
CCCFCCCCCFCCCCCC
FFFFFFFFFFFCCCCC
CCCCCCFCCCCCCCCC
FFFFFFFFFFFC1CCC
CCCCCCCFCCCCCCCC
FFFFFFFFFFFCCCCC
0CCCCFCCCFCCCCCC
00DFFFFFFFFCCCCC
00000000000CCCCC
0000000000000000`],
  [ screwDriver, bitmap`
................
................
................
................
............1...
...........1....
..........1.....
.........1......
........1.......
......66........
.....666........
....666.........
...666..........
...66...........
................
................`],
  [ HUD, bitmap`
3333333333333333
3333333332222333
2333233333223332
2233223333223233
2232222222223223
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ inventory, bitmap`
3333333333333333
2333233332322332
2211133133331332
2211113111131322
2211111111131122
2211111111111122
2211111111111122
2211111111111122
2211111111111122
2211111111111122
22L1111111111122
22L1111111111322
22L1111111113322
22LLL11111111123
2222222222222232
2222222222222233`],
  [ screwDriverHUD, bitmap`
2233333333333333
2223332333223333
22LL33LL3LLLLL33
22LLLLLL3LLL1L32
22LLLLLLLLL1LL22
22LLLLLLLL1LLL22
22LLLLLLL1LLLL22
22LLLLL66LLLLL22
22LLLL666LLLLL22
22LLL666LLLLLL22
225L666LLLLLLL22
225L66LLLLLLL322
225LLLLLLLLL3322
22555LLLLLLLLL23
2222222222222232
2222222222222233`],
  [ vent, bitmap`
L11111111111111L
1111111111111111
11LLLLLLLLLLLL11
1111111111111111
11LLL000000LLL11
1111111111111111
11LLL000000LLL11
1111111111111111
11LLL000000LLL11
1111111113331111
11LLLLLLLL33LL11
1111111111311111
11LLLLLLLLL3LL11
1111111111111111
1111111111111111
L11111111111111L`],
  [ lockedVent, bitmap`
L11111111111111L
1111111111111111
11LLLLLLLLLLLL11
1111111111111111
11LLL000000LLL11
1111111111111111
11LLL000000LLL11
1111111111111111
11LLL000000LLL11
1111111113331111
11LLLLLLLL33LL11
1111111111311111
11LLLLLLLLL3LL11
1111111111111111
1111111111111111
L111111111111110`],
  [ ventWalls, bitmap`
111LL1111LL111LL
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
111LL1111LL111LL`],
  [ bloodTrail,bitmap`
................
................
................
..333...333.....
.33.33333.333...
.333333.3333....
.33333333333333.
..3..333333333..
....333333333...
3333333.333.33..
...333333333....
.333333.33333...
................
................
................
................`],
  [ staircaseB, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
LLLLLDDDDDDDDDDD
LLLLLDDDDDDDDDDD
LLLLLLLDDDDDDDDD
LLLLLLLDDDDDDDDD
LLLLLLLLLLDDDDDD
0C0LLLLLLLDDDDDD
0C0LLC0CLLLLDDDD
0C0LLC0CLLLLDDDD
0C0LLC0C00LLDDDD
0C0LLC0C00CLLLDD
0C0LLC0C00C0LLDD
0C0LLC0C00C0CLDD
LLLLLC0C00C0CLLL
LLLLLCCCCCCCCLLL`],
  [ grassGoal, bitmap`
...............4
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
................
................
................
................`],
  [ horoTrailGoal, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDFDDDDDDDDDDDD
D5DFFF555FDDD5F5
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
FFFFFFFFFFFFFFFF
DFDFFDDDFFDDFFFF
DDDFDDDDDDDFFDDF
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDD5`],
  [ playerB, bitmap`
................
..LL............
..LLL...........
444LLL..........
444LLL..........
444LLL..........
4LLLL.55555.....
C.LL...0.L75...0
C11152.C33L75500
C5.11555533LL50.
C111111..55.55..
C15051555505...0
CC0101...0L0..00
CC00.1....0.000.
.0..............
................`],
  [ road, bitmap`
...........LLLLL
...........LLLLL
...........LLLL6
...........LLLL6
...........LLL0L
...........LL00L
...........L00L6
...........L0LL6
...........0LLLL
...........LLL00
...........LLL06
...........00006
..........00LLLL
...........LLLLL
...........LLLL6
...........LLLL6`],
  [ tireMark, bitmap`
................
................
................
................
................
................
................
00..............
.00.............
..000...000.....
....0000..000...
.............000
000000..........
......00.......0
.......000...000
..........0000..`],
  [ gatesOfHeaven, bitmap`
................
................
1...1...1...1...
11.111.111.111.1
1.1.1.1.1.1.1.1.
1...1...1...1...
1...1..FFFFFF...
1...1.F666F66F..
1.1111F666666F1.
111.1.FF6666FF.1
11..1..FF66FF..1
1...1...FFFF1...
1...1...1FF.1...
1...1...1...1...
1...1...1...1...
1...1...1...1...`],
  [ you, bitmap`
................
................
3...3...........
3...3...........
3...3...........
.3.3............
..3..3333.3...3.
..3..3..3.3...3.
..3..3..3.3...3.
..3..3..3.3...3.
..3..3..3.3...3.
..3..3..3.3...3.
..3..3333.33333.
................
..............3.
...............3`],
  [ will, bitmap`
.......33.......
.........333.333
..............3.
...............3
.......3.3.3....
.........3.3....
.3...3.3.3.3....
.3.3.3.3.3.3....
.33333.3.3.3....
................
...........3....
...........3....
...3.......33...
...3..3.....3...
...3..33.....3..
...3.........3..`],
  [ never, bitmap`
................
................
................
................
................
3...3.333.3....3
33..3.3...33..33
3.3.3.33...3..3.
3..33.3....33.3.
3...3.333...33..
................
................
................
................
................
................`],
  [ never2, bitmap`
................
................
................
................
333..333........
3....3..3.......
3....3..3.......
33...333........
3....3..3.......
3....3..3.......
333..3..3.......
................
................
................
................
................`],
  [ leave, bitmap`
................
................
................
................
................
3...333.........
3...3....3......
3...33..3.3.....
3...3...333.3.3.
3...3...3.3.3.3.
333.333.3.3..3..
................
................
................
................
................`],
  [ grassGoal2, bitmap`
...............4
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
................
................
................
...............4`],
  
)




setBackground( grass);
setSolids([player, dark, moon, wall,groundTrees,groundTreesLeave,building,wall,roof,fakeInsideDoor2, screwDriverHUD, HUD, inventory,
          lockedVent, ventWalls])

let level = 0
const levels = [
  map`
LVK`,
  map`
..rw
..nj
s1vj`,
  map`
lllllllllm
tttttttttd
gggggggggg
gggggggggg
phhhhqgggg
gggggfgggg
gggggfgggg
gggggagggg`,
  map`
llllllllm
ttttttttd
gggggggrw
gggggggnj
phhhhh1vj
999999999
888888888`,
  map`
dddddddd
dddddddd
dddddddd
dddddddd
peeeeee5
dddddddd
dddddddd
dddddddd`,
  map`
dddddddddd
dddddddddd
dddddddddd
dddddddddd
peeezddddd
ddddzddddd
ddddzddddd
ddddeeee!d`,
  map`
ddddddddddd
ddddddddddd
ddddddddddd
ddddddddeec
peeeddddzdd
dddzedddzdd
ddddeeeeedd
dieeedddddd`,
  map`
sdddddddddd
zdddddddddd
zdddddddddd
zdddddddee7
eeeeddddzdd
dddzedddzdd
ddddeeeeedd
dpeeedddddd`,
  map`
ddddddddd
ddddddddd
ddddddddd
ddddddddd
peeeee!e5
ddddddddd
ddddddddd
ddddddddd
ddddddddd`,
  map`
ddddddddd
ddddddddd
ddddddddd
ddddddddd
seeeeepe)
ddddddddd
ddddddddd
ddddddddd
ddddddddd`,
  map`
ddddddddd
ddddddddd
ddddddddd
peeeddddd
dddzeeee!
ddddddddd`,
  map`
ddddddddd
dee-eeeed
deeeeeeed
deeeeeddd
epeeeee{d
ddddddddd`,
  map`
ddddddddd
dee_eeeed
deeeeeeed
deeeeeddd
eeeeeeepd
ddddddddd
;;>;>;<;;`,
  map`
ZZZZZZZZZ
p.......A
ZZZZZZZZZ`,
  map`
ZZZZZZZZ
.......A
pZ...Z.A
ZZZZZZZZ`,
  map`
ZpZ
Z.Z
Z.Z
Z.Z
Z.Z
Z.Z
ZAZ`,
  map`
ZpZ
Z.Z
Z.Z
Z.Z
Z.Z
Z.Z
Z.Z
Z.Z
Z_Z`,
  map`
eeeeee5
eedeeee
edddddz
peeeeee`,
  map`
tttttt
wggggg
nggggg
v*phhO`,
  map`
lllllllllllm
tttttttttttd
pgAggggggggg
999999999999
tttttttttttt`,
  map`
lllllllllllm
tttttttttttd
sApAgggggggg
999999999999
tttttttttttt`,
  map`
lllllllllllm
tttttttttttd
PsApAggggggg
999999999999
tttttttttttt`,
  map`
lllllllllllm
tttttttttttd
PPsApAgggggg
999999999999
tttttttttttt`,
  map`
lllllllllllm
tttttttttttd
PPPsApAggggg
999999999999
tttttttttttt`,
  map`
lllllllllllm
tttttttttttd
PPPPsApAgggg
999999999999
tttttttttttt`,
  map`
lllllllllllm
tttttttttttd
PPPPPsApAggg
999999999999
tttttttttttt`,
  map`
lllllllllllm
tttttttttttd
PPPPPPsApAgg
999999999999
tttttttttttt`,
  map`
lllllllllllm
tttttttttttd
PPPPPPPsApAg
999999999999
tttttttttttt`,
  map`
lllllllllllm
tttttttttttd
PPPPPPPPsApA
999999999999
tttttttttttt`,
  map`
gggggggggggA
gggggggggggA
pggggggggggA
gggggggggggA`,
  map`
p......W`,
  map`
pISBGJX`,
  



  map`
s`,
]

level = level + 0 // increment the level number by 1
setMap(levels[level])

addText("This is Darius" ,{
  y:10, color: color`2`});

addText("he was a very" ,{
  y:11, color: color`2`});

addText("succsesful man" ,{
  y:12, color: color`2`});

addText("but one day he had" ,{
  y:13, color: color`2`});

addText("a fatal crash ending" ,{
  y:14, color: color`2`});

addText("his life." ,{
  y:15, color: color`2`});

addText("press i to continue" ,{
  y:2, color: color`3`});

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

onInput("i", () => {
 level = level+1
  setMap(levels[level]);
  clearText();
  addText("there is a EVIL ",{
    y:2, color: color`2`});

  addText("spirit that has ",{
    y:3, color: color`2`});

  addText("created a world that",{
    y:4, color: color`2`});

  addText("is between the world ",{
    y:5, color: color`2`});

  addText("and the afterlife ",{
    y:6, color: color`2`});

  addText("for Darius to rest ",{
    y:7, color: color`2`});

  addText("in the afterlife he ",{
    y:8, color: color`2`});

  addText("MUST ESCAPE! ",{
    y:9, color: color`2`});

  addText("press k to continue" ,{
  y:15, color: color`2`});
  
});

onInput("k", () => {
  level = level+1
  setMap(levels[level]);
  clearText()
 
});





afterInput(() => {
    const diaGoalsCovered = tilesWith(player,diaTrailGoal) // tiles that both contain the player and goal

    // if both players touch goal it goes to next lvl
    if (diaGoalsCovered.length >= 1) {
        // go to next level
        level = level + 1;
        clearText();
       

        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("YOU WIN!!", { y: 4, color: color`3` });
          playTune(winn)
        }
    }
});

afterInput(() => {
  const playerOnStair = tilesWith(player, staircase)

  if (playerOnStair.length >= 1) {
    getFirst(player).y -= 1
  }
});

afterInput(() => {
    const doorGoalsCovered = tilesWith(player,door) // tiles that both contain the player and goal

    // if both players touch goal it goes to next lvl
    if (doorGoalsCovered.length >= 1) {
        // go to next level
        level = level + 1;
        clearText();
     storySong.end()
      playTune(houseMusic, [2])
     
     
       

        if (level < levels.length) {
            setMap(levels[level]);
           playTune(doorSound)
        } else {
            addText("YOU WIN!!", { y: 4, color: color`3` });
          playTune(winn)
        }
    }
});

afterInput(() => {
    const insideDoorGoalsCovered = tilesWith(player,insideDoor) // tiles that both contain the player and goal

    // if both players touch goal it goes to next lvl
    if (insideDoorGoalsCovered.length >= 1) {
        // go to next level
        level = level + 1;
        clearText();
       

        if (level < levels.length) {
            setMap(levels[level]);
          playTune(doorSound)
        } else {
            addText("YOU WIN!!", { y: 4, color: color`H` });
          playTune(winn)
        }
    }
});

afterInput(() => {
const keyTrapCovered = tilesWith(player, keyTrap)

 if (keyTrapCovered.length >= 1) {
        // go to next level
        level = level + 1;
        addText("RUN!!", { y:2, color: color`3`});
   addText("IT WAS A TRAP!", { y:4, color: color`3`});
   playTune(chaseMusic, [2])
   
  
       

        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("YOU WIN!!", { y: 4, color: color`H` });
          playTune(winn)
        }
 }
});

afterInput(() => {
    const spiritCovered = tilesWith(player, vengfulSpirit) // tiles that both contain the player and goal
    
    if (spiritCovered.length >= 1) {
      setMap(levels[level])
      playTune(jumpscare)
      
    }
  
    
});

afterInput(() => {
    const insideDoorGoals2Covered = tilesWith(player,insideDoor2) // tiles that both contain the player and goal

    // if both players touch goal it goes to next lvl
    if (insideDoorGoals2Covered.length >= 1) {
        // go to next level
        level = level + 1;
        clearText();
       

        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("YOU WIN!!", { y: 4, color: color`H` });
          playTune(winn)
        }
    }
});

afterInput(() => {
    const floorTrapCovered = tilesWith(player,floorTrap) // tiles that both contain the player and goal
    const doorJumpCovered = tilesWith(player, jumpscareDoor)
  const screwDriverCovered = tilesWith(player, screwDriver)
  const ventCovered = tilesWith(player, vent)
  const grassCovered = tilesWith(player, grassGoal)
   const horoTrailCovered = tilesWith(player, horoTrailGoal)
  const txtCovered = tilesWith(vengfulSpirit, levels[1])
  const gatesOfHeavenCovered = tilesWith(player, gatesOfHeaven)
  const grass2Covered = tilesWith(player, grassGoal2)

    // if both players touch goal it goes to next lvl
    if (floorTrapCovered.length >= 1) {
        // go to next level
        level = level + 1;
        clearText();
       

        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("YOU WIN!!", { y: 4, color: color`H` });
          playTune(winn)
        }
    }

if (doorJumpCovered.length >= 1) {
playTune(houseMusic, Infinity)
   level = level + 1;
        clearText();

  if( level < levels.length) {
    setMap(levels[level]);
  }
}


  if (screwDriverCovered.length >= 1) {
   level = level + 1;
        clearText();

  if( level < levels.length) {
    setMap(levels[level]);
    playTune(itemPickup)
  }
}

   if (ventCovered.length >= 1) {
   level = level + 1;
        clearText();

  if( level < levels.length) {
    setMap(levels[level]);
  }
}

  if (grassCovered.length >= 1) {
   level = level + 1;
        clearText();
      

  if( level < levels.length) {
    setMap(levels[level]);
  }
}

  if (horoTrailCovered.length >= 1) {
   level = level + 1;
        clearText();

  if( level < levels.length) {
    setMap(levels[level]);
  }
}

  if (gatesOfHeavenCovered.length >= 1) {
level = level + 1;
    clearText();

    if( level < levels.length) {
    setMap(levels[level]);
  }
  }

  if (grass2Covered.length >= 1) {
   level = level + 1;
        clearText();
        playTune(jumpscare)
      

  if( level < levels.length) {
    setMap(levels[level]);
  }
}
});





