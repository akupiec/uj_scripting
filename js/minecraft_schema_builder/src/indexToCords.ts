function indexToCords(index: number, dimX: number, dimY: number, dimZ: number) {
  const x = Math.floor(index / (dimY * dimZ));
  const y = Math.floor((index % (dimY * dimZ)) / dimZ);
  const z = index % dimZ;
  return { x, y, z};
}
