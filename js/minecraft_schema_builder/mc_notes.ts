for (let x = 0; x < 1000; x += 20) {
  for (let y = 0; y < 1000; y += 20) {
    for (let z = 0; z < 1000; z += 20) {
      // Calculate the end position for each 20x20x20 chunk
      let endX = Math.min(x + 19, 999);
      let endY = Math.min(y + 19, 999);
      let endZ = Math.min(z + 19, 999);

      // Clear the 20x20x20 chunk
      blocks.fill(AIR, pos(x, y, z), pos(endX, endY, endZ), FillOperation.Replace);
    }
  }
}


blocks.place(blocks.blockByName("Calcite"), pos(0,0,2))
