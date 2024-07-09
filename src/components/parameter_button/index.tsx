import "./index.css"

export const ParameterButton: ({val, state, onclick_cb}: {
    val: string, 
    state: boolean,
    onclick_cb: any,
    disabled: boolean
}) => JSX.Element
= ({val, state, onclick_cb, disabled}) => {
    if (disabled) {
        return (
            <button className={state ? "parameter-button button-selected" : "parameter-button"} onClick={onclick_cb} disabled>
                {val}
            </button>
        )
    } else {
        return (
            <button className={state ? "parameter-button button-selected" : "parameter-button"} onClick={onclick_cb}>
                {val}
            </button>
        )
    }
}
