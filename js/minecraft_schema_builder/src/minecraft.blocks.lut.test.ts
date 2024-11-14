import fs from 'fs';
import { expect, test } from "bun:test";
import { toBeadRockEdition } from "./minecraft.blocks.lut";

const examplePallete = JSON.parse(fs.readFileSync('Zollburg_Niederbr.palette.json'))

test("palette conversion", () => {
  const p = toBeadRockEdition(examplePallete);
  expect(p[11]).toEqual("Andesite");
  expect(p[31]).toEqual("Dirt");
  expect(p[266]).toEqual('torch["torch_facing_direction":"north"]');
  expect(p[65]).toEqual(`hay_block["pillar_axis":"y"]`);
  expect(p[145]).toEqual(`red_bed["direction":1,"occupied_bit":"false","head_piece_bit":"false"]`);
});
// expect(p[163]).toEqual('cobblestone_wall["wall_block_type":"nether_brick"]');

test("palette conversion sanity check", () => {
  const p = toBeadRockEdition(examplePallete);
  for (const pKey in p) {
    expect(p[pKey]).not.toContain("=");
    expect(p[pKey]).not.toContain("Cave Air");
    expect(p[pKey]).not.toContain("Spawner");
    expect(p[pKey]).not.toContain("Smooth Stone");
    expect(p[pKey]).not.toContain("Light Gray Candle");
  }
});
