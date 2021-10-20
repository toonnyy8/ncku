import fs from "fs";
import { parsePubMedXML } from "./utils";

let xml = fs.readFileSync(`${__dirname}/test1.xml`, "utf8");
let xmls = fs.readFileSync(`${__dirname}/tests.xml`, "utf8");
console.dir(parsePubMedXML(xml));
// parsePubMedXML(xmls);
