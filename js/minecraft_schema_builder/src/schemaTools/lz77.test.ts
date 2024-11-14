import { expect, test } from "bun:test";
import { lz77Compress } from "./lz77Compress";
import { lz77Decompress } from "./lz77Decompress";


import fs from "fs";
import nbt from "nbt";
import {encodeBase1023} from "./encodeBase1023";
import {decodeBase1023} from "./decodeBase1023";

const compressedData = [0, 0, "b", 0, 0, "a", 0, 0, "d", 2, 5, "b", 8, 5];
const rawData = "badadadabadada";

test("compress lz77", () => {
  const data = lz77Compress(rawData);
  expect(data).toEqual(compressedData);
});

test("decompress lz77", () => {
  const data = lz77Decompress(compressedData);
  expect(data).toEqual(["b", "a", "d", "a", "d", "a", "d", "a", "b", "a", "d", "a", "d", "a"]);
});

test("number's stuff", () => {
  const inData = [1,3,4,2,2,2,2,1,4,3,1];
  const outData = lz77Compress(inData);
  expect(outData).toEqual([0, 0, 1, 0, 0, 3, 0, 0, 4, 0, 0, 2, 1, 3, 1, 6, 1, 3, 10, 1]);
  expect(lz77Decompress(outData)).toEqual(inData);
})


test("shcema", (done) => {
  const data = fs.readFileSync('simple-castle.schematic');
  nbt.parse(data, function (error, data) {

    let blockData;
    if (data.value.BlockData) {
      blockData = data.value.BlockData.value.map((i) => (i < 0 ? 0 : i));
    } else {
      blockData = data.value.Data.value;
    }

    expect(blockData.length).toBe(3240)
    expect(lz77Decompress(decodeBase1023(encodeBase1023(lz77Compress(blockData, 1022))))).toEqual(blockData)
    done()
  })

})
