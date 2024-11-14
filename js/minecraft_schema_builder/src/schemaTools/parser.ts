import fs from "fs";
import nbt from "nbt";
import { lz77Compress } from "./lz77Compress";
import { encodeBase1023 } from "./encodeBase1023";
import { parsePalette } from "./palette";
import Pbf from "pbf";

export function parseBlockData(size: number[], data: any) {
  const b = new Pbf(data.value.BlockData.value);
  const len = size[0] * size[1] * size[2];
  const blockData = new Uint16Array(len);
  for (let i = 0; i < len; i++) blockData[i] = b.readVarint64();
  return Array.from(blockData);
}

export function parseSize(data) {
  return [data.value.Height.value, data.value.Length.value, data.value.Width.value];
}

export function parseSchema(shemaFilePath: string) {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(shemaFilePath);
    nbt.parse(data, function (error, data) {
      if (error) {
        reject(error);
      }

      let size = parseSize(data);
      let blockData = parseBlockData(size, data);

      let palette = parsePalette(data.value.Palette.value);

      const parsedData = {
        size: size,
        palette: palette,
        data: encodeBase1023(lz77Compress(blockData, 1000)),
      };

      resolve(parsedData);
    });
  });
}
