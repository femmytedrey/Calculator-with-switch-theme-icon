import { ACTIONS } from "./App"

export default function DigitButton({ dispatch, digit }){
    return (
        <button className="btn" onClick={() => dispatch({ type: ACTIONS.ADD_DIGITS, payload: { digit }})}>{ digit }</button>
    )
}