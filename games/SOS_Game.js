/*
@title: SOS_Game
@description: "SOS_Game" is a multiplayer game where players aim to create the word "SOS" in any direction on a grid. The game ends when there are no more empty spaces, and it displays the total number of successful SOS sequences made by each player. The winner is the player who made the most! Players take turns placing letters, earning additional turns by forming an "SOS."
@author: Milán Leskó
@tags: ['multiplayer', 'strategy', 'turn-based']
@addedOn: 2022-11-13

The aim of game is to make as many SOS words (in any direction) as you can.
The game ends when there are no more empty space left.
At the end, the game displays the total number of SOSes.

*/

const CURSOR = {
  right: { blue: "i", green: "k" },
  wrong: { blue: "g", green: "l" },
};

const LINES = {
  green: {
    a: {
      start: "q",
      middle: "r",
      end: "s",
    },
    b: {
      start: "t",
      middle: "u",
      end: "v",
    },
    c: {
      start: "w",
      middle: "x",
      end: "y",
    },
    d: {
      start: "z",
      middle: "ó",
      end: "ö",
    },
  },
  blue: {
    a: {
      start: "Q",
      middle: "R",
      end: "S",
    },
    b: {
      start: "T",
      middle: "U",
      end: "V",
    },
    c: {
      start: "W",
      middle: "X",
      end: "Y",
    },
    d: {
      start: "Z",
      middle: "Ó",
      end: "Ö",
    },
  },
};

const field = "m";

const LETTER = {
  o: "o",
  s: "p",
};

