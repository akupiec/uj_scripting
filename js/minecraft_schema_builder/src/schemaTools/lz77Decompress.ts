export function lz77Decompress(compressed: any[]) {
  let output: any[] = [];

  for (let i = 0; i < compressed.length; i += 3) {
    const [distance, length, nextChar] = [compressed[i], compressed[i + 1], compressed[i + 2]];
    if (distance === 0 && length === 0) {
      output.push(nextChar);
    } else {
      const start = output.length - distance;

      for (let j = 0; j < length; j++) {
        output.push(output[start + (j % distance)]);
      }
      output.push(nextChar);
    }
  }

  if (output[output.length - 1] === undefined) {
    output.pop();
  }
  return output;
}
