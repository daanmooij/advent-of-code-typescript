export function parseInput(raw: string): number[] {
  return raw
    .trim()
    .split("\n")
    .map((line) => Number(line.trim()));
}

export function countIncreases(depths: number[]): number {
  let count = 0;
  let previous: number | undefined;
  for (const depth of depths) {
    if (previous !== undefined && depth > previous) {
      count++;
    }
    previous = depth;
  }
  return count;
}

export function part1(raw: string): number {
  return countIncreases(parseInput(raw));
}
