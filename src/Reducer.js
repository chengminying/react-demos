import * as ActionTypes from "./ActionTypes";

const initState = {
    todos: [],
}

export default (state = initState, action) => {

    switch (action.type) {
        case ActionTypes.ADD_TODO:
            return { 
                todos: [
                    ...state.todos,
                    action.todoInfo
                ]
            };
        // case ActionTypes.DECREMENT:
        //     return {...state, [counterCaption]: state[counterCaption] - 1};
        default:
            return state;
    }
}