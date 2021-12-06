import {
  createApp,
  ref,
  defineComponent,
  h,
  Fragment,
  Ref,
  onMounted,
} from "vue";
import { PubMed } from "./types";
import { Chart } from "@antv/g2";

import {
  parserMetadata,
  parserVector,
  levenshteinDistance,
  stopWord,
  calcDocTfidf,
  calcSentTfidf,
  calcDocBM25,
  calcSentBM25,
  calcSentsEmbWithDocWeighted,
  calcSentsEmbWithSentWeighted,
} from "./utils";
import * as tf from "@tensorflow/tfjs";

// @ts-ignore
import bd_sents from "../../bd_sents.json";
// @ts-ignore
import bd_tokens from "../../bd_tokens.json";

// @ts-ignore
import covid_sents from "../../covid_sents.json";
// @ts-ignore
import covid_tokens from "../../covid_tokens.json";

// @ts-ignore
import metadata from "../../metadata.tsv";
// @ts-ignore
import vectors from "../../vectors.tsv";

const vocab = parserMetadata(metadata);
const embs = parserVector(vectors);
const sents = [
  ...covid_sents,
  ...bd_sents.map(([didx, sent]) => [didx + covid_sents.at(-1)?.[0] + 1, sent]),
];

const terms = [
  ...covid_tokens,
  ...bd_tokens.map(([sidx, token]) => [sidx + covid_sents.length, token]),
];

const docTfidf = calcDocTfidf(vocab, sents, terms);
const sentTfidf = calcSentTfidf(vocab, sents, terms);

const sentEmbWithDocTfidf = tf.tensor2d(
  calcSentsEmbWithDocWeighted(vocab, embs, docTfidf, sents, terms, stopWord)
);

const sentEmbWithSentTfidf = tf.tensor2d(
  calcSentsEmbWithSentWeighted(vocab, embs, sentTfidf, sents, terms, stopWord)
);

const docBM25 = calcDocBM25(vocab, sents, terms);
const sentBM25 = calcSentBM25(vocab, sents, terms);

const sentEmbWithDocBM25 = tf.tensor2d(
  calcSentsEmbWithDocWeighted(vocab, embs, docBM25, sents, terms, stopWord)
);
const sentEmbWithSentBM25 = tf.tensor2d(
  calcSentsEmbWithSentWeighted(vocab, embs, sentBM25, sents, terms, stopWord)
);

console.log(docTfidf);
console.log(sentTfidf);
console.log(docBM25);
console.log(sentBM25);

