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

import { parserMetadata, parserVector, levenshteinDistance } from "./utils";
import * as tf from "@tensorflow/tfjs";

const ZipfChart = defineComponent((_, { slots }: { slots }) => {
  const chartRef: Ref<HTMLDivElement> = ref(null);
  let chart: Chart;
  const tokenNum = ref(1);
  const range = ref({ min: 1, max: 1 });
  const useStemmer = ref(true);

  let zipf: { token: string; count: number }[] = [];
  onMounted(() => {
    chart = new Chart({
      container: chartRef.value,
      autoFit: true,
      height: 200,
    });

    changeStemmer(true);
  });

  const inputMin = (e: InputEvent & { target: HTMLInputElement }) => {
    range.value = { min: Number(e.target.value), max: range.value.max };
    chart.data(zipf.slice(range.value.min - 1, range.value.max));
    chart.render();
  };

  const inputMax = (e: InputEvent & { target: HTMLInputElement }) => {
    range.value = { max: Number(e.target.value), min: range.value.min };
    chart.data(zipf.slice(range.value.min - 1, range.value.max));
    chart.render();
  };

  const changeStemmer = (_useStemmer: boolean) => {
    useStemmer.value = _useStemmer;
    slots.changeStemmer(useStemmer.value);
    fetch(`./zipf/${_useStemmer}`)
      .then((res) => res.json())
      .then((zipfData: { token: string; count: number }[]) => {
        zipf = zipfData;
        tokenNum.value = zipf.length;
        range.value = {
          min: Math.ceil(tokenNum.value * 0.01),
          max: Math.ceil(tokenNum.value * 0.05),
        };

        chart.data(zipf.slice(range.value.min - 1, range.value.max));
        chart.scale("count", {
          nice: true,
        });

        chart.tooltip({
          showMarkers: false,
        });
        chart.interaction("active-region");

        chart.interval().position("token*count");

        chart.render();
      });
  };

  return () => (
    <div style="position: relative;">
      <div ref={chartRef} />
      <br />

      <input
        type="number"
        value={range.value.min}
        max={range.value.max}
        min="1"
        step="1"
        onChange={inputMin}
      />
      <button
        style={[
          "position: absolute;",
          "left: 50%;",
          "transform: translate(-50%,0%);",
        ]}
        class={[useStemmer.value ? "on" : ""]}
        onClick={() => changeStemmer(!useStemmer.value)}
      >
        stemmer
      </button>
      <input
        type="number"
        value={range.value.max}
        max={tokenNum.value}
        min={range.value.min}
        step="1"
        onChange={inputMax}
        style="right:0px; position: absolute;"
      />
    </div>
  );
});

