import * as tf from "@tensorflow/tfjs";

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

const calcTermFreq = (
  vocab: string[],
  sents: [number, string][],
  terms: [number, string][]
) => {
  let termCount: number[][] = [];
  for (const [sidx, token] of terms) {
    const didx = sents[sidx][0];
    if (termCount[didx] == undefined) {
      termCount[didx] = new Array(vocab.length).fill(0);
    }
    const vidx = vocab.findIndex((tk) => tk == token);
    if (vidx != -1) {
      termCount[didx][vidx] += 1;
    }
  }
  const termFreq = termCount.map((docTermCount) => {
    const total = docTermCount.reduce((total, count) => total + count, 0);
    return docTermCount.map((count) => count / total);
  });

  return termFreq;
};

const calcInvDocFreq = (termFreq: number[][]) => {
  const docNum = termFreq.length;
  const idf = termFreq
    .reduce(
      (df, freq) => {
        return df.map((v, i) => (v + freq[i] != 0 ? 1 : 0));
      },
      termFreq[0].map(() => 1)
    )
    .map((v) => docNum / v)
    .map((v) => Math.log(v));

  return idf;
};

export const calcTfidf = (
  vocab: string[],
  sents: [number, string][],
  terms: [number, string][]
) => {
  const termFreq = calcTermFreq(vocab, sents, terms);
  const idf = calcInvDocFreq(termFreq);

  const tfidf = termFreq.map((freq) => {
    return freq.map((f, i) => f * idf[i]);
  });

  return tfidf;
};

export const calcSentsEmbWithTfidf = (
  vocab: string[],
  embs: number[][],
  tfidf: number[][],
  sents: [number, string][],
  terms: [number, string][]
) => {
  const dim = embs[0].length;
  const sentsEmb = sents.map(() => {
    return new Array(dim).fill(0);
  });
  for (const [sidx, term] of terms) {
    const didx = sents[sidx][0];
    const vidx = vocab.findIndex((v) => v == term);
    if (vidx != -1) {
      for (const [i, e] of embs[vidx].entries()) {
        sentsEmb[sidx][i] += e * tfidf[didx][vidx];
      }
    }
  }

  return sentsEmb;
};

export const stopWord = new Set([
  "about",
  "again",
  "al",
  "all",
  "almost",
  "also",
  "although",
  "always",
  "among",
  "an",
  "and",
  "another",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "between",
  "both",
  "but",
  "by",
  "can",
  "could",
  "did",
  "do",
  "does",
  "done",
  "due",
  "during",
  "each",
  "eight",
  "either",
  "enough",
  "especially",
  "et.",
  "et",
  "etc",
  "five",
  "for",
  "found",
  "four",
  "from",
  "further",
  "had",
  "has",
  "have",
  "having",
  "here",
  "how",
  "however",
  "i",
  "ie",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "itself",
  "just",
  "kg",
  "km",
  "made",
  "mainly",
  "make",
  "may",
  "mg",
  "might",
  "ml",
  "mm",
  "many",
  "most",
  "mostly",
  "must",
  "nearly",
  "neither",
  "nine",
  "no",
  "nor",
  "not",
  "obtained",
  "of",
  "often",
  "on",
  "one",
  "or",
  "our",
  "overall",
  "perhaps",
  "quite",
  "rather",
  "really",
  "regarding",
  "seem",
  "seen",
  "seven",
  "several",
  "should",
  "show",
  "showed",
  "shown",
  "shows",
  "significantly",
  "since",
  "six",
  "so",
  "some",
  "such",
  "ten",
  "than",
  "that",
  "the",
  "their",
  "theirs",
  "them",
  "then",
  "there",
  "therefore",
  "these",
  "they",
  "this",
  "those",
  "three",
  "through",
  "thus",
  "to",
  "two",
  "upon",
  "use",
  "used",
  "using",
  "various",
  "very",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "whether",
  "which",
  "while",
  "who",
  "why",
  "with",
  "within",
  "without",
]);
