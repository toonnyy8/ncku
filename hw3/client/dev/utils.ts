export const parserVector = (tsv: string) => {
  return tsv.split("\n").map((v) => v.split("\t").map((x) => Number(x)));
};

export const parserMetadata = (tsv: string) => {
  return tsv.split("\n");
};

export const levenshteinDistance = (source: string, target: string): number => {
  let distances: number[][] = [
    [
      0,
      ...Array(target.length)
        .fill(0)
        .map((_, idx) => idx + 1),
    ],
  ];
  for (let [i, c1] of source.split("").entries()) {
    distances.push([i + 1]);
    for (let [j, c2] of target.split("").entries()) {
      let ins = distances[i + 1][j] + 1;
      let del = distances[i][j + 1] + 1;
      let sub = distances[i][j] + (c1 == c2 ? 0 : 1);
      distances[i + 1].push(Math.min(ins, del, sub));
    }
  }
  return distances?.at(-1)?.at(-1) ?? NaN;
};
