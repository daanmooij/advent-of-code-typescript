export type PartFn = (raw: string) => number | string;

export interface SolutionModule {
  part1?: PartFn;
  part2?: PartFn;
}
