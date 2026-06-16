import { readdirSync } from "node:fs";
import { join } from "node:path";
import { intro, isCancel, outro, select } from "@clack/prompts";
import type { SolutionModule } from "./src/types";

const SRC_DIR = join(import.meta.dir, "src");

function listDirectories(path: string): string[] {
  return readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

intro("Advent of Code");

const years = listDirectories(SRC_DIR);

if (years.length === 0) {
  outro("No solutions found yet. Add one under src/<year>/day<NN>/solution.ts");
  process.exit(0);
}

const year = await select({
  message: "Which year?",
  options: years.map((value) => ({ value, label: value })),
});

if (isCancel(year)) {
  outro("Cancelled");
  process.exit(0);
}

const days = listDirectories(join(SRC_DIR, year));

if (days.length === 0) {
  outro(`No solutions found for ${year} yet.`);
  process.exit(0);
}

const day = await select({
  message: "Which day?",
  options: days.map((value) => ({ value, label: value })),
});

if (isCancel(day)) {
  outro("Cancelled");
  process.exit(0);
}

outro(`Running ${year} ${day}`);

const dayDir = join(SRC_DIR, year, day);
const solution: SolutionModule = await import(join(dayDir, "solution.ts"));
const raw = await Bun.file(join(dayDir, "input.txt")).text();

if (solution.part1) {
  console.log(`Part 1: ${solution.part1(raw)}`);
}
if (solution.part2) {
  console.log(`Part 2: ${solution.part2(raw)}`);
}
if (!(solution.part1 || solution.part2)) {
  console.log("This day does not export a part1 or part2 function yet.");
}
