import fs from "fs";
import {
  parsePubMedXML,
  buildTokenTable,
  levenshteinDistance,
  searchTokenTable,
  zipf,
  subseqEditDistance,
} from "./utils";
import { stemmer } from "./porter";
console.log(stemmer("I'm"));
let xml = fs.readFileSync(`${__dirname}/test1.xml`, "utf8");
let xmls = fs.readFileSync(`${__dirname}/tests.xml`, "utf8");
let pubMeds = parsePubMedXML(xml);
let table = buildTokenTable(pubMeds);
// parsePubMedXML(xmls);
console.dir(searchTokenTable("covad18", table));

// console.log(zipf(table));
console.log(levenshteinDistance("sit", "sitting"));
console.log(subseqEditDistance([["covid"], ["19"]], ["19", "covid"]));
