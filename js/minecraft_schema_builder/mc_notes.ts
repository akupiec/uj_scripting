// for (let x = 0; x < 1000; x += 20) {
//   for (let y = 0; y < 1000; y += 20) {
//     for (let z = 0; z < 1000; z += 20) {
//       // Calculate the end position for each 20x20x20 chunk
//       let endX = Math.min(x + 19, 999);
//       let endY = Math.min(y + 19, 999);
//       let endZ = Math.min(z + 19, 999);
//
//       // Clear the 20x20x20 chunk
//       blocks.fill(AIR, pos(x, y, z), pos(endX, endY, endZ), FillOperation.Replace);
//     }
//   }
// }
//
//
// blocks.place(blocks.blockByName("Tuff"), pos(0,0,2))
// player.runChatCommand(`/setblock ~ ~ ~ tuff`);
// player.runChatCommand(`/setblock ~ ~ ~ tuff`);
player.execute(`setblock ~ ~ ~2 trapdoor["direction":0,"upside_down_bit":false,"open_bit":true]`);
player.execute(`setblock ~ ~ ~4 trapdoor["direction":1,"upside_down_bit":false,"open_bit":true]`);
player.execute(`setblock ~ ~ ~6 trapdoor["direction":2,"upside_down_bit":false,"open_bit":true]`);
player.execute(`setblock ~ ~ ~8 trapdoor["direction":3,"upside_down_bit":false,"open_bit":true]`);

//
//

for (let i = 0; i < 4; i++) {
  console.log(`player.execute(\`setblock ~ ~ ~${i*2+2} trapdoor["direction":${i},"upside_down_bit":false,"open_bit":true]\`);`)
}

// for (let i = 0; i < 4; i++) {
//   console.log(`player.execute(\`setblock ~2 ~ ~${i*2+2} trapdoor["direction":${i},"upside_down_bit":false,"open_bit":false]\`);`)
// }
