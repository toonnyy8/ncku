export interface AbstractText {
  category:
    | "BACKGROUND"
    | "OBJECTIVE"
    | "METHODS"
    | "RESULTS"
    | "CONCLUSIONS"
    | "UNASSIGNED";
  text: string;
}

export interface PubMed {
  title: string;
  abstract: AbstractText[];
}

export interface Doc {
  title: string;
  content: string[];
  charNum: number;
  wordNum: number;
  sentenceNum: number;
}

export interface TokenInfo {
  docIdx: number;
  category: "title" | `content:${number}`;
  index: number;
}

export interface DocTokenDict {
  [docIdx: number]: {
    title: number[];
    content: { [paragraphIdx: number]: number[] };
  };
}

export interface TextWithAttr {
  text: string;
  attr: "highlight" | "normal";
}
