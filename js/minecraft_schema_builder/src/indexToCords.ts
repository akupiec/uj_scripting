export function indexToCords(index: number, size: number[]) {
  const i = Math.floor(index / (size[1] * size[2]));
  const j = Math.floor((index % (size[1] * size[2])) / size[2]);
  const k = index % size[2];
  return [ i, j, k ];
}

