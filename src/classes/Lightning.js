class Lightning {
  constructor(table, column, row, survivalRate, chainChance) {
    this.table = table;
    this.column = column;
    this.row = row;
    this.survivalRate = survivalRate;
    this.chainChance = chainChance;
  }

  lightningBolt() {
    boltProliferation(
      this.table,
      this.column,
      this.row,
      1 - this.survivalRate,
      1 - this.chainChance
    );
  }
}
function nextCoordinate() {
  return Math.floor(Math.random() * 3 - 1);
}

function boltProliferation(table, column, row, failureChance, chainChance) {
  let lightningDeathDelay = 100;
  let target = table.rows[row].cells[column];
  target.className = "white";
  let clearStrike = setInterval(function() {
    target.className = "black";
    lightningDeathDelay += 20;
    clearInterval(clearStrike);
  }, lightningDeathDelay);
  let gameHeight = table.rows.length;
  let gameWidth = table.rows[0].cells.length;
  let roll = Math.random();

  if (roll >= failureChance) {
    if (roll >= chainChance) {
      let chain = new Lightning(
        table,
        column,
        row,
        1 - failureChance * 2,
        1 - chainChance * 2
      );
      chain.lightningBolt();
    }
    let nextX = nextCoordinate();
    let nextY = nextCoordinate();
    let nextRow = row + nextY;
    let nextColumn = column + nextX;

    //Lightning must move, if the current coordinates are picked,
    //it rerolls without delay
    if (nextX === 0 && nextY === 0) {
      let tieBroken = tieBreaker();
      nextX = tieBroken[nextX];
      nextY = tieBroken[nextY];
    }
    let yBoundaries = nextRow >= 0 && nextRow < gameHeight;
    let xBoundaries = nextColumn >= 0 && nextColumn < gameWidth;
    if (yBoundaries && xBoundaries) {
      let nextStrike = setInterval(function() {
        boltProliferation(
          table,
          nextColumn,
          nextRow,
          failureChance,
          chainChance
        );
        clearInterval(nextStrike);
      }, 50);
    }
  }
}

function tieBreaker() {
  let coinFlip = Math.random();
  if (coinFlip >= 0.5) {
    if (coinFlip >= 0.75) {
      return { nextX: 1, nextY: 0 };
    } else {
      return { nextX: -1, nextY: 0 };
    }
  } else {
    if (coinFlip >= 0.25) {
      return { nextX: 0, nextY: 1 };
    } else {
      return { nextX: 0, nextY: -1 };
    }
  }
}

export default Lightning;
