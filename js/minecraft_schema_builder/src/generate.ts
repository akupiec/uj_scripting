import fs from "fs";
import { parseSchema } from "./schemaTools/encoder";

// const out = await parseSchema('./darkest-castle.schem');
const out = await parseSchema("./simple-castle.schematic");
// const out = await parseSchema("./medievalgate.schem");
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

player.say("Decoding data...");
const dd = decodeBase1023(data.data);
player.say("Decompressing data...");
const blockData: any[] = lz77Decompress(dd);
player.say("Data ready! Building :D")

const size: any[] = data.size;
const width = size[1];
const height = size[0];
const llength = size[2];

const playerpos = pos(0,0,0).toWorld();

for (let x = -5; x < width + 10; x += 20) {
    for (let y = 0; y < height + 10; y += 20) {
        for (let z = -5; z < llength + 10; z += 20) {
            let endX = Math.min(x + 19, 999);
            let endY = Math.min(y + 19, 999);
            let endZ = Math.min(z + 19, 999);

            const p0 = playerpos.add(pos(x, y, z));
            const p1 = playerpos.add(pos(endX, endY, endZ));
            player.say("clear: " + p0);
            blocks.fill(AIR, p0, p1, FillOperation.Replace);
        }
    }
}

function blockRef(idx: number) {
  return data.palette ? blocks.blockByName(data.palette[blockData[idx]]): blockData[idx];
}

let multiblock = 0;
for (let i = 0; i < blockData.length; i++) {
    if(i%25 == 0) player.say("place block " + i + " of " + blockData.length)
    const {x,y,z} = indexToCords(i, height, width, llength)
    if((i + 1) % llength > 0 && blockData[i + 1] === blockData[i] && multiblock < 100) {
        multiblock++;
        continue;
    } else if (multiblock != 0) {
        const p0 = playerpos.add(pos(z-multiblock, x, y + 5))
        const p1 = playerpos.add(pos(z, x, y + 5))
        const b = blockRef(i);
        blocks.fill(b, p0 , p1, FillOperation.Replace);
        multiblock = 0;
    } else {
        const p = playerpos.add(pos(z, x, y + 5))
        const b = blockRef(i);
        if(!blocks.testForBlock(b, p)) blocks.place(b, p);
    }
}
`

fs.writeFileSync("./mc_script.out.ts", mc_script);

