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
  return k.replace(/axis=([xyz])/, "\"pillar_axis\":\"$1\"");
}


function facingTo4Str(k, str = "facing") {
  function compasDirToNr (str) {
    switch (str) {
      case "east" : return 3;
      case "north" : return 2;
      case "south" : return 0;
      case "west" : return 1;
    }
  }
  const match = k.match(/facing=(\w+)/)[1];
  return k.replace(/facing=\w+/, `"${str}":${compasDirToNr(match)}`)
}

function facingTo6Str(k, str = "facing") {
  function compasDirToNr (str) {
    switch (str) {
      case "up" : return 1;
      case "down" : return 0;
      case "east" : return 5;
      case "north" : return 2;
      case "south" : return 3;
      case "west" : return 4;
    }
  }
  const match = k.match(/facing=(\w+)/)[1];
  return k.replace(/facing=\w+/, `"${str}":${compasDirToNr(match)}`)
}

function partMeta(k) {
  const match = (k.match(/part=(\w+)/)[1] === 'head') ? "true" : "false";
  return k.replace(/part=(\w+)/, `"head_piece_bit":"${match}"`)
}

function metaMatchToStr(k: string, meta: string, str = "out") {
  const regexp = new RegExp(`${meta}=(\\w+)`)
  const match = k.match(regexp)[1];
  return k.replace(regexp, `"${str}":"${match}"`)
}

export function toBeadRockEdition(plette: object) {
  return Object.fromEntries(
    Object.entries(plette).map(([k, v]) => {
      k = k.replace("minecraft:", "");
      v = v.value;
      if (k.includes("_wall[")) return wall(k, v);
      if (k.includes("_torch")) return torch(k, v);
      if (k.includes("cake[")) return [v, metaMatchToStr(k, 'bites', 'bite_counter')];
      if (k.includes("end_rod[")) return [v, facingTo6Str(k, 'facing_direction')];
      if (k.includes("hay_block[")) return [v, axis(k)];
      if (k.includes("_bed[")) {
        const k1 = facingTo4Str(k, 'direction');
        const s = metaMatchToStr(k1, 'occupied', 'occupied_bit');
        return [v, partMeta(s)];
      }

      if (k.includes("_air")
        || k.includes("spawner")
        || k.includes("seagrass")
        || k.includes("stripped_mangrove_wood")
        || k.includes("head")
        || k.includes("_wall_banner")
        || k.includes("tuff"))
        return [v, `Air`];

      if (k.includes("_fence")) return [v, `Nether Brick Fence`];
      if (k.includes("_bricks")) return [v, `Stone Bricks`];

      if (k.includes("_stairs")) return [v, `Oak Stairs`];
      if (k.includes("_slab")) return [v, `Oak Slab`];
      if (k.includes("smooth")) return [v, capitalizeAll(k.replace("smooth", "")).trim()];
      if (k.includes("candle")) return [v, `Torch`];
      if (k.includes("calcite")) return [v, `White Wool`];

      if (
        k.includes("grass") ||
        k.includes("water") ||
        k.includes("basalt") ||
        k.includes("button") ||
        k.includes("fire") ||
        k.includes("barrel") ||
        k.includes("lectern") ||
        k.includes("plate") ||
        k.includes("hopper") ||
        k.includes("box") ||
        k.includes("podzol") ||
        k.includes("stripped_spruce_wood") ||
        k.includes("door")
      ) {
        return trimMeta(k, v);
      }
      return [v, capitalizeAll(k)];
    }),
  );
}
