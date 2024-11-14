export let charTable = "";
for (let i = 0; charTable.length < 1024; i++) {
  const nextChar = String.fromCharCode(i + 33);
  if (!"'\"`".includes(nextChar)) {
    charTable += nextChar;
  }
}

export function decodeBase1023(encoded: any[]): number[] {
  for (let i = 0; i < encoded.length; i++) {
    encoded[i] = charTable.indexOf(encoded[i]);
  }
  return encoded;
}