setLegend(
  [
    CURSOR.wrong.green,
    bitmap`
33L0444444440L33
3L0..........0L3
L0............0L
0..............0
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
0..............0
L0............0L
3L0..........0L3
33L0444444440L33`,
  ],
  [
    CURSOR.wrong.blue,
    bitmap`
33L0777777770L33
3L0..........0L3
L0............0L
0..............0
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
0..............0
L0............0L
3L0..........0L3
33L0777777770L33`,
  ],
  //LINES BLUE
  [
    LINES.blue.a.start,
    bitmap`
................
................
................
................
................
................
................
....777777777777
....777777777777
................
................
................
................
................
................
................`,
  ],
  [
    LINES.blue.a.middle,
    bitmap`
................
................
................
................
................
................
................
7777777777777777
7777777777777777
................
................
................
................
................
................
................`,
  ],
  [
    LINES.blue.a.end,
    bitmap`
................
................
................
................
................
................
................
777777777777....
777777777777....
................
................
................
................
................
................
................`,
  ],
  [
    LINES.blue.b.start,
    bitmap`
..............77
.............777
............777.
...........777..
..........777...
.........777....
........777.....
.......777......
......777.......
.....777........
....777.........
....77..........
................
................
................
................`,
  ],
  [
    LINES.blue.b.middle,
    bitmap`
..............77
.............777
............777.
...........777..
..........777...
.........777....
........777.....
.......777......
......777.......
.....777........
....777.........
...777..........
..777...........
.777............
777.............
77..............`,
  ],
  [
    LINES.blue.b.end,
    bitmap`
................
................
................
................
..........77....
.........777....
........777.....
.......777......
......777.......
.....777........
....777.........
...777..........
..777...........
.777............
777.............
77..............`,
  ],
  [
    LINES.blue.c.start,
    bitmap`
................
................
................
................
....77..........
....777.........
.....777........
......777.......
.......777......
........777.....
.........777....
..........777...
...........777..
............777.
.............777
..............77`,
  ],
  [
    LINES.blue.c.middle,
    bitmap`
77..............
777.............
.777............
..777...........
...777..........
....777.........
.....777........
......777.......
.......777......
........777.....
.........777....
..........777...
...........777..
............777.
.............777
..............77`,
  ],
  [
    LINES.blue.c.end,
    bitmap`
77..............
777.............
.777............
..777...........
...777..........
....777.........
.....777........
......777.......
.......777......
........777.....
.........777....
..........77....
................
................
................
................`,
  ],
  [
    LINES.blue.d.start,
    bitmap`
................
................
................
................
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......`,
  ],
  [
    LINES.blue.d.middle,
    bitmap`
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......`,
  ],
  [
    LINES.blue.d.end,
    bitmap`
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
.......77.......
................
................
................
................`,
  ],
  //LINES GREEN
  [
    LINES.green.a.start,
    bitmap`
................
................
................
................
................
................
................
....444444444444
....444444444444
................
................
................
................
................
................
................`,
  ],
  [
    LINES.green.a.middle,
    bitmap`
................
................
................
................
................
................
................
4444444444444444
4444444444444444
................
................
................
................
................
................
................`,
  ],
  [
    LINES.green.a.end,
    bitmap`
................
................
................
................
................
................
................
444444444444....
444444444444....
................
................
................
................
................
................
................`,
  ],
  [
    LINES.green.b.start,
    bitmap`
..............44
.............444
............444.
...........444..
..........444...
.........444....
........444.....
.......444......
......444.......
.....444........
....444.........
....44..........
................
................
................
................`,
  ],
  [
    LINES.green.b.middle,
    bitmap`
..............44
.............444
............444.
...........444..
..........444...
.........444....
........444.....
.......444......
......444.......
.....444........
....444.........
...444..........
..444...........
.444............
444.............
44..............`,
  ],
  [
    LINES.green.b.end,
    bitmap`
................
................
................
................
..........44....
.........444....
........444.....
.......444......
......444.......
.....444........
....444.........
...444..........
..444...........
.444............
444.............
44..............`,
  ],
  [
    LINES.green.c.start,
    bitmap`
................
................
................
................
....44..........
....444.........
.....444........
......444.......
.......444......
........444.....
.........444....
..........444...
...........444..
............444.
.............444
..............44`,
  ],
  [
    LINES.green.c.middle,
    bitmap`
44..............
444.............
.444............
..444...........
...444..........
....444.........
.....444........
......444.......
.......444......
........444.....
.........444....
..........444...
...........444..
............444.
.............444
..............44`,
  ],
  [
    LINES.green.c.end,
    bitmap`
44..............
444.............
.444............
..444...........
...444..........
....444.........
.....444........
......444.......
.......444......
........444.....
.........444....
..........44....
................
................
................
................`,
  ],
  [
    LINES.green.d.start,
    bitmap`
................
................
................
................
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......`,
  ],
  [
    LINES.green.d.middle,
    bitmap`
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......`,
  ],
  [
    LINES.green.d.end,
    bitmap`
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
.......44.......
................
................
................
................`,
  ],
  [
    LETTER.s,
    bitmap`
................
................
.....333333.....
....33333333....
...333....333...
...33......33...
...333..........
....3333333.....
.....3333333....
..........333...
...33......33...
...333....333...
....33333333....
.....333333.....
................
................`,
  ],
  [
    LETTER.o,
    bitmap`
................
................
.....555555.....
....55555555....
...555....555...
...55......55...
...55......55...
...55......55...
...55......55...
...55......55...
...55......55...
...555....555...
....55555555....
.....555555.....
................
................`,
  ],
  [
    CURSOR.right.green,
    bitmap`
440L44444444L044
40L..........L04
0L............L0
L..............L
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
4..............4
L..............L
0L............L0
40L..........L04
440L44444444L044`,
  ],
  [
    CURSOR.right.blue,
    bitmap`
770L77777777L077
70L..........L07
0L............L0
L..............L
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
7..............7
L..............L
0L............L0
70L..........L07
770L77777777L077`,
  ],
  [
    field,
    bitmap`
1111111111111111
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1111111111111111`,
  ]
);

let currentPlayer = "blue";
let game = true;
let maps = [
  map`
mmmmmmmmm
mmmmmmmmm
mmmmmmmmm
mmmmmmmmm
mmmmmmmmm
mmmmmmmmm
mmmmmmmmm`,
  map`
.........
.........
.........
.........
.........
.........
.........`,
];

setMap(maps[0]);
let pointer = {
  type: CURSOR.right[currentPlayer],
  pos: { x: 4, y: 3 },
};
addSprite(4, 3, pointer.type);

let saved = [];
let lettersPlaced = [];

const changeCursor = () => {
  const correct = canPlace()
    ? CURSOR.right[currentPlayer]
    : CURSOR.wrong[currentPlayer];
  getFirst(pointer.type).type = correct;
  pointer.type = correct;
};

