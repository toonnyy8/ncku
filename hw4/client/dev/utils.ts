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

const calcSentTermFreq = (
  vocab: string[],
  sents: [number, string][],
  terms: [number, string][]
) => {
  let termCount: number[][] = [];
  for (const [sidx, token] of terms) {
    if (termCount[sidx] == undefined) {
      termCount[sidx] = new Array(vocab.length).fill(0);
    }
    const vidx = vocab.findIndex((tk) => tk == token);
    if (vidx != -1) {
      termCount[sidx][vidx] += 1;
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

export const calcDocTfidf = (
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

const calcInvSentFreq = (
  vocab: string[],
  sents: [number, string][],
  terms: [number, string][]
) => {
  let sentNum = sents.length;
  let sentSets = sents.map(() => new Set());

  for (const [sidx, term] of terms) {
    sentSets[sidx].add(term);
  }

  let isf = vocab
    .map((v) => {
      return sentSets.reduce(
        (prev, sentSet) => prev + (sentSet.has(v) ? 1 : 0),
        1
      );
    })
    .map((v) => sentNum / v)
    .map((v) => Math.log(v));

  return isf;
};

export const calcSentTfidf = (
  vocab: string[],
  sents: [number, string][],
  terms: [number, string][]
) => {
  const termFreq = calcSentTermFreq(vocab, sents, terms);
  const isf = calcInvSentFreq(vocab, sents, terms);

  const stfidf = termFreq.map((freq) => {
    return freq.map((f, i) => f * isf[i]);
  });

  return stfidf;
};

export const calcSentsEmbWithDocWeighted = (
  vocab: string[],
  embs: number[][],
  weights: number[][],
  sents: [number, string][],
  terms: [number, string][],
  stopWord: Set<string>
) => {
  const dim = embs[0].length;
  const sentsEmb = sents.map(() => {
    return new Array(dim).fill(0);
  });
  for (const [sidx, term] of terms) {
    const didx = sents[sidx][0];
    const vidx = vocab.findIndex((v) => v == term);
    if (vidx != -1 && !stopWord.has(term)) {
      for (const [i, e] of embs[vidx].entries()) {
        sentsEmb[sidx][i] += e * weights[didx][vidx];
      }
    }
  }

  return sentsEmb;
};

// export const calcSentsEmbWithTfisf = (
//   vocab: string[],
//   embs: number[][],
//   tfisf: number[][],
//   sents: [number, string][],
//   terms: [number, string][],
//   stopWord: Set<string>
// ) => {
//   const dim = embs[0].length;
//   const sentsEmb = sents.map(() => {
//     return new Array(dim).fill(0);
//   });
//   for (const [sidx, term] of terms) {
//     const didx = sents[sidx][0];
//     const vidx = vocab.findIndex((v) => v == term);
//     if (vidx != -1 && !stopWord.has(term)) {
//       for (const [i, e] of embs[vidx].entries()) {
//         sentsEmb[sidx][i] += e * tfisf[didx][vidx];
//       }
//     }
//   }
//
//   return sentsEmb;
// };

export const calcSentsEmbWithSentWeighted = (
  vocab: string[],
  embs: number[][],
  weights: number[][],
  sents: [number, string][],
  terms: [number, string][],
  stopWord: Set<string>
) => {
  const dim = embs[0].length;
  const sentsEmb = sents.map(() => {
    return new Array(dim).fill(0);
  });
  for (const [sidx, term] of terms) {
    const vidx = vocab.findIndex((v) => v == term);
    if (vidx != -1 && !stopWord.has(term)) {
      for (const [i, e] of embs[vidx].entries()) {
        sentsEmb[sidx][i] += e * weights[sidx][vidx];
      }
    }
  }

  return sentsEmb;
};

export const calcDocBM25 = (
  vocab: string[],
  sents: [number, string][],
  terms: [number, string][]
) => {
  const termFreq = calcTermFreq(vocab, sents, terms);
  const idf = calcInvDocFreq(termFreq);
  const docNum = sents.at(-1)[0] + 1;
  const docLens: number[] = new Array(docNum).fill(0);

  for (const [sidx, _] of terms) {
    const didx = sents[sidx][0];
    docLens[didx] += 1;
  }
  const docAvgLen = terms.length / docNum;
  const k1 = 1.5;
  const k3 = 1.5;
  const b = 7.5;

  const bm25 = termFreq.map((freq, didx) => {
    return freq.map((f, i) => {
      const t1 = (k1 + 1) * f;
      const t2 = k1 * (1 - b + b * (docLens[didx] / docAvgLen)) + f;

      const u1 = (k3 + 1) * f;
      const u2 = k3 + f;

      return (t1 / t2) * (u1 / u2) * idf[i];
    });
  });

  return bm25;
};

export const calcSentBM25 = (
  vocab: string[],
  sents: [number, string][],
  terms: [number, string][]
) => {
  const termFreq = calcSentTermFreq(vocab, sents, terms);
  const idf = calcInvSentFreq(vocab, sents, terms);
  const sentNum = sents.length;
  const sentLens: number[] = new Array(sentNum).fill(0);

  for (const [sidx, _] of terms) {
    sentLens[sidx] += 1;
  }
  const sentAvgLen = terms.length / sentNum;
  const k1 = 1.5;
  const k3 = 1.5;
  const b = 7.5;

  const bm25 = termFreq.map((freq, didx) => {
    return freq.map((f, i) => {
      const t1 = (k1 + 1) * f;
      const t2 = k1 * (1 - b + b * (sentLens[didx] / sentAvgLen)) + f;

      const u1 = (k3 + 1) * f;
      const u2 = k3 + f;

      return (t1 / t2) * (u1 / u2) * idf[i];
    });
  });

  return bm25;
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
