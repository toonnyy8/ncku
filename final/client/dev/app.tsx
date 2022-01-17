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
  zip,
  shuffle,
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
import docSentsJson from "../covid_doc_sents.json";
// @ts-ignore
import tfidfJson from "../covid_tfidf.json";
// @ts-ignore
import vocabEmbJson from "../cbow_vocab_emb.json";
// @ts-ignore
import docsEmbTsv from "../cbow_docs_emb.tsv";

const docSents: string[][] = docSentsJson;
const tfidf: { [token: string]: number }[] = tfidfJson;
const vocabEmb: { [token: string]: number[] } = vocabEmbJson;
const docsEmb = (() => {
  let docsEmb = parserVector(docsEmbTsv);
  shuffle(docsEmb);
  return tf.tensor2d(docsEmb.slice(0, 1000));
})();
// const docsEmb = tf.tensor2d(parserVector(docsEmbTsv));

const editDistTopK = (topic: string, K = 10) =>
  Object.keys(vocabEmb)
    .map((target) => ({
      target,
      distance: levenshteinDistance(target, topic),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, K)
    .map(({ target }) => target);

const calcSim = (topic: string) => {
  return tf.tidy(() => {
    const wordEmb = tf.tensor2d([vocabEmb[topic]]);
    const numerator = wordEmb.mul(docsEmb).sum(1);
    const denominator = wordEmb
      .square()
      .sum(1)
      .sqrt()
      .mul(docsEmb.square().sum(1).sqrt());
    return numerator.divNoNan(denominator).arraySync();
  });
};

const labelDoc = (labels: string[]) => {
  return tfidf.map((_tfidf) =>
    labels.reduce((prev, label) => prev && _tfidf[label] != undefined, true)
  );
};

const App = defineComponent((_, { slots }: { slots }) => {
  const chartRef: Ref<HTMLDivElement> = ref(null);
  let chart: Chart;
  onMounted(() => {
    chart = new Chart({
      container: chartRef.value,
      autoFit: true,
      height: 400,
      width: 400,
    });
  });

  let keyWord = ref("");

  const topic1 = ref("");
  const topic1Input = ref("");
  const topic1Candidate: Ref<string[]> = ref([]);
  const topic1Sim: Ref<number[]> = ref([]);

  const topic2 = ref("");
  const topic2Input = ref("");
  const topic2Candidate: Ref<string[]> = ref([]);
  const topic2Sim: Ref<number[]> = ref([]);

  const label = ref("");
  const labelInput = ref("");
  const labelCandidate: Ref<string[]> = ref([]);
  const labelResult: Ref<boolean[]> = ref([]);

  let keyInTopic =
    (
      topic: Ref<string>,
      topicInput: Ref<string>,
      topicCandidate: Ref<string[]>
    ) =>
    (e: InputEvent & { target: HTMLInputElement }) => {
      topic.value = "";
      if (e.target.value != "") {
        topicInput.value = e.target.value;
        topicCandidate.value = editDistTopK(topicInput.value, 10);

        console.log("search");
      }
    };

  // let weightedMethod: Ref<
  //   "none" | "doc-tfidf" | "sent-tfidf" | "doc-BM25" | "sent-BM25"
  // > = ref("none");

  // let embSim: Ref<number[]> = ref([]);
  // let mode: "keyWord" | `sent:${number}` = "keyWord";

  // let calcEmbSim = (query: string, targetEmb: tf.Tensor2D) => {
  //   return tf.tidy(() => {
  //     const qEmb: tf.Tensor2D = query
  //       .split(" ")
  //       .map((term) => vocab.findIndex((v) => v == term))
  //       .map((vidx) =>
  //         vidx != -1
  //           ? tf.tensor2d([embs[vidx]])
  //           : (tf.zeros([1, embs[0].length]) as tf.Tensor2D)
  //       )
  //       .reduce((prev, emb) => prev.add(emb), tf.zeros([1, embs[0].length]));

  //     const sim = qEmb
  //       .mul(targetEmb)
  //       .sum(1)
  //       .divNoNan(
  //         qEmb.square().sum(1).sqrt().mul(targetEmb.square().sum(1).sqrt())
  //       )
  //       .arraySync() as number[];

  //     const numOfTopK = sim
  //       .map((s, i) => ({ sim: s, didx: i }))
  //       .sort((a, b) => b.sim - a.sim)
  //       .reduce((prev, { didx }, topK) => {
  //         topK = topK + 1;
  //         if (prev.length == 0) {
  //           const n = didx < covid_sents.length ? 1 : 0;
  //           return [
  //             { topK, docClass: "covid", n: n },
  //             { topK, docClass: "bd", n: topK - n },
  //           ];
  //         } else {
  //           const n = (didx < covid_sents.length ? 1 : 0) + prev.at(-2).n;

  //           return [
  //             ...prev,
  //             { topK, docClass: "covid", n },
  //             { topK, docClass: "bd", n: topK - n },
  //           ];
  //         }
  //       }, [] as { topK: number; docClass: "covid" | "bd"; n: number }[])
  //       .reduce((prev, { topK, docClass, n }) => {
  //         if (topK % 3 == 1) return [...prev, { topK, docClass, n }];
  //         else return prev;
  //       }, [])
  //       .map(({ topK, docClass, n }) => ({
  //         topK,
  //         docClass,
  //         n: (100 * n) / topK,
  //       }));

  //     chart.data(numOfTopK);
  //     chart.legend("docClass", {
  //       itemName: {
  //         style: { fontSize: 20, fill: "rgb(40, 40, 40)" },
  //       },
  //     });

  //     chart.scale("n", {
  //       nice: true,
  //     });

  //     chart.tooltip({
  //       showMarkers: false,
  //     });
  //     chart.interaction("active-region");

  //     chart.line().position("topK*n").color("docClass");

  //     chart.render();

  //     return sim;
  //   });
  // };

  // let calcSentEmbSim = (sidx: number, targetEmb: tf.Tensor2D) => {
  //   return tf.tidy(() => {
  //     const sidx_t = tf.tensor1d([sidx], "int32");
  //     const qEmb = targetEmb.gather(sidx_t, 0);

  //     const sim = qEmb
  //       .mul(targetEmb)
  //       .sum(1)
  //       .divNoNan(
  //         qEmb.square().sum(1).sqrt().mul(targetEmb.square().sum(1).sqrt())
  //       )
  //       .arraySync() as number[];

  //     const numOfTopK = sim
  //       .map((s, i) => ({ sim: s, didx: i }))
  //       .sort((a, b) => b.sim - a.sim)
  //       .reduce((prev, { didx }, topK) => {
  //         topK = topK + 1;
  //         if (prev.length == 0) {
  //           const n = didx < covid_sents.length ? 1 : 0;
  //           return [
  //             { topK, docClass: "covid", n: n },
  //             { topK, docClass: "bd", n: topK - n },
  //           ];
  //         } else {
  //           const n = (didx < covid_sents.length ? 1 : 0) + prev.at(-2).n;

  //           return [
  //             ...prev,
  //             { topK, docClass: "covid", n },
  //             { topK, docClass: "bd", n: topK - n },
  //           ];
  //         }
  //       }, [] as { topK: number; docClass: "covid" | "bd"; n: number }[])
  //       .reduce((prev, { topK, docClass, n }) => {
  //         if (topK % 3 == 1) return [...prev, { topK, docClass, n }];
  //         else return prev;
  //       }, [])
  //       .map(({ topK, docClass, n }) => ({
  //         topK,
  //         docClass,
  //         n: (100 * n) / topK,
  //       }));

  //     chart.data(numOfTopK);
  //     chart.legend("docClass", {
  //       itemName: {
  //         style: { fontSize: 20, fill: "rgb(40, 40, 40)" },
  //       },
  //     });

  //     chart.scale("n", {
  //       nice: true,
  //     });

  //     chart.tooltip({
  //       showMarkers: false,
  //     });
  //     chart.interaction("active-region");

  //     chart.line().position("topK*n").color("docClass");

  //     chart.render();

  //     return sim;
  //   });
  // };

  return () => (
    <div class="app">
      <div ref={chartRef} />
      Percentage of Top K
      <br />
      <br />
      <input
        type="text"
        onInput={keyInTopic(topic1, topic1Input, topic1Candidate)}
        placeholder="Topic 1"
        value={topic1Input.value}
      />
      <ol>
        {topic1Candidate.value.map((token) => (
          <li>
            <a
              onClick={() => {
                topic1.value = token;
                topic1Input.value = token;
                topic1Candidate.value = [];
              }}
            >
              {token}
            </a>
          </li>
        ))}
      </ol>
      <input
        type="text"
        onInput={keyInTopic(topic2, topic2Input, topic2Candidate)}
        placeholder="Topic 2"
        value={topic2Input.value}
      />
      <ol>
        {topic2Candidate.value.map((token) => (
          <li>
            <a
              onClick={() => {
                topic2.value = token;
                topic2Input.value = token;
                topic2Candidate.value = [];
              }}
            >
              {token}
            </a>
          </li>
        ))}
      </ol>
      <button
        style={[topic1.value != "" && topic2.value != "" ? "" : "display:none"]}
        onClick={() => {
          topic1Sim.value = calcSim(topic1.value) as number[];
          topic2Sim.value = calcSim(topic2.value) as number[];
          labelResult.value = labelDoc([label.value]);
          const data = zip(
            topic1Sim.value,
            topic2Sim.value,
            labelResult.value
          ).map(([topic1Sim, topic2Sim, label]) => ({
            topic1Sim,
            topic2Sim,
            label: label ? "cough" : "other",
          }));
          chart.data(data);
          chart.legend("label", {
            itemName: {
              style: { fontSize: 20, fill: "rgb(40, 40, 40)" },
            },
          });

          // chart.scale("n", {
          //   nice: true,
          // });

          chart.tooltip({
            showMarkers: false,
          });
          chart.interaction("active-region");

          chart.point().position("topic1Sim*topic2Sim").color("label");

          chart.render();
          console.log("run");
        }}
      >
        Run
      </button>
      <input
        type="text"
        onInput={keyInTopic(label, labelInput, labelCandidate)}
        placeholder="Label"
        value={labelInput.value}
      />
      <ol>
        {labelCandidate.value.map((token) => (
          <li>
            <a
              onClick={() => {
                label.value = token;
                labelInput.value = token;
                labelCandidate.value = [];
                labelResult.value = labelDoc([label.value]);
                const data = zip(
                  topic1Sim.value,
                  topic2Sim.value,
                  labelResult.value
                ).map(([topic1Sim, topic2Sim, label]) => ({
                  topic1Sim,
                  topic2Sim,
                  label: label ? "cough" : "other",
                }));
                chart.data(data);
                chart.legend("label", {
                  itemName: {
                    style: { fontSize: 20, fill: "rgb(40, 40, 40)" },
                  },
                });

                // chart.scale("n", {
                //   nice: true,
                // });

                chart.tooltip({
                  showMarkers: false,
                });
                chart.interaction("active-region");

                chart.point().position("topic1Sim*topic2Sim").color("label");

                chart.render();
              }}
            >
              {token}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
});

createApp(App).mount(document.body);
