import fs from "fs";
import { expect, test } from "bun:test";
import { toBeadRockEdition } from "./minecraft.blocks.lut";

const examplePallete = JSON.parse(fs.readFileSync("Zollburg_Niederbr.palette.json"));

test("palette conversion", () => {
  const p = toBeadRockEdition(examplePallete);
  expect(p[11]).toEqual("Andesite");
  expect(p[31]).toEqual("Dirt");
  expect(p[266]).toEqual('torch["torch_facing_direction":"north"]');
  expect(p[65]).toEqual(`hay_block["pillar_axis":"y"]`);
  expect(p[145]).toEqual(`red_bed["direction":1,"occupied_bit":false,"head_piece_bit":false]`);
  expect(p[221]).toEqual(`jungle_door["direction":0,"upper_block_bit":false,"door_hinge_bit":false,"open_bit":true]`);
  expect(p[165]).toEqual(`Air`);
  expect(p[224]).toEqual(`spruce_trapdoor["direction":1,"upside_down_bit":false,"open_bit":false]`);
  expect(p[167]).toEqual(`trapdoor["direction":1,"upside_down_bit":false,"open_bit":true]`);
  expect(p[157]).toEqual(`trapdoor["direction":0,"upside_down_bit":false,"open_bit":true]`);
  expect(p[181]).toEqual(`trapdoor["direction":3,"upside_down_bit":false,"open_bit":true]`);
  expect(p[156]).toEqual(`trapdoor["direction":2,"upside_down_bit":false,"open_bit":true]`);
  expect(p[134]).toEqual(`dark_oak_stairs["weirdo_direction":1,"upside_down_bit":true]`);
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
