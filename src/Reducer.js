import * as ActionTypes from "./ActionTypes";

const initState = {
    todos: [],
    filter: "all",
}

export default (state = initState, action) => {

    switch (action.type) {
        case ActionTypes.ADD_TODO:
            return {
                todos: [
                    ...state.todos,
                    action.todoInfo
                ],
                filter: state.filter,
            };
        // case ActionTypes.FILTER_TYPES:
        //     return { ...state, filter: ""}
        case ActionTypes.IS_SELECTED:
        console.log(state.todos[action.index]);
        
            return {
                todos: [
                    ...state.todos,
                    state.todos[action.index]
                ],
                filter: state.filter,
            }
        default:
            return state;
    }
}