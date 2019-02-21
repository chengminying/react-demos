import * as ActionTypes from "./ActionTypes";

export const addTodo = todoInfo => {
    return {
        type: ActionTypes.ADD_TODO,
        todoInfo,
    }
}

export const isSelected = (isSelect, index) => {
    return  {
        type: ActionTypes.IS_SELECTED,
        accomplish: isSelect,
        index,
    }
}

export const filterTypes = counterCaption => {
    return {
        type: ActionTypes.FILTER_TYPES,
        counterCaption,
    }
}