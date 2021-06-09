import { h, reactive, defineComponent, createApp, Fragment } from "vue"
import { css } from "./css"

const DivVC = defineComponent((_props, { slots }) => {
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
                {slots.default()}
            </div>
        )
    }
})

const DivHC = defineComponent((_, { slots }: { slots }) => {
    return () => {
        return (
            <div
                class="text-xl"
                style={[
                    css.p.all((slots.padding?.() as number) ?? 10),
                    css.tx.center(),
                    css.w.percent(100),
                ]}
            >
                {slots.default()}
            </div>
        )
    }
})
export const Title = defineComponent((_props, { slots }) => {
    return () => (
        <>
            <DivVC>
                {() => (
                    <DivHC>
                        {{
                            default: () => (
                                <>
                                    <span class="text-3xl">{slots.title()}</span>
                                    <hr />
                                    <p
                                        class="text-lg"
                                        style={[css.tx.left(), css.w.percent(48), css.m.auto()]}
                                    >
                                        {slots
                                            .authors()
                                            .reduce((prev, author) => {
                                                return [...prev, author, ", "]
                                            }, [])
                                            .slice(0, -1)}
                                    </p>
                                </>
                            ),
                        }}
                    </DivHC>
                )}
            </DivVC>
        </>
    )
})

export const Outline = defineComponent((_, { slots }) => {
    return () => (
        <>
            <DivVC>
                {() => (
                    <DivHC>
                        {() => (
                            <>
                                <span class="text-3xl">Outline</span>
                                <hr />
                                <ul style={[css.tx.left(), css.m.l(70)]}>
                                    {slots.default().reduce((a, b) => {
                                        return [...a, <li>{b}</li>]
                                    }, [])}
                                </ul>
                            </>
                        )}
                    </DivHC>
                )}
            </DivVC>
        </>
    )
})

export const Tmpl1 = defineComponent((_, { slots }: { slots }) => {
    return () => (
        <>
            <DivVC>
                {() => (
                    <DivHC>
                        {{
                            default: () => (
                                <>
                                    <span class="text-3xl">{slots.title()}</span>
                                    <hr />
                                    <div
                                        style={[
                                            css.h.mm(150),
                                            css.tx.justify(),
                                            css.m.x(slots.margin?.() ?? 0),
                                        ]}
                                    >
                                        {slots.content()}
                                    </div>
                                </>
                            ),
                        }}
                    </DivHC>
                )}
            </DivVC>
        </>
    )
})
