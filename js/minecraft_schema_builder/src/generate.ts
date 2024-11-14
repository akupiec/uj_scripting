import fs from "fs";
import { parseSchema } from "./schemaTools/parser";

const out = await parseSchema('schemas/darkest-castle.schem');
// const out = await parseSchema("schemas/Zollburg_Niederbr.schem");

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
const blockData: any[] = lz77Decompress(decodeBase1023(data.data));
delete data.data;
player.say("Data ready! Building :D")

const size: number[] = data.size;
const sPos = pos(0, 0, 0).toWorld();

cleanSpace(sPos, size);
const sPos2 = sPos.add(pos(0, 0, 2));
buildAll(sPos2, 20, 40, size);
//buildPalette(sPos2, data.palette, 80);
player.say("Building !!!DONE!!!");
`;

fs.writeFileSync("./mc_script.out", mc_script);
