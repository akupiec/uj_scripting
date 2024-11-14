import fs from "fs";
import nbt from "nbt";
import { lz77Compress } from "./lz77Compress";
import { encodeBase1023 } from "./encodeBase1023";

export function parseSchema(shemaFilePath: string) {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(shemaFilePath);
    nbt.parse(data, function (error, data) {
      if (error) {
        reject(error);
      }

      let blockData;
      let palette;
      if (data.value.BlockData) {
        blockData = data.value.BlockData.value.map((i) => (i < 0 ? 0 : i));
      } else {
        blockData = data.value.Blocks.value;
      }
      if (data.value.Palette) {
        palette = Object.fromEntries(
          Object.entries(data.value.Palette.value).map(([k, v]) => {
            return [k.replace("minecraft:", ""), v.value];
          }),
        );
      }

      const compressed = lz77Compress(blockData, 1022);
      const encoded = encodeBase1023(compressed);
      const parsedData = {
        size: [data.value.Height.value, data.value.Width.value, data.value.Length.value],
        palette: palette,
        data: encoded,
      };

      resolve(parsedData);
    });
  });
}
