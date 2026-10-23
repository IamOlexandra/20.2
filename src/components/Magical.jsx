import { useReducer } from "react";

const INITIAL_STATE = {
    gold: 0,
    potions: 1,
    energy: 50,
    items: [],
}
function reducer(state, actions) {
    switch (actions.type) {
        case "add_gold":
            return {
                ...state,
                gold: state.gold + 10
            }
        case "buy_potions":
            if (state.gold < 20) {
                return state;
            }
            return {
                ...state,
                gold: state.gold - 20,
                potions: state.potions + 1,
            }
        case "use_potion":
            if (state.potions === 0) {
                return state;
            }
            return {
                ...state,
                energy: state.energy + 30 <= 100 ? state.energy + 30 : 100,
                potions: state.potions - 1,
            }
        case "add_artifact":
            if (state.energy < 50) {
                return state;
            }
            return {
                ...state,
                items: [...state.items, actions.item],
                //energy: state.energy - 50 >= 0 ? state.energy - 50 : 0,
            }
        case "delete_artifact":
            console.log(state.items, actions.id);
            return {
                ...state,
                items: state.items.filter((item, index) => index !== actions.id),
                gold: state.gold + 100,
            }
        default:
            return state;
    }
}


export default function Magical() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const artifacts = ["҂", "⃝", "҉", "҈", "꙰"];
    return (
        <div>
            <p>Статистика:</p>
            <p>Золото: {state.gold}</p>
            <p>Зіллів: {state.potions}</p>
            <p>Енегрії: {state.energy}/100% <progress value={state.energy} max="100"></progress></p>
            <p>Артефакти:</p>
            {state.items.length === 0 ? (<p>Усі артефакти незнайдені</p>) : (
                state.items.map((item, index) => <div key={index}>{item}<button style={{marginLeft: "20px"}} onClick={() => dispatch({type: "delete_artifact", id: index})}>Продати артефакт</button></div>)
            )}

            <button onClick={() => dispatch({type: "add_gold"})}>Додати золото</button>
            <button onClick={() => dispatch({type: "buy_potions"})}>Купити зілля (за 20з)</button>
            <button onClick={() => dispatch({type: "use_potion"})}>Використати зілля (+30е)</button>
            <button onClick={() => dispatch({type: "add_artifact", item: artifacts[Math.floor(Math.random() * (artifacts.length))]})}>Знайти артефакт</button>
        </div>
    )
}