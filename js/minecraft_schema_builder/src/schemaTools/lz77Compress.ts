function _findMatch(offset: number, windowSize: number, input: string | number[]) {
  let matchLength = 0;
  let matchDistance = 0;

  for (let i = Math.max(0, offset - windowSize); i < offset; i++) {
    let length = 0;

    while (length < windowSize && offset + length < input.length && input[i + length] === input[offset + length]) {
      length++;
    }

    if (length > matchLength) {
      matchLength = length;
      matchDistance = offset - i;
      if (matchDistance < 0 || matchLength < 0) {
        break;
      }
    }
  }
  return [matchDistance, matchLength];
}

export function lz77Compress(input: string | number[], windowSize = 20) {
  const output = [];
  let offset = 0;

  while (offset < input.length) {
    let [matchDistance, matchLength] = _findMatch(offset, windowSize, input);

    if (matchLength > 0) {
      output.push(matchDistance, matchLength, input[offset + matchLength]);
      offset += matchLength + 1;
    } else {
      output.push(0, 0, input[offset]);
      offset += 1;
    }
  }

  if(output[output.length-1] === undefined) {
    output.pop()
  }

  return output;
}
