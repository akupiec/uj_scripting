import * as fs from "fs";
import nbt from "nbt";
import { expect, test } from "bun:test";
import { parsePalette } from "./palette";

function getRawPalette(shemaFilePath): Promise<object> {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(shemaFilePath);
    nbt.parse(data, function (error, data) {
      if (error) {
        reject(error);
      }
      resolve(data.value.Palette.value);
    });
  });
}

test("palette zollburg conversion", async () => {
  const examplePallete = await getRawPalette("schemas/Zollburg_Niederbr.schem");
  const p = Object.values(parsePalette(examplePallete));
  expect(p).toContain("andesite");
  expect(p).toContain("dirt");
  expect(p).toContain('torch["torch_facing_direction":"north"]');
  expect(p).toContain(`hay_block["pillar_axis":"y"]`);
  expect(p).toContain(`red_bed["direction":1,"occupied_bit":false,"head_piece_bit":false]`);
  expect(p).toContain(`jungle_door["direction":0,"upper_block_bit":false,"door_hinge_bit":false,"open_bit":true]`);
  expect(p).toContain(`air`);
  expect(p).toContain(`spruce_trapdoor["direction":0,"upside_down_bit":false,"open_bit":false]`);
  expect(p).toContain(`trapdoor["direction":1,"upside_down_bit":false,"open_bit":true]`);
  expect(p).toContain(`trapdoor["direction":0,"upside_down_bit":false,"open_bit":true]`);
  expect(p).toContain(`trapdoor["direction":3,"upside_down_bit":false,"open_bit":true]`);
  expect(p).toContain(`trapdoor["direction":2,"upside_down_bit":false,"open_bit":true]`);
  expect(p).toContain(`dark_oak_stairs["weirdo_direction":1,"upside_down_bit":true]`);
});

test("pallete dark castle", async () => {
  function match(parsedPalette, raw, out) {
    const id = rawPalette[raw].value;
    expect(parsedPalette[id]).toEqual(out);
  }

  const rawPalette = await getRawPalette("schemas/darkest-castle.schem");
  const parsedPalette = parsePalette(rawPalette);
  const p = Object.values(parsedPalette) as string[];
  expect(!!p.find((pp) => pp.startsWith("nether_brick_slab"))).toBe(true);
  expect(!!p.find((pp) => pp.startsWith("stone_brick_slab"))).toBe(true);
  expect(!!p.find((pp) => pp.startsWith("blackstone_wall"))).toBe(true);
  expect(!!p.find((pp) => pp.startsWith("polished_blackstone_wall"))).toBe(true);
  match(
    parsedPalette,
    "minecraft:polished_blackstone_slab[type=double,waterlogged=false]",
    "polished_blackstone_bricks",
  );
});

test("palette conversion sanity check", async () => {
  function check(p) {
    for (const pKey in p) {
      expect(p[pKey]).not.toContain("=");
      expect(p[pKey]).not.toContain("Air");
      expect(p[pKey]).not.toContain("spawner");

      expect(p[pKey]).not.toContain("dirt_path");
      expect(p[pKey]).not.toContain(`cobblestone_/stairs`);
      expect(p[pKey]).not.toContain("chiseled_sandstone");
      expect(p[pKey]).not.toContain("dandelion");
    }
    expect(Object.entries(p).find(([k, v]) => v == undefined)).toBe(undefined);
    expect(Object.values(p).find((a) => /^bricks$/.test(a as string))).toBe(undefined);
    expect(Object.values(p).find((a) => /^nether_bricks$/.test(a as string))).toBe(undefined);
    expect(Object.values(p).find((a) => /^red_nether_bricks$/.test(a as string))).toBe(undefined);
    expect(Object.values(p).find((a) => /^stond$/.test(a as string))).toBe(undefined);
    expect(Object.values(p).find((a) => /^_sandstone$/.test(a as string))).toBe(undefined);
    expect(Object.values(p).find((a) => /^_stone$/.test(a as string))).toBe(undefined);
    expect(Object.values(p).find((a) => /^mossy_stone_bricks$/.test(a as string))).toBe(undefined);
    expect(Object.values(p).find((a) => /^stone_bricks$/.test(a as string))).toBe(undefined);
  }

  const examplePallete = await getRawPalette("schemas/Zollburg_Niederbr.schem");
  check(parsePalette(examplePallete));
  const examplePallete2 = await getRawPalette("schemas/darkest-castle.schem");
  fs.writeFileSync("temp.json", JSON.stringify(examplePallete2, undefined, 2));
  check(parsePalette(examplePallete2));
});
