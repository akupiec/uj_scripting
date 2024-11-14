import { expect, test } from "bun:test";
import { indexToCords } from "./indexToCords";

test("cord calculation", () => {
  const size = [100, 123, 442];
  const i = 12,
    k = 24,
    j = 54;
  const n = i * size[2] * size[1] + j * size[2] + k;
  expect(indexToCords(n, size)).toEqual([i, j, k]);
});
