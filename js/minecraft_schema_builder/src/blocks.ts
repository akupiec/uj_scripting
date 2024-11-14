export function cleanSpace(sPos: Position, size: number[]) {
  for (let i = 0; i < size[0]; i += 20) {
    for (let j = -5; j < size[1] + 10; j += 20) {
      for (let k = -5; k < size[2] + 10; k += 20) {
        const p0 = sPos.add(pos(k, i, j));
        const p1 = p0.add(pos(19, 19, 19));
        player.say("clear: " + p0);
        blocks.fill(AIR, p0, p1, FillOperation.Replace);
      }
    }
  }
}

function blockRef(idx: number) {
  if (!data.palette) return -1;
  const b: string = data.palette[blockData[idx]];
  if (b.includes("[")) return -1;
  return blocks.blockByName(data.palette[blockData[idx]]);
}

function buildAll(sPos: Position, start: number, end: number, size: number[]) {
  let multiblock = 0;
  for (let i = start; i < end; i++) {
    for (let j = 0; j < size[1]; j++) {
      for (let k = 0; k < size[2]; k++) {
        const n = i * size[2] * size[1] + j * size[2] + k;
        if (n % 250 == 0) player.say("place block " + n + " of " + blockData.length);

        const b = blockRef(n);
        if (b == AIR) continue;

        const p = sPos.add(pos(k, i, j));
        if (b == -1) {
          player.execute(`setblock ${p.getValue(0)} ${p.getValue(1)} ${p.getValue(2)} ${data.palette[blockData[n]]}`);
        } else if (k < size[2] - 1 && blockData[n + 1] === blockData[i]) {
          multiblock++;
        } else if (multiblock != 0) {
          const p0 = p.add(pos(-multiblock, 0, 0));
          blocks.fill(b, p0, p, FillOperation.Replace);
          multiblock = 0;
        } else if (!blocks.testForBlock(b, p)) {
          blocks.place(b, p);
        }
      }
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
    if (pp.indexOf("[") === -1) {
      const b = blocks.blockByName(pp);
      if (pp != "Air" && b == 0) {
        player.say(pp);
      }
      blocks.place(b, p);
    } else {
      player.say(`setblock ${p.getValue(0)} ~${p.getValue(1)} ~${p.getValue(2)} ${pp}`);
      player.execute(`setblock ${p.getValue(0)} ${p.getValue(1)} ${p.getValue(2)} ${pp}`);
    }
  });
}
