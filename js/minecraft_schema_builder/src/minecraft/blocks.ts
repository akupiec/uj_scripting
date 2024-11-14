import "./types/player";
import { indexToCords } from "../utils/indexToCords";

export function cleanSpace(sPos: Position, size: number[], showProgress: boolean) {
  for (let i = 0; i < size[0]; i += 20) {
    for (let j = -5; j < size[1] + 10; j += 20) {
      for (let k = -5; k < size[2] + 10; k += 20) {
        const p0 = sPos.add(pos(k, i, j));
        const p1 = p0.add(pos(19, 19, 19));
        if (showProgress) player.say("clear: " + p0);
        blocks.fill(0, p0, p1, FillOperation.Replace);
      }
    }
  }
}

function blockRef(idx: number) {
  const b: string = data.palette[blockData[idx]];
  if (!b) return "air";
  return b;
}

function buildAll(sPos: Position, start: number, end: number, size: number[], showProgress: boolean) {
  let multiblock = 0;
  const startI = start * size[1] * size[2];
  const endI = end * size[1] * size[2];
  for (let n = startI; n < endI; n++) {
    if (showProgress && n % 250 == 0) player.say("place block " + n + " of " + blockData.length);
    const [i, j, k] = indexToCords(n, size);
    const b = blockRef(n);
    if (b == "air") continue;

    const p = sPos.add(pos(k, i, j));
    if (k < size[2] - 1 && blockData[n + 1] === blockData[n]) {
      multiblock++;
    } else if (multiblock != 0) {
      const p0 = p.add(pos(-multiblock, 0, 0));
      player.execute(
        `fill ${p0.getValue(0)} ${p0.getValue(1)} ${p0.getValue(2)} ${p.getValue(0)} ${p.getValue(1)} ${p.getValue(
          2,
        )} ${b}`,
      );
      multiblock = 0;
    } else {
      player.execute(`setblock ${p.getValue(0)} ${p.getValue(1)} ${p.getValue(2)} ${b}`);
    }
  }
}

function buildPalette(sPos: Position, palette: any, maxLen: number) {
  let x = 0;
  let z = 2;
  Object.keys(palette).forEach((k, i) => {
    const pp: string = palette[k];
    if (z > maxLen) {
      z = 2;
      x++;
    }
    const p = sPos.add(pos(x, 0, z++));
    player.say(`setblock ${p.getValue(0)} ${p.getValue(1)} ${p.getValue(2)} ${pp} ${i}`);
    player.execute(`setblock ${p.getValue(0)} ${p.getValue(1)} ${p.getValue(2)} ${pp}`);
  });
}
