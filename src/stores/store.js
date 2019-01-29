import { createStore } from "redux";
import reducer from "../Reducer";

const initValues = {
    "First": 0,
    "Second": 5,
    "Third": 10,
}

const store = createStore(reducer, initValues);

export default store;