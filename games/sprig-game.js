(() => {
  // define Sprites
  const player1 = "1";
  const player2 = "2";
  const ball = "b";
  const background = "d";
  const lines = "l";

  // set up the sprites
  setLegend(
    [player1, bitmap`
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......`],
    [player2, bitmap`
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......`],
    [ball, bitmap`
....24444222....
...2244442222...
..222222222222..
.22222222222222.
2222222222222222
2200002200002222
2207202207202222
2220002220002222
2222222222222222
2222222222222222
2222222222222222
0222222222222222
.00022220000222.
..200000022222..
...2222222222...
....22222222....`],
    [background,  bitmap`
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
    [lines,  bitmap`
................
.......22.......
.......22.......
................
................
.......22.......
.......22.......
................
................
.......22.......
.......22.......
................
................
.......22.......
.......22.......
................`]


  );

  setBackground(background)
  // game map
  const level = map`
......l......
......l......
......l......
......l......
1.....b.....2
......l......
......l......
......l......
......l......`;
  setMap(level);

  setSolids([player1, player2]);

  let ballDirX = 1;  // ball direction X
  let ballDirY = 1;  // ball direction Y
  const speed = 400; // ball speed (milliseconds)

  // reset after scoring
  function resetBall() {
    const ballSprite = getFirst(ball);
    ballSprite.x = Math.floor(width() / 2);  // Center X
    ballSprite.y = Math.floor(height() / 2); // Center Y
    ballDirX *= -1; // Change direction to alternate serve
  }

  // player movement controls
  onInput("w", () => { if (getFirst(player1).y > 0) getFirst(player1).y -= 1; });
  onInput("s", () => { if (getFirst(player1).y < height() - 1) getFirst(player1).y += 1; });

  onInput("i", () => { if (getFirst(player2).y > 0) getFirst(player2).y -= 1; });
  onInput("k", () => { if (getFirst(player2).y < height() - 1) getFirst(player2).y += 1; });

  // ball update function for continuous movement
  function updateBall() {
    const ballSprite = getFirst(ball);

    // update ball position
    ballSprite.x += ballDirX;
    ballSprite.y += ballDirY;

    // bounce off walls
    if (ballSprite.y <= 0 || ballSprite.y >= height() - 1) {
      ballDirY *= -1;
    }

    // bounce off player
    if (tilesWith(ball, player1).length > 0 || tilesWith(ball, player2).length > 0) {
      ballDirX *= -1;
    }

    // Check if ball goes past walls and reset
    if (ballSprite.x <= 0 || ballSprite.x >= width() - 1) {
      resetBall();
    }
  }

  // set an interval to keep the ball moving
  const gameLoop = setInterval(updateBall, speed);
})();