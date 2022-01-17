import fs from "fs";
import fetch from "node-fetch";

let fileName = process.argv[2];
let targetDirName = process.argv[3];

let pmids = fs
  .readFileSync(`${__dirname}/../${fileName}`, "utf8")
  .matchAll(/[0-9][0-9]*/g);

let pmid_list = "";
let count = 0;

let f = (url: string, idx: number) => () =>
  fetch(url)
    .then((response: any) => response.text())
    .then((xml: string) =>
      fs.writeFileSync(`${__dirname}/../.data/${targetDirName}/${idx}.xml`, xml)
    );
let fn_arr = [];

let fileIdx = 0;
for (let [pmid] of pmids) {
  pmid_list += pmid + ",";
  count += 1;
  if (count % 100 == 0) {
    let url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid_list}&retmode=abstract&rettype=xml`;
    fn_arr.push(f(url, fileIdx));
    pmid_list = "";
    fileIdx += 1;
  }
  // if (count == 2000) break;
}
if (count % 100 != 0) {
  let url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid_list}&retmode=abstract&rettype=xml`;
  fn_arr.push(f(url, fileIdx));
}
fn_arr.reduce((p, f) => p.then(f), Promise.resolve());
