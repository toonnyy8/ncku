import fs from "fs";
import fetch from "node-fetch";

let pmids = fs
  .readFileSync(`${__dirname}/pmid-bipolardis-set.txt`, "utf8")
  .matchAll(/[0-9][0-9]*/g);

let pmid_list = "";
let count = 0;

let f = (url: string, idx: number) => () =>
  fetch(url)
    .then((response: any) => response.text())
    .then((xml: string) =>
      fs.writeFileSync(`${__dirname}/.data/${idx}.xml`, xml)
    );
let fn_arr = [];

for (let [pmid] of pmids) {
  pmid_list += pmid + ",";
  count += 1;
  if (count % 100 == 0) {
    let url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid_list}&retmode=abstract&rettype=xml`;
    fn_arr.push(f(url, count / 100));
    pmid_list = "";
  }
  // if (count == 2000) break;
}

fn_arr.reduce((p, f) => p.then(f), Promise.resolve());