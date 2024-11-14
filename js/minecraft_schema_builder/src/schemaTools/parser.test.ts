import * as fs from "fs";
import nbt from "nbt";

import { expect, test } from "bun:test";
import {lz77Decompress} from "./lz77Decompress";
import {decodeBase1023} from "./decodeBase1023";
import {encodeBase1023} from "./encodeBase1023";
import {lz77Compress} from "./lz77Compress";
import {parseBlockData, parseSize} from "./parser";

test("schema length calculation", (done) => {
  const data = fs.readFileSync("Zollburg_Niederbr.schem");
  nbt.parse(data, function (error, data) {
    const size = parseSize(data);
    const blockData = parseBlockData(size, data);

    expect(blockData.length).toBe(490028);
    done();
  });
});

test("schema compression", (done) => {
  const data = fs.readFileSync("Zollburg_Niederbr.schem");
  nbt.parse(data, function (error, data) {
    const size = parseSize(data);
    const blockData = parseBlockData(size, data);

    expect(blockData.indexOf(undefined)).toBe(-1)

    const compressed = lz77Compress(blockData, 1022);
    expect(compressed.indexOf(undefined)).toBe(-1)

    const decompressed = lz77Decompress(compressed);
    expect(decompressed.indexOf(undefined)).toBe(-1)


    expect(decompressed[159100]).toBe(5)

    expect(decompressed).toEqual(blockData);
    done();
  });
});

test("schema encoding", (done) => {
  const data = fs.readFileSync("Zollburg_Niederbr.schem");
  nbt.parse(data, function (error, data) {
    const size = parseSize(data);
    const blockData = parseBlockData(size, data);

    expect(decodeBase1023(encodeBase1023(blockData))).toEqual(blockData);
    done();
  });
});

test("combination", (done) => {
  const data = fs.readFileSync("Zollburg_Niederbr.schem");
  nbt.parse(data, function (error, data) {
    const size = parseSize(data);
    const blockData = parseBlockData(size, data);

    const decompressed = lz77Decompress(decodeBase1023(encodeBase1023(lz77Compress(blockData, 1022))));
    expect(decompressed.indexOf(undefined)).toBe(-1)
    expect(decompressed).toEqual(blockData);
    done();
  });
});