const stepCursor = (to) => {
  if (!game) return;
  switch (to) {
    case "up":
      getFirst(pointer.type).y -= 1;
      break;
    case "down":
      getFirst(pointer.type).y += 1;
      break;
    case "left":
      getFirst(pointer.type).x -= 1;
      break;
    case "right":
      getFirst(pointer.type).x += 1;
  }
};

const showEndScreen = (sosForGreen, sosForBlue) => {
  playTune(tune`
188.67924528301887: e4^188.67924528301887,
188.67924528301887: e4^188.67924528301887 + c5-188.67924528301887,
188.67924528301887: g4^188.67924528301887 + d5-188.67924528301887,
188.67924528301887: g4^188.67924528301887,
188.67924528301887: c4^188.67924528301887 + c5-188.67924528301887,
188.67924528301887: c4^188.67924528301887 + d5-188.67924528301887,
188.67924528301887: e4^188.67924528301887,
188.67924528301887: e4^188.67924528301887 + c5-188.67924528301887,
188.67924528301887: g4^188.67924528301887 + d5-188.67924528301887,
188.67924528301887: g4^188.67924528301887,
188.67924528301887: c4^188.67924528301887 + c5-188.67924528301887,
188.67924528301887: c4^188.67924528301887 + d5-188.67924528301887,
188.67924528301887,
188.67924528301887: c5-188.67924528301887,
188.67924528301887: c5-188.67924528301887,
3207.5471698113206`);
  game = false;
  setMap(maps[1]);
  getAll().forEach((sprite) => sprite.remove());
  let winner;
  let colorOfWinner;
  if (sosForGreen > sosForBlue) {
    winner = "Green";
    colorOfWinner = 4;
  } else if (sosForGreen < sosForBlue) {
    winner = "Blue";
    colorOfWinner = 7;
  } else if (sosForGreen === sosForBlue) {
    winner = "Draw";
    colorOfWinner = "L";
  }
  addText(`Winner: `, {
    x: 7,
    y: 3,
    color: color`0`,
  });
  addText(winner, {
    x: 8,
    y: 5,
    color: color`${colorOfWinner}`,
  });
  addText("Points:", {
    x: 7,
    y: 7,
    color: color`0`,
  });
  addText("Green:", {
    x: 4,
    y: 9,
    color: color`D`,
  });
  addText(String(sosForGreen), {
    x: 11,
    y: 9,
    color: color`4`,
  });
  addText("Blue:", {
    x: 5,
    y: 11,
    color: color`5`,
  });
  addText(String(sosForBlue), {
    x: 11,
    y: 11,
    color: color`7`,
  });
  addText("Press l to restart", {
    x: 1,
    y: 14,
    color: color`1`,
  });
};

const checkWin = () => {
  const allS = getAll(LETTER.s).length;
  const allO = getAll(LETTER.o).length;
  let sosForBlue = 0;
  let sosForGreen = 0;
  if (allS + allO === width() * height()) {
    saved.forEach((value) => {
      if (value.player === "blue") {
        sosForBlue += 1;
      } else if (value.player === "green") {
        sosForGreen += 1;
      }
    });
    showEndScreen(sosForGreen, sosForBlue);
  }
};

const renderLines = (line) => {
  addSprite(
    line.start.x,
    line.start.y,
    LINES[line.player][line.type][line.reverse ? "end" : "start"]
  );
  addSprite(
    line.middle.x,
    line.middle.y,
    LINES[line.player][line.type]["middle"]
  );
  addSprite(
    line.end.x,
    line.end.y,
    LINES[line.player][line.type][line.reverse ? "start" : "end"]
  );
};

const getLetterTypeBySequenceLoopIndex = (index) => {
  return index === 1 ? "o" : "s";
};

