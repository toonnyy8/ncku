import fs from "fs";

import { PubMed } from "./types";
import { parsePubMedXML } from "./utils";

let datasName = fs.readdirSync(`${__dirname}/.data/`);
let docs: PubMed[];
docs = datasName.reduce((prev, dataName) => {
  if ((dataName.split(".")?.at(-1) ?? "") == "xml") {
    let xml = fs.readFileSync(`${__dirname}/.data/${dataName}`, "utf8");
    let pubMeds = parsePubMedXML(xml);
    return [...prev, ...pubMeds];
  }
  return prev;
}, [] as PubMed[]);

fs.writeFileSync(`${__dirname}/.data/.docs`, JSON.stringify(docs));