const App = defineComponent((_, { slots }: { slots }) => {
  let keyWord = ref("");
  let targetKeyWord = ref("");

  let embBook: number[][] = [];
  // let embBook: Ref<number[][]> = ref([]);
  let vocab: string[] = [];
  // let candidate: Ref<JSX.Element> = ref(<></>);
  let candidate: Ref<string[]> = ref([]);
  let targetCandidate: Ref<string[]> = ref([]);
  let showingCand: Ref<boolean> = ref(false);
  let showingTargetCand: Ref<boolean> = ref(false);
  let showingTargetSearch: Ref<boolean> = ref(false);

  const chartRef: Ref<HTMLDivElement> = ref(null);
  let chart: Chart;
  const range = ref({ start: 1, win: 100 });

  let sortedSims: { token: string }[];

  let tokenNum: Ref<number> = ref(0);
  let simWithTarget: Ref<number> = ref(NaN);

  onMounted(() => {
    chart = new Chart({
      container: chartRef.value,
      autoFit: true,
      height: 200,
    });
  });

  const inputStart = (e: InputEvent & { target: HTMLInputElement }) => {
    range.value = { start: Number(e.target.value), win: range.value.win };
    chart.data(
      sortedSims.slice(range.value.start, range.value.start + range.value.win)
    );
    chart.render();
  };

  const inputWin = (e: InputEvent & { target: HTMLInputElement }) => {
    range.value = { win: Number(e.target.value), start: range.value.start };
    chart.data(
      sortedSims.slice(range.value.start, range.value.start + range.value.win)
    );
    chart.render();
  };

  let search = (e: InputEvent & { target: HTMLInputElement }) => {
    showingTargetCand.value = false;
    showingTargetSearch.value = false;

    if (e.target.value != "") {
      keyWord.value = e.target.value;
      showingCand.value = true;
      candidate.value = vocab
        .map((token) => ({
          token,
          distance: levenshteinDistance(
            keyWord.value.toLowerCase(),
            token.toLowerCase()
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10)
        .map(({ token }) => token);
      console.log("search");
    }
  };
  let searchTarget = (e: InputEvent & { target: HTMLInputElement }) => {
    if (e.target.value != "") {
      targetKeyWord.value = e.target.value;
      showingTargetCand.value = true;
      targetCandidate.value = vocab
        .map((token) => ({
          token,
          distance: levenshteinDistance(
            targetKeyWord.value.toLowerCase(),
            token.toLowerCase()
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10)
        .map(({ token }) => token);
      console.log("search target");
    }
  };

  let calcEmbSimWithVocab = (query: string) => {
    let idx = vocab.findIndex(
      (target) => target.toLowerCase() == query.toLowerCase()
    );
    if (idx != -1) {
      let sims = tf.tidy(() => {
        let a = tf.tensor2d([embBook[idx]]);
        let b = tf.tensor2d(embBook);
        return a
          .mul(b)
          .sum(1)
          .divNoNan(a.square().sum(1).sqrt().mul(b.square().sum(1).sqrt()))
          .arraySync() as number[];
      });

      sortedSims = sims
        .map((sim, idx) => ({ token: vocab[idx], sim }))
        .sort((a, b) => b.sim - a.sim);
      console.log(sortedSims);

      chart.data(
        sortedSims.slice(range.value.start, range.value.start + range.value.win)
      );
      chart.scale("sim", {
        nice: true,
      });

      chart.tooltip({
        showMarkers: false,
      });
      chart.interaction("active-region");

      chart.interval().position("token*sim");

      chart.render();
    }
  };
  let calcEmbSim = (query: string, target: string) => {
    let qidx = vocab.findIndex(
      (token) => token.toLowerCase() == query.toLowerCase()
    );
    let tidx = vocab.findIndex(
      (token) => token.toLowerCase() == target.toLowerCase()
    );
    if (qidx != -1 && tidx != -1) {
      simWithTarget.value = tf.tidy(() => {
        let a = tf.tensor1d(embBook[qidx]);
        let b = tf.tensor1d(embBook[tidx]);
        return a
          .mul(b)
          .sum()
          .divNoNan(a.square().sum().sqrt().mul(b.square().sum().sqrt()))
          .arraySync() as number;
      });
    }
  };

  const loadEmbedding = () => {
    console.log("embedding");
    let load = document.createElement("input");
    load.type = "file";
    load.accept = ".tsv";

    load.onchange = (event) => {
      const files = load.files;
      // console.log(files[0])
      var reader = new FileReader();
      reader.addEventListener("loadend", () => {
        embBook = parserVector(reader.result as string);
        console.log("embedding loadend");
      });
      reader.readAsText(files[0]);
    };

    load.click();
  };
  const loadMetadata = () => {
    console.log("matedata");
    let load = document.createElement("input");
    load.type = "file";
    load.accept = ".tsv";

    load.onchange = (event) => {
      const files = load.files;
      // console.log(files[0])
      var reader = new FileReader();
      reader.addEventListener("loadend", () => {
        vocab = parserMetadata(reader.result as string);
        tokenNum.value = vocab.length;
        console.log("matedata loadend");
      });
      reader.readAsText(files[0]);
    };

    load.click();
  };

  return () => (
    <div class="app">
      <div style="position: relative;">
        <div ref={chartRef} />
        <br />

        <input
          type="number"
          value={range.value.start}
          max={tokenNum.value}
          min="1"
          step="1"
          onInput={inputStart}
        />

        <input
          type="number"
          value={range.value.win}
          max={tokenNum.value}
          min="1"
          step="1"
          onInput={inputWin}
          style="right:0px; position: absolute;"
        />
      </div>
      <br />
      <button
        style="display: block; margin-left: auto; margin-right: auto;"
        onClick={loadEmbedding}
      >
        load embedding
      </button>
      <button
        style="display: block; margin-left: auto; margin-right: auto;"
        onClick={loadMetadata}
      >
        load metadata
      </button>
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
                keyWord.value = token;
                showingCand.value = false;
                showingTargetSearch.value = true;
                calcEmbSimWithVocab(token);
                simWithTarget.value = NaN;
              }}
            >
              {token}
            </a>
          </li>
        ))}
      </ol>
      <input
        style={[showingTargetSearch.value ? "" : "display:none;"]}
        class="small"
        type="text"
        onInput={searchTarget}
        placeholder="Target"
        value={targetKeyWord.value}
      />
      <ol style={[showingTargetCand.value ? "" : "display:none;"]}>
        {targetCandidate.value.map((token) => (
          <li>
            <a
              onClick={() => {
                console.log(token);
                targetKeyWord.value = token;
                showingTargetCand.value = false;
                calcEmbSim(keyWord.value, token);
              }}
            >
              {token}
            </a>
          </li>
        ))}
      </ol>
      <p style="font-size: 1.5rem;text-align: center;">
        {Number.isNaN(simWithTarget.value)
          ? ""
          : `cosine similarity: ${
              Math.round(simWithTarget.value * 1000) / 1000
            }`}
      </p>
    </div>
  );
});

createApp(App).mount(document.body);
