import * as fs from "fs";
import {expect, test} from "bun:test";
import {parsePalette} from "./palette";

const examplePallete = JSON.parse(fs.readFileSync("Zollburg_Niederbr.palette.json"));

test("palette conversion", () => {
  const p = parsePalette(examplePallete);
  expect(p[11]).toEqual("andesite");
  expect(p[31]).toEqual("dirt");
  expect(p[266]).toEqual('torch["torch_facing_direction":"north"]');
  expect(p[65]).toEqual(`hay_block["pillar_axis":"y"]`);
  expect(p[145]).toEqual(`red_bed["direction":1,"occupied_bit":false,"head_piece_bit":false]`);
  expect(p[221]).toEqual(`jungle_door["direction":0,"upper_block_bit":false,"door_hinge_bit":false,"open_bit":true]`);
  expect(p[165]).toEqual(`air`);
  expect(p[224]).toEqual(`spruce_trapdoor["direction":0,"upside_down_bit":false,"open_bit":false]`);
  expect(p[167]).toEqual(`trapdoor["direction":1,"upside_down_bit":false,"open_bit":true]`);
  expect(p[157]).toEqual(`trapdoor["direction":0,"upside_down_bit":false,"open_bit":true]`);
  expect(p[181]).toEqual(`trapdoor["direction":3,"upside_down_bit":false,"open_bit":true]`);
  expect(p[156]).toEqual(`trapdoor["direction":2,"upside_down_bit":false,"open_bit":true]`);
  expect(p[134]).toEqual(`dark_oak_stairs["weirdo_direction":1,"upside_down_bit":true]`);
});
// expect(p[163]).toEqual('cobblestone_wall["wall_block_type":"nether_brick"]');

test("palette conversion sanity check", () => {
  const p = parsePalette(examplePallete);
  for (const pKey in p) {
    expect(p[pKey]).not.toContain("=");
    expect(p[pKey]).not.toContain("Air");
    expect(p[pKey]).not.toContain("spawner");
    expect(p[pKey]).not.toContain("stone_bricks");
    expect(p[pKey]).not.toContain("dirt_path");
    expect(p[pKey]).not.toContain("Dark Oak Plank");
    expect(p[pKey]).not.toContain("chiseled_sandstone");
  }
  expect(Object.entries(p).find(([k,v ]) => v == undefined)).toBe(undefined)
  expect(Object.values(p).find(a => /^bricks$/.test(a as string))).toBe(undefined)
  expect(Object.values(p).find(a => /^stond$/.test(a as string))).toBe(undefined)
  expect(Object.values(p).find(a => /^_sandstone$/.test(a as string))).toBe(undefined)
  expect(Object.values(p).find(a => /^_stone$/.test(a as string))).toBe(undefined)
});
