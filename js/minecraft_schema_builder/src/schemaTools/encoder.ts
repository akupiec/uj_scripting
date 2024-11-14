import fs from "fs";
import nbt from "nbt";
import { lz77Compress } from "./lz77Compress";
import { encodeBase1023 } from "./encodeBase1023";
import { toBeadRockEdition } from "../minecraft.blocks.lut";
import Pbf from "pbf";
import {utf8} from "cbor/types/lib/utils";

export function parseSchema(shemaFilePath: string) {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(shemaFilePath);
    nbt.parse(data, function (error, data) {
      if (error) {
        reject(error);
      }

      let blockData;
      let palette;
      let size;

      if (data.value.BlockData) {
        const b = new Pbf(data.value.BlockData.value);
        size = [data.value.Height.value, data.value.Length.value, data.value.Width.value];
        const len = size[0] * size[1] * size[2];
        blockData = new Uint16Array(len);

        for (let i = 0; i < len; i++) blockData[i] = b.readVarint64();
        palette = toBeadRockEdition(data.value.Palette.value);
        blockData = Array.from(blockData);
      } else {
        throw new Error("unknown shema!");
      }

      // fs.writeFileSync('out.json', JSON.stringify(data.value.Palette.value, undefined, 2), 'utf-8');
      // const compressed = lz77Compress(blockData, 1022);
      // const encoded = encodeBase1023(compressed);
      const parsedData = {
        size: size,
        palette: palette,
        data: blockData,
      };

      resolve(parsedData);
    });
  });
}
//data.value.BlockData.value[48 * size[2] * size[1] + 33 * size[2] + 32]
//307946
