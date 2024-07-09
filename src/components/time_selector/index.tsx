import { useState } from "react";

export const TimeSelector: ({onchange_cb}: {
    onchange_cb: any
}) => JSX.Element
= ({onchange_cb}) => {
    return (
        <div>
            <input type="datetime-local" onChange={onchange_cb}></input>
        </div>
    )
}
