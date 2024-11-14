import fs from "fs";
import { parseSchema } from "./schemaTools/encoder";

// const out = await parseSchema('./darkest-castle.schem');
const out = await parseSchema("./simple-castle.schematic");
// fs.writeFileSync("./out.json", JSON.stringify(out));

const base1023RAW = fs.readFileSync("./src/schemaTools/decodeBase1023.ts", "utf-8");
const lz77RAW = fs.readFileSync("./src/schemaTools/lz77Decompress.ts", "utf-8");
const idxToCordsRaw = fs.readFileSync("./src/indexToCords.ts", "utf-8");


let mc_script = "";
mc_script += "let data :any = " + JSON.stringify(out) + ";\n";
mc_script += base1023RAW.replaceAll("export ", "");
mc_script += lz77RAW.replaceAll("export ", "");
mc_script += idxToCordsRaw.replaceAll("export ", "");
mc_script += `

const blockData: any[] = lz77Decompress(decodeBase1023(data.data));
const size: any[] = data.size;
const width = size[1];
const height = size[0];
const llength = size[2];

const playerpos = pos(0,0,0).toWorld();
blocks.fill(AIR, pos(-4, 0, -4) , pos(width + 10, height + 10, llength + 10), FillOperation.Replace);

for (let i = 0; i < blockData.length; i++) {
    if (blockData[i] == 0) continue;
    const {x,y,z} = indexToCords(i, height, width, llength)
    const p = playerpos.add(pos(z, x, y + 5))
    // player.say("place block " + blockData[i] + " " + p)
    player.say("place block " + i + " of " + length)
    blocks.place(blockData[i], p);
}
`

fs.writeFileSync("./mc_script.out.ts", mc_script);