const App = defineComponent((_, { slots }: { slots }) => {
  const chartRef: Ref<HTMLDivElement> = ref(null);
  let chart: Chart;
  onMounted(() => {
    chart = new Chart({
      container: chartRef.value,
      autoFit: true,
      height: 200,
    });
  });

  let keyWord = ref("");

  let candidate: Ref<string[]> = ref([]);
  let showingCand: Ref<boolean> = ref(false);
  let showingRank: Ref<boolean> = ref(false);

  let search = (e: InputEvent & { target: HTMLInputElement }) => {
    showingRank.value = false;

    if (e.target.value != "") {
      keyWord.value = e.target.value;
      showingCand.value = true;
      candidate.value = vocab
        .map((token) => ({
          token,
          distance: levenshteinDistance(
            keyWord.value.split(" ").at(-1).toLowerCase(),
            token.toLowerCase()
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10)
        .map(({ token }) => token);
      console.log("search");
    }
  };

  let weightedMethod: Ref<
    "doc-tfidf" | "sent-tfidf" | "doc-BM25" | "sent-BM25"
  > = ref("doc-tfidf");

  let embSim: Ref<number[]> = ref([]);

  let calcEmbSim = (query: string, targetEmb: tf.Tensor2D) => {
    return tf.tidy(() => {
      const qEmb: tf.Tensor2D = query
        .split(" ")
        .map((term) => vocab.findIndex((v) => v == term))
        .map((vidx) =>
          vidx != -1
            ? tf.tensor2d([embs[vidx]])
            : (tf.zeros([1, embs[0].length]) as tf.Tensor2D)
        )
        .reduce((prev, emb) => prev.add(emb), tf.zeros([1, embs[0].length]));

      const sim = qEmb
        .mul(targetEmb)
        .sum(1)
        .divNoNan(
          qEmb.square().sum(1).sqrt().mul(targetEmb.square().sum(1).sqrt())
        )
        .arraySync() as number[];
      const numOfTopK = sim
        .map((s, i) => ({ sim: s, didx: i }))
        .sort((a, b) => b.sim - a.sim)
        .reduce((prev, { didx }, topK) => {
          topK = topK + 1;
          if (prev.length == 0) {
            const n = didx < covid_sents.length ? 1 : 0;
            return [
              { topK, docClass: "covid", n: n },
              { topK, docClass: "bd", n: topK - n },
            ];
          } else {
            const n = (didx < covid_sents.length ? 1 : 0) + prev.at(-2).n;

            return [
              ...prev,
              { topK, docClass: "covid", n },
              { topK, docClass: "bd", n: topK - n },
            ];
          }
        }, [] as { topK: number; docClass: "covid" | "bd"; n: number }[])
        .map(({ topK, docClass, n }) => ({ topK, docClass, n: n / topK }));

      chart.data(numOfTopK);
      chart.legend("docClass", {
        itemName: {
          style: { fontSize: 20, fill: "rgb(40, 40, 40)" },
        },
      });

      chart.scale("n", {
        nice: true,
      });

      chart.tooltip({
        showMarkers: false,
      });
      chart.interaction("active-region");

      chart.line().position("topK*n").color("docClass");

      chart.render();

      return sim;
    });
  };

  return () => (
    <div class="app">
      <div ref={chartRef} />

      <br />

      <table>
        <tr>
          <td>
            <button
              onClick={() => {
                if (
                  weightedMethod.value != "doc-tfidf" &&
                  embSim.value.length != 0
                ) {
                  embSim.value = calcEmbSim(keyWord.value, sentEmbWithDocTfidf);
                }
                weightedMethod.value = "doc-tfidf";
              }}
              class={[weightedMethod.value == "doc-tfidf" ? "on" : ""]}
            >
              doc-tfidf
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                if (
                  weightedMethod.value != "sent-tfidf" &&
                  embSim.value.length != 0
                ) {
                  embSim.value = calcEmbSim(
                    keyWord.value,
                    sentEmbWithSentTfidf
                  );
                }
                weightedMethod.value = "sent-tfidf";
              }}
              class={[weightedMethod.value == "sent-tfidf" ? "on" : ""]}
            >
              sent-tfidf
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                if (
                  weightedMethod.value != "doc-BM25" &&
                  embSim.value.length != 0
                ) {
                  embSim.value = calcEmbSim(keyWord.value, sentEmbWithDocBM25);
                }
                weightedMethod.value = "doc-BM25";
              }}
              class={[weightedMethod.value == "doc-BM25" ? "on" : ""]}
            >
              doc-BM25
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                if (
                  weightedMethod.value != "sent-BM25" &&
                  embSim.value.length != 0
                ) {
                  embSim.value = calcEmbSim(keyWord.value, sentEmbWithSentBM25);
                }
                weightedMethod.value = "sent-BM25";
              }}
              class={[weightedMethod.value == "sent-BM25" ? "on" : ""]}
            >
              sent-BM25
            </button>
          </td>
        </tr>
      </table>

      <input
        type="text"
        onInput={search}
        placeholder="Search"
        value={keyWord.value}
      />
      <ol style={[showingCand.value ? "" : "display:none;"]}>
        {candidate.value.map((token) => (
          <li>
            <a
              onClick={() => {
                console.log(token);
                keyWord.value = [
                  ...keyWord.value.split(" ").slice(0, -1),
                  token,
                ]
                  .reduce((p, w) => `${p} ${w}`, "")
                  .slice(1);

                const targetEmb = (() => {
                  switch (weightedMethod.value) {
                    case "doc-tfidf": {
                      return sentEmbWithDocTfidf;
                    }
                    case "sent-tfidf": {
                      return sentEmbWithSentTfidf;
                    }
                    case "doc-BM25": {
                      return sentEmbWithDocBM25;
                    }
                    case "sent-BM25": {
                      return sentEmbWithSentBM25;
                    }
                  }
                })();
                embSim.value = calcEmbSim(keyWord.value, targetEmb);
                showingCand.value = false;
                showingRank.value = true;
              }}
            >
              {token}
            </a>
          </li>
        ))}
      </ol>

      <ol style={[showingRank.value ? "" : "display:none;", "width: 50%"]}>
        {embSim.value
          .map((sim, sidx) => ({ sidx, sim }))
          .sort((a, b) => b.sim - a.sim)
          .map(({ sim, sidx }) => {
            const sent = sents[sidx][1];
            return (
              <li>
                {sidx < covid_sents.length ? "covid" : "bd"}
                <br />
                {sent}
              </li>
            );
          })}
      </ol>
    </div>
  );
});

createApp(App).mount(document.body);
