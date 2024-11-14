import { charTable } from "./decodeBase1023";

export function encodeBase1023(input: any[]) {
  for (let i = 0; i < input.length; i++) {
    const number = input[i] ?? 1023;
    if (number < 0 || number > 1023) {
      throw new Error("can't encode " + number);
    }
    input[i] = charTable[number];
  }
  return input;
}
