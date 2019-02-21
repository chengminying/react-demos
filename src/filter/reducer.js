import { ALL, COMPLETED, UNCOMPLETED} from './actionTypes'

export default (state = initialState, action) => {
  switch (action.type) {

  case ALL:
    return { ...state, }

  default:
    return state
  }
}
