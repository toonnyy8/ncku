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
