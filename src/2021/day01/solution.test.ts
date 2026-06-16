import { describe, expect, it } from "bun:test";
import { countIncreases, parseInput, part1 } from "./solution";

const SAMPLE = `199
200
208
210
200
207
240
269
260
263`;

describe("2021 day 01 - part 1", () => {
  it("parses raw text into an array of numbers", () => {
    expect(parseInput(SAMPLE)).toEqual([
      199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
    ]);
  });

  it("counts how many depths increase from the previous", () => {
    const depths = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
    expect(countIncreases(depths)).toBe(7);
  });

  it("solves part 1 from raw input", () => {
    expect(part1(SAMPLE)).toBe(7);
  });
});
