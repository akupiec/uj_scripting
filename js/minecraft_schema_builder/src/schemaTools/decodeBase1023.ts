export let charTable = "";
for (let i = 0; charTable.length < 1024; i++) {
  const nextChar = String.fromCharCode(i + 33);
  if (!"'\"`".includes(nextChar)) {
    charTable += nextChar;
  }
}

export function decodeBase1023(encoded: string): number[] {
  let out = [];
  for (let i = 0; i < encoded.length; i++) {
    out.push(charTable.indexOf(encoded[i]));
  }
  return out;
}
