import fs from "fs";
import { parseSchema } from "./schemaTools/encoder";

// const out = await parseSchema('./darkest-castle.schem');
// const out = await parseSchema("./simple-castle.schematic");
// const out = await parseSchema("./medievalgate.schem");
// const out = await parseSchema("./hmls.schem");
const out = await parseSchema("./Zollburg_Niederbr.schem");
// fs.writeFileSync("./Zollburg_Niederbr.palette.json", JSON.stringify(out));

const base1023RAW = fs.readFileSync("./src/schemaTools/decodeBase1023.ts", "utf-8");
const lz77RAW = fs.readFileSync("./src/schemaTools/lz77Decompress.ts", "utf-8");
const idxToCordsRaw = fs.readFileSync("./src/indexToCords.ts", "utf-8");
const blocksRaw = fs.readFileSync("./src/blocks.ts", "utf-8");

let mc_script = "";
mc_script += "let data :any = " + JSON.stringify(out) + ";\n";
mc_script += base1023RAW.replaceAll("export ", "");
mc_script += lz77RAW.replaceAll("export ", "");
mc_script += idxToCordsRaw.replaceAll("export ", "");
mc_script += blocksRaw.replaceAll("export ", "");
mc_script += `

player.say("Decoding data...");
const dd = decodeBase1023(data.data);
player.say("Decompressing data...");
// const blockData: any[] = data.data;
const blockData: any[] = dd;
// const blockData: any[] = lz77Decompress(dd);
player.say("Data ready! Building :D")

const size: number[] = data.size;
const sPos = pos(0, 0, 0).toWorld();

cleanSpace(sPos, size);
buildAll(sPos, 25, size[0], size);
//buildPalette(sPos, data.palette, 80);
`;

fs.writeFileSync("./mc_script.out", mc_script);