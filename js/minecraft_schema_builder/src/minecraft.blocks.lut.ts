const capitalize = s => (s && String(s[0]).toUpperCase() + String(s).slice(1)) || "";
const capitalizeAll = s => s.split("_").map(capitalize).join(' ');

function wall(k, v) {
  const trueName = k.replace(/_wall.*/, "");
  return [v, `cobblestone_wall["wall_block_type":"${trueName}"]`];
}
function torch(k, v) {
  const face = k.replace(/.*\[facing=(.*)\]/, '$1')
  return [v, `torch["torch_facing_direction":"${face}"]`];
}

function trimMeta(k, v) {
  return [v, capitalizeAll(k.replace(/\[.*/, ''))]
}

export function toBeadRockEdition(plette: object) {
  return Object.fromEntries(
    Object.entries(plette).map(([k, v]) => {
      if (k.includes('_wall')) {
        return wall(k, v)
      }
      if (k.includes('_torch')) {
        return torch(k, v)
      }
      if (k.includes('grass')
        || k.includes('water')
        || k.includes('basalt')
        || k.includes('button')
        || k.includes('fire')
        || k.includes('barrel')
        || k.includes('lectern')
        || k.includes('plate')
        || k.includes('box')
        || k.includes('podzol')
        || k.includes('door')
      ) {
        return trimMeta(k, v)
      }
      return [v, capitalizeAll(k)]
    }))
}
