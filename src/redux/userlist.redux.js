import axios from 'axios';

//action types 
const USER_LIST = 'user_list';

//初始状态
const initState = {
    userlist: [],
}

//action creator
function userList(data) {
    return { type: USER_LIST, payload: data}
}

//anysc action creator
export function getUserList(type) {
    return dispatch => {
        axios.get('/user/list?type=' + type).then(res => {
            if(res.data.code === 0) {
                dispatch(userList(res.data.data))
            }
        })
    }
}

//reducer
export function userListReducer(state = initState, action) {
    switch(action.type) {
        case USER_LIST:
            return {...state, userlist: action.payload}
        default: 
            return state;
    }
}

