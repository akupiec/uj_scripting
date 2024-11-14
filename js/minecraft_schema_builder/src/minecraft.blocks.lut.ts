const capitalize = (s) => (s && String(s[0]).toUpperCase() + String(s).slice(1)) || "";
const capitalizeAll = (s) => s.split("_").map(capitalize).join(" ");

function wall(k, v) {
  const trueName = k.replace(/_wall.*/, "");
  return [v, `cobblestone_wall["wall_block_type":"${trueName}"]`];
}

function torch(k, v) {
  const face = k.replace(/.*\[facing=(.*)\]/, "$1");
  return [v, `torch["torch_facing_direction":"${face}"]`];
}

function trimMeta(k, v) {
  return [v, capitalizeAll(k.replace(/\[.*/, ""))];
}

function axis(k) {
  return k.replace(/axis=([xyz])/, '"pillar_axis":"$1"');
}

function metaConverter(
  k: string,
  meta = "facing",
  str = "facing",
  map: object = {east: 0, west: 1, south: 2, north: 3},
) {
  const matcher = new RegExp(`${meta}=(\\w+)`);
  const match = k.match(matcher)[1];
  return k.replace(matcher, `"${str}":${map[match]}`);
}

function partMeta(k) {
  const match = k.match(/part=(\w+)/)[1] === "head" ? "true" : "false";
  return k.replace(/part=(\w+)/, `"head_piece_bit":${match}`);
}

function halfMeta_broken(k, str = "upper_block_bit") {
  const regExp = /half=(\w+)/;
  const match = k.match(regExp)[1] === "upper" ? "true" : "false";
  return k.replace(regExp, `"${str}":${match}`);
}

function hingeMeta(k) {
  const regExp = /hinge=(\w+)/;
  let match = k.match(regExp)[1] === "right" ? "true" : "false";
  return k.replace(regExp, `"door_hinge_bit":${match}`);
}

function metaMatchToStr(k: string, meta: string, str = "out") {
  const regexp = new RegExp(`${meta}=(\\w+)`);
  const match = k.match(regexp)[1];
  return k.replace(regexp, `"${str}":"${match}"`);
}

function metaMatchToNr(k: string, meta: string, str = "out") {
  const regexp = new RegExp(`${meta}=(\\w+)`);
  const match = k.match(regexp)[1];
  return k.replace(regexp, `"${str}":${match}`);
}

function removeSingleMeta(k, meta: string) {
  return k.replace(new RegExp(`,${meta}=(\\w+)`), ``);
}

function slab(k: string) {
  if (k.includes("type=double")) {
    return "Dark Oak Planks";
  }
  k = removeSingleMeta(metaMatchToStr(k, "type", "minecraft:vertical_half"), "waterlogged");
  return k.replace(/[\w_]+\[/, "oak_slab[");
}

const endRod = (k: string) =>
  metaConverter(k, "facing", "facing_direction", {
    up: 1,
    down: 0,
    east: 5,
    north: 2,
    south: 3,
    west: 4,
  });

const bed = (k: string) => {
  k = metaConverter(k, "facing", "direction", {
    south: 0,
    west: 1,
    north: 2,
    east: 3,
  });
  return partMeta(metaMatchToNr(k, "occupied", "occupied_bit"))
}

function trapDoor(k: string) {
  k = k.replace('oak_trapdoor', 'trapdoor')
  const k1 = metaConverter(k, "facing", "direction", {
    west: 1,
    east: 0,
    north: 3,
    south: 2,
  })
  const k2 = metaConverter(k1, "half", "upside_down_bit", {top: true, bottom: false});
  const k3 = metaMatchToNr(k2, "open", "open_bit");
  return removeSingleMeta(removeSingleMeta(k3, "waterlogged",), "powered",);
}

function door(k: string) {
  const k1 = metaConverter(k, "facing", "direction", {
    east: 0,
    south: 1,
    west: 2,
    north: 3,
  })
  return removeSingleMeta(metaMatchToNr(hingeMeta(halfMeta_broken(k1)), "open", "open_bit"), "powered",);
}

function stairs(k) {
  const k1 = metaConverter(k, "facing", "weirdo_direction", {
    east: 0,
    west: 1,
    south: 2,
    north: 3,
  })
  const k2 = metaConverter(k1, "half", "upside_down_bit", {bottom: false, top: true});
  return removeSingleMeta(removeSingleMeta(k2, "shape"), "waterlogged",);
}

export function toBeadRockEdition(plette: object) {
  return Object.fromEntries(
    Object.entries(plette).map(([k, v]) => {
      k = k.replace("minecraft:", "");
      v = v.value;
      k = k.replace("polished_deepslate", "polished_andesite");
      k = k.replace("cobbled_deepslate", "andesite");

      if (k.includes("_wall[")) return wall(k, v);
      if (k.includes("_torch")) return torch(k, v);
      if (k.includes("cake[")) return [v, metaMatchToStr(k, "bites", "bite_counter")];
      if (k.includes("end_rod[")) return [v, endRod(k)];
      if (k.includes("hay_block[") || k.includes("_wood[axis")) return [v, axis(k)];
      if (k.includes("_bed[")) return [v, bed(k)];
      if (k.includes("trapdoor[")) return [v, trapDoor(k)];
      if (k.includes("door[") && k.includes("half=upper")) return [v, "Air"];
      if (k.includes("door[")) return [v, door(k),];
      if (k.includes("stairs[")) return [v, stairs(k)];
      if (k.includes("_slab[")) return [v, slab(k)];

      if (
        k.includes("_air") ||
        k.includes("spawner") ||
        k.includes("seagrass") ||
        k.includes("_wall_sign") ||
        k.includes("head") ||
        k.includes("_wall_banner")
      )
        return [v, `Air`];

      if (k.includes("dripstone_block")) return [v, `Coal Block`];
      if (k.includes("_fence")) return [v, `Nether Brick Fence`];
      if (k.includes("_bricks")) return [v, `Stone Bricks`];
      if (k.includes("smooth")) return [v, capitalizeAll(k.replace("smooth", "")).trim()];
      if (k.includes("candle")) return [v, `Torch`];
      if (k.includes("calcite")) return [v, `White Wool`];
      if (k.includes("rooted_dirt")) return [v, `Dirt`];
      if (k.includes("tuff")) return [v, `Cobblestone`];
      if (k.includes("stripped_mangrove_wood")) return [v, `Cobblestone`];

      if (
        k.includes("grass") ||
        k.includes("water") ||
        k.includes("basalt") ||
        k.includes("fire") ||
        k.includes("barrel") ||
        k.includes("lectern") ||
        k.includes("plate") ||
        k.includes("hopper") ||
        k.includes("box") ||
        k.includes("button") ||
        k.includes("podzol")
      ) {
        return trimMeta(k, v);
      }
      return [v, capitalizeAll(k)];
    }),
  );
}
