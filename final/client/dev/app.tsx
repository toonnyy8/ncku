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

const vocabEmb: { [token: string]: number[] } = vocabEmbJson;
let _docSents: string[][] = docSentsJson;
let _tfidf: { [token: string]: number }[] = tfidfJson;
let _docsEmb = parserVector(docsEmbTsv);
shuffle(_docsEmb, _tfidf, _docSents);
const docSents = _docSents.slice(0, 2500);
const tfidf = _tfidf.slice(0, 2500);
const docsEmb = tf.tensor2d(_docsEmb.slice(0, 2500));

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
  return tfidf.map((_tfidf) => {
    return labels.reduce(
      (prev, label) => prev && _tfidf[label] != undefined,
      true
    );
  });
};

const calcCorr = (topic1Sim: number[], topic2Sim: number[]): number => {
  return tf.tidy(() => {
    const _sim1 = tf.tensor1d(topic1Sim);
    const _sim2 = tf.tensor1d(topic2Sim);

    const me1 = _sim1.sub(_sim1.mean());
    const me2 = _sim2.sub(_sim2.mean());

    return me1
      .mul(me2)
      .sum()
      .div(me1.square().sum().mul(me2.square().sum()).sqrt())
      .arraySync() as number;
  });
};

const chartUpdate = (
  chart: Chart,
  topic1Sim: number[],
  topic2Sim: number[],
  labelResult: boolean[],
  topic1: string,
  topic2: string,
  label: string
) => {
  const data = zip(topic1Sim, topic2Sim, labelResult).map(
    ([topic1Sim, topic2Sim, labelResult], docsId: number) => ({
      topic1Sim,
      topic2Sim,
      label: labelResult ? label : "other",
      docsId,
    })
  );

  chart.data(data);

  chart.tooltip({
    showTitle: false,
    showCrosshairs: true,
    crosshairs: {
      type: "xy",
    },
    itemTpl:
      '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:16px;">' +
      '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
      "{name}<br/>" +
      "{value}" +
      "</li>",
  });

  chart.legend("label", {
    itemName: {
      style: { fontSize: 20, fill: "rgb(40, 40, 40)" },
    },
  });

  chart.scale("topic1Sim", {
    alias: `${topic1} Sim`,
  });
  chart.axis("topic1Sim", {
    title: {},
  });
  chart.scale("topic2Sim", {
    alias: `${topic2} Sim`,
  });
  chart.axis("topic2Sim", {
    title: {},
  });

  // chart.tooltip({
  //   showMarkers: false,
  // });
  chart.interaction("active-region");

  chart
    .point()
    .position("topic2Sim*topic1Sim")
    .color("label")
    .shape("circle")
    .tooltip("docsId*topic1Sim*topic2Sim", (docsId, topic1Sim, topic2Sim) => {
      return {
        name: docsId,
        value:
          "<br/><br/>" +
          `${topic1}: ${Math.round(topic1Sim * 100) / 100}` +
          "<br/><br/>" +
          `${topic2}: ${Math.round(topic2Sim * 100) / 100}`,
      };
    });

  chart.render();
};

const App = defineComponent((_, { slots }: { slots }) => {
  const chartRef: Ref<HTMLDivElement> = ref(null);
  let chart: Chart;
  onMounted(() => {
    chart = new Chart({
      container: chartRef.value,
      // autoFit: true,
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

  const showDocId: Ref<number> = ref(-1);

  const correlation = ref(0);
  const correlationOther = ref(0);
  const correlationLabel = ref(0);

  const keyInDocId = (e: InputEvent & { target: HTMLInputElement }) => {
    showDocId.value = Number(e.target.value);
  };

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

  return () => (
    <div class="app">
      <div ref={chartRef} />
      Correlation: {Math.round(correlation.value * 100) / 100}
      <br />
      <span style={[label.value != "" ? "" : "display:none"]}>
        Correlation: {Math.round(correlationOther.value * 100) / 100} (Other)
        <br />
      </span>
      <span style={[label.value != "" ? "" : "display:none"]}>
        Correlation: {Math.round(correlationLabel.value * 100) / 100} (
        {label.value})
        <br />
      </span>
      <input
        type="number"
        min={-1}
        max={docSents.length - 1}
        value={showDocId.value}
        onInput={keyInDocId}
      />
      <br />
      <ol style={["width: 50%"]}>
        {Number.isFinite(showDocId.value) &&
        docSents[showDocId.value] != undefined
          ? docSents[showDocId.value].map((sent) => <li>{sent}</li>)
          : ""}
      </ol>
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
          correlation.value = calcCorr(topic1Sim.value, topic2Sim.value);
          if (label.value != "") {
            correlationOther.value = calcCorr(
              topic1Sim.value.filter((_, i) => !labelResult.value[i]),
              topic2Sim.value.filter((_, i) => !labelResult.value[i])
            );
            correlationLabel.value = calcCorr(
              topic1Sim.value.filter((_, i) => labelResult.value[i]),
              topic2Sim.value.filter((_, i) => labelResult.value[i])
            );
          }
          console.log(correlation.value);

          chartUpdate(
            chart,
            topic1Sim.value,
            topic2Sim.value,
            labelResult.value,
            topic1.value,
            topic2.value,
            label.value
          );

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
                if (label.value != "") {
                  correlationOther.value = calcCorr(
                    topic1Sim.value.filter((_, i) => !labelResult.value[i]),
                    topic2Sim.value.filter((_, i) => !labelResult.value[i])
                  );
                  correlationLabel.value = calcCorr(
                    topic1Sim.value.filter((_, i) => labelResult.value[i]),
                    topic2Sim.value.filter((_, i) => labelResult.value[i])
                  );
                }

                chartUpdate(
                  chart,
                  topic1Sim.value,
                  topic2Sim.value,
                  labelResult.value,
                  topic1.value,
                  topic2.value,
                  label.value
                );
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
