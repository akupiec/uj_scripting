declare const player: {
  say: (msg: string) => void;
  execute: (msg: string) => void;
};

declare enum FillOperation {
  Replace = 0,
}

declare const blocks: {
  fill: (block: string | number, p: Position, p1: Position, f: FillOperation) => void;
};

declare interface Position {
  add: (p: Position) => Position;
  getValue: (i: number) => number;
}

declare function pos(i: number, j: number, k: number): Position;
