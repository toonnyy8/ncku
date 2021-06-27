import { h, reactive, defineComponent, createApp } from "vue"
import { css } from "./css"

const DivVC = defineComponent((props, { slots }) => {
    return () => {
        return (
            <div
                style={[
                    css.display.flex(),
                    css.flex.wrap.yes(),
                    css.align.items.center(),
                    css.h.percent(100),
                    css.w.percent(100),
                ]}
            >
                {slots}
            </div>
        )
    }
})

const DivHC = defineComponent((props, { slots }) => {
    return () => {
        return (
            <div class="text-xl" style={[css.p.all(10), css.tx.center(), css.w.percent(100)]}>
                {slots}
            </div>
        )
    }
})
export const TitlePage = defineComponent((_props, { slots }) => {
    return () => (
        <div class="page">
            <DivVC>
                <DivHC>
                    <span class="text-3xl">{slots.title()}</span>
                    <hr />
                    <p class="text-lg" style={[css.tx.left(), css.w.percent(48), css.m.auto()]}>
                        {slots
                            .authors()
                            .reduce((prev, author) => {
                                return [...prev, author, ", "]
                            }, [])
                            .slice(0, -1)}
                    </p>
                </DivHC>
            </DivVC>
        </div>
    )
})
