import fs from "fs";
import { parseSchema } from "./schemaTools/encoder";

// const out = await parseSchema('./darkest-castle.schem');
const out = await parseSchema("./simple-castle.schematic");
// fs.writeFileSync("./out.json", JSON.stringify(out));

const base1023RAW = fs.readFileSync("./src/schemaTools/decodeBase1023.ts", "utf-8");
const lz77RAW = fs.readFileSync("./src/schemaTools/lz77Decompress.ts", "utf-8");


let mc_script = "";
mc_script += "let data :any = " + JSON.stringify(out) + ";\n";
mc_script += base1023RAW.replaceAll("export ", "");
mc_script += lz77RAW.replaceAll("export ", "");
mc_script += `

const blockData: any[] = lz77Decompress(decodeBase1023(data.data));
const size: any[] = data.size;
const width = size[1];
const height = size[0];
const llength = size[2];

function indexToCoords(index: number, dimX: number, dimY: number, dimZ: number) {
  const x = Math.floor(index / (dimY * dimZ));
  const y = Math.floor((index % (dimY * dimZ)) / dimZ);
  const z = index % dimZ;
  return pos( x, y, z + 2);
}

const playerpos = pos(0,0,0).toWorld();
blocks.fill(AIR, playerpos, pos(width + 10, height + 10, llength + 10), FillOperation.Replace);

for (let i = 0; i < 500; i++) {
    if (blockData[i] == 0) continue;
    const p = playerpos.add(indexToCoords(i, width, height, llength));
    player.say("place block " + blockData[i] + " " + p)
    blocks.place(blockData[i], p);
}
`

fs.writeFileSync("./mc_script.out.ts", mc_script);

