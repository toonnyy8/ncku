import fs from "fs";

import { PubMed } from "./types";
import { parsePubMedXML } from "./utils";

let covidDatasName = fs.readdirSync(`${__dirname}/.data/covid/`);
let covidDocs: PubMed[];
covidDocs = covidDatasName.reduce((prev, dataName) => {
  if ((dataName.split(".")?.at(-1) ?? "") == "xml") {
    let xml = fs.readFileSync(`${__dirname}/.data/covid/${dataName}`, "utf8");
    let pubMeds = parsePubMedXML(xml);
    return [...prev, ...pubMeds];
  }
  return prev;
}, [] as PubMed[]);

let bdDatasName = fs.readdirSync(`${__dirname}/.data/bipolardis/`);
let bdDocs: PubMed[];
bdDocs = bdDatasName.reduce((prev, dataName) => {
  if ((dataName.split(".")?.at(-1) ?? "") == "xml") {
    let xml = fs.readFileSync(
      `${__dirname}/.data/bipolardis/${dataName}`,
      "utf8"
    );
    let pubMeds = parsePubMedXML(xml);
    return [...prev, ...pubMeds];
  }
  return prev;
}, [] as PubMed[]);

fs.writeFileSync(
  `${__dirname}/.data/.docs`,
  JSON.stringify([...covidDocs, ...bdDocs])
);
