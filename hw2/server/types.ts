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

export interface TokenTable {
  [token: string]: {
    [didx: `${number}`]: {
      title?: Set<number>;
      [aidx: `${number}`]: Set<number>;
    };
  };
}
