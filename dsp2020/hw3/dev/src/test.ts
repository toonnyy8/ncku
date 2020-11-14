import * as g2 from "@antv/g2"

const windowFn = (x) => (1 + Math.cos(2 * Math.PI * x)) / 2

let L = 50
let data = new Array(L * 2 + 1).fill(0).map((_, idx) => idx < L / 2 || idx > L * 3 / 2 ? 0 : windowFn((idx - L) / L)).map((val, idx) => ({ val, idx }))
{  // Step 1: 创建 Chart 对象
    const chart = new g2.Chart({
        container: document.body, // 指定图表容器 ID
        width: 600, // 指定图表宽度
        height: 300, // 指定图表高度
    });

    // Step 2: 载入数据源
    // chart.data(bandpassK.map((val, idx) => ({ idx, val })));
    chart.data(data);

    // Step 3: 创建图形语法，绘制柱状图
    chart.interval().position('idx*val');

    // Step 4: 渲染图表
    chart.render();
}