const getSequenceInDirection = (
  initialX,
  initialY,
  xStepDirection,
  yStepDirection,
  xAndYAxesCouple
) => {
  let sequenceFound = [];
  let isReversed = false;

  const firstLetterInSequence = lettersPlaced.find(
    (letter) => letter.x === initialX && letter.y === initialY
  );

  if (firstLetterInSequence.value === "s") {
    for (let i = 0; i < 3; i++) {
      const letter = lettersPlaced.find((letter) => {
        return (
          letter.x === initialX + i * xStepDirection &&
          letter.y === initialY + i * yStepDirection &&
          letter.value === getLetterTypeBySequenceLoopIndex(i)
        );
      });

      letter && sequenceFound.push(letter);
    }
  } else if (xAndYAxesCouple % 2 === 0) {
    /* `xAndYAxesCouple` represents the index of the array `sequenceChecks` with which
     * this function is called with. If the last placed letter is an O, we only check
     * its direct neighbours, therefore, we only need to execute the following code for
     * every second X and Y couple in `sequenceChecks`.
     *
     */
    const letterNextToO = lettersPlaced.find((letter) => {
      return (
        letter.x === initialX + xStepDirection &&
        letter.y === initialY + yStepDirection &&
        letter.value === "s"
      );
    });
    const otherLetterNextToO = lettersPlaced.find((letter) => {
      return (
        letter.x === initialX - xStepDirection &&
        letter.y === initialY - yStepDirection &&
        letter.value === "s"
      );
    });
    letterNextToO && sequenceFound.push(letterNextToO);
    sequenceFound.push(firstLetterInSequence);
    otherLetterNextToO && sequenceFound.push(otherLetterNextToO);
    isReversed = !isReversed;
  }

  let typeOfDirection;

  switch (`${xStepDirection}, ${yStepDirection}`) {
    case "-1, 0":
      typeOfDirection = "a";
      isReversed = !isReversed;
      break;
    case "1, 0":
      typeOfDirection = "a";
      break;
    case "-1, 1":
      typeOfDirection = "b";
      isReversed = !isReversed;
      break;
    case "1, -1":
      typeOfDirection = "b";
      break;
    case "-1, -1":
      typeOfDirection = "c";
      isReversed = !isReversed;
      break;
    case "1, 1":
      typeOfDirection = "c";
      break;
    case "0, -1":
      typeOfDirection = "d";
      isReversed = !isReversed;
      break;
    case "0, 1":
      typeOfDirection = "d";
  }

  return sequenceFound.length === 3
    ? {
        player: currentPlayer,
        start: { x: sequenceFound[0].x, y: sequenceFound[0].y },
        middle: { x: sequenceFound[1].x, y: sequenceFound[1].y },
        end: { x: sequenceFound[2].x, y: sequenceFound[2].y },
        type: typeOfDirection,
        reverse: isReversed,
      }
    : false;
};

const checkForSequences = () => {
  let giveAnotherTurn = false;
  const sequenceChecks = [
    [-1, 1],
    [1, -1],
    [1, 1],
    [-1, -1],
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];

  for (let i = 0; i < sequenceChecks.length; i++) {
    const result = getSequenceInDirection(
      pointer.pos.x,
      pointer.pos.y,
      sequenceChecks[i][0],
      sequenceChecks[i][1],
      i
    );
    if (result !== false) {
      // Sequence detected
      saved.push(result);
      giveAnotherTurn = true;
      renderLines(result);
    }
  }
  return giveAnotherTurn;
};

const placeLetter = (which) => {
  if (canPlace() && game) {
    addSprite(pointer.pos.x, pointer.pos.y, LETTER[which]);
    lettersPlaced.push({
      value: which,
      x: pointer.pos.x,
      y: pointer.pos.y,
    });
    const giveAnotherTurn = checkForSequences();
    checkWin();
    if (giveAnotherTurn === false)
      currentPlayer = currentPlayer === "blue" ? "green" : "blue";
  }
};

// CONTROLS

onInput("w", () => {
  stepCursor("up");
});
onInput("s", () => {
  stepCursor("down");
});
onInput("a", () => {
  stepCursor("left");
});
onInput("d", () => {
  stepCursor("right");
});
onInput("j", () => {
  placeLetter("s");
});
onInput("k", () => {
  placeLetter("o");
});

onInput("l", () => {
  if (!game) {
    clearText();
    currentPlayer = "blue";
    game = true;
    setMap(maps[0]);
    pointer = {
      type: CURSOR.right[currentPlayer],
      pos: { x: 4, y: 3 },
    };
    addSprite(4, 3, pointer.type);
    saved = [];
    lettersPlaced = [];
  }
});

const canPlace = () => {
  return (
    lettersPlaced.find(
      (letter) => letter.x === pointer.pos.x && letter.y === pointer.pos.y
    ) === undefined
  );
};

afterInput(() => {
  if (game) {
    pointer.pos = { x: getFirst(pointer.type).x, y: getFirst(pointer.type).y };
    changeCursor();
  }
});
