import fs from "fs";
import { parsePubMedXML, buildTokenTable, levenshteinDistance } from "./utils";
import { stemmer } from "./porter";
console.log(stemmer("I'm"));
let xml = fs.readFileSync(`${__dirname}/test1.xml`, "utf8");
let xmls = fs.readFileSync(`${__dirname}/tests.xml`, "utf8");
let pubMeds = parsePubMedXML(xml);
// console.log(buildTokenTable(pubMeds));
// parsePubMedXML(xmls);

console.log(levenshteinDistance("aa", "sitting"));
