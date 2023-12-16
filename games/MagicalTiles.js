/*
@title: MusicalTiles
@author: Shreeya Rani

Creds:-
Nomis by Cheru Berhanu (Inspired me for the project)
Music! by Akeell (Inspiration for the project)
*/

const pink = "a";
const blue = "d";
const green = "s";
const yellow = "w";
const red = "j";
const purple = "k";
const orange = "l";
const black = "b";

setLegend(
  [ pink, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888880008888888
8888808880888888
8888088888088888
8888088888088888
8888088888088888
8888000000088888
8888088888088888
8888088888088888
8888088888088888
8888088888088888
8888888888888888
8888888888888888
8888888888888888`],

  [ green, bitmap`
4444444444444444
4444444444444444
4444444000444444
4444440444044444
4444404444404444
4444404444404444
4444404444444444
4444440444444444
4444444000444444
4444444444044444
4444444444404444
4444404444404444
4444440044004444
4444444000444444
4444444444444444
4444444444444444`],
  
  [ blue, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777700077777777
7777707000777777
7777707770777777
7777707770077777
7777707777077777
7777707777077777
7777707777077777
7777707770077777
7777707700777777
7777700007777777
7777777777777777
7777777777777777
7777777777777777`],
  
  [ yellow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666066666660666
6666066666660666
6666066666660666
6666066666660666
6666066666660666
6666066606660666
6666066060660666
6666060666060666
6666006666600666
6666666666666666
6666666666666666
6666666666666666`],

  [ red, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333000000003333
3333333303333333
3333333303333333
3333333303333333
3333333303333333
3333333303333333
3333333303333333
3333303303333333
3333300003333333
3333330033333333
3333333333333333
3333333333333333
3333333333333333`],

  [ purple, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHH0HHH0HHHHHH
HHHHH0HH00HHHHHH
HHHHH0HH0HHHHHHH
HHHHH0H00HHHHHHH
HHHHH000HHHHHHHH
HHHHH0H000HHHHHH
HHHHH0HHH0HHHHHH
HHHHH0HHH00HHHHH
HHHHH0HHHH0HHHHH
HHHHH0HHHH00HHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],

  [ orange, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999990999999999
9999990999999999
9999990999999999
9999990999999999
9999990999999999
9999990999999999
9999990999999999
9999990999999999
9999990999999999
9999990000009999
9999999999999999
9999999999999999
9999999999999999`],

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
0000000000000000`]
  

);

let maps = {
    default: map`
bbwbb
ajkld
bbsbb`
}

setMap(maps.default);

const pinkTune = tune`
500: A5~500 + G5~500 + D5~500 + C5~500 + B4~500,
500: F5~500 + E5~500 + D5~500 + F4~500 + E4~500,
15000`

const blueTune = tune`
500: A5-500 + G5-500 + E5-500 + D5-500 + C5-500,
500: A4-500 + G4-500 + D4-500,
500: F4-500,
14500`

const greenTune = tune`
500: F5^500 + E5^500 + D4^500,
500: A5^500 + B4^500 + A4^500 + G4^500,
500: F4^500,
14500`

const yellowTune = tune`
500: G5/500 + F5/500 + G4/500 + F4/500,
500: A5/500 + D5/500 + F4/500 + E4/500,
500: D5/500 + C5/500 + B4/500,
14500`

const redTune = tune`
48.939641109298535: F5~48.939641109298535 + G4~48.939641109298535 + C5-48.939641109298535,
48.939641109298535: F5~48.939641109298535 + E5~48.939641109298535 + A4~48.939641109298535 + G4~48.939641109298535 + D5-48.939641109298535,
48.939641109298535: B4~48.939641109298535 + A4~48.939641109298535,
1419.2495921696575`

const purpleTune = tune`
115.83011583011583: F5^115.83011583011583 + E5-115.83011583011583 + A4^115.83011583011583 + D5-115.83011583011583 + C5-115.83011583011583,
115.83011583011583: E5^115.83011583011583 + D5^115.83011583011583 + C5^115.83011583011583 + B4^115.83011583011583 + A4^115.83011583011583,
3474.903474903475`

const orangeTune = tune`
79.36507936507937: A4~79.36507936507937 + F4/79.36507936507937 + G5/79.36507936507937 + F5/79.36507936507937,
79.36507936507937: F5~79.36507936507937 + D5~79.36507936507937 + C5~79.36507936507937 + G4/79.36507936507937 + F4/79.36507936507937,
79.36507936507937: C5~79.36507936507937 + B4~79.36507936507937 + A4~79.36507936507937,
2301.5873015873017`

onInput("w", () => {
  playTune(yellowTune)
});

onInput("a", () => {
  playTune(pinkTune)
});

onInput("s", () => {
  playTune(greenTune)
});

onInput("d", () => {
  playTune(blueTune)
});

onInput("j", () => {
  playTune(redTune)
});

onInput("k", () => {
  playTune(purpleTune)
});

onInput("l", () => {
  playTune(orangeTune)
});


  
  
