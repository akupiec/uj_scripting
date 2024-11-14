import * as fs from "fs";
import { parseSchema } from "../schemaTools/parser";
import * as console from "node:console";

function generateScript(parsedData: any) {
  const base1023RAW = fs.readFileSync("./src/schemaTools/decodeBase1023.ts", "utf-8");
  const lz77RAW = fs.readFileSync("./src/schemaTools/lz77Decompress.ts", "utf-8");
  const idxToCordsRaw = fs.readFileSync("./src/utils/indexToCords.ts", "utf-8");
  const blocksRaw = fs.readFileSync("./src/minecraft/blocks.ts", "utf-8");

  let mc_script = "";
  mc_script += "let data :any = " + JSON.stringify(parsedData) + ";\n";
  mc_script += base1023RAW.replaceAll("export ", "").replace(/^import .*/gm, "");
  mc_script += lz77RAW.replaceAll("export ", "").replace(/^import .*/gm, "");
  mc_script += idxToCordsRaw.replaceAll("export ", "").replace(/^import .*/gm, "");
  mc_script += blocksRaw.replaceAll("export ", "").replace(/^import .*/gm, "");
  mc_script += `

player.say("Decoding data...");
const blockData: any[] = lz77Decompress(decodeBase1023(data.data));
delete data.data;
player.say("Data ready! Building :D")

const size: number[] = data.size;
const sPos = pos(0, 0, 0).toWorld();

const progress = false;
cleanSpace(sPos, size, progress);
const sPos2 = sPos.add(pos(0, 0, 2));
buildAll(sPos2, 0, size[0], size, progress);
//buildPalette(sPos2, data.palette, 80);
player.say("Building !!!DONE!!!");
`;
  return mc_script;
}

(async function () {
  let out = await parseSchema("./schemas/darkest-castle.schem");
  let mc_script = generateScript(out);
  fs.writeFileSync("./darkest-castle.out", mc_script);

  out = await parseSchema("./schemas/Zollburg_Niederbr.schem");
  mc_script = generateScript(out);
  fs.writeFileSync("./Zollburg_Niederbr.out", mc_script);

  console.log("generation finished!");
})().then();
