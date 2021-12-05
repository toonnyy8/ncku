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
  calcTfidf,
  calcSentsEmbWithTfidf,
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
import metadata from "../../metadata-ex2.tsv";
// @ts-ignore
import vectors from "../../vectors-ex2.tsv";

console.log(bd_sents);
// console.log(bd_tokens);
//
console.log(covid_sents);
// console.log(covid_tokens);
//
// console.log(parserMetadata(metadata));
// console.log(parserVector(vectors));
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

const tfidf = calcTfidf(vocab, sents, terms);

const sentEmb = tf.tensor2d(
  calcSentsEmbWithTfidf(vocab, embs, tfidf, sents, terms)
);

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

  let embSim: Ref<number[]> = ref([]);

  let calcEmbSim = (query: string) => {
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

      sentEmb.mul(qEmb).sum(-1);

      const sim = qEmb
        .mul(sentEmb)
        .sum(1)
        .divNoNan(
          qEmb.square().sum(1).sqrt().mul(sentEmb.square().sum(1).sqrt())
        )
        //.abs()
        .arraySync() as number[];

      const covidSim = sim
        .slice(0, covid_sents.length)
        .reduce((p, s) => p + s, 0);
      const bdSim = sim.slice(covid_sents.length).reduce((p, s) => p + s, 0);

      chart.data([
        { docClass: "covid", sim: covidSim / (covidSim + bdSim) },
        { docClass: "bd", sim: bdSim / (covidSim + bdSim) },
      ]);
      chart.scale("sim", {
        nice: true,
      });

      chart.tooltip({
        showMarkers: false,
      });
      chart.interaction("active-region");

      chart.interval().position("docClass*sim");

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
            <button>tf-idf</button>
          </td>
          <td>
            <button>tf-isf</button>
          </td>
          <td>
            <button>tfidf</button>
          </td>
          <td>
            <button>tfidf</button>
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

                embSim.value = calcEmbSim(keyWord.value);
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
            const didx = sents[sidx][0];
            const sent = sents[sidx][1];
            return (
              <li>
                {didx}
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
