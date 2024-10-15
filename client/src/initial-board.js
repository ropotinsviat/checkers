class Checker {
  color;
  king;
  beaten;

  constructor(color) {
    this.color = color;
    this.king = false;
    this.beaten = false;
  }
}

export default function initialBoard() {
  return [
    [
      null,
      new Checker(false),
      null,
      new Checker(false),
      null,
      new Checker(false),
      null,
      new Checker(false),
    ],
    [
      new Checker(false),
      null,
      new Checker(false),
      null,
      new Checker(false),
      null,
      new Checker(false),
      null,
    ],
    [
      null,
      new Checker(false),
      null,
      new Checker(false),
      null,
      new Checker(false),
      null,
      new Checker(false),
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      new Checker(true),
      null,
      new Checker(true),
      null,
      new Checker(true),
      null,
      new Checker(true),
      null,
    ],
    [
      null,
      new Checker(true),
      null,
      new Checker(true),
      null,
      new Checker(true),
      null,
      new Checker(true),
    ],
    [
      new Checker(true),
      null,
      new Checker(true),
      null,
      new Checker(true),
      null,
      new Checker(true),
      null,
    ],
  ];
}
