import fs from "fs";
import { parsePubMedXML } from "./utils";
let xml = fs.readFileSync(`${__dirname}/test.xml`, "utf8");
parsePubMedXML(xml);
//# sourceMappingURL=test.js.map
