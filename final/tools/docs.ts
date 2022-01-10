import fs from "fs";

import { PubMed } from "./types";
import { parsePubMedXML } from "./utils";

let dataDirList: string[] = ["covid", "bipolardis", "covid-bd"];
// let dataDirList: string[] = ["covid-bd"];

let pubMedDocs = dataDirList
  .map((dataDir) => {
    let datasName = fs.readdirSync(`${__dirname}/../.data/${dataDir}/`);
    let docs: PubMed[];
    docs = datasName.reduce((prev, dataName) => {
      if ((dataName.split(".")?.at(-1) ?? "") == "xml") {
        let xml = fs.readFileSync(
          `${__dirname}/../.data/${dataDir}/${dataName}`,
          "utf8"
        );
        let pubMeds = parsePubMedXML(xml);
        return [...prev, ...pubMeds];
      }
      return prev;
    }, [] as PubMed[]);

    return docs;
  })
  .reduce((prev, docs) => [...prev, ...docs], []);

fs.writeFileSync(`${__dirname}/../.data/docs.json`, JSON.stringify(pubMedDocs));
