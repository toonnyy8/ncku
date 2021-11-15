# IR2021 Project 2

## 執行

1. 環境配置

```bash
git clone -b develop https://github.com/toonnyy8/ncku.git
cd ./ncku
npm i
cd ./hw2
```

2. 下載資料

將要下載的 PubMed 文件的 PMID 存放至 pmid-bipolardis-set.txt

```bash
mkdir .data
npx ts-node dl_data.ts
npx ts-node docs.ts
```

3. 建構 Client

```bash
npm run build:hw3-client
```

初次運行時會掃描文檔並建立 token table，需要耗費較長時間。

## 系統展示

![System](./img/system.png)
