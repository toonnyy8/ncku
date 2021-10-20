import { h, reactive, defineComponent, createApp, Fragment, ref, Ref, onMounted } from "vue"
import { Tmpl1, Tmpl2 } from "./template"

import { css } from "./css"
export const literatureReviewPages = [
    <Tmpl2>
        {{
            title1: () => "Introduction",
            title2: () => "CL Methods Comparison",
            content: () => (
                <div style={[css.p.x(10)]}>
                    <table class="text-lg" style={[css.tx.center(), css.w.percent(100)]}>
                        <tr>
                            <td>method</td>
                            <td>batch size</td>
                            <td>
                                negative
                                <br />
                                pairs
                            </td>
                            <td>
                                momentum
                                <br />
                                encoder
                            </td>
                        </tr>
                        <tr>
                            <td>SimCLR</td>
                            <td>4096</td>
                            <td>Y</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>MoCo v2</td>
                            <td>256</td>
                            <td>Y</td>
                            <td>Y</td>
                        </tr>
                        <tr style={[css.tx.color(100, 255, 150, 255)]}>
                            <td>BYOL</td>
                            <td>
                                <b>256</b>~4096
                            </td>
                            <td></td>
                            <td>Y</td>
                        </tr>
                        <tr>
                            <td>SwAV</td>
                            <td>4096</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style={[css.tx.color(100, 255, 150, 255)]}>
                            <td>SimSiam</td>
                            <td>
                                <b>256</b>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            ),
        }}
    </Tmpl2>,
]
