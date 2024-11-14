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

export function blockRef(idx: number) {
  return data.palette ? blocks.blockByName(data.palette[blockData[idx]]) : blockData[idx];
}

function buildAll(sPos: Position, start: number, end: number, size: number[]) {
  let multiblock = 0;
  for (let i = 20; i < size[0]; i++) {
    for (let j = 0; j < size[1]; j++) {
      for (let k = 0; k < size[2]; k++) {
        const n = i * size[2] * size[1] + j * size[2] + k;
        if (n % 250 == 0) player.say("place block " + n + " of " + blockData.length);

        const b = blockRef(n);
        if (b == AIR) continue;
        const p = sPos.add(pos(k, i, j));

        if (k < size[2] - 1 && blockData[n + 1] === blockData[i]) {
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
    if (pp.indexOf("[") === -1) {
      const b = blocks.blockByName(pp);
      player.say(pp);
      if (z > maxLen) {
        z = 2;
        x++;
      }
      const p = sPos.add(pos(x, 0, z++));
      blocks.place(b, p);
    }
  });
}
