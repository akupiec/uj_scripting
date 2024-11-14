import { expect, test } from "bun:test";
import { charTable, encodeBase1023 } from "./encodeBase1023";
import { decodeBase1023 } from "./decodeBase1023";

test("encode base1023 charset", () => {
  expect(charTable.length).toBe(1024);
  expect(charTable).not.toContain("'");
});

test("encode/decode base1023", () => {
  const input = [1, 222, 1023, 0, 3, 3];
  const encoded = encodeBase1023(input);
  expect(encoded.length).toBe(input.length);
  const decoded = decodeBase1023(encoded);
  expect(decoded).toEqual(input);
});
