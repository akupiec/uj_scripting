import { expect, test } from "bun:test";
import {toBeadRockEdition} from "./minecraft.blocks.lut";

const examplePallete = {
  "yellow_wool": 176,
  "nether_brick_wall[east=tall,north=tall,south=none,up=true,waterlogged=false,west=tall]": 210,
  "polished_blackstone_wall[east=none,north=none,south=tall,up=true,waterlogged=false,west=low]": 248,
  "polished_blackstone_wall[east=low,north=none,south=none,up=false,waterlogged=false,west=low]": 280,
  "polished_blackstone_wall[east=low,north=none,south=none,up=true,waterlogged=false,west=tall]": 328,
  "dark_oak_fence[east=false,north=true,south=true,waterlogged=false,west=true]": 312,
  "stone_stairs[facing=south,half=top,shape=straight,waterlogged=false]": 20,
  "polished_blackstone_wall[east=none,north=tall,south=tall,up=true,waterlogged=false,west=tall]": 237,
  "polished_blackstone_button[face=floor,facing=south,powered=false]": 299,
  "podzol[snowy=false]": 148,
  "red_nether_brick_wall[east=tall,north=none,south=low,up=true,waterlogged=false,west=none]": 285,
  "polished_blackstone_wall[east=tall,north=tall,south=none,up=true,waterlogged=false,west=tall]": 275,
  "spruce_trapdoor[facing=south,half=bottom,open=true,powered=false,waterlogged=false]": 296,
  "polished_blackstone_wall[east=low,north=low,south=low,up=false,waterlogged=false,west=low]": 314,
  "grass": 2,
  "iron_bars[east=false,north=true,south=false,waterlogged=false,west=false]": 192,
  "polished_blackstone_wall[east=low,north=tall,south=tall,up=true,waterlogged=false,west=none]": 83,
  "polished_blackstone_stairs[facing=west,half=top,shape=outer_left,waterlogged=false]": 49,
  "nether_brick_stairs[facing=west,half=top,shape=straight,waterlogged=false]": 173,
  "red_nether_brick_stairs[facing=west,half=top,shape=straight,waterlogged=false]": 174,
  "red_nether_brick_stairs[facing=north,half=top,shape=straight,waterlogged=false]": 196,
  "polished_blackstone_bricks": 32,
  "polished_blackstone_brick_stairs[facing=east,half=top,shape=outer_left,waterlogged=false]": 93,
  "red_nether_brick_wall[east=none,north=none,south=tall,up=true,waterlogged=false,west=tall]": 260,
  "red_nether_brick_wall[east=none,north=tall,south=tall,up=false,waterlogged=false,west=none]": 331,
  "dark_oak_fence[east=false,north=true,south=false,waterlogged=false,west=false]": 257,
  "chest[facing=east,type=single,waterlogged=false]": 65,
  "polished_blackstone_brick_wall[east=tall,north=none,south=none,up=false,waterlogged=false,west=tall]": 247,
  "polished_blackstone_brick_stairs[facing=north,half=top,shape=outer_left,waterlogged=false]": 128,
  "polished_blackstone_wall[east=tall,north=none,south=low,up=true,waterlogged=false,west=none]": 215,
  "nether_brick_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]": 114,
  "stone": 6,
  "poppy": 28,
  "sand": 24,
  "red_nether_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=tall]": 187,
  "polished_blackstone_wall[east=none,north=low,south=low,up=false,waterlogged=false,west=none]": 281,
  "stone_stairs[facing=east,half=top,shape=straight,waterlogged=false]": 110,
  "nether_brick_fence[east=false,north=false,south=false,waterlogged=false,west=false]": 301,
  "nether_brick_wall[east=none,north=low,south=none,up=true,waterlogged=false,west=low]": 204,
  "blackstone_wall[east=none,north=low,south=none,up=true,waterlogged=false,west=low]": 206,
  "red_nether_brick_wall[east=tall,north=tall,south=tall,up=true,waterlogged=false,west=none]": 205,
  "chiseled_polished_blackstone": 131,
  "iron_trapdoor[facing=west,half=bottom,open=false,powered=false,waterlogged=false]": 290,
  "red_nether_brick_wall[east=tall,north=tall,south=none,up=true,waterlogged=false,west=none]": 226,
  "polished_blackstone_brick_wall[east=none,north=tall,south=tall,up=true,waterlogged=false,west=tall]": 258,
  "polished_blackstone_brick_wall[east=tall,north=low,south=none,up=true,waterlogged=false,west=tall]": 241,
  "cyan_wool": 232,
  "nether_brick_slab[type=top,waterlogged=false]": 98,
  "nether_brick_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]": 116,
  "dark_oak_fence[east=true,north=true,south=true,waterlogged=false,west=false]": 311,
  "polished_blackstone_brick_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]": 143,
  "nether_brick_wall[east=none,north=tall,south=none,up=true,waterlogged=false,west=tall]": 193,
  "polished_blackstone_brick_wall[east=tall,north=none,south=tall,up=true,waterlogged=false,west=tall]": 344,
  "polished_blackstone_brick_wall[east=tall,north=tall,south=tall,up=false,waterlogged=false,west=tall]": 115,
  "stone_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]": 30,
  "polished_blackstone_brick_wall[east=low,north=none,south=low,up=true,waterlogged=false,west=none]": 134,
  "chest[facing=west,type=single,waterlogged=false]": 66,
  "polished_blackstone_brick_stairs[facing=north,half=top,shape=inner_left,waterlogged=false]": 146,
  "stone_brick_slab[type=bottom,waterlogged=false]": 19,
  "polished_blackstone_wall[east=low,north=none,south=low,up=true,waterlogged=false,west=none]": 39,
  "polished_blackstone_stairs[facing=east,half=top,shape=inner_left,waterlogged=false]": 58,
  "polished_blackstone_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=none]": 132,
  "nether_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=none]": 223,
  "iron_bars[east=true,north=false,south=true,waterlogged=false,west=true]": 302,
  "polished_blackstone_wall[east=tall,north=none,south=none,up=true,waterlogged=false,west=low]": 309,
  "polished_blackstone_wall[east=none,north=low,south=low,up=true,waterlogged=false,west=low]": 270,
  "red_stained_glass_pane[east=true,north=true,south=false,waterlogged=false,west=false]": 303,
  "polished_blackstone_button[face=floor,facing=north,powered=false]": 300,
  "stone_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]": 87,
  "polished_blackstone_wall[east=tall,north=low,south=none,up=true,waterlogged=false,west=tall]": 86,
  "white_wool": 273,
  "polished_blackstone_brick_stairs[facing=east,half=top,shape=outer_right,waterlogged=false]": 137,
  "black_shulker_box[facing=up]": 145,
  "nether_brick_wall[east=none,north=none,south=tall,up=true,waterlogged=false,west=low]": 282,
  "iron_trapdoor[facing=east,half=bottom,open=false,powered=false,waterlogged=false]": 306,
  "polished_blackstone_wall[east=none,north=none,south=low,up=true,waterlogged=false,west=tall]": 158,
  "blackstone_stairs[facing=west,half=top,shape=straight,waterlogged=false]": 244,
  "polished_blackstone_stairs[facing=south,half=top,shape=inner_left,waterlogged=false]": 51,
  "polished_blackstone_wall[east=low,north=none,south=low,up=true,waterlogged=false,west=low]": 142,
  "lectern[facing=north,has_book=true,powered=false]": 266,
  "polished_blackstone_wall[east=tall,north=tall,south=low,up=true,waterlogged=false,west=low]": 36,
  "nether_brick_wall[east=none,north=tall,south=tall,up=true,waterlogged=false,west=tall]": 189,
  "blackstone_slab[type=top,waterlogged=false]": 342,
  "nether_brick_wall[east=low,north=none,south=low,up=true,waterlogged=false,west=none]": 245,
  "spruce_trapdoor[facing=east,half=bottom,open=false,powered=false,waterlogged=false]": 307,
  "polished_blackstone_wall[east=low,north=tall,south=none,up=true,waterlogged=false,west=tall]": 35,
  "blackstone_slab[type=bottom,waterlogged=false]": 345,
  "nether_brick_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]": 72,
  "polished_blackstone_brick_stairs[facing=south,half=top,shape=straight,waterlogged=false]": 89,
  "polished_blackstone_brick_stairs[facing=east,half=top,shape=inner_left,waterlogged=false]": 129,
  "polished_blackstone_brick_slab[type=top,waterlogged=false]": 95,
  "nether_brick_fence[east=true,north=true,south=false,waterlogged=false,west=true]": 321,
  "lantern[hanging=false,waterlogged=false]": 112,
  "red_nether_brick_wall[east=none,north=tall,south=none,up=true,waterlogged=false,west=none]": 71,
  "red_nether_brick_wall[east=low,north=tall,south=none,up=true,waterlogged=false,west=none]": 79,
  "red_nether_brick_stairs[facing=east,half=top,shape=straight,waterlogged=false]": 195,
  "nether_brick_wall[east=low,north=low,south=low,up=true,waterlogged=false,west=none]": 217,
  "air": 1,
  "polished_blackstone_brick_slab[type=double,waterlogged=false]": 231,
  "grass_block[snowy=false]": 3,
  "polished_blackstone_stairs[facing=west,half=top,shape=inner_right,waterlogged=false]": 59,
  "blackstone_stairs[facing=south,half=top,shape=straight,waterlogged=false]": 230,
  "polished_blackstone_wall[east=none,north=tall,south=low,up=true,waterlogged=false,west=none]": 329,
  "polished_blackstone_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]": 171,
  "polished_blackstone_stairs[facing=east,half=top,shape=straight,waterlogged=false]": 56,
  "polished_blackstone_button[face=wall,facing=west,powered=false]": 144,
  "polished_blackstone_brick_stairs[facing=south,half=top,shape=outer_left,waterlogged=false]": 139,
  "polished_blackstone_wall[east=none,north=low,south=none,up=true,waterlogged=false,west=tall]": 286,
  "stone_stairs[facing=west,half=top,shape=straight,waterlogged=false]": 23,
  "nether_brick_wall[east=none,north=none,south=tall,up=true,waterlogged=false,west=none]": 252,
  "red_nether_brick_wall[east=none,north=tall,south=none,up=true,waterlogged=false,west=tall]": 277,
  "red_nether_brick_wall[east=tall,north=tall,south=none,up=true,waterlogged=false,west=tall]": 209,
  "polished_blackstone_wall[east=low,north=tall,south=none,up=true,waterlogged=false,west=none]": 234,
  "stone_slab[type=bottom,waterlogged=false]": 17,
  "polished_blackstone_button[face=wall,facing=east,powered=false]": 103,
  "magma_block": 254,
  "red_nether_brick_wall[east=none,north=none,south=low,up=true,waterlogged=false,west=low]": 335,
  "iron_bars[east=true,north=false,south=true,waterlogged=false,west=false]": 119,
  "red_nether_bricks": 190,
  "red_nether_brick_slab[type=bottom,waterlogged=false]": 97,
  "nether_brick_fence[east=true,north=true,south=false,waterlogged=false,west=false]": 320,
  "nether_bricks": 45,
  "polished_blackstone_wall[east=tall,north=low,south=none,up=true,waterlogged=false,west=none]": 151,
  "polished_blackstone_wall[east=none,north=tall,south=low,up=true,waterlogged=false,west=tall]": 37,
  "polished_blackstone_stairs[facing=south,half=top,shape=outer_right,waterlogged=false]": 53,
  "dirt": 7,
  "polished_blackstone_stairs[facing=east,half=top,shape=inner_right,waterlogged=false]": 54,
  "cobblestone_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]": 27,
  "iron_bars[east=false,north=true,south=true,waterlogged=false,west=false]": 122,
  "red_nether_brick_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]": 201,
  "polished_blackstone_wall[east=low,north=low,south=none,up=true,waterlogged=false,west=none]": 41,
  "polished_blackstone_wall[east=none,north=low,south=tall,up=true,waterlogged=false,west=none]": 327,
  "nether_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=tall]": 160,
  "dark_oak_fence[east=false,north=false,south=true,waterlogged=false,west=false]": 256,
  "polished_blackstone_wall[east=tall,north=tall,south=none,up=true,waterlogged=false,west=low]": 333,
  "nether_brick_stairs[facing=east,half=top,shape=straight,waterlogged=false]": 229,
  "nether_brick_stairs[facing=north,half=top,shape=straight,waterlogged=false]": 100,
  "polished_blackstone_button[face=wall,facing=south,powered=false]": 104,
  "lantern[hanging=true,waterlogged=false]": 165,
  "polished_blackstone_brick_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]": 126,
  "orange_wool": 0,
  "stone_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]": 18,
  "blackstone_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]": 136,
  "iron_bars[east=true,north=true,south=false,waterlogged=false,west=false]": 123,
  "red_stained_glass_pane[east=false,north=true,south=false,waterlogged=false,west=true]": 305,
  "polished_blackstone_brick_stairs[facing=east,half=top,shape=straight,waterlogged=false]": 92,
  "red_nether_brick_wall[east=none,north=low,south=none,up=true,waterlogged=false,west=low]": 118,
  "polished_blackstone_stairs[facing=south,half=top,shape=straight,waterlogged=false]": 48,
  "red_stained_glass_pane[east=true,north=false,south=true,waterlogged=false,west=true]": 338,
  "polished_blackstone_wall[east=low,north=tall,south=none,up=true,waterlogged=false,west=low]": 292,
  "nether_brick_fence[east=false,north=true,south=true,waterlogged=false,west=true]": 319,
  "polished_blackstone_brick_wall[east=tall,north=none,south=tall,up=true,waterlogged=false,west=none]": 324,
  "polished_blackstone_wall[east=low,north=none,south=none,up=true,waterlogged=false,west=none]": 262,
  "red_nether_brick_wall[east=none,north=low,south=none,up=true,waterlogged=false,west=none]": 291,
  "blackstone_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]": 172,
  "polished_blackstone_slab[type=bottom,waterlogged=false]": 166,
  "iron_door[facing=south,half=upper,hinge=left,open=false,powered=false]": 323,
  "polished_blackstone_button[face=wall,facing=north,powered=false]": 169,
  "iron_door[facing=north,half=lower,hinge=left,open=false,powered=false]": 298,
  "polished_blackstone_slab[type=top,waterlogged=false]": 149,
  "blackstone_stairs[facing=north,half=top,shape=straight,waterlogged=false]": 152,
  "polished_blackstone_brick_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]": 111,
  "polished_blackstone_wall[east=none,north=none,south=tall,up=true,waterlogged=false,west=none]": 224,
  "polished_blackstone_wall[east=tall,north=none,south=tall,up=true,waterlogged=false,west=tall]": 253,
  "nether_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=low]": 181,
  "cave_air": 13,
  "polished_blackstone_stairs[facing=north,half=top,shape=straight,waterlogged=false]": 62,
  "red_nether_brick_wall[east=low,north=none,south=none,up=true,waterlogged=false,west=none]": 288,
  "iron_bars[east=false,north=true,south=true,waterlogged=false,west=true]": 278,
  "red_nether_brick_wall[east=none,north=tall,south=none,up=true,waterlogged=false,west=low]": 81,
  "red_stained_glass_pane[east=true,north=true,south=false,waterlogged=false,west=true]": 304,
  "cobblestone_stairs[facing=south,half=top,shape=straight,waterlogged=false]": 21,
  "polished_blackstone_brick_wall[east=none,north=none,south=low,up=true,waterlogged=false,west=low]": 75,
  "polished_blackstone_stairs[facing=west,half=top,shape=straight,waterlogged=false]": 55,
  "nether_brick_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]": 202,
  "mossy_cobblestone": 43,
  "red_nether_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=none]": 219,
  "iron_trapdoor[facing=south,half=bottom,open=false,powered=false,waterlogged=false]": 310,
  "blackstone": 29,
  "polished_blackstone_wall[east=tall,north=tall,south=none,up=true,waterlogged=false,west=none]": 85,
  "polished_blackstone_wall[east=none,north=tall,south=tall,up=true,waterlogged=false,west=none]": 188,
  "iron_door[facing=south,half=lower,hinge=left,open=false,powered=false]": 313,
  "chiseled_nether_bricks": 208,
  "polished_blackstone_wall[east=tall,north=none,south=low,up=true,waterlogged=false,west=tall]": 82,
  "nether_brick_wall[east=low,north=none,south=none,up=true,waterlogged=false,west=none]": 182,
  "lime_wool": 287,
  "polished_blackstone_brick_slab[type=bottom,waterlogged=false]": 96,
  "iron_bars[east=false,north=false,south=true,waterlogged=false,west=false]": 180,
  "polished_blackstone_wall[east=none,north=tall,south=none,up=true,waterlogged=false,west=low]": 251,
  "cobblestone_slab[type=bottom,waterlogged=false]": 25,
  "nether_brick_fence[east=true,north=false,south=false,waterlogged=false,west=false]": 154,
  "polished_blackstone_wall[east=none,north=low,south=low,up=true,waterlogged=false,west=tall]": 326,
  "adorn:wall_stone_torch[facing=west]": 168,
  "polished_blackstone_wall[east=low,north=low,south=none,up=true,waterlogged=false,west=low]": 271,
  "red_nether_brick_stairs[facing=south,half=top,shape=straight,waterlogged=false]": 238,
  "cobblestone_slab[type=double,waterlogged=false]": 26,
  "polished_blackstone_brick_stairs[facing=south,half=top,shape=outer_right,waterlogged=false]": 138,
  "cobblestone_stairs[facing=west,half=top,shape=straight,waterlogged=false]": 14,
  "stone_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]": 88,
  "polished_blackstone_wall[east=tall,north=none,south=none,up=false,waterlogged=false,west=tall]": 105,
  "polished_blackstone_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]": 197,
  "red_nether_brick_wall[east=tall,north=low,south=tall,up=true,waterlogged=false,west=none]": 216,
  "polished_blackstone_brick_wall[east=none,north=tall,south=tall,up=true,waterlogged=false,west=none]": 227,
  "cracked_polished_blackstone_bricks": 315,
  "nether_brick_fence[east=true,north=false,south=true,waterlogged=false,west=false]": 316,
  "polished_blackstone_brick_wall[east=tall,north=tall,south=none,up=true,waterlogged=false,west=none]": 73,
  "iron_bars[east=true,north=true,south=true,waterlogged=false,west=false]": 279,
  "polished_blackstone_stairs[facing=north,half=top,shape=outer_left,waterlogged=false]": 60,
  "red_nether_brick_wall[east=none,north=none,south=low,up=true,waterlogged=false,west=none]": 330,
  "cobblestone_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]": 184,
  "cobblestone_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]": 235,
  "polished_blackstone_brick_stairs[facing=west,half=top,shape=straight,waterlogged=false]": 91,
  "red_nether_brick_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]": 222,
  "polished_blackstone_stairs[facing=west,half=top,shape=outer_right,waterlogged=false]": 63,
  "polished_blackstone_wall[east=none,north=tall,south=none,up=true,waterlogged=false,west=none]": 194,
  "nether_brick_wall[east=low,north=none,south=tall,up=true,waterlogged=false,west=none]": 283,
  "red_stained_glass_pane[east=true,north=false,south=true,waterlogged=false,west=false]": 337,
  "polished_blackstone_pressure_plate[powered=false]": 297,
  "nether_brick_fence[east=false,north=true,south=false,waterlogged=false,west=true]": 322,
  "polished_blackstone_brick_stairs[facing=north,half=top,shape=outer_right,waterlogged=false]": 213,
  "polished_blackstone_brick_stairs[facing=south,half=top,shape=inner_left,waterlogged=false]": 211,
  "gravel": 10,
  "red_nether_brick_wall[east=none,north=low,south=low,up=true,waterlogged=false,west=low]": 203,
  "polished_blackstone_wall[east=tall,north=tall,south=tall,up=false,waterlogged=false,west=tall]": 243,
  "iron_door[facing=north,half=upper,hinge=left,open=false,powered=false]": 308,
  "red_nether_brick_wall[east=low,north=none,south=low,up=true,waterlogged=false,west=none]": 334,
  "cornflower": 12,
  "nether_brick_wall[east=low,north=low,south=none,up=true,waterlogged=false,west=low]": 221,
  "spawner": 67,
  "polished_blackstone_stairs[facing=east,half=bottom,shape=straight,waterlogged=false]": 239,
  "red_stained_glass_pane[east=false,north=false,south=true,waterlogged=false,west=true]": 339,
  "red_nether_brick_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]": 220,
  "red_nether_brick_wall[east=tall,north=none,south=none,up=true,waterlogged=false,west=none]": 233,
  "iron_bars[east=true,north=false,south=false,waterlogged=false,west=true]": 120,
  "polished_blackstone_stairs[facing=east,half=top,shape=outer_right,waterlogged=false]": 47,
  "polished_blackstone_wall[east=tall,north=tall,south=low,up=true,waterlogged=false,west=none]": 156,
  "iron_bars[east=false,north=true,south=false,waterlogged=false,west=true]": 124,
  "red_nether_brick_wall[east=tall,north=none,south=none,up=false,waterlogged=false,west=tall]": 332,
  "nether_brick_wall[east=tall,north=tall,south=none,up=true,waterlogged=false,west=none]": 276,
  "black_concrete": 69,
  "black_concrete_powder": 113,
  "polished_blackstone_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=tall]": 167,
  "polished_blackstone_wall[east=none,north=none,south=tall,up=true,waterlogged=false,west=tall]": 33,
  "black_wool": 274,
  "polished_blackstone_stairs[facing=south,half=top,shape=inner_right,waterlogged=false]": 52,
  "nether_brick_fence[east=false,north=false,south=false,waterlogged=false,west=true]": 153,
  "polished_blackstone_wall[east=low,north=low,south=low,up=true,waterlogged=false,west=none]": 269,
  "light_blue_wool": 255,
  "polished_blackstone_wall[east=tall,north=none,south=tall,up=true,waterlogged=false,west=none]": 31,
  "polished_blackstone_brick_stairs[facing=west,half=top,shape=inner_left,waterlogged=false]": 141,
  "iron_trapdoor[facing=north,half=bottom,open=false,powered=false,waterlogged=false]": 289,
  "nether_brick_fence[east=true,north=true,south=true,waterlogged=false,west=false]": 318,
  "basalt[axis=x]": 74,
  "polished_blackstone_wall[east=tall,north=none,south=none,up=true,waterlogged=false,west=none]": 161,
  "nether_brick_wall[east=none,north=low,south=none,up=true,waterlogged=false,west=none]": 183,
  "polished_blackstone_wall[east=none,north=low,south=none,up=true,waterlogged=false,west=none]": 264,
  "iron_bars[east=false,north=false,south=false,waterlogged=false,west=true]": 177,
  "iron_bars[east=false,north=false,south=false,waterlogged=false,west=false]": 336,
  "polished_blackstone_wall[east=none,north=tall,south=tall,up=true,waterlogged=false,west=low]": 84,
  "polished_blackstone_stairs[facing=north,half=top,shape=inner_right,waterlogged=false]": 61,
  "campfire[facing=south,lit=true,signal_fire=false,waterlogged=false]": 107,
  "nether_brick_stairs[facing=south,half=top,shape=straight,waterlogged=false]": 272,
  "polished_blackstone": 22,
  "red_nether_brick_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=low]": 268,
  "red_nether_brick_wall[east=tall,north=tall,south=low,up=true,waterlogged=false,west=none]": 214,
  "blackstone_wall[east=none,north=tall,south=tall,up=false,waterlogged=false,west=none]": 179,
  "polished_blackstone_brick_wall[east=none,north=tall,south=tall,up=false,waterlogged=false,west=none]": 246,
  "nether_brick_wall[east=tall,north=tall,south=tall,up=true,waterlogged=false,west=none]": 207,
  "polished_blackstone_stairs[facing=south,half=top,shape=outer_left,waterlogged=false]": 50,
  "polished_blackstone_wall[east=tall,north=low,south=low,up=true,waterlogged=false,west=none]": 325,
  "basalt[axis=y]": 68,
  "netherite_block": 102,
  "fire[age=15,east=false,north=false,south=false,up=false,west=false]": 259,
  "polished_blackstone_brick_wall[east=low,north=tall,south=low,up=true,waterlogged=false,west=tall]": 198,
  "red_nether_brick_wall[east=tall,north=none,south=tall,up=true,waterlogged=false,west=none]": 228,
  "barrel[facing=up,open=false]": 293,
  "blue_wool": 261,
  "red_nether_brick_wall[east=low,north=low,south=none,up=true,waterlogged=false,west=none]": 117,
  "polished_blackstone_brick_wall[east=none,north=none,south=tall,up=true,waterlogged=false,west=tall]": 77,
  "flower_pot": 341,
  "campfire[facing=east,lit=true,signal_fire=false,waterlogged=false]": 108,
  "iron_bars[east=true,north=true,south=false,waterlogged=false,west=true]": 340,
  "red_nether_brick_wall[east=tall,north=low,south=none,up=true,waterlogged=false,west=none]": 284,
  "polished_blackstone_wall[east=none,north=tall,south=none,up=true,waterlogged=false,west=tall]": 44,
  "polished_blackstone_wall[east=none,north=none,south=low,up=true,waterlogged=false,west=low]": 40,
  "nether_brick_wall[east=tall,north=none,south=none,up=true,waterlogged=false,west=none]": 162,
  "cobblestone": 8,
  "red_nether_brick_wall[east=none,north=tall,south=tall,up=true,waterlogged=false,west=tall]": 191,
  "polished_blackstone_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=low]": 263,
  "red_nether_brick_wall[east=low,north=low,south=low,up=true,waterlogged=false,west=none]": 218,
  "blackstone_stairs[facing=south,half=bottom,shape=straight,waterlogged=false]": 225,
  "polished_blackstone_wall[east=none,north=low,south=tall,up=true,waterlogged=false,west=tall]": 250,
  "cobblestone_stairs[facing=east,half=top,shape=straight,waterlogged=false]": 46,
  "spruce_trapdoor[facing=north,half=bottom,open=true,powered=false,waterlogged=false]": 294,
  "polished_blackstone_brick_stairs[facing=west,half=top,shape=outer_right,waterlogged=false]": 130,
  "dark_oak_slab[type=top,waterlogged=false]": 295,
  "basalt[axis=z]": 125,
  "polished_blackstone_brick_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]": 76,
  "stone_slab[type=double,waterlogged=false]": 38,
  "nether_brick_wall[east=none,north=low,south=low,up=true,waterlogged=false,west=low]": 199,
  "red_nether_brick_stairs[facing=north,half=bottom,shape=straight,waterlogged=false]": 200,
  "red_nether_brick_wall[east=none,north=none,south=tall,up=true,waterlogged=false,west=none]": 185,
  "polished_blackstone_wall[east=low,north=none,south=tall,up=true,waterlogged=false,west=low]": 343,
  "red_nether_brick_slab[type=top,waterlogged=false]": 99,
  "nether_brick_fence[east=false,north=true,south=false,waterlogged=false,west=false]": 155,
  "polished_blackstone_wall[east=tall,north=none,south=tall,up=true,waterlogged=false,west=low]": 34,
  "iron_bars[east=false,north=false,south=true,waterlogged=false,west=true]": 121,
  "polished_blackstone_wall[east=none,north=none,south=none,up=true,waterlogged=false,west=none]": 133,
  "polished_blackstone_brick_stairs[facing=south,half=top,shape=inner_right,waterlogged=false]": 212,
  "water[level=0]": 9,
  "tall_grass[half=lower]": 4,
  "polished_blackstone_stairs[facing=north,half=top,shape=outer_right,waterlogged=false]": 57,
  "polished_blackstone_brick_stairs[facing=north,half=top,shape=straight,waterlogged=false]": 94,
  "polished_blackstone_brick_stairs[facing=west,half=top,shape=inner_right,waterlogged=false]": 127,
  "polished_basalt[axis=y]": 150,
  "polished_blackstone_wall[east=none,north=low,south=none,up=true,waterlogged=false,west=low]": 42,
  "polished_blackstone_brick_stairs[facing=west,half=top,shape=outer_left,waterlogged=false]": 90,
  "polished_blackstone_brick_wall[east=low,north=tall,south=tall,up=true,waterlogged=false,west=none]": 240,
  "polished_blackstone_brick_stairs[facing=east,half=top,shape=inner_right,waterlogged=false]": 140,
  "cobblestone_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]": 15,
  "polished_blackstone_wall[east=tall,north=tall,south=tall,up=true,waterlogged=false,west=none]": 236,
  "polished_blackstone_brick_wall[east=none,north=low,south=tall,up=true,waterlogged=false,west=tall]": 70,
  "polished_blackstone_wall[east=tall,north=none,south=none,up=true,waterlogged=false,west=tall]": 186,
  "polished_blackstone_stairs[facing=west,half=bottom,shape=straight,waterlogged=false]": 147,
  "polished_blackstone_slab[type=double,waterlogged=false]": 178,
  "polished_blackstone_wall[east=none,north=tall,south=tall,up=false,waterlogged=false,west=none]": 106,
  "blackstone_stairs[facing=east,half=top,shape=straight,waterlogged=false]": 242,
  "nether_brick_fence[east=false,north=false,south=true,waterlogged=false,west=true]": 317,
  "tall_grass[half=upper]": 5,
  "chain[axis=z,waterlogged=false]": 265,
  "iron_bars[east=true,north=false,south=false,waterlogged=false,west=false]": 175,
  "chain[axis=y,waterlogged=false]": 78,
  "polished_basalt[axis=x]": 170,
  "chain[axis=x,waterlogged=false]": 267,
  "polished_blackstone_brick_wall[east=none,north=low,south=none,up=true,waterlogged=false,west=low]": 135,
  "stone_stairs[facing=north,half=top,shape=straight,waterlogged=false]": 109,
  "polished_blackstone_wall[east=low,north=none,south=tall,up=true,waterlogged=false,west=none]": 157,
  "nether_brick_slab[type=bottom,waterlogged=false]": 101,
  "red_nether_brick_wall[east=low,north=low,south=none,up=true,waterlogged=false,west=low]": 80,
  "blackstone_wall[east=none,north=tall,south=none,up=true,waterlogged=false,west=tall]": 159,
  "nether_brick_wall[east=none,north=tall,south=none,up=true,waterlogged=false,west=none]": 163,
  "polished_blackstone_wall[east=tall,north=low,south=tall,up=true,waterlogged=false,west=none]": 249,
  "dandelion": 16,
  "polished_blackstone_stairs[facing=east,half=top,shape=outer_left,waterlogged=false]": 64,
  "oxeye_daisy": 11,
  "polished_blackstone_wall[east=none,north=none,south=low,up=true,waterlogged=false,west=none]": 164
}

test("palette conversion", () => {
  const p = toBeadRockEdition(examplePallete)
  expect(p[16]).toEqual("Dandelion")
  expect(p[11]).toEqual("Oxeye Daisy")
  expect(p[168]).toEqual('torch["torch_facing_direction":"west"]')
  expect(p[163]).toEqual('cobblestone_wall["wall_block_type":"nether_brick"]')
})

test("palette conversion sanity check", () => {
  const p = toBeadRockEdition(examplePallete)
  for (const pKey in p) {
    expect(p[pKey]).not.toContain("=")
  }
})